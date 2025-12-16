import { useEffect, useMemo, useRef, useCallback } from "react";
import { useMotionValue, animate, MotionValue } from "framer-motion";
import { MORPH_PRESETS } from "_internals/Animation/Animation.configuration";
import * as flubber from "flubber";
import type { MorphProps, SupportedMorphShapes } from "../index";

/**
 * useMorph:
 * Provides smooth morphing between arbitrary shapes including `none`.
 * Supports rectangle, circle, triangle, and a `none` (center-point) start/end.
 * Animates shape transitions using flubber interpolation and spring physics.
 *
 * Features:
 * - Smoothly interpolates between any two shapes.
 * - Special case for `none`: morphs outward from center.
 * - Uses Framer Motion springs (configurable via MORPH_PRESETS).
 *
 * @param props - MorphProps controlling size, ratio, shapes, edgeThreshold, preset.
 * @returns Object containing:
 *   - d: MotionValue<string> representing the current SVG path.
 *   - targetShape: current target shape.
 */

export function useMorph({
  size,
  ratio,
  edgeThreshold = 0.15,
  startShape = "square",
  endShape = "square",
  middleShape = "circle",
  preset = "medium",
}: MorphProps): {
  d: MotionValue<string>;
  targetShape: SupportedMorphShapes;
} {
  const { stiffness, damping } = MORPH_PRESETS[preset];

  const targetShape: SupportedMorphShapes =
    ratio <= edgeThreshold
      ? startShape
      : ratio >= 1 - edgeThreshold
        ? endShape
        : middleShape;

  const paths = useMemo(() => {
    const c = size / 2;
    return {
      none: `M${c},${c} Z`,
      circle: `
        M${c},0
        C${size * 0.776},0 ${size},${size * 0.224} ${size},${c}
        C${size},${size * 0.776} ${size * 0.776},${size} ${c},${size}
        C${size * 0.224},${size} 0,${size * 0.776} 0,${c}
        C0,${size * 0.224} ${size * 0.224},0 ${c},0
      `,
      square: `M0,0 H${size} V${size} H0 Z`,
      triangle: `M${c},0 L${size},${0.866 * size} L0,${0.866 * size} Z`,
    };
  }, [size]);

  const d = useMotionValue(paths[targetShape]);
  const prevShapeRef = useRef<SupportedMorphShapes>(targetShape);

  const animateMorph = useCallback(() => {
    const from = paths[prevShapeRef.current];
    const to = paths[targetShape];

    // size ranges from 10 to 200 (but can be increased / decreased), map maxSegmentLength 0.1 → 1
    // required to smoothen out animations when the shape is larger.
    const minSize = 10;
    const maxSize = 200;
    const minSegment = 0.1;
    const maxSegment = 1;

    // clamp size to avoid overshooting
    const clampedSize = Math.min(Math.max(size, minSize), maxSize);

    // linear interpolation between minSegment and maxSegment
    const maxSegmentLength =
      minSegment +
      ((clampedSize - minSize) / (maxSize - minSize)) *
        (maxSegment - minSegment);

    const interpolator = flubber.interpolate(from, to, {
      maxSegmentLength,
    });

    const anim = animate(0, 1, {
      type: "spring",
      stiffness,
      damping,
      onUpdate: (v) => d.set(interpolator(v)),
    });

    prevShapeRef.current = targetShape;
    return () => anim.stop();
  }, [paths, targetShape, d, stiffness, damping, size]);

  // Animate on ratio changes
  useEffect(() => {
    animateMorph();
  }, [animateMorph]);

  return { d, targetShape };
}
