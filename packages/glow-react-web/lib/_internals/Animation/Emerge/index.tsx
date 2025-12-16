import React from "react";
import { motion, SVGMotionProps } from "framer-motion";
import type { Variants } from "framer-motion";
import type {
  BaseAnimationProps,
  SupportedMotionTags,
} from "../Animation.types";
import { useEmergeVariants } from "./hooks";
import { EMERGE_PRESETS } from "../Animation.configuration";

/**
 * Emerge component
 * Animates children to expand/collapse from a center index using Framer Motion.
 * Supports HTML and SVG tags (including clipPath and mask).
 */

type EmergeAnimation = keyof typeof EMERGE_PRESETS;

export type EmergeProps = Omit<
  BaseAnimationProps<SupportedMotionTags>,
  "delay"
> & {
  animation?: EmergeAnimation;
  centerIndex?: number;
};

export const Emerge = ({
  open,
  children,
  as: Tag = "div",
  className,
  animation = "fast",
  centerIndex = 0,
  onExitComplete,
  onEnterComplete,
  style,
  ...props
}: EmergeProps) => {
  const items = Array.isArray(children) ? children : [children];
  const isClipPath = Tag === "clipPath";

  const { stagger } = EMERGE_PRESETS[animation];
  const childVariants = useEmergeVariants(animation, centerIndex, items.length);

  const containerVariants: Variants = {
    open: { transition: { staggerChildren: stagger, when: "beforeChildren" } },
    closed: { transition: { staggerChildren: stagger, staggerDirection: -1 } },
  };

  const AnimationContainer = motion[Tag];

  if (isClipPath) {
    return (
      <AnimationClipPath
        {...(props as SafeClipPathProps)}
        clipPathUnits="userSpaceOnUse"
        initial="closed"
        animate={open ? "open" : "closed"}
        variants={containerVariants}
      >
        {items.map((child, i) => (
          <motion.path
            key={i}
            d={(child as React.ReactElement).props.d}
            variants={childVariants}
            custom={i}
            onAnimationComplete={() => {
              if (open && i === items.length - 1) onEnterComplete?.();
              if (!open && i === items.length - 1) onExitComplete?.();
            }}
          />
        ))}
      </AnimationClipPath>
    );
  }

  const AnimationChild =
    Tag === "ul"
      ? motion.li
      : Tag === "svg" || Tag === "g" || Tag === "defs"
        ? motion.g
        : motion.div;

  return (
    <AnimationContainer
      className={className}
      initial="closed"
      animate={open ? "open" : "closed"}
      aria-hidden={!open}
      variants={containerVariants}
      style={style}
    >
      {items.map((child, i) => (
        <AnimationChild
          key={i}
          variants={childVariants}
          custom={i}
          onAnimationComplete={() => {
            if (open && i === items.length - 1) onEnterComplete?.();
            if (!open && i === items.length - 1) onExitComplete?.();
          }}
        >
          {child}
        </AnimationChild>
      ))}
    </AnimationContainer>
  );
};

type SafeClipPathProps = Omit<
  SVGMotionProps<SVGClipPathElement>,
  "onAnimationStart" | "onAnimationComplete" | "onUpdate"
> & {
  onAnimationStart?: () => void;
  onAnimationComplete?: () => void;
  onUpdate?: () => void;
};

export const AnimationClipPath = React.forwardRef<
  SVGClipPathElement,
  SafeClipPathProps
>((props, ref) => {
  const Motion = motion.clipPath;
  return <Motion ref={ref} {...props} />;
});
