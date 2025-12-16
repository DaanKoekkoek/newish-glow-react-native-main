import { createStyleSheet } from "react-native-unistyles";

const version = "v1";

export const titleStyles = createStyleSheet(
  ({
    themes: {
      components: {
        card: {
          atoms: {
            text: { typography },
            color,
          },
        },
        foundations: {
          typography: {
            textStyles: { [version]: textStyles },
          },
        },
      },
    },
  }) => ({
    title: {
      fontWeight: "500",
      fontSize: textStyles.heading.fontSize.lg,
      lineHeight: textStyles.heading.lineHeight.lg,
      letterSpacing: textStyles.heading.letterSpacing.lg,
      variants: {
        isXs: {
          true: {
            fontSize: typography.xs.fontSize,
            lineHeight: typography.xs.lineHeight,
            letterSpacing: typography.xs.letterSpacing,
          },
        },
        isSm: {
          true: {
            fontSize: textStyles.heading.fontSize.md,
            lineHeight: textStyles.heading.lineHeight.md,
            letterSpacing: textStyles.heading.letterSpacing.md,
          },
        },
        isLg: {
          true: {
            fontSize: textStyles.heading.fontSize.xl,
            lineHeight: textStyles.heading.lineHeight.xl,
            letterSpacing: textStyles.heading.letterSpacing.xl,
          },
        },
        isXl: {
          true: {
            fontSize: textStyles.display.fontSize.sm,
            lineHeight: textStyles.display.lineHeight.sm,
            letterSpacing: textStyles.display.letterSpacing.sm,
          },
        },
        isInactive: {
          true: {
            color: color.text.inactive,
          },
        },
      },
    },
  }),
);
