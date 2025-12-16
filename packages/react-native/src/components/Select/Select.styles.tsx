import { Platform } from "react-native";
import { createStyleSheet } from "react-native-unistyles";

export const SelectStyles = createStyleSheet(
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
    picker: {
      opacity: 1,
      width: "100%",
      ...Platform.select({
        ios: {
          height: 220,
        },
        android: {
          position: "absolute",
          width: "100%",
          height: "100%",
          color: "transparent",
          opacity: 0,
        },
        web: {
          position: "absolute",
          width: "100%",
          opacity: 0,
          top: 0,
          left: 0,
          height: 24 + input.atoms.field.padding.vertical.default * 2,
        },
      }),
    },
    pickerWithLabel: {
      ...Platform.select({
        web: {
          top:
            textStyles.v1.paragraph.lineHeight.sm +
            input.gap.horizontal.default,
        },
      }),
    },
    pickerContainer: {
      backgroundColor: input.atoms.dropdown.color.background.default,
    },
  }),
);
