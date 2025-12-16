import { tokens } from "@odido-portals/glow-tokens/odido/light/unistyles";

export const breakpoints = {
  ...tokens.screenSizes.grid.minWidth,
  mobileSmall: 0,
} as const;

export type BreakpointKeys = keyof typeof breakpoints;
export type BreakpointsProp = {
  [key in BreakpointKeys]: number;
};

export const breakpointsArray = Object.keys(breakpoints)
  .sort(
    (a, b) =>
      breakpoints[a as BreakpointKeys] - breakpoints[b as BreakpointKeys],
  )
  .map((key) => key as BreakpointKeys);
