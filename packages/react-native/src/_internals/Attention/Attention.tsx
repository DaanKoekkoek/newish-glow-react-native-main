import { Paragraph } from "foundations/Paragraph";
import { useStyles, createStyleSheet } from "react-native-unistyles";

import type { AttentionProps } from "./Attention.types";

export const Attention = ({
  variant = "success",
  size,
  text,
  style,
  allowFontScaling = true,
}: AttentionProps) => {
  const { styles } = useStyles(stylesheet, {
    variant,
  });
  return (
    <Paragraph
      style={[styles.attention, style]}
      size={size}
      allowFontScaling={allowFontScaling}
    >
      {text}
    </Paragraph>
  );
};

const stylesheet = createStyleSheet(
  ({
    themes: {
      semantics: {
        color: { text },
      },
    },
  }) => ({
    attention: {
      variants: {
        variant: {
          information: {
            color: text.information,
          },
          success: {
            color: text.success,
          },
          warning: {
            color: text.warning,
          },
          error: {
            color: text.error,
          },
        },
      },
    },
  }),
);
