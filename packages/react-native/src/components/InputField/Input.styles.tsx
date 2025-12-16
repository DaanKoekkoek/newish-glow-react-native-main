import { Platform } from "react-native";
import { createStyleSheet } from "react-native-unistyles";

export const InputFieldStyles = createStyleSheet(
  ({
    themes: {
      components: {
        input,
        foundations: {
          typography: { textStyles },
        },
      },
    },
  }) => ({
    inputWrapper: {
      flex: 1,
      alignItems: "center",
      flexDirection: "row",
    },
    input: {
      flex: 1,
      position: "relative",
      fontSize: textStyles.v1.paragraph.fontSize.sm,
      lineHeight: textStyles.v1.paragraph.lineHeight.sm,
      ...Platform.select({
        ios: {
          lineHeight: textStyles.v1.paragraph.lineHeight.xs,
        },
        default: {
          width: "auto",
          flexBasis: "auto",
          flexGrow: 1,
          flexShrink: 0,
        },
      }),
      ...Platform.select({
        web: {
          outlineStyle: "none",
        },
      }),
    },
    inputIcon: {
      color: input.color.icon.default,
    },
    cursorColor: {
      ...Platform.select({
        android: {
          color: input.color.text.default,
        },
      }),
    },

    backgroundColor: (isDisabled: boolean) => {
      let backgroundColor = input.color.background.default;
      if (isDisabled) {
        backgroundColor = input.color.background.inactive;
      }

      return { backgroundColor };
    },

    textColor: (isDisabled: boolean) => {
      let color = input.color.text.default;
      if (isDisabled) {
        color = input.color.text.inactive;
      }

      return { color };
    },
  }),
);
