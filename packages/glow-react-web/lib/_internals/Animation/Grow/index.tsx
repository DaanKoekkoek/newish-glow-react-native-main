import {
  motion,
  AnimatePresence,
  Transition,
  TargetAndTransition,
} from "framer-motion";
import { GROW_PRESETS } from "../Animation.configuration";
import type {
  BaseAnimationProps,
  SupportedMotionTags,
} from "../Animation.types";
import { useElementSize } from "./hooks";

/**
 * Grow component: expands or collapses its children by animating height (and optionally width).
 * Uses framer-motion for smooth transitions and automatically measures content size.
 * Supports directional growth (`top`, `bottom`, `center`), configurable offsets, and preset timing via GROW_PRESETS.
 * Automatically unmounts content when `open` is false.
 */

type GrowAnimation = keyof typeof GROW_PRESETS;

type GrowOffset = {
  left?: number;
  right?: number;
  top?: number;
  bottom?: number;
};

type GrowProps = Omit<
  BaseAnimationProps<SupportedMotionTags>,
  "children" | "onExitComplete"
> & {
  children:
    | ((growDelay: number) => React.ReactElement | null)
    | React.ReactNode;
  animation?: GrowAnimation;
  duration?: number;
  delay?: number;
  offset?: GrowOffset;
  reverseOnClose?: boolean;
  animateOpacity?: boolean;
};

export const Grow = ({
  open,
  children,
  className,
  as: Tag = "div",
  animation = "medium",
  duration,
  delay = 0,
  offset,
  onEnterComplete,
  reverseOnClose = false,
  animateOpacity = false,
}: GrowProps) => {
  const AnimationContainer = motion[Tag];

  const {
    type,
    stiffness,
    damping,
    duration: presetDuration,
  } = GROW_PRESETS[animation];
  const effectiveDuration = duration ?? presetDuration;
  const growDelay = effectiveDuration * 0.8;

  const { ref: contentRef, height } = useElementSize(children, offset);

  const offsetStyles = {
    top: offset?.top,
    bottom: offset?.bottom,
    left: offset?.left,
    right: offset?.right,
  };

  const transitionDelay = open || reverseOnClose ? delay : 0;

  const viewportHeight =
    typeof window !== "undefined" ? window.innerHeight : (height ?? 0);

  const animateObj: TargetAndTransition = {
    height: offset
      ? viewportHeight - (offset.top ?? 0) - (offset.bottom ?? 0)
      : height,
    ...offsetStyles,
  };

  const exitObj: TargetAndTransition = {
    height: 0,
    ...offsetStyles,
    transition: animateOpacity
      ? { type, stiffness, damping, duration: effectiveDuration }
      : { duration: 0.25, ease: "easeInOut" },
  };

  if (animateOpacity) {
    animateObj.opacity = 1;
    exitObj.opacity = 0;
  }

  const transitionObj: Transition = {
    height: {
      type,
      stiffness,
      damping,
      duration: effectiveDuration,
      delay: transitionDelay,
    },
  };

  if (animateOpacity) {
    transitionObj.opacity = { duration: 0.25, delay: transitionDelay };
  }

  return (
    <AnimatePresence>
      {open && (
        <AnimationContainer
          key="grow"
          initial={{ height: 0, ...(animateOpacity ? { opacity: 0 } : {}) }}
          animate={animateObj}
          exit={exitObj}
          transition={transitionObj}
          className={className}
          style={{
            overflow: "hidden",
            ...offsetStyles,
          }}
          onAnimationComplete={() => onEnterComplete?.()}
        >
          <div ref={contentRef}>
            {typeof children === "function" ? children(growDelay) : children}
          </div>
        </AnimationContainer>
      )}
    </AnimatePresence>
  );
};
