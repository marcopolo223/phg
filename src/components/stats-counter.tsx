"use client";

import { useEffect, useRef, useState } from "react";
import { onEnterView } from "@/lib/on-enter-view";

const stats = [
  {
    label: "Career",
    prefix: "",
    amount: 600,
    suffix: "+",
    detail: "Transactions",
  },
  {
    label: "Volume",
    prefix: "$",
    amount: 80,
    suffix: "M+",
    detail: "In Sales",
  },
  {
    label: "New Development",
    prefix: "$",
    amount: 500,
    suffix: "M+",
    detail: "Projects Overseen",
  },
  {
    label: "Languages",
    prefix: "",
    amount: 5,
    suffix: "",
    lines: ["English", "Urdu", "Gujarati", "Spanish", "Hindi"],
  },
  {
    label: "Markets",
    prefix: "",
    amount: 6,
    suffix: "",
    lines: [
      "Miami",
      "Fort Lauderdale",
      "Palm Beach",
      "Manhattan",
      "Hamptons",
      "Houston",
    ],
  },
  {
    label: "Singular Intention",
    prefix: "",
    amount: 1,
    suffix: "",
    detail: "To Seal a Legacy",
  },
];

function easeOutQuad(t: number) {
  return 1 - (1 - t) ** 2;
}

function StatValue({
  prefix,
  amount,
  suffix,
  active,
  delay,
}: {
  prefix: string;
  amount: number;
  suffix: string;
  active: boolean;
  delay: number;
}) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!active) return;

    let frame = 0;
    let start: number | null = null;
    const duration = 2600;

    const wait = window.setTimeout(() => {
      const tick = (now: number) => {
        if (start === null) start = now;
        const t = Math.min(1, (now - start) / duration);
        setDisplay(Math.round(easeOutQuad(t) * amount));
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }, delay);

    return () => {
      window.clearTimeout(wait);
      cancelAnimationFrame(frame);
    };
  }, [active, amount, delay]);

  return (
    <p className="mt-4 font-display text-[clamp(1.45rem,4.2vw,2.85rem)] tracking-tight text-brown tabular-nums">
      {prefix}
      {display}
      {suffix}
    </p>
  );
}

export function StatsCounter() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    return onEnterView(el, () => setActive(true));
  }, []);

  return (
    <section
      ref={ref}
      className="mx-auto max-w-[1680px] border-y border-brown/25 px-5 py-12 md:px-12 md:py-16"
    >
      <div className="grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:grid-cols-6">
        {stats.map((item, i) => (
          <div key={item.label} className="text-center">
            <p className="font-label text-[12px] text-brown sm:text-[14px] md:text-[15px]">
              {item.label}
            </p>
            <StatValue
              prefix={item.prefix}
              amount={item.amount}
              suffix={item.suffix}
              active={active}
              delay={i * 160}
            />
            <div className="mx-auto mt-4 h-px w-11 bg-brown/35" />
            {item.lines ? (
              <p className="mt-4 font-label text-[11px] leading-[1.7] text-brown sm:text-[13px] md:text-[14px]">
                {item.lines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
            ) : (
              <p className="mx-auto mt-4 max-w-[14ch] font-label text-[11px] leading-[1.7] text-brown sm:text-[13px] md:text-[14px]">
                {item.detail}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
