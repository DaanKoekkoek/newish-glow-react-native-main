import { createStyleSheet } from "react-native-unistyles";

export const InputContainerStyles = createStyleSheet(
  ({
    themes: {
      components: { input },
    },
  }) => ({
    inputContainer: {
      display: "flex",
      position: "relative",
      flexDirection: "column",
      rowGap: input.gap.vertical.default,
    },
    inputGroupContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    inputGroup: {
      alignItems: "center",
      borderStyle: "solid",
      borderRadius: input.atoms.field.radius.default,
      borderWidth: input.borderWidth.default,
      flexDirection: "row",
      position: "relative",
      overflow: "hidden",
      flex: 1,
      gap: input.gap.horizontal.default,
      paddingHorizontal: input.atoms.field.padding.horizontal.default,
      paddingVertical:
        input.atoms.field.padding.vertical.default - input.borderWidth.default,
      variants: {
        state: {
          default: {
            borderColor: input.color.border.default,
            backgroundColor: input.color.background.default,
          },
          success: {
            borderColor: input.color.border.success,
          },
          error: {
            borderColor: input.color.border.error,
          },
          disabled: {
            borderColor: input.color.border.inactive,
            backgroundColor: input.color.background.inactive,
          },
        },
      },
    },
    hoverStyle: (state) => {
      if (state === "default") {
        return {
          borderColor: input.color.border.hover,
        };
      }
      return {};
    },
    activeStyle: (state) => {
      if (state === "default") {
        return {
          borderColor: input.color.border.active,
        };
      }
      return {};
    },
  }),
);
