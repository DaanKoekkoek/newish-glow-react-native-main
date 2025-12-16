import { motion, AnimatePresence } from "framer-motion";
import { SCALE_PRESETS } from "../Animation.configuration";
import type {
  BaseAnimationProps,
  SupportedMotionTags,
} from "../Animation.types";

/**
 * Scale component: scales a container element from a given origin with optional
 * directional offsets. Useful for popovers, dropdowns, or any element that should
 * animate in/out by scaling.
 * Provides callbacks for enter/exit animation completion via the children render prop.
 */

type ScaleAnimation = keyof typeof SCALE_PRESETS;

export type ScaleDirection =
  | "center"
  | "top"
  | "bottom"
  | "left"
  | "right"
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";

export type ScaleProps = Omit<
  BaseAnimationProps<SupportedMotionTags>,
  "children"
> & {
  animation?: ScaleAnimation;
  direction?: ScaleDirection;
  children: (opts: {
    onScaleComplete: () => void;
    onExitComplete: () => void;
  }) => React.ReactNode;
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

const offsetMap: Record<ScaleDirection, { x?: number; y?: number }> = {
  center: { x: -8 },
  top: { y: -8 },
  bottom: { y: 8 },
  left: { x: -8 },
  right: { x: 8 },
  "top-left": { y: -8 },
  "top-right": { y: -8 },
  "bottom-left": { y: 8 },
  "bottom-right": { y: 8 },
};

export const Scale = ({
  open,
  animation = "gentle",
  direction = "center",
  children,
  as: Tag = "div",
  style,
  className,
  onEnterComplete,
  onExitComplete,
}: ScaleProps) => {
  const { duration, ease } = SCALE_PRESETS[animation];

  const AnimationContainer = motion[Tag];
  const offset = offsetMap[direction];

  const variants = {
    closed: {
      scaleX: 0,
      scaleY: 0,
      x: offset.x ?? 0,
      y: offset.y ?? 0,
      transition: { duration: duration / 2, ease },
    },
    open: {
      scaleX: 1,
      scaleY: 1,
      x: offset.x ?? 0,
      y: offset.y ?? 0,
      transition: { duration: duration / 2, ease },
    },
  };

  return (
    <AnimatePresence>
      {open && (
        <AnimationContainer
          className={className}
          variants={variants}
          initial="closed"
          animate="open"
          exit="closed"
          style={{ transformOrigin: originMap[direction], ...style }}
          onAnimationComplete={() => {
            if (open) onEnterComplete?.();
            else onExitComplete?.();
          }}
        >
          {children({
            onScaleComplete: () => {},
            onExitComplete: () => {},
          })}
        </AnimationContainer>
      )}
    </AnimatePresence>
  );
};
