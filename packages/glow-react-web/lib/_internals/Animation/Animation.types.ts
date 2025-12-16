import { SUPPORTED_MOTION_TAGS } from "./Animation.configuration";

export type SupportedMotionTags = (typeof SUPPORTED_MOTION_TAGS)[number];

export type BaseAnimationProps<T extends SupportedMotionTags> =
  React.ComponentPropsWithoutRef<T> & {
    open: boolean;
    children: React.ReactNode;
    className?: string;
    delay?: number;
    as?: T;
    onExitComplete?: () => void;
    onEnterComplete?: () => void;
  };
