import { useSpring, type MotionValue } from "framer-motion";
import { useEffect } from "react";
import { useMotionValue } from "framer-motion";
import { FOLLOWER_PRESETS } from "_internals/Animation/Animation.configuration";
import { debounce } from "_utility";

/**
 * useOptionalSpring:
 * Wraps a MotionValue in a spring animation using the selected FOLLOWER_PRESETS.
 */
export function useOptionalSpring(
  pos: MotionValue<number>,
  spring = true,
  preset: keyof typeof FOLLOWER_PRESETS = "medium",
) {
  const { stiffness, damping } = FOLLOWER_PRESETS[preset];
  const springPos = useSpring(pos, { stiffness, damping });
  return spring ? springPos : pos;
}

/**
 * useFollowerPosition:
 * Calculates and tracks the horizontal position of a follower element relative to a target element.
 * Updates on resize, style changes, or continuously via requestAnimationFrame for smooth motion.
 *
 * @param targetRef - Ref to the element being followed
 * @param followerRef - Ref to the follower element
 * @param offsetX - Optional horizontal offset from the track boundaries
 * @param useRAF - Whether to enable requestAnimationFrame polling for ultra-smooth updates
 * @returns MotionValue representing the follower's X and Y position
 */
export function useFollowerPosition(
  targetRef: React.RefObject<HTMLElement>,
  followerRef: React.RefObject<HTMLElement>,
  containerRef: React.RefObject<HTMLElement>,
  offsetX = 0,
  offsetY = 0,
  useRAF = false,
) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    if (!targetRef.current || !followerRef.current || !containerRef.current)
      return;

    const updatePosition = () => {
      const targetEl = targetRef.current!;
      const followerEl = followerRef.current!;
      const containerEl = containerRef.current!;

      if (!targetEl) return;

      const targetRect = targetEl.getBoundingClientRect();
      const containerRect = containerEl.getBoundingClientRect();

      // X-AXIS
      const targetCenterX =
        targetRect.left - containerRect.left + targetRect.width / 2;

      const followerWidth = followerEl.offsetWidth;
      const minX = offsetX;
      const maxX = containerRect.width - followerWidth - offsetX;

      let newX = targetCenterX - followerWidth / 2;
      newX = Math.min(Math.max(newX, minX), maxX);
      x.set(newX);

      // Y-AXIS
      const targetCenterY =
        targetRect.top - containerRect.top + targetRect.height / 2;

      const followerHeight = followerEl.offsetHeight;
      const minY = 0;
      const maxY = containerRect.height - followerHeight;

      // follower should align to thumb vertically, then apply offset
      let newY = targetCenterY - followerHeight / 2 + offsetY;

      newY = Math.min(Math.max(newY, minY), maxY);
      y.set(newY);
    };

    const debouncedUpdate = debounce(updatePosition, 16); // 60fps

    const observer = new MutationObserver(debouncedUpdate);
    observer.observe(targetRef.current, {
      attributes: true,
      attributeFilter: ["style"],
    });

    window.addEventListener("resize", debouncedUpdate);

    let frameId: number;
    const tick = () => {
      if (useRAF) updatePosition();
      frameId = requestAnimationFrame(tick);
    };
    if (useRAF) tick();

    updatePosition();

    return () => {
      window.removeEventListener("resize", debouncedUpdate);
      observer.disconnect();
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [targetRef, followerRef, containerRef, offsetX, offsetY, useRAF, x, y]);

  return { x, y };
}
