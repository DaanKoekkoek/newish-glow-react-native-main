import { useRef, useEffect, useState } from "react";

/**
 * useElementSize:
 * Custom hook to measure and track the height of a DOM element.
 * Automatically updates when the element resizes or when the window resizes.
 * Useful for animations that require dynamic content size (e.g., Grow, Collapse, Accordion components).
 *
 * Features:
 * - Returns a `ref` to attach to the element to measure.
 * - Returns the current `height` of the element.
 * - Observes changes via `ResizeObserver` and window `resize` events.
 * - Updates height reactively whenever dependencies (`deps`) change.
 *
 * @param deps - Optional dependencies array to re-run the effect.
 * @returns Object containing:
 *   - ref: React ref to attach to the target element.
 *   - height: Current measured height of the element.
 */
export const useElementSize = (...deps: unknown[]) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const updateSize = () => {
      const { scrollHeight } = el;
      setHeight((prev) => {
        if (prev === scrollHeight) return prev;
        return scrollHeight;
      });
    };

    updateSize();

    if (typeof window === "undefined") return;

    const obs = new ResizeObserver(updateSize);
    obs.observe(el);
    window.addEventListener("resize", updateSize);

    return () => {
      obs.disconnect();
      window.removeEventListener("resize", updateSize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { ref, height };
};
