import { useEffect, useRef } from "react";

// En pantallas angostas la placa queda debajo del pliegue: la inspección arranca
// pausada (CSS) y corre recién cuando se ve.
export function useInspectOnView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      el.dataset.inspect = "run";
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.dataset.inspect = "run";
          io.disconnect();
        }
      },
      { threshold: 0.45 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}
