export const breakpointsArray: BreakpointKey[] = [
  "mobileSmall",
  "mobile",
  "tablet",
  "laptop",
  "desktop",
];

export const breakpoints = {
  desktop: 1440,
  laptop: 960,
  tablet: 530,
  mobile: 360,
  mobileSmall: 0,
} as const;

export const breakpointsMaxWidth = {
  desktop: 9999,
  laptop: 1439,
  tablet: 959,
  mobile: 529,
  mobileSmall: 359,
} as const;

export type BreakpointKey = keyof typeof breakpoints;
export type BreakpointsProp = {
  [key in BreakpointKey]: number;
};
