import React, { useRef } from "react";
import { motion } from "framer-motion";
import { useFollowerPosition, useOptionalSpring } from "./hooks";
import type {
  SupportedMotionTags,
  BaseAnimationProps,
} from "../Animation.types";
import { FOLLOWER_PRESETS } from "../Animation.configuration";

/**
 * Follower component: smoothly follows a target element (e.g., a slider thumb or button)
 * along the horizontal axis. Uses framer-motion to optionally animate movement with spring physics.
 * Supports configurable horizontal (`offsetX`) and vertical (`offsetY`) offsets, as well as
 * preset spring configurations via FOLLOWER_PRESETS. Can render as any supported HTML or SVG tag.
 */

type FollowerProps<T extends SupportedMotionTags = "div"> = Omit<
  BaseAnimationProps<T>,
  "open"
> & {
  targetRef: React.RefObject<HTMLElement>;
  containerRef: React.RefObject<HTMLDivElement | HTMLLabelElement>;
  offsetX?: number;
  offsetY?: number;
  spring?: boolean;
  preset?: keyof typeof FOLLOWER_PRESETS;
  edgeDelay?: number;
  useRAF?: boolean;
};

export function Follower({
  targetRef,
  containerRef,
  as: Tag = "div",
  offsetY = 0,
  offsetX = 0,
  spring = false,
  preset = "medium",
  children,
  className,
  useRAF = false,
}: FollowerProps) {
  const AnimationContainer = motion[Tag];

  const followerRef = useRef<HTMLDivElement>(null);
  const { x, y } = useFollowerPosition(
    targetRef,
    followerRef,
    containerRef,
    offsetX,
    offsetY,
    useRAF,
  );

  const springX = useOptionalSpring(x, spring, preset);
  const springY = useOptionalSpring(y, spring, preset);

  return (
    <AnimationContainer
      ref={followerRef}
      className={className}
      style={{
        x: springX,
        y: springY,
      }}
    >
      {children}
    </AnimationContainer>
  );
}
