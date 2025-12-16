import type { Placement } from "@floating-ui/react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import type { ScaleProps, ScaleDirection } from "./Scale";
import type { SupportedMotionTags } from "../Animation.types";
import { useAnchoredScale } from "./hooks";
import { SCALE_PRESETS } from "../Animation.configuration";

/**
 * AnchoredScale component: scales a floating element (dropdown, tooltip, etc.)
 * from a given origin relative to a source element.
 * Uses framer-motion for the scale animation and portals the element to the body.
 * Provides callbacks to notify when the enter/exit animation completes.
 */

type AnchoredScaleRenderProps = {
  onScaleComplete: () => void;
  onExitComplete: () => void;
};

export type AnchoredScaleProps = ScaleProps & {
  sourceRef: React.RefObject<HTMLButtonElement>;
  placement?: Placement | "auto";
  animation?: keyof typeof SCALE_PRESETS;
  direction?: ScaleDirection;
  className?: string;
  children: (props: AnchoredScaleRenderProps) => React.ReactNode;
  offsetY?: number;
};

const originMap: Record<ScaleDirection, string> = {
  center: "50% 50%",
  top: "50% 0%",
  bottom: "50% 100%",
  left: "0% 50%",
  right: "100% 50%",
  "top-left": "0% 0%",
  "top-right": "100% 0%",
  "bottom-left": "0% 100%",
  "bottom-right": "100% 100%",
};

const getMotionComponent = <T extends SupportedMotionTags>(tag: T) => {
  return motion[tag as keyof typeof motion] as typeof motion.div;
};

export const AnchoredScale = ({
  sourceRef,
  open,
  placement = "bottom-end",
  animation = "gentle",
  direction = "center",
  className,
  children,
  as: Tag = "div",
  onEnterComplete,
  onExitComplete,
  offsetY,
}: AnchoredScaleProps) => {
  const { isVisible, floatingRef, floatingStyles, exitCompleteRef } =
    useAnchoredScale({ sourceRef, open, placement, animation, offsetY });

  const AnimationContainer = getMotionComponent(Tag);

  return createPortal(
    <AnimatePresence>
      {isVisible && (
        <AnimationContainer
          ref={floatingRef}
          className={className}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{
            duration: SCALE_PRESETS[animation].duration,
            ease: SCALE_PRESETS[animation].ease,
          }}
          style={{
            ...floatingStyles,
            transformOrigin: originMap[direction],
            zIndex: 1000,
          }}
          onAnimationComplete={(def) => {
            if (open && def === "animate") onEnterComplete?.();
            else if (!open && def === "exit") onExitComplete?.();
          }}
        >
          {children({
            onScaleComplete: () => {
              exitCompleteRef.current = false;
            },
            onExitComplete: () => {
              exitCompleteRef.current = true;
            },
          })}
        </AnimationContainer>
      )}
    </AnimatePresence>,
    document.body,
  );
};
