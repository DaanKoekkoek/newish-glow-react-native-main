import { useFontFamily } from "_global-hooks";
import { mergeTestIds } from "_utility";
import { TextLink, type TextLinkProps } from "components/TextLink";
import type { ReactElement, ReactNode } from "react";
import React from "react";
import { Text } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

import type { ParagraphProps } from "./Paragraph.types";
import { Strong, type StrongProps } from "../Strong";

export const Paragraph = ({
  id,
  alignment = "left",
  dataAttributes,
  size = "default",
  color = "default",
  children,
  style,
  testID,
  allowFontScaling = true,
  ...props
}: ParagraphProps): JSX.Element => {
  const { styles } = useStyles(stylesheet, {
    alignment,
    textColor: color === "default" ? undefined : color,
    size: size === "default" ? undefined : size,
  });

  const paragraphTestId = mergeTestIds(testID, "paragraph");
  const fontFamily = useFontFamily("Paragraph_Regular");
  const parseChildren = (): ReactNode => {
    return React.Children.map(children, (child) => {
      const strongElement = child as ReactElement<StrongProps>;
      const textLinkElement = child as ReactElement<TextLinkProps>;

      if (
        React.isValidElement(strongElement) &&
        strongElement.type === Strong
      ) {
        return React.cloneElement(strongElement, {
          ...strongElement.props,
          size,
        });
      } else if (
        React.isValidElement(textLinkElement) &&
        textLinkElement.type === TextLink
      ) {
        return React.cloneElement(textLinkElement, {
          ...textLinkElement.props,
          size: size === "xxs" ? "xs" : size,
        });
      } else {
        return child;
      }
    });
  };

  return (
    <Text
      allowFontScaling={allowFontScaling}
      id={id}
      style={[{ fontFamily }, styles.paragraph, style]}
      testID={paragraphTestId}
      {...dataAttributes}
      {...props}
    >
      {parseChildren()}
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
    paragraph: {
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
          justify: {
            textAlign: "justify",
          },
          default: {
            textAlign: "left",
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
