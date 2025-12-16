import { mergeTestIds } from "_utility";
import { Icon } from "foundations/Icon";
import { createStyleSheet, useStyles } from "react-native-unistyles";

import { Button } from "./Button";
import type { NumberInputButtonProps } from "./NumberInputButton.types";
import { Spinner } from "../Spinner";

const version = "v1";

export const NumberInputButton = ({
  onPress,
  state,
  icon,
  testID,
}: NumberInputButtonProps) => {
  const { styles } = useStyles(stylesheet);

  const numberInputButtonTestID = mergeTestIds(testID, "number-input-button");

  return (
    <Button
      allowFontScaling={false}
      testID={numberInputButtonTestID}
      state={state}
      onPress={onPress}
      baseStyle={styles.numberInputButton}
    >
      {icon &&
        (state && state === "loading" ? (
          <Spinner size="sm" />
        ) : (
          <Icon name={icon} size="sm" />
        ))}
    </Button>
  );
};

const stylesheet = createStyleSheet(
  ({
    themes: {
      components: {
        button: {
          numberInputButton: { [version]: numberInputButton },
        },
      },
    },
  }) => ({
    numberInputButton: {
      alignSelf: "center",
      justifyContent: "center",
      borderRadius: numberInputButton.radius.sm,
      borderWidth: numberInputButton.borderWidth.default,
      paddingVertical: numberInputButton.padding.vertical.sm,
      paddingHorizontal: numberInputButton.padding.horizontal.sm,
    },
  }),
);
