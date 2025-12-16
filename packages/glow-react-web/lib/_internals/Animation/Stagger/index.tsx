import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import type {
  BaseAnimationProps,
  SupportedMotionTags,
} from "../Animation.types";
import { STAGGER_PRESETS } from "../Animation.configuration";

/**
 * Stagger component: animates a list of children with staggered enter/exit transitions.
 * Each child fades and moves vertically in/out, and the animation order can be reversed
 * when closing. Optional callbacks can be provided for when the full enter or exit
 * animation completes.
 */

type StaggerAnimation = keyof typeof STAGGER_PRESETS;

type StaggerProps = BaseAnimationProps<SupportedMotionTags> & {
  animation?: StaggerAnimation;
  reverseOnClose?: boolean;
};

export const Stagger = ({
  open,
  children,
  className,
  reverseOnClose = true,
  animation = "medium",
  delay,
  as: Tag = "div",
  onExitComplete,
  onEnterComplete,
}: StaggerProps) => {
  const items = Array.isArray(children) ? children : [children];
  const {
    stagger,
    delay: presetDelay,
    duration,
    child: childConfig,
  } = STAGGER_PRESETS[animation];
  const effectiveDelay = delay ?? presetDelay;

  const containerVariants: Variants = {
    closed: {
      transition: {
        staggerChildren: stagger,
        staggerDirection: reverseOnClose ? -1 : 1,
      },
    },
    open: {
      transition: {
        staggerChildren: stagger,
        delayChildren: effectiveDelay,
        staggerDirection: 1,
      },
    },
  };

  const childVariants: Variants = {
    open: {
      opacity: 1,
      y: 0,
      transition: { delayChildren: effectiveDelay, ...childConfig, duration },
    },
    closed: {
      opacity: 0,
      y: -8,
      transition: { duration: childConfig?.closedDuration ?? duration },
    },
  };

  const AnimationContainer = motion[Tag];
  const safeTag = Tag as SupportedMotionTags;
  const AnimationChild = safeTag === "ul" ? motion.li : motion.div;

  return (
    <AnimatePresence>
      <AnimationContainer
        className={className}
        initial="closed"
        animate={open ? "open" : "closed"}
        exit="closed"
        variants={containerVariants}
        aria-hidden={!open}
      >
        {items.map((child, i) => {
          const isLastChild = i === items.length - 1;

          return (
            <AnimationChild
              key={i}
              variants={childVariants}
              onAnimationComplete={() => {
                if (open && isLastChild) onEnterComplete?.();
                if (!open && isLastChild) onExitComplete?.();
              }}
            >
              {child}
            </AnimationChild>
          );
        })}
      </AnimationContainer>
    </AnimatePresence>
  );
};
