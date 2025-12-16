import type { BreakpointKeys } from "_theming/index";
import { resolveThemePrimitives } from "_theming/resolveThemePrimitives";
import type { OdidoPalette } from "_theming/tokenLoader";
import { createStyleSheet, UnistylesRuntime } from "react-native-unistyles";

export const stylesheetAtoms = createStyleSheet(
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
    activeMarkerBodyPosition: (breakpoint: BreakpointKeys) => {
      return {
        left: progressIndicators.atoms.responsiveMarker.borderWidth.active[
          breakpoint
        ],
        top: progressIndicators.atoms.responsiveMarker.borderWidth.active[
          breakpoint
        ],
        width:
          progressIndicators.atoms.responsiveMarker.size.marker.active[
            breakpoint
          ] -
          progressIndicators.atoms.responsiveMarker.borderWidth.active[
            breakpoint
          ] *
            2,
        height:
          progressIndicators.atoms.responsiveMarker.size.marker.active[
            breakpoint
          ] -
          progressIndicators.atoms.responsiveMarker.borderWidth.active[
            breakpoint
          ] *
            2,
      };
    },
    markerGradient: {
      position: "relative",
      overflow: "hidden",
      width: progressIndicators.atoms.responsiveMarker.size.marker.active,
      height: progressIndicators.atoms.responsiveMarker.size.marker.active,
      borderRadius: 100,
    },
    markerGradientBody: {
      position: "absolute",
      zIndex: 2,
      borderRadius: 100,
      backgroundColor:
        progressIndicators.atoms.responsiveMarker.color.background.active,
    },
    markerBorder: {
      flexDirection: "row",
      alignItems: "center",
      alignContent: "center",
      justifyContent: "center",
      borderRadius: 100,
      variants: {
        status: {
          default: {
            backgroundColor:
              progressIndicators.atoms.responsiveMarker.color.background
                .default,
            width:
              progressIndicators.atoms.responsiveMarker.size.marker.default,
            height:
              progressIndicators.atoms.responsiveMarker.size.marker.default,
          },
          active: {
            backgroundColor:
              progressIndicators.atoms.responsiveMarker.color.background
                .completed,
            width: 30,
            height: 30,
          },
          completed: {
            backgroundColor:
              progressIndicators.atoms.responsiveMarker.color.background
                .completed,
            width:
              progressIndicators.atoms.responsiveMarker.size.marker.completed,
            height:
              progressIndicators.atoms.responsiveMarker.size.marker.completed,
          },
          inactive: {
            backgroundColor:
              progressIndicators.atoms.responsiveMarker.color.background
                .inactive,
            width:
              progressIndicators.atoms.responsiveMarker.size.marker.inactive,
            height:
              progressIndicators.atoms.responsiveMarker.size.marker.inactive,
          },
        },
      },
    },
    markerBody: {
      alignItems: "center",
      alignContent: "center",
      justifyContent: "center",
      borderRadius: 100,
      zIndex: 3,
      variants: {
        status: {
          default: {
            backgroundColor:
              progressIndicators.atoms.responsiveMarker.color.background
                .default,
            width:
              progressIndicators.atoms.responsiveMarker.size.marker.default,
            height:
              progressIndicators.atoms.responsiveMarker.size.marker.default,
          },
          active: {
            backgroundColor:
              progressIndicators.atoms.responsiveMarker.color.background.active,
          },
          completed: {
            backgroundColor:
              progressIndicators.atoms.responsiveMarker.color.background
                .completed,
            width:
              progressIndicators.atoms.responsiveMarker.size.marker.completed,
            height:
              progressIndicators.atoms.responsiveMarker.size.marker.completed,
          },
          inactive: {
            width:
              progressIndicators.atoms.responsiveMarker.size.marker.inactive,
            height:
              progressIndicators.atoms.responsiveMarker.size.marker.inactive,
          },
        },
      },
    },
    markerText: {
      alignItems: "center",
      alignContent: "center",
      justifyContent: "center",
      verticalAlign: "middle",
      flex: 1,
      variants: {
        size: {
          default: {
            fontSize:
              progressIndicators.atoms.responsiveMarker.typography.number
                .fontSize.mobile,
            lineHeight:
              progressIndicators.atoms.responsiveMarker.typography.number
                .lineHeight.mobile,
            letterSpacing:
              progressIndicators.atoms.responsiveMarker.typography.number
                .letterSpacing.mobile,
            paddingVertical: 5,
          },
          large: {
            fontSize:
              progressIndicators.atoms.responsiveMarker.typography.number
                .fontSize.desktop,
            lineHeight:
              progressIndicators.atoms.responsiveMarker.typography.number
                .lineHeight.desktop,
            letterSpacing:
              progressIndicators.atoms.responsiveMarker.typography.number
                .letterSpacing.desktop,
          },
        },
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
        },
      },
    },
    space: {
      position: "relative",
      overflow: "hidden",
      alignItems: "center",
      alignContent: "center",
      justifyContent: "center",
      flexDirection: "row",
      flex: 1,
      variants: {
        direction: {
          default: {
            maxWidth:
              progressIndicators.atoms.horizontalStep.size.line.maxWidth,
            minWidth:
              progressIndicators.atoms.horizontalStep.size.line.minWidth,
            flexDirection: "row",
            zIndex: -1,
          },
          vertical: {
            width: "100%",
            height: "100%",
            maxHeight: "100%",
            maxWidth: "100%",
          },
        },
      },
    },
    spacerMinHeight: (breakpoint: BreakpointKeys, wrapperHeight: number) => {
      return {
        minHeight:
          wrapperHeight -
          progressIndicators.atoms.responsiveMarker.size.marker.default[
            breakpoint
          ] *
            2,
      };
    },
    svg: {
      position: "absolute",
      variants: {
        direction: {
          vertical: {
            height: "100%",
            maxHeight: "100%",
          },
        },
      },
    },
    dots: {
      borderColor: progressIndicators.atoms.line.color.border.incomplete,
    },
    dotsActive: {
      borderColor: progressIndicators.atoms.line.color.border.completed,
    },
    iconCompleted: {
      color: "#FFF", // TODO: This token seems incorrect (gray on light mode, correct in dark mode): progressIndicators.color.text.completed,
      display: "flex",
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
