export type Breakpoint =
  | "mobileSmall"
  | "mobile"
  | "tablet"
  | "laptop"
  | "desktop";

export const singleToAllBreakpoints = (prop: unknown) => {
  return typeof prop === "string" ||
    typeof prop === "number" ||
    typeof prop === "boolean"
    ? {
        mobileSmall: prop,
        mobile: prop,
        tablet: prop,
        laptop: prop,
        desktop: prop,
      }
    : prop;
};

export const processBreakpoints = (prop: any) => {
  const breakpoints: Breakpoint[] = [
    "mobileSmall",
    "mobile",
    "tablet",
    "laptop",
    "desktop",
  ];
  const processedProp: Record<Breakpoint, any> = {
    mobileSmall: undefined,
    mobile: undefined,
    tablet: undefined,
    laptop: undefined,
    desktop: undefined,
  };

  for (const breakpoint of breakpoints) {
    if (prop[breakpoint] !== undefined) {
      processedProp[breakpoint] = prop[breakpoint];
    } else if (
      Object.keys(processedProp).some(
        (key) => processedProp[key as Breakpoint] !== undefined,
      )
    ) {
      processedProp[breakpoint] =
        processedProp[
          breakpoints[
            Object.keys(processedProp).lastIndexOf(breakpoint) - 1
          ] as Breakpoint
        ];
    }
  }

  return processedProp;
};
