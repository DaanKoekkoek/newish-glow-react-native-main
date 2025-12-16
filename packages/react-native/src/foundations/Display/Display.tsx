import { P } from "@expo/html-elements";
import { useFontFamily } from "_global-hooks";
import { mergeTestIds } from "_utility";
import React from "react";
import { createStyleSheet, useStyles } from "react-native-unistyles";

import type { DisplayProps } from "./Display.types";

export const Display = ({
  alignment = "left",
  color = "default",
  size = "md",
  children,
  style,
  allowFontScaling = true,
  testID,
}: DisplayProps): JSX.Element => {
  const { styles } = useStyles(stylesheet, {
    alignment,
    textColor: color === "default" ? undefined : color,
    size: size === "md" ? undefined : size,
  });

  const displayTestID = mergeTestIds(testID, "display");
  const fontFamily = useFontFamily("Display");

  return (
    <P
      testID={displayTestID}
      style={[{ fontFamily }, styles.display, style]}
      allowFontScaling={allowFontScaling}
    >
      {children}
    </P>
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
    display: {
      marginTop: 0,
      marginBottom: 0,
      variants: {
        textColor: {
          default: {
            color: text.default,
          },
          inverted: {
            color: text.inverted,
          },
        },
        alignment: {
          left: {
            textAlign: "left",
          },
          center: {
            textAlign: "center",
          },
        },
        size: {
          default: {
            fontSize: textStyles.display.fontSize.md,
            lineHeight: textStyles.display.lineHeight.md,
            letterSpacing: textStyles.display.letterSpacing.md,
          },
          sm: {
            fontSize: textStyles.display.fontSize.sm,
            lineHeight: textStyles.display.lineHeight.sm,
            letterSpacing: textStyles.display.letterSpacing.sm,
          },
        },
      },
    },
  }),
);
