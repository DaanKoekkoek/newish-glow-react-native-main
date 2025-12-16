import { resolveThemePrimitives } from "_theming/index";
import type { OdidoPalette, BreakpointKeys } from "_theming/index";
import { createStyleSheet, UnistylesRuntime } from "react-native-unistyles";

export const stylesheetHorizontal = createStyleSheet(
  ({
    themes: {
      components: { progressIndicators },
    },
  }) => ({
    container: {
      flexDirection: "row",
      justifyContent: "center",
      gap: progressIndicators.gap.horizontal.sm,
      paddingHorizontal: {
        mobileSmall: 0,
        laptop:
          progressIndicators.horizontalStepper.v1.padding.horizontal.desktop,
      },
    },
    containerMinHeight: (breakpoint: BreakpointKeys, wrapperHeight: number) => {
      return {
        minHeight:
          progressIndicators.atoms.responsiveMarker.size.marker.active[
            breakpoint
          ] + wrapperHeight,
      };
    },
    stepperStepContainer: {
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      variants: {
        size: {
          default: {},
          small: {},
          large: {},
        },
        status: {
          default: {},
          active: {},
          completed: {},
          inactive: {},
        },
      },
    },
    labelWrapper: {
      position: "absolute",
      top: "100%",
      width: progressIndicators.atoms.horizontalStep.size.title.maxWidth,
      maxWidth: progressIndicators.atoms.horizontalStep.size.title.maxWidth,
      minWidth: progressIndicators.atoms.horizontalStep.size.title.minWidth,
      variants: {
        size: {
          small: {
            marginTop: progressIndicators.gap.vertical.sm,
          },
          default: {
            marginTop: progressIndicators.gap.vertical.default,
          },
        },
      },
    },
    label: {
      variants: {
        status: {
          default: {
            color: progressIndicators.color.text.default,
          },
          active: {
            color: progressIndicators.color.text.active,
          },
          inactive: {
            color: progressIndicators.color.text.inactive,
          },
          completed: {
            color: progressIndicators.color.text.completed,
          },
        },
      },
    },
    compoundStyleWithPalette: (palette: OdidoPalette) => {
      return resolveThemePrimitives({
        value: progressIndicators.atoms.inPageMarker.color.background.inactive,
        property: "backgroundColor",
        themeName: UnistylesRuntime.themeName,
        selectedVariant: palette ? palette : "blue",
      });
    },
  }),
);
