import { createStyleSheet } from "react-native-unistyles";

import type {
  ButtonSize,
  ButtonProminence,
  ButtonState,
  ButtonStyle,
} from "./Button.types";

const version = "v1";

export const buttonStyles = createStyleSheet(
  ({
    themes: {
      components: {
        button: {
          button: { [version]: button },
        },
      },
    },
  }) => ({
    stretchedButton: {
      width: "100%",
      position: "absolute",
      top: 0,
      left: 0,
      bottom: 0,
      zIndex: 0,
    },
    button: {
      variants: {
        fill: {
          false: {
            alignSelf: "flex-start",
          },
        },
        pointerEvents: {
          auto: {
            pointerEvents: "auto",
          },
          none: {
            pointerEvents: "none",
          },
          "box-none": {
            pointerEvents: "box-none",
          },
          "box-only": {
            pointerEvents: "box-only",
          },
        },
      },
    },
    container: {
      alignItems: "center",
      justifyContent: "center",
      borderColor: button.color.border.default.default,
      borderRadius: button.radius.default,
      borderWidth: button.borderWidth.default.default,
      borderStyle: "solid",
      flexDirection: "row",
      gap: button.gap.default,
      paddingHorizontal:
        button.padding.horizontal.default - button.borderWidth.default.default,
      paddingVertical: button.padding.vertical.default,
      variants: {
        prominence: {
          default: {},
          secondary: {
            borderWidth: button.borderWidth.secondary.default,
            paddingHorizontal:
              button.padding.horizontal.default -
              button.borderWidth.secondary.default,
            paddingVertical:
              button.padding.vertical.default -
              button.borderWidth.secondary.default,
          },
          emphasised: {
            borderWidth: button.borderWidth.emphasised.default,
            paddingHorizontal:
              button.padding.horizontal.default -
              button.borderWidth.emphasised.default,
            paddingVertical:
              button.padding.vertical.default -
              button.borderWidth.emphasised.default,
          },
        },
        isIconOnly: {
          true: {
            paddingHorizontal:
              button.padding.iconOnly.horizontal.default -
              button.borderWidth.emphasised.default,
            paddingVertical:
              button.padding.iconOnly.vertical.default -
              button.borderWidth.emphasised.default,
          },
        },
        state: {
          loading: {},
          disabled: {},
          hover: {},
          pressed: {},
        },
        inverted: {
          true: {},
          false: {},
        },
        size: {
          sm: {
            paddingHorizontal:
              button.padding.horizontal.sm - button.borderWidth.default.default,
            paddingVertical:
              button.padding.vertical.sm - button.borderWidth.default.default,
          },
          default: {},
          lg: {
            paddingHorizontal:
              button.padding.horizontal.lg - button.borderWidth.default.default,
            paddingVertical:
              button.padding.vertical.lg - button.borderWidth.default.default,
          },
        },
        loading: {
          true: {
            backgroundColor: button.color.background.default.loading,
          },
          false: {},
        },
        fill: {
          false: {
            alignSelf: "flex-start",
          },
        },
      },
    },
    text: {
      display: "flex",
      variants: {
        size: {
          sm: {
            letterSpacing: button.typography.letterSpacing.sm,
            lineHeight: button.typography.lineHeight.sm,
            fontSize: button.typography.fontSize.sm,
          },
          default: {
            letterSpacing: button.typography.letterSpacing.default,
            lineHeight: button.typography.lineHeight.default,
            fontSize: button.typography.fontSize.default,
          },
          lg: {
            letterSpacing: button.typography.letterSpacing.lg,
            lineHeight: button.typography.lineHeight.lg,
            fontSize: button.typography.fontSize.lg,
          },
        },
      },
    },
    buttonPadding: (
      prominence: ButtonProminence,
      size: ButtonSize,
      isIconOnly: boolean,
    ) => {
      const basePadding: ButtonStyle = {};
      if (prominence === "secondary") {
        basePadding.paddingHorizontal =
          button.padding.horizontal[size] -
          button.borderWidth.secondary.default;
        basePadding.paddingVertical =
          button.padding.vertical[size] - button.borderWidth.secondary.default;
      } else if (isIconOnly) {
        basePadding.paddingHorizontal =
          button.padding.iconOnly.horizontal[size];
        basePadding.paddingVertical = button.padding.iconOnly.vertical[size];
      }

      return basePadding;
    },
    buttonColor: (
      prominence: ButtonProminence,
      inverted: boolean,
      isPressed: boolean,
      state?: ButtonState,
    ) => {
      const baseStyle: ButtonStyle = {};

      if (prominence === "emphasised") {
        if (!inverted) {
          if (isPressed) {
            baseStyle.borderColor = button.color.border.emphasised.pressed;
            baseStyle.borderWidth = button.borderWidth.emphasised.pressed;
          }
        } else if (state !== "disabled") {
          baseStyle.borderWidth = button.borderWidth.emphasised.default;
        }
      } else if (prominence === "secondary") {
        if (inverted) {
          if (state === "loading") {
            baseStyle.borderColor =
              button.color.border.secondary.inverted.loading;
          } else {
            baseStyle.borderWidth =
              button.borderWidth.secondary.inverted.default;
          }
        } else {
          if (isPressed) {
            baseStyle.borderColor = button.color.border.secondary.pressed;
          } else if (state === "loading") {
            baseStyle.borderColor = button.color.border.secondary.loading;
          }
        }
      }

      return baseStyle;
    },
  }),
);
