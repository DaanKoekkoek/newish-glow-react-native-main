import { createStyleSheet } from "react-native-unistyles";

export const AttentionTextStyles = createStyleSheet(
  ({
    themes: {
      components: {
        foundations: {
          typography: { attentionText },
        },
      },
    },
  }) => ({
    container: {
      display: "flex",
      alignSelf: "stretch",
      flexDirection: "row",
      alignItems: "center",
      variants: {
        size: {
          sm: {
            gap: attentionText.gap.sm,
          },
          default: {
            gap: attentionText.gap.default,
          },
        },
      },
    },
    icon: {
      variants: {
        variant: {
          success: {
            color: attentionText.color.icon.success,
          },
          error: {
            color: attentionText.color.icon.error,
          },
        },
      },
    },
    message: {
      variants: {
        variant: {
          success: {
            color: attentionText.color.text.success,
          },
          error: {
            color: attentionText.color.text.error,
          },
        },
      },
    },
  }),
);
