import { motion, AnimatePresence } from "framer-motion";
import { SLIDE_PRESETS } from "../Animation.configuration";
import type {
  BaseAnimationProps,
  SupportedMotionTags,
} from "_internals/Animation/Animation.types";

/**
 * Slide component: animates a single child element sliding in/out from a specified direction.
 * Can handle multiple children via the `index` prop to show one child at a time,
 * and optionally disables animation if `shouldAnimate` is false.
 */

type SlideDirection = "left" | "right" | "top" | "bottom";
type SlideAnimation = keyof typeof SLIDE_PRESETS;

type SlideProps = Omit<
  BaseAnimationProps<SupportedMotionTags>,
  "open" | "children" | "delay"
> & {
  children: ((slideDelay: number) => React.ReactNode) | React.ReactNode;
  index?: number;
  direction?: SlideDirection;
  animation?: SlideAnimation;
  shouldAnimate?: boolean;
  reverseOnExit?: boolean;
  offsetX?: number;
  offsetY?: number;
};

const getSlidePosition = (direction: SlideDirection, reversed: boolean) => {
  switch (direction) {
    case "left":
      return reversed ? "100%" : "-100%";
    case "right":
      return reversed ? "-100%" : "100%";
    case "top":
      return reversed ? "100%" : "-100%";
    case "bottom":
      return reversed ? "-100%" : "100%";
    default:
      return 0;
  }
};

export const Slide = ({
  index = 0,
  direction = "right",
  animation = "gentle",
  children,
  className,
  as: Tag = "div",
  shouldAnimate,
  offsetX,
  offsetY,
  reverseOnExit = false,
}: SlideProps) => {
  const { type, stiffness, damping, duration } = SLIDE_PRESETS[animation];
  const AnimationContainer = motion[Tag];

  const childArray = Array.isArray(children) ? children : [children];
  const currentChild = childArray[index] ?? null;

  const variants = {
    enter: {
      x: ["left", "right"].includes(direction)
        ? getSlidePosition(direction, false)
        : 0,
      y: ["top", "bottom"].includes(direction)
        ? getSlidePosition(direction, false)
        : 0,
      transition: { type, stiffness, damping, duration },
    },
    center: {
      x: 0,
      y: 0,
      transition: { type, stiffness, damping, duration },
    },
    exit: {
      x: ["left", "right"].includes(direction)
        ? getSlidePosition(direction, reverseOnExit)
        : 0,
      y: ["top", "bottom"].includes(direction)
        ? getSlidePosition(direction, reverseOnExit)
        : 0,
      transition: { type, stiffness, damping, duration },
    },
  };

  const slideDelay = shouldAnimate ? duration : 0;

  return (
    <AnimatePresence>
      {currentChild && (
        <AnimationContainer
          key={index}
          variants={shouldAnimate ? variants : undefined}
          initial={shouldAnimate ? "enter" : false}
          animate={{ ...variants.center, x: offsetX ?? 0, y: offsetY ?? 0 }}
          exit={shouldAnimate ? "exit" : undefined}
          className={className}
        >
          {typeof children === "function" ? children(slideDelay) : currentChild}
        </AnimationContainer>
      )}
    </AnimatePresence>
  );
};
