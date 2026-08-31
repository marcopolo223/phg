const watchers = new Set<() => void>();
let interval = 0;
let listening = false;

function ping() {
  watchers.forEach((fn) => fn());
}

function ensureListeners() {
  if (listening) return;
  listening = true;
  window.addEventListener("scroll", ping, { passive: true, capture: true });
  document.addEventListener("scroll", ping, { passive: true, capture: true });
  document.addEventListener("touchmove", ping, { passive: true, capture: true });
  window.addEventListener("resize", ping);
  window.visualViewport?.addEventListener("scroll", ping);
  window.visualViewport?.addEventListener("resize", ping);
  interval = window.setInterval(ping, 200);
}

function releaseListeners() {
  if (!listening || watchers.size) return;
  listening = false;
  window.clearInterval(interval);
  interval = 0;
  window.removeEventListener("scroll", ping, true);
  document.removeEventListener("scroll", ping, true);
  document.removeEventListener("touchmove", ping, true);
  window.removeEventListener("resize", ping);
  window.visualViewport?.removeEventListener("scroll", ping);
  window.visualViewport?.removeEventListener("resize", ping);
}

export function isInViewport(el: HTMLElement) {
  const rect = el.getBoundingClientRect();
  const vh =
    window.visualViewport?.height ||
    window.innerHeight ||
    document.documentElement.clientHeight;
  return rect.top < vh * 0.9 && rect.bottom > 32;
}

export function onEnterView(el: HTMLElement, onEnter: () => void) {
  let done = false;

  const finish = () => {
    if (done) return;
    done = true;
    watchers.delete(check);
    observer.disconnect();
    releaseListeners();
    onEnter();
  };

  const check = () => {
    if (isInViewport(el)) finish();
  };

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries.some((entry) => entry.isIntersecting || entry.intersectionRatio > 0)) {
        finish();
      }
    },
    { root: null, threshold: 0, rootMargin: "0px" },
  );
  observer.observe(el);

  watchers.add(check);
  ensureListeners();
  check();

  return () => {
    done = true;
    watchers.delete(check);
    observer.disconnect();
    releaseListeners();
  };
}
