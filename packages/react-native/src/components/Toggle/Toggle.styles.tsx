import { resolveThemePrimitives } from "_theming/resolveThemePrimitives";
import { createStyleSheet, UnistylesRuntime } from "react-native-unistyles";

const version = "v1";

export const toggleStyles = createStyleSheet(
  ({
    themes: {
      components: {
        input: {
          toggle: { [version]: toggle },
        },
      },
    },
  }) => ({
    wrapper: {
      alignItems: "flex-start",
    },
    container: {
      flexDirection: "row",
      alignItems: "center",
      gap: toggle.padding.default,
    },
    toggle: {
      overflow: "hidden",
      borderRadius: toggle.radius,
      variants: {
        size: {
          xl: {
            width: toggle.size.background.width.xl,
            height: toggle.size.knob.xl + toggle.padding.xl * 2,
            padding: toggle.padding.xl,
            borderWidth: toggle.borderWidth.xl,
          },
          lg: {
            width: toggle.size.background.width.lg,
            height: toggle.size.knob.lg + toggle.padding.lg * 2,
            padding: toggle.padding.lg,
            borderWidth: toggle.borderWidth.lg,
          },
          default: {
            width: toggle.size.background.width.default,
            height: toggle.size.knob.default + toggle.padding.default * 2,
            padding: toggle.padding.default,
            borderWidth: toggle.borderWidth.default,
          },
        },
      },
    },
    toggleBackground: (
      isSelected: boolean,
      hovered: boolean,
      inactive: boolean,
    ) => {
      return resolveThemePrimitives({
        value:
          toggle.color.background[isSelected ? "selected" : "unselected"][
            hovered && !inactive ? "hover" : inactive ? "inactive" : "default"
          ],
        property: "backgroundColor",
        themeName: UnistylesRuntime.themeName,
      });
    },
    knob: {
      variants: {
        size: {
          xl: {
            width: toggle.size.knob.xl,
            height: toggle.size.knob.xl,
            borderRadius: toggle.size.knob.xl,
          },
          lg: {
            width: toggle.size.knob.lg,
            height: toggle.size.knob.lg,
            borderRadius: toggle.size.knob.lg,
          },
          default: {
            width: toggle.size.knob.default,
            height: toggle.size.knob.default,
            borderRadius: toggle.size.knob.default,
          },
        },
      },
    },
    knobBackground: (
      isSelected: boolean,
      hovered: boolean,
      inactive: boolean,
    ) => {
      return {
        backgroundColor:
          toggle.color.knob[isSelected ? "selected" : "unselected"][
            hovered && !inactive ? "hover" : inactive ? "inactive" : "default"
          ],
      };
    },
    gradientPosition: {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      position: "absolute",
      pointerEvents: "none",
    },
    gradientSize: {
      position: "absolute",
      flex: 1,
      width: "100%",
      height: "100%",
    },
    marginRight: {
      marginRight: -toggle.padding.xl,
    },
    toggleText: {
      userSelect: "none",
      right: 0,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      zIndex: 1,
      variants: {
        size: {
          xl: {
            top: toggle.padding.xl,
            width: toggle.size.knob.xl,
            height: toggle.size.knob.xl,
            right: toggle.padding.xl,
          },
        },
      },
    },
    toggleTextOn: {
      color: toggle.color.text.selected.default,
      variants: {
        inactive: {
          true: {
            color: toggle.color.text.selected.inactive,
          },
        },
      },
    },
    toggleTextOff: {
      variants: {
        inactive: {
          true: {
            color: toggle.color.text.unselected.inactive,
          },
          false: {
            color: toggle.color.text.unselected.default,
          },
        },
      },
    },
  }),
);
