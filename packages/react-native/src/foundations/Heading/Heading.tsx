import { H1, H2, H3, H4, H5, H6 } from "@expo/html-elements";
import { useFontFamily } from "_global-hooks";
import { mergeTestIds } from "_utility";
import { useThemeProviderContext } from "components/ThemeProvider";
import React from "react";
import { Text } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

import type { HeadingProps } from "./Heading.types";

export const Heading = ({
  size = "xl",
  color = "default",
  children,
  alignment,
  as,
  style,
  allowFontScaling = true,
  testID,
}: HeadingProps): JSX.Element => {
  const { theme } = useThemeProviderContext();

  const { styles } = useStyles(stylesheet, {
    alignment,
    mode: theme,
    textColor: color === "default" ? undefined : color,
    size,
  });

  const headingTestID = mergeTestIds(testID, "heading");

  let HeadingComponent: React.ElementType = Text; // Default to Text component

  switch (as) {
    case "h1":
      HeadingComponent = H1;
      break;
    case "h2":
      HeadingComponent = H2;
      break;
    case "h3":
      HeadingComponent = H3;
      break;
    case "h4":
      HeadingComponent = H4;
      break;
    case "h5":
      HeadingComponent = H5;
      break;
    case "h6":
      HeadingComponent = H6;
      break;
    default:
      break;
  }

  const fontFamily = useFontFamily(
    theme === "light" ? "Heading_Medium" : "Heading_Regular",
  );

  return (
    <HeadingComponent
      testID={headingTestID}
      style={[{ fontFamily }, styles.heading, style]}
      allowFontScaling={allowFontScaling}
    >
      {children}
    </HeadingComponent>
  );
};

const version = "v1";

const stylesheet = createStyleSheet(
  ({
    themes: {
      semantics: {
        color: { text },
      },
      components: {
        foundations: {
          typography: {
            textStyles: { [version]: textStyles },
          },
        },
      },
    },
  }) => ({
    heading: {
      marginVertical: 0,
      variants: {
        mode: {
          dark: {
            fontWeight: "400",
          },
          light: {
            fontWeight: "500",
          },
        },
        textColor: {
          default: {
            color: text.default,
          },
          inverted: {
            color: text.inverted,
          },
        },
        alignment: {
          default: {
            textAlign: "left",
          },
          left: {
            textAlign: "left",
          },
          center: {
            textAlign: "center",
          },
        },
        size: {
          xl: {
            fontSize: textStyles.heading.fontSize.xl,
            lineHeight: textStyles.heading.lineHeight.xl,
            letterSpacing: textStyles.heading.letterSpacing.xl,
          },
          lg: {
            fontSize: textStyles.heading.fontSize.lg,
            lineHeight: textStyles.heading.lineHeight.lg,
            letterSpacing: textStyles.heading.letterSpacing.lg,
          },
          md: {
            fontSize: textStyles.heading.fontSize.md,
            lineHeight: textStyles.heading.lineHeight.md,
            letterSpacing: textStyles.heading.letterSpacing.md,
          },
          sm: {
            fontSize: textStyles.heading.fontSize.sm,
            lineHeight: textStyles.heading.lineHeight.sm,
            letterSpacing: textStyles.heading.letterSpacing.sm,
          },
          xs: {
            fontSize: textStyles.heading.fontSize.xs,
            lineHeight: textStyles.heading.lineHeight.xs,
            letterSpacing: textStyles.heading.letterSpacing.xs,
          },
        },
      },
    },
  }),
);
