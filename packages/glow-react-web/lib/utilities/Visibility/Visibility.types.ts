import type { BreakpointKey } from "_theming/breakpoints";

export type VisibilityProps = {
  as?: keyof JSX.IntrinsicElements | React.ElementType;
  children: React.ReactNode;
  above?: BreakpointKey;
  below?: BreakpointKey;
  only?: BreakpointKey;
  className?: string;
  testID?: string;
} & (
  | { above: BreakpointKey; below?: never; only?: never }
  | { below: BreakpointKey; above?: never; only?: never }
  | { only: BreakpointKey; above?: never; below?: never }
);
