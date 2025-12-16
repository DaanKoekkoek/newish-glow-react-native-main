import { StyleSheet } from "react-native";
import { createStyleSheet } from "react-native-unistyles";

export const pillStyles = createStyleSheet(
  ({
    themes: {
      components: { selector },
      semantics: { color },
    },
  }) => ({
    container: {
      alignSelf: "flex-start",
    },
    content: {
      paddingVertical: selector.pill.v1.padding.vertical.default,
      paddingHorizontal: selector.pill.v1.padding.horizontal.default,
      borderRadius: selector.pill.v1.radius.default,
    },
    border: {
      ...StyleSheet.absoluteFillObject,
      borderRadius: selector.pill.v1.radius.default,
      backgroundColor: selector.color.border.default,
      variants: {
        hovered: {
          true: {
            backgroundColor: selector.color.border.hover,
          },
        },
        selectedSwitch: {
          true: {
            backgroundColor: selector.color.border.selected.default,
          },
        },
        selectedAndHoveredSwitch: {
          true: {
            backgroundColor: selector.color.border.selected.hover,
          },
        },
        disabled: {
          true: {
            backgroundColor: selector.color.border.inactive,
          },
        },
        selectedAndDisabled: {
          true: {
            backgroundColor: selector.color.border.selected.inactive,
          },
        },
      },
    },
    background: {
      ...StyleSheet.absoluteFillObject,
      borderRadius: selector.pill.v1.radius.default,
      margin: selector.borderWidth.default,
      backgroundColor: selector.color.background.default,
      variants: {
        hovered: {
          true: {
            margin: selector.borderWidth.hover,
          },
        },
        selected: {
          true: {
            margin: selector.borderWidth.selected.default,
          },
        },
        disabled: {
          true: {
            margin: selector.borderWidth.inactive,
            backgroundColor: selector.color.background.inactive,
          },
        },
        selectedAndDisabled: {
          true: {
            margin: selector.borderWidth.selected.inactive,
            backgroundColor: selector.color.background.inactive,
          },
        },
      },
    },
    label: {
      flexDirection: "row",
      flexWrap: "wrap",
      flexShrink: 1,
      fontSize: selector.typography.fontSize.title.default,
      lineHeight: selector.typography.lineHeight.title.default,
      letterSpacing: selector.typography.letterSpacing.title.default,
      variants: {
        disabled: {
          true: {
            color: selector.color.text.inactive,
            pointerEvents: "none",
          },
        },
      },
    },
    brandContainer: {
      height: selector.pill.v1.size.logo.height.default,
    },
  }),
);
