import { createStyleSheet } from "react-native-unistyles";

export const stylesheetVertical = createStyleSheet(
  ({
    themes: {
      components: { progressIndicators },
    },
  }) => ({
    container: {
      flexDirection: "column",
      width: "100%",
      gap: progressIndicators.gap.vertical.sm,
    },
    stepperStepContainer: {
      flexDirection: "row",
      gap: progressIndicators.gap.horizontal.sm,
      minHeight: progressIndicators.atoms.verticalStep.size.minHeight,
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
    stepperStepColLeft: {
      flexDirection: "column",
      alignItems: "center",
      alignSelf: "stretch",
      gap: progressIndicators.gap.vertical.sm,
      width: progressIndicators.atoms.responsiveMarker.size.marker.active,
      paddingTop: progressIndicators.atoms.verticalStep.padding.top.default,
      paddingHorizontal:
        progressIndicators.atoms.verticalStep.padding.text.horizontal,
      minHeight: progressIndicators.atoms.verticalStep.size.minHeight,
      variants: {
        status: {
          default: {},
          active: {
            paddingTop: 0,
            paddingHorizontal: 0,
          },
          completed: {},
          inactive: {},
        },
      },
    },
    stepperStepColRight: {
      flexDirection: "column",
      gap: progressIndicators.gap.vertical.default,
      paddingVertical:
        progressIndicators.atoms.verticalStep.padding.text.vertical,
      paddingHorizontal:
        progressIndicators.atoms.verticalStep.padding.text.horizontal,
      flex: 1,
    },
    stepContentContainer: {
      flexDirection: "column",
      rowGap: progressIndicators.gap.vertical.default,
      columnGap: progressIndicators.gap.horizontal.default,
      flex: 1,
    },
    labelWrapper: {
      flexDirection: "row",
      alignItems: "center",
      gap: progressIndicators.gap.horizontal.default,
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
    directionColumn: {
      flexDirection: "column",
    },
    directionRow: {
      flexDirection: "row",
    },
    flexEnd: {
      justifyContent: "flex-end",
      marginLeft: "auto",
    },
  }),
);
