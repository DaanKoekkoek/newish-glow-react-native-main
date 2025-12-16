import { useFontFamily } from "_global-hooks";
import { mergeTestIds } from "_utility";
import React from "react";
import { Text } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

import type { StrongProps } from "./Strong.types";

export const Strong = ({
  color = "default",
  size,
  alignment,
  children,
  style,
  testID,
  allowFontScaling = true,
  ...props
}: StrongProps): JSX.Element => {
  const { styles } = useStyles(stylesheet, {
    size: size === "default" ? undefined : size,
    textColor: color === "default" ? undefined : color,
    alignment,
  });

  const strongTestID = mergeTestIds(testID, "strong");
  const fontFamily = useFontFamily("Paragraph_Strong");

  return (
    <Text
      allowFontScaling={allowFontScaling}
      style={[{ fontFamily }, styles.strong, style]}
      testID={strongTestID}
      {...props}
    >
      {children}
    </Text>
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
    strong: {
      variants: {
        alignment: {
          left: {
            textAlign: "left",
          },
          right: {
            textAlign: "right",
          },
          center: {
            textAlign: "center",
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
        size: {
          lg: {
            fontSize: textStyles.paragraph.fontSize.lg,
            lineHeight: textStyles.paragraph.lineHeight.lg,
            letterSpacing: textStyles.paragraph.letterSpacing.lg,
          },
          sm: {
            fontSize: textStyles.paragraph.fontSize.sm,
            lineHeight: textStyles.paragraph.lineHeight.sm,
            letterSpacing: textStyles.paragraph.letterSpacing.sm,
          },
          xs: {
            fontSize: textStyles.paragraph.fontSize.xs,
            lineHeight: textStyles.paragraph.lineHeight.xs,
            letterSpacing: textStyles.paragraph.letterSpacing.xs,
          },
          xxs: {
            fontSize: textStyles.paragraph.fontSize.xxs,
            lineHeight: textStyles.paragraph.lineHeight.xxs,
            letterSpacing: textStyles.paragraph.letterSpacing.xxs,
          },
          default: {
            fontSize: textStyles.paragraph.fontSize.default,
            lineHeight: textStyles.paragraph.lineHeight.default,
            letterSpacing: textStyles.paragraph.letterSpacing.default,
          },
        },
      },
    },
  }),
);
