import { Icon } from "foundations/Icon";
import { Paragraph } from "foundations/Paragraph";
import { View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

export const ErrorMessage = ({ text }: { text?: string }) => {
  const { styles } = useStyles(stylesheet);

  return !text ? null : (
    <View style={styles.container} testID="error-message-container">
      <Icon
        style={styles.icon}
        name="status-alert"
        size="sm"
        testID="status-alert"
      />
      <Paragraph size="sm" style={styles.text}>
        {text}
      </Paragraph>
    </View>
  );
};

const stylesheet = createStyleSheet(
  ({
    themes: {
      components: { input },
    },
  }) => ({
    container: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      alignSelf: "stretch",
      gap: input.gap.horizontal.default,
    },
    icon: {
      color: input.color.icon.error,
    },
    text: {
      color: input.color.text.error,
    },
  }),
);
