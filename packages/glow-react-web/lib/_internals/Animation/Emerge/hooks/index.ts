import { useMemo } from "react";
import type { Variants } from "framer-motion";
import { EMERGE_PRESETS } from "../../Animation.configuration";

/**
 * useEmergeVariants:
 * Generates Framer Motion variants for animating children to "emerge" from a central item.
 * Useful for staggered list animations or SVG path expansions.
 *
 * Features:
 * - Calculates x-offset, scale, and opacity based on distance from a center index.
 * - Provides separate `open` and `closed` states for motion.
 * - Staggers child animations with timing based on distance to center.
 * - Supports both HTML and SVG children.
 *
 * @param animation - Key of EMERGE_PRESETS defining timing, easing, and spread.
 * @param centerIndex - Index around which items appear to "emerge".
 * @param itemCount - Total number of children/items to animate.
 *
 * @returns Variants object for Framer Motion children:
 *   - open: animation state for appearing.
 *   - closed: animation state for disappearing.
 */
export function useEmergeVariants(
  animation: keyof typeof EMERGE_PRESETS,
  centerIndex: number,
  itemCount: number,
) {
  const preset = EMERGE_PRESETS[animation];
  const {
    spread,
    stagger,
    duration,
    ease,
    exitDuration = duration * 0.7,
    exitEase = [0.45, 0, 1, 1],
  } = preset;

  const variants: Variants = useMemo(() => {
    return {
      closed: (i: number) => {
        const offset = i - centerIndex;
        const dist = Math.abs(offset);
        const delay = (stagger * (itemCount - dist)) / itemCount;

        const base = spread * 0.15;
        const taper = Math.pow(dist, 0.9);

        // start near the center but slightly offset
        let x = offset < 0 ? taper * base * 3 : -taper * base * 3;
        let scaleX = 1;

        // bring the near-center items closer and scale up initially.
        if (dist === 1) {
          x *= 0.9;
          scaleX = 1.2;
        }

        // centered item doesnt move, but scales up.
        if (i === centerIndex) {
          x = 0;
          scaleX = 0;
        }

        return {
          x,
          scaleX,
          opacity: 0.9 - dist * 0.15,
          transition: {
            duration: exitDuration,
            ease: exitEase,
            delay,
            scaleX: { duration },
          },
        };
      },

      open: (i: number) => {
        const dist = Math.abs(i - centerIndex);
        const delay = dist * stagger;

        return {
          x: 0,
          scaleX: 1,
          opacity: 1,
          transition: {
            duration,
            ease,
            delay,
            scaleX: { duration: duration * 0.2 },
          },
        };
      },
    };
  }, [
    centerIndex,
    itemCount,
    spread,
    stagger,
    duration,
    ease,
    exitDuration,
    exitEase,
  ]);

  return variants;
}
