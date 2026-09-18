"use client";

import { useEffect, useRef, useState } from "react";

type ImageCropFieldProps = {
  name: string;
  aspect: number;
  hint: string;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function coverSize(
  naturalW: number,
  naturalH: number,
  frameW: number,
  frameH: number,
  zoom: number,
) {
  const scale = Math.max(frameW / naturalW, frameH / naturalH) * zoom;
  return { width: naturalW * scale, height: naturalH * scale };
}

function clampPan(
  tx: number,
  ty: number,
  drawnW: number,
  drawnH: number,
  frameW: number,
  frameH: number,
) {
  const maxX = Math.max(0, (drawnW - frameW) / 2);
  const maxY = Math.max(0, (drawnH - frameH) / 2);
  return {
    x: clamp(tx, -maxX, maxX),
    y: clamp(ty, -maxY, maxY),
  };
}

export function ImageCropField({ name, aspect, hint }: ImageCropFieldProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const dragRef = useRef<{
    pointer: number;
    startX: number;
    startY: number;
    originX: number;
    originY: number;
  } | null>(null);
  const readyRef = useRef(false);
  const committingRef = useRef(false);
  const panRef = useRef({ x: 0, y: 0 });
  const zoomRef = useRef(1);
  const sourceRef = useRef<string | null>(null);
  const [source, setSource] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [error, setError] = useState("");
  const [fileLabel, setFileLabel] = useState("Choose a photograph");
  const [ready, setReady] = useState(false);

  function setPanBoth(next: { x: number; y: number }) {
    panRef.current = next;
    setPan(next);
  }

  function setZoomBoth(next: number) {
    zoomRef.current = next;
    setZoom(next);
  }

  function clear() {
    if (sourceRef.current) URL.revokeObjectURL(sourceRef.current);
    sourceRef.current = null;
    panRef.current = { x: 0, y: 0 };
    zoomRef.current = 1;
    setSource(null);
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setReady(false);
    setError("");
    setFileLabel("Choose a photograph");
    imageRef.current = null;
    if (fileRef.current) fileRef.current.value = "";
  }

  async function commit() {
    const frame = frameRef.current;
    const img = imageRef.current;
    const input = fileRef.current;
    if (!img || !frame || !input || !sourceRef.current) {
      setError("Please add a photograph.");
      return false;
    }

    const frameW = frame.clientWidth;
    const frameH = frame.clientHeight;
    if (!frameW || !frameH) {
      setError("Could not read the crop frame.");
      return false;
    }

    const outW = 1600;
    const outH = Math.round(outW / aspect);
    const drawn = coverSize(
      img.naturalWidth,
      img.naturalHeight,
      outW,
      outH,
      zoomRef.current,
    );
    const scaled = clampPan(
      panRef.current.x * (outW / frameW),
      panRef.current.y * (outH / frameH),
      drawn.width,
      drawn.height,
      outW,
      outH,
    );

    const canvas = document.createElement("canvas");
    canvas.width = outW;
    canvas.height = outH;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      setError("Could not crop this photograph.");
      return false;
    }

    ctx.fillStyle = "#f3efe8";
    ctx.fillRect(0, 0, outW, outH);
    ctx.drawImage(
      img,
      (outW - drawn.width) / 2 + scaled.x,
      (outH - drawn.height) / 2 + scaled.y,
      drawn.width,
      drawn.height,
    );

    const blob = await new Promise<Blob | null>((resolve) => {
      canvas.toBlob(resolve, "image/jpeg", 0.88);
    });
    if (!blob) {
      setError("Could not save this photograph.");
      return false;
    }

    committingRef.current = true;
    const file = new File([blob], "photograph.jpg", { type: "image/jpeg" });
    const transfer = new DataTransfer();
    transfer.items.add(file);
    input.files = transfer.files;
    setError("");
    return true;
  }

  useEffect(() => {
    const form = fileRef.current?.form;
    if (!form) return;

    const onSubmit = (event: SubmitEvent) => {
      if (readyRef.current) {
        readyRef.current = false;
        committingRef.current = false;
        return;
      }
      event.preventDefault();
      void commit().then((ok) => {
        if (!ok) {
          committingRef.current = false;
          return;
        }
        readyRef.current = true;
        form.requestSubmit();
      });
    };
    const onReset = () => clear();

    form.addEventListener("submit", onSubmit);
    form.addEventListener("reset", onReset);
    return () => {
      form.removeEventListener("submit", onSubmit);
      form.removeEventListener("reset", onReset);
    };
  });

  useEffect(() => {
    return () => {
      if (sourceRef.current) URL.revokeObjectURL(sourceRef.current);
    };
  }, []);

  function onPick(file: File | undefined) {
    if (committingRef.current) return;
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Please choose a photograph.");
      return;
    }
    if (sourceRef.current) URL.revokeObjectURL(sourceRef.current);
    const url = URL.createObjectURL(file);
    sourceRef.current = url;
    setSource(url);
    setZoomBoth(1);
    setPanBoth({ x: 0, y: 0 });
    setReady(false);
    setError("");
    setFileLabel(file.name);
    imageRef.current = null;
  }

  function onPointerDown(event: React.PointerEvent<HTMLDivElement>) {
    if (!source) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = {
      pointer: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      originX: pan.x,
      originY: pan.y,
    };
  }

  function onPointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const drag = dragRef.current;
    const frame = frameRef.current;
    const img = imageRef.current;
    if (!drag || drag.pointer !== event.pointerId || !frame || !img) return;
    const drawn = coverSize(
      img.naturalWidth,
      img.naturalHeight,
      frame.clientWidth,
      frame.clientHeight,
      zoom,
    );
    setPanBoth(
      clampPan(
        drag.originX + (event.clientX - drag.startX),
        drag.originY + (event.clientY - drag.startY),
        drawn.width,
        drawn.height,
        frame.clientWidth,
        frame.clientHeight,
      ),
    );
  }

  function endDrag(event: React.PointerEvent<HTMLDivElement>) {
    if (dragRef.current?.pointer === event.pointerId) dragRef.current = null;
  }

  const frame = frameRef.current;
  const img = imageRef.current;
  const drawn =
    ready && frame && img
      ? coverSize(
          img.naturalWidth,
          img.naturalHeight,
          frame.clientWidth,
          frame.clientHeight,
          zoom,
        )
      : null;

  return (
    <div>
      <span className="font-label text-[11px] tracking-[0.02em] text-brown/70">
        Photograph
      </span>
      <input
        ref={fileRef}
        name={name}
        type="file"
        accept="image/*"
        className="sr-only"
        tabIndex={-1}
        onChange={(event) => onPick(event.target.files?.[0])}
      />
      <div
        ref={frameRef}
        className={`relative mt-3 overflow-hidden bg-cream-soft ${source ? "touch-none" : ""}`}
        style={{ aspectRatio: `${aspect}` }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        {source ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={source}
            alt=""
            draggable={false}
            onLoad={(event) => {
              imageRef.current = event.currentTarget;
              setReady(true);
            }}
            className="absolute max-w-none select-none"
            style={
              drawn && frame
                ? {
                    width: drawn.width,
                    height: drawn.height,
                    left: (frame.clientWidth - drawn.width) / 2 + pan.x,
                    top: (frame.clientHeight - drawn.height) / 2 + pan.y,
                    cursor: "grab",
                  }
                : {
                    inset: 0,
                    height: "100%",
                    width: "100%",
                    objectFit: "cover",
                  }
            }
          />
        ) : (
          <button
            type="button"
            className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center"
            onClick={() => fileRef.current?.click()}
          >
            <span className="font-serif text-[1.35rem] uppercase tracking-tight text-brown">
              Add a photograph
            </span>
            <span className="max-w-[18rem] text-[0.92rem] leading-relaxed text-brown/65">
              Any size is fine. You can drag and zoom to choose what stays in
              frame.
            </span>
          </button>
        )}
      </div>
      <p className="mt-3 text-[0.92rem] leading-relaxed text-brown/65">{hint}</p>
      <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3">
        <button
          type="button"
          className="nav-link"
          onClick={() => fileRef.current?.click()}
        >
          {fileLabel}
        </button>
        {source ? (
          <>
            <label className="flex min-w-[12rem] flex-1 items-center gap-3">
              <span className="font-label text-[10px] text-brown/60">Zoom</span>
              <input
                type="range"
                min={1}
                max={2.4}
                step={0.02}
                value={zoom}
                onChange={(event) => {
                  const next = Number(event.target.value);
                  const box = frameRef.current;
                  const photo = imageRef.current;
                  setZoomBoth(next);
                  if (!box || !photo) return;
                  const size = coverSize(
                    photo.naturalWidth,
                    photo.naturalHeight,
                    box.clientWidth,
                    box.clientHeight,
                    next,
                  );
                  setPanBoth(
                    clampPan(
                      pan.x,
                      pan.y,
                      size.width,
                      size.height,
                      box.clientWidth,
                      box.clientHeight,
                    ),
                  );
                }}
                className="studio-zoom"
              />
            </label>
            <button
              type="button"
              className="nav-link"
              onClick={() => {
                setZoomBoth(1);
                setPanBoth({ x: 0, y: 0 });
              }}
            >
              Reset frame
            </button>
          </>
        ) : null}
      </div>
      {error ? <p className="mt-3 text-[0.95rem] text-red-800">{error}</p> : null}
    </div>
  );
}
