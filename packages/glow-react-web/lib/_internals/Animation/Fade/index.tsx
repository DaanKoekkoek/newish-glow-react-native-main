import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import type {
  BaseAnimationProps,
  SupportedMotionTags,
} from "../Animation.types";
import { FADE_PRESETS } from "../Animation.configuration";

/**
 * Fade component: smoothly fades children in and out using framer-motion.
 * Automatically removes the element from the DOM when `open` is false.
 * Supports preset durations/delays from FADE_PRESETS, as well as custom overrides.
 */

type FadeAnimation = keyof typeof FADE_PRESETS;

type FadeProps = Omit<BaseAnimationProps<SupportedMotionTags>, "children"> & {
  children:
    | React.ReactNode
    | ((args: { fadeCompleted: boolean }) => React.ReactNode);
  duration?: number;
  animation?: FadeAnimation;
  reverseOnExit?: boolean;
  zIndex?: number;
  position?: "relative" | "absolute" | "fixed";
  testID?: string;
};

export const Fade = ({
  open,
  children,
  className,
  as: Tag = "div",
  animation = "medium",
  delay,
  duration,
  reverseOnExit,
  onExitComplete,
  onEnterComplete,
  position,
  zIndex,
  testID = "fade",
}: FadeProps) => {
  const containerRef = useRef(null);
  const AnimationContainer = motion[Tag];
  const [fadeCompleted, setFadeCompleted] = useState(false);

  const { duration: presetDuration, delay: presetDelay } =
    FADE_PRESETS[animation];
  const effectiveDuration = duration ?? presetDuration;
  const effectiveDelay = delay ?? presetDelay;

  const variants: Variants = {
    open: {
      opacity: 1,
      transition: { duration: effectiveDuration, delay: effectiveDelay },
    },
    closed: {
      opacity: 0,
      transition: {
        duration: effectiveDuration,
        delay: reverseOnExit ? effectiveDelay : 0,
      },
    },
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    if (!open) (el as HTMLDivElement).setAttribute("inert", "");
    else (el as HTMLDivElement).removeAttribute("inert");
  }, [open]);

  return (
    <AnimatePresence>
      <AnimationContainer
        data-testid={testID}
        ref={containerRef}
        className={className}
        initial="closed"
        animate={open ? "open" : "closed"}
        exit="closed"
        variants={variants}
        onAnimationComplete={() => {
          if (open) {
            setFadeCompleted(true);
            onEnterComplete?.();
          } else {
            setFadeCompleted(false);
            onExitComplete?.();
          }
        }}
        style={{
          ...(position ? { position } : {}),
          ...(zIndex ? { zIndex } : {}),
        }}
      >
        {typeof children === "function"
          ? children({ fadeCompleted })
          : children}
      </AnimationContainer>
    </AnimatePresence>
  );
};
