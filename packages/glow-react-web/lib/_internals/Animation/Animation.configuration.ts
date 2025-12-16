/**
 * Animation Presets for Framer Motion
 * -----------------------------------
 * These presets provide consistent timing, easing, and motion styles across components.
 *
 * Common Properties:
 * - duration: Total length of the animation (in seconds).
 * - delay: Time before animation starts (in seconds).
 * - ease: Easing function (cubic-bezier array or named preset).
 * - type: Type of motion ("spring" or "tween").
 * - stiffness: Spring tension — higher = faster, snappier motion.
 * - damping: Spring resistance — higher = less bounce, more controlled.
 * - stagger: Delay between child animations in a staggered group.
 * - spread: Offset distance for emerging elements (e.g. from a center or edge).
 * - exitDuration / exitEase: Control how elements leave the screen.
 * - transformOrigin: Defines where scaling or growth originates (e.g. "top", "center").
 * - initial / animate / exit: Motion states for scale, position, or opacity.
 * - closedDuration: Used for spring-based exit transitions (how long to settle).
 *
 * Preset Categories:
 * - EMERGE_PRESETS: Controls staggered “enter” animations (like fade-up or slide-in).
 * - FADE_PRESETS: Simple fade in/out transitions.
 * - FOLLOWER_PRESETS: Follows a certain element's position.
 * - GROW_PRESETS: Scale or expansion-based animations using spring physics.
 * - MORPH_PRESETS: Morphs an svg-shape based on position on start, middle and end.
 * - SCALE_PRESETS: Combined scaling and positional animations.
 * - STAGGER_PRESETS: Configures staggered child animation timing and spring dynamics.
 * - SLIDE_PRESETS: Horizontal/vertical sliding animations with varied spring speeds.
 *
 * Tip: Use “gentle” for subtle UI transitions, “medium” for standard timing,
 * and “fast” for quick feedback or microinteractions.
 */

export const EMERGE_PRESETS = {
  gentle: {
    spread: 20,
    stagger: 0.08,
    duration: 1.0,
    exitDuration: 0.7,
    ease: [0, 0, 0.15, 1],
    exitEase: [0.4, 0, 1, 1],
  },
  medium: {
    spread: 28,
    stagger: 0.06,
    duration: 0.85,
    exitDuration: 0.6,
    ease: [0, 0, 0.3, 1],
    exitEase: [0.45, 0, 1, 1],
  },
  fast: {
    spread: 36,
    stagger: 0.03,
    duration: 0.6,
    exitDuration: 0.6,
    ease: [0.3, 0, 0.1, 1],
    exitEase: [0.6, 0, 0.4, 1],
  },
} as const;

export const FADE_PRESETS = {
  gentle: { duration: 0.5, delay: 0.1 },
  medium: { duration: 0.35, delay: 0.05 },
  fast: { duration: 0.2, delay: 0 },
} as const;

export const FOLLOWER_PRESETS = {
  gentle: {
    type: "spring",
    stiffness: 300,
    damping: 25,
    duration: 0.6,
  },
  medium: {
    type: "spring",
    stiffness: 400,
    damping: 30,
    duration: 0.45,
  },
  fast: {
    type: "spring",
    stiffness: 500,
    damping: 35,
    duration: 0.35,
  },
} as const;

export const GROW_PRESETS = {
  gentle: {
    type: "spring",
    stiffness: 180,
    damping: 20,
    duration: 0.6,
    transformOrigin: "top",
  },
  medium: {
    type: "spring",
    stiffness: 220,
    damping: 25,
    duration: 0.5,
    transformOrigin: "top",
  },
  fast: {
    type: "spring",
    stiffness: 280,
    damping: 30,
    duration: 0.4,
    transformOrigin: "top",
  },
} as const;

export const MORPH_PRESETS = {
  slow: { stiffness: 100, damping: 25 },
  gentle: { stiffness: 200, damping: 20 },
  medium: { stiffness: 300, damping: 25 },
  fast: { stiffness: 400, damping: 30 },
} as const;

export const SCALE_PRESETS = {
  gentle: {
    duration: 0.5,
    ease: [0.55, 0, 0.1, 1],
    initial: { scale: 0.8, x: 0, y: 0 },
    animate: { scale: 1, x: 0, y: 0 },
    exit: { scale: 0.8, x: 0, y: 0 },
  },
  fast: {
    duration: 0.3,
    ease: [0.75, 0, 0.25, 1],
    initial: { scale: 0.6, x: 0, y: 0 },
    animate: { scale: 1, x: 0, y: 0 },
    exit: { scale: 0.6, x: 0, y: 0 },
  },
} as const;

export const STAGGER_PRESETS = {
  gentle: {
    stagger: 0.08,
    delay: 0.06,
    duration: 0.55,
    child: {
      type: "spring",
      stiffness: 160,
      damping: 28,
      closedDuration: 0.2,
    },
  },
  medium: {
    stagger: 0.06,
    delay: 0.04,
    duration: 0.45,
    child: {
      type: "spring",
      stiffness: 200,
      damping: 30,
      closedDuration: 0.18,
    },
  },
  fast: {
    stagger: 0.03,
    delay: 0,
    duration: 0.35,
    child: {
      type: "spring",
      stiffness: 240,
      damping: 32,
      closedDuration: 0.15,
    },
  },
} as const;

export const SLIDE_PRESETS = {
  slow: { type: "spring", stiffness: 300, damping: 30, duration: 1.2 },
  gentle: { type: "spring", stiffness: 400, damping: 40, duration: 0.8 },
  medium: { type: "spring", stiffness: 500, damping: 50, duration: 0.5 },
  fast: { type: "spring", stiffness: 600, damping: 60, duration: 0.35 },
} as const;

export const SUPPORTED_MOTION_TAGS = [
  "div",
  "section",
  "nav",
  "ul",
  "li",
  "span",
  "svg",
  "defs",
  "g",
  "clipPath",
  "mask",
] as const;
