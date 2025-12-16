import { BreakpointValues } from "./types";

export const generateClassNames = <T>(
  propName: string,
  breakpoints: Partial<BreakpointValues<T>>,
) =>
  Object.entries(breakpoints).map(
    ([breakpoint, value]) =>
      `${propName}-${value}${breakpoint === "mobileSmall" ? "" : `-${breakpoint}`}`,
  );
