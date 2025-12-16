import { resolveThemePrimitives } from "_theming/resolveThemePrimitives";
import type { OdidoPalette } from "_theming/tokenLoader";
import { createStyleSheet, UnistylesRuntime } from "react-native-unistyles";

const version = "v1";

export const stylesheetInpage = createStyleSheet(
  ({
    themes: {
      components: {
        progressIndicators,
        progressIndicators: {
          inPageStepper: { [version]: inPageStepper },
        },
      },
    },
  }) => ({
    container: {
      flexDirection: "column",
      width: "100%",
      gap: inPageStepper.gap.vertical,
    },
    stepperStepContainer: {
      flexDirection: "column",
      gap: inPageStepper.gap.vertical,
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
      flexDirection: "row",
      alignItems: "center",
      gap: inPageStepper.gap.horizontal,
      marginTop: 0,
    },
    label: {
      alignContent: "center",
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
    space: {
      overflow: "hidden",
      gap: 4,
      flex: 1,
      flexWrap: "nowrap",
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
      maxWidth: progressIndicators.atoms.horizontalStep.size.line.maxWidth,
      minWidth: progressIndicators.atoms.horizontalStep.size.line.minWidth,
      flexDirection: "row",
      zIndex: -1,
    },
    dots: {
      borderColor: progressIndicators.atoms.line.color.border.incomplete,
    },
    dotsActive: {
      borderColor: progressIndicators.atoms.line.color.border.completed,
    },
    markerWrapper: {
      position: "relative",
      alignItems: "center",
      justifyContent: "center",
    },
    markerBorder: {
      position: "relative",
      overflow: "hidden",
      flexDirection: "row",
      alignItems: "center",
      alignContent: "center",
      justifyContent: "center",
      borderRadius: 100,
      width: progressIndicators.atoms.inPageMarker.size.marker.default,
      height: progressIndicators.atoms.inPageMarker.size.marker.default,
      variants: {
        status: {
          default: {},
          active: {},
          completed: {
            backgroundColor:
              progressIndicators.atoms.inPageMarker.color.background.completed,
          },
          inactive: {
            backgroundColor:
              progressIndicators.atoms.inPageMarker.color.background.inactive,
            color: progressIndicators.color.text.inactive,
          },
        },
      },
    },
    activeMarkerBody: {
      position: "absolute",
    },
    markerBody: {
      alignItems: "center",
      alignContent: "center",
      justifyContent: "center",
      borderRadius: 100,
      zIndex: 3,
      width:
        progressIndicators.atoms.inPageMarker.size.marker.default -
        progressIndicators.atoms.inPageMarker.padding.vertical,
      height:
        progressIndicators.atoms.inPageMarker.size.marker.default -
        progressIndicators.atoms.inPageMarker.padding.vertical,
      variants: {
        status: {
          default: {
            backgroundColor:
              progressIndicators.atoms.responsiveMarker.color.background
                .default,
          },
          active: {
            backgroundColor:
              progressIndicators.atoms.responsiveMarker.color.background.active,
          },
          completed: {
            backgroundColor:
              progressIndicators.atoms.responsiveMarker.color.background
                .completed,
          },
          inactive: {},
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
    iconCompleted: {
      color: progressIndicators.atoms.responsiveMarker.color.icon.completed,
      display: "flex",
    },
    button: {
      variants: {
        status: {
          active: {
            maxWidth: inPageStepper.maxWidth.button,
            alignSelf: {
              mobileSmall: "stretch",
              mobile: "stretch",
              tablet: "flex-end",
              laptop: "flex-end",
              desktop: "flex-end",
            },
          },
        },
      },
    },
    diverder: {
      paddingTop: progressIndicators.inPageStepper.v1.padding.divider.top,
    },
    heading: {
      display: "flex",
      flex: 1,
      alignContent: "flex-start",
      alignItems: "center",
      flexDirection: "row",
      flexWrap: "wrap",
      rowGap: inPageStepper.gap.horizontal / 2,
      columnGap: inPageStepper.gap.horizontal,
    },
    headingText: {
      maxWidth: inPageStepper.maxWidth.title,
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
    compoundStyleWithPaletteDefault: (palette: OdidoPalette) => {
      return resolveThemePrimitives({
        value: progressIndicators.atoms.inPageMarker.color.border.default,
        property: "backgroundColor",
        themeName: UnistylesRuntime.themeName,
        selectedVariant: palette ? palette : "blue",
      });
    },
    compoundStyleWithPaletteInactive: (palette: OdidoPalette) => {
      return resolveThemePrimitives({
        value: progressIndicators.atoms.inPageMarker.color.background.inactive,
        property: "backgroundColor",
        themeName: UnistylesRuntime.themeName,
        selectedVariant: palette ? palette : "blue",
      });
    },
  }),
);
