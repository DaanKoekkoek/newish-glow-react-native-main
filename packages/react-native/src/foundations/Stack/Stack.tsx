import { usePropAcrossBreakpoints } from "_global-hooks";
import type { breakpoints, BreakpointKeys } from "_theming/breakpoints";
import React, { useMemo } from "react";
import { View } from "react-native";
import {
  createStyleSheet,
  useStyles,
  UnistylesRuntime,
} from "react-native-unistyles";

import type {
  StackProps,
  StackDirectionPerBreakpointType,
  StackAlignItemsPerBreakpointType,
  StackWrapPerBreakpointType,
  StackGapPerBreakpointType,
  StackJustifyContentPerBreakpointType,
  StackGapSize,
  StackGapType,
  StackGapPerBreakpointSize,
} from "./Stack.types";

const isGapPreset = (
  value:
    | StackGapType
    | StackGapPerBreakpointType
    | StackGapSize
    | StackGapPerBreakpointSize,
): value is StackGapType => {
  return value === "lg" || value === "sm" || value === "default";
};

export const Stack = ({
  direction = "column",
  gap = "default",
  alignItems = "stretch",
  justifyContent = "flex-start",
  grow = true,
  shrink = true,
  wrap = "nowrap",
  testID = "stack",
  children,
  ...props
}: StackProps) => {
  const breakpoint = UnistylesRuntime.breakpoint as BreakpointKeys;

  const directionValue: StackDirectionPerBreakpointType =
    usePropAcrossBreakpoints(direction);

  const alignItemsValue: StackAlignItemsPerBreakpointType =
    usePropAcrossBreakpoints(alignItems);
  const justifyContentValue: StackJustifyContentPerBreakpointType =
    usePropAcrossBreakpoints(justifyContent);
  const gapValue: StackGapPerBreakpointType | StackGapPerBreakpointSize =
    usePropAcrossBreakpoints(gap);
  const wrapValue: StackWrapPerBreakpointType = usePropAcrossBreakpoints(wrap);
  const growValue = usePropAcrossBreakpoints(grow);
  const shrinkValue = usePropAcrossBreakpoints(shrink);

  const { styles } = useStyles(stylesheet, {
    gapSize: isGapPreset(gap)
      ? gap === "default"
        ? undefined
        : gap
      : undefined,
  });

  const computedStyles = useMemo(
    () => [
      styles.container,
      styles.wrap(wrapValue, breakpoint),
      styles.justifyContent(justifyContentValue, breakpoint),
      styles.alignItems(alignItemsValue, breakpoint),
      !isGapPreset(gap) &&
        styles.gap(gapValue as StackGapPerBreakpointSize, breakpoint),
      styles.grow(growValue, breakpoint),
      { flexShrink: shrinkValue[breakpoint] ? 1 : 0 },
      { flexDirection: directionValue[breakpoint] },
      props.style,
    ],
    [
      styles,
      wrapValue,
      breakpoint,
      justifyContentValue,
      alignItemsValue,
      gap,
      gapValue,
      growValue,
      shrinkValue,
      directionValue,
      props.style,
    ],
  );

  return (
    <View testID={testID} style={computedStyles}>
      {children}
    </View>
  );
};

const stylesheet = createStyleSheet(({ themes }) => ({
  container: {
    variants: {
      gapSize: {
        default: {
          gap: {
            mobileSmall: themes.semantics.gap["200"],
            mobile: themes.semantics.gap["200"],
            tablet: themes.semantics.gap["200"],
            laptop: themes.semantics.gap["300"],
            desktop: themes.semantics.gap["300"],
          },
        },
        lg: {
          gap: {
            mobileSmall: themes.semantics.gap["300"],
            mobile: themes.semantics.gap["300"],
            tablet: themes.semantics.gap["300"],
            laptop: themes.semantics.gap["400"],
            desktop: themes.semantics.gap["400"],
          },
        },
        sm: {
          gap: {
            mobileSmall: themes.semantics.gap["150"],
            mobile: themes.semantics.gap["150"],
            tablet: themes.semantics.gap["150"],
            laptop: themes.semantics.gap["200"],
            desktop: themes.semantics.gap["200"],
          },
        },
      },
    },
  },
  wrap: (
    wrapValue: StackWrapPerBreakpointType,
    breakpoint: BreakpointKeys,
  ) => ({
    flexWrap: wrapValue[breakpoint],
  }),
  alignItems: (
    alignItemsValue: StackAlignItemsPerBreakpointType,
    breakpoint: BreakpointKeys,
  ) => ({
    alignItems: alignItemsValue[breakpoint],
  }),
  justifyContent: (
    justifyContentValue: StackJustifyContentPerBreakpointType,
    breakpoint: BreakpointKeys,
  ) => ({
    justifyContent: justifyContentValue[breakpoint],
  }),
  gap: (gapValue: StackGapPerBreakpointSize, breakpoint: BreakpointKeys) => ({
    gap: gapValue[breakpoint],
  }),
  grow: (
    growValue: { [key in keyof typeof breakpoints]?: boolean },
    breakpoint: BreakpointKeys,
  ) => ({
    width: growValue[breakpoint] ? "100%" : undefined,
    flexGrow: growValue[breakpoint] ? 1 : 0,
  }),
}));
