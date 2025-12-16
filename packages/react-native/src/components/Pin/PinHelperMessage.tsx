import { Paragraph } from "foundations/Paragraph";
import { View } from "react-native";
import { useStyles, createStyleSheet } from "react-native-unistyles";

import type { PinHelperMessageProps } from "./Pin.types";
import { Spinner } from "../Spinner";

export const PinHelperMessage = ({
  state,
  helperMessage,
}: PinHelperMessageProps): JSX.Element => {
  const { styles } = useStyles(stylesheet, {
    state,
  });

  return (
    <View style={styles.helperContainer} testID={`${state}-text`}>
      <View style={styles.helper}>
        {state === "loading" && <Spinner size="sm" style={styles.text} />}
        <Paragraph size="sm" style={styles.text}>
          {helperMessage}
        </Paragraph>
      </View>
    </View>
  );
};

const stylesheet = createStyleSheet(
  ({
    themes: {
      components: { input },
    },
  }) => ({
    helperContainer: {
      rowGap: input.gap.vertical.default,
    },
    helper: {
      alignItems: "center",
      columnGap: input.gap.horizontal.default,
      flexDirection: "row",
    },
    text: {
      variants: {
        state: {
          error: {
            color: input.color.text.error,
          },
          success: {
            color: input.color.text.success,
          },
          loading: {
            color: input.color.text.loading,
          },
        },
      },
    },
  }),
);
