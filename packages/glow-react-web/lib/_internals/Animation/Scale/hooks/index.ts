import {
  autoUpdate,
  flip,
  shift,
  offset,
  useFloating,
  Placement,
  autoPlacement,
} from "@floating-ui/react-dom";
import {
  useMotionValue,
  useSpring,
  useTransform,
  type MotionStyle,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { SCALE_PRESETS } from "_internals/Animation/Animation.configuration";
import type { AnchoredScaleProps } from "../AnchoredScale";

/**
 * useAnchoredScale:
 * Manages the positioning and scaling animation of a floating element (like a tooltip, dropdown, or popover)
 * anchored to a reference/source element. Uses @floating-ui for precise positioning relative to the source
 * and framer-motion for smooth scale animations with optional easing presets.
 *
 * Features:
 * - Automatically positions the floating element with flip/shift/offset middleware.
 * - Animates scale in/out when `open` changes.
 * - Computes combined transform including floating-ui position and scale.
 * - Tracks visibility state for AnimatePresence and delayed unmount.
 * - Exposes a ref to track whether exit animation has completed.
 *
 * @param sourceRef - Ref to the element the floating element is anchored to.
 * @param open - Whether the floating element should be visible.
 * @param placement - Preferred floating placement (from @floating-ui).
 * @param animation - Scale animation preset (from SCALE_PRESETS).
 * @param offsetY - Optional vertical offset for the floating element.
 * @returns An object containing visibility, floating ref, motion styles, and exit completion ref.
 */

type UseAnchoredScaleProps = Pick<
  AnchoredScaleProps,
  "sourceRef" | "open" | "placement" | "animation"
> & {
  offsetY?: number;
};

type UseAnchoredScaleReturn = {
  isVisible: boolean;
  floatingRef: (node: HTMLElement | null) => void;
  floatingStyles: MotionStyle;
  exitCompleteRef: React.MutableRefObject<boolean>;
};

export const useAnchoredScale = ({
  sourceRef,
  open,
  placement = "bottom-end",
  animation = "gentle",
  offsetY = 0,
}: UseAnchoredScaleProps): UseAnchoredScaleReturn => {
  const { duration, ease } = SCALE_PRESETS[animation];
  const exitCompleteRef = useRef(false);
  const [isVisible, setIsVisible] = useState(open);

  const middleware =
    placement === "auto"
      ? [
          offset(offsetY),
          autoPlacement({
            allowedPlacements: ["top", "bottom"],
          }),
          shift({ mainAxis: true }),
        ]
      : [
          offset(offsetY),
          flip({
            fallbackPlacements: ["top-end"],
            mainAxis: true,
            crossAxis: false,
          }),
          shift({ mainAxis: true }),
        ];

  const { refs, floatingStyles, update } = useFloating({
    placement: placement as Placement,
    whileElementsMounted: autoUpdate,
    middleware,
  });

  useEffect(() => {
    if (sourceRef?.current) {
      requestAnimationFrame(() => {
        refs.setReference(sourceRef.current);
        update?.();
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sourceRef?.current]);

  const scale = useMotionValue(0);
  const animatedScale = useSpring(scale, {
    duration: duration * 1000,
    damping: 30,
    stiffness: 300,
    ...ease,
  });

  useEffect(() => {
    if (open) {
      setIsVisible(true);
      scale.set(1);
    } else {
      scale.set(0);
      const timeout = setTimeout(() => {
        setIsVisible(false);
      }, duration * 1000);
      return () => clearTimeout(timeout);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const transform = useTransform(animatedScale, (s) => {
    const baseTransform = floatingStyles.transform ?? "";
    return `${baseTransform} scale(${s})`;
  });

  return {
    isVisible,
    floatingRef: refs.setFloating,
    floatingStyles: {
      ...floatingStyles,
      transform,
      opacity: animatedScale,
    },
    exitCompleteRef,
  };
};
