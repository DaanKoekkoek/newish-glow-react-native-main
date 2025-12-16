import { Icon } from "foundations/Icon";
import { Paragraph } from "foundations/Paragraph";
import { View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

interface Props {
  isError?: boolean;
  text?: string;
}
export const InputHint: React.FC<Props> = ({ isError, text }) => {
  const { styles } = useStyles(stylesheet);

  if (!text) {
    return null;
  }

  if (isError) {
    return (
      <View testID="error-text" key={JSON.stringify({ isError, text })}>
        <View style={styles.errorHint}>
          <Icon name="status-alert" style={styles.errorText} size="sm" />
          <Paragraph size="sm" style={styles.errorText}>
            {text.toLowerCase() === "required" ? "Verplicht" : text}
          </Paragraph>
        </View>
      </View>
    );
  }

  return (
    <View>
      <Paragraph size="sm" style={styles.defaultText}>
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
    errorHint: {
      columnGap: input.gap.horizontal.default,
      flexDirection: "row",
      alignItems: "center",
    },
    errorText: {
      color: input.color.text.error,
    },
    defaultText: {
      color: input.color.text.subtle,
    },
  }),
);
