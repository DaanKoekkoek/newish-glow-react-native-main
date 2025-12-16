import type { BreakpointKeys } from "_theming/breakpoints";
import { createStyleSheet } from "react-native-unistyles";

import type {
  FluidPerBreakpoint,
  GridDirectionPerBreakpoint,
  GridVariant,
  RequiredColumnBreakpoints,
} from "./Grid.types";

export const gridStyles = createStyleSheet(
  ({
    screenSizes: {
      grid,
      responsive: {
        section: { row },
      },
    },
  }) => ({
    container: {
      rowGap: grid.gap,
      alignItems: "center",
    },
    containerPadding: (breakpoint: BreakpointKeys) => {
      return {
        paddingHorizontal: grid.margin[breakpoint] - grid.gap[breakpoint] / 2,
      };
    },
    grid: {
      width: "100%",
      flexGrow: 1,
      rowGap: grid.gap,
    },
    gridMaxWidth: (
      variant: GridVariant,
      breakpoint: BreakpointKeys,
      screenWidth: number,
      fluidPerBreakpoint?: FluidPerBreakpoint,
    ) => {
      if (fluidPerBreakpoint && fluidPerBreakpoint[breakpoint]) {
        return {
          maxWidth: screenWidth,
        };
      }

      return {
        maxWidth: row[variant][breakpoint] + grid.gap[breakpoint],
      };
    },
    gridFluid: (
      fluidPerBreakpoint: FluidPerBreakpoint,
      breakpoint: BreakpointKeys,
    ) => {
      return {
        maxWidth: fluidPerBreakpoint[breakpoint] ? "100%" : undefined,
      };
    },
    gridColumnDirection: (
      direction: GridDirectionPerBreakpoint,
      breakpoint: BreakpointKeys,
    ) => {
      return {
        flexDirection: direction[breakpoint],
        flexWrap:
          direction[breakpoint] === "row-reverse" ? "wrap-reverse" : "wrap",
      };
    },
    column: {
      flexGrow: 1,
      flexShrink: 1,
      flexBasis: "auto",
    },
    columnMaxWidth: (
      columns: RequiredColumnBreakpoints,
      breakpoint: BreakpointKeys,
    ) => {
      const columnMaxWidth = columns[breakpoint];

      return {
        flexBasis: `${(columnMaxWidth / 12) * 100}%`,
        maxWidth: `${(columnMaxWidth / 12) * 100}%`,
      };
    },
    columnGap: (breakpoint: BreakpointKeys) => {
      return {
        paddingHorizontal: grid.gap[breakpoint] / 2,
      };
    },
  }),
);
