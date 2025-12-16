import { Paragraph } from "foundations/Paragraph";
import { createStyleSheet, useStyles } from "react-native-unistyles";

export const HelperText = ({ text }: { text?: string }) => {
  const { styles } = useStyles(stylesheet);

  return !text ? null : (
    <Paragraph size="sm" style={styles.text} testID="helper-text">
      {text}
    </Paragraph>
  );
};

const stylesheet = createStyleSheet(
  ({
    themes: {
      components: { input },
    },
  }) => ({
    text: {
      color: input.color.text.subtle,
    },
  }),
);
