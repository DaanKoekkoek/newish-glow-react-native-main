import { useMemo } from "react";
import { View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

import type { PasswordStrengthIndicatorBarProps } from "./PasswordStrength.types";

export const PasswordStrengthIndicatorBar = ({
  strengthLevel,
}: PasswordStrengthIndicatorBarProps) => {
  // NOTE: styling via the variant prop of useStyles is not working for NextJS in this case  ¯\_(ツ)_/¯
  const {
    styles,
    theme: {
      themes: {
        components: {
          input: {
            atoms: {
              passwordIndicator: {
                color: { strength },
              },
            },
          },
        },
      },
    },
  } = useStyles(stylesheet);

  const color = useMemo((): string => {
    switch (strengthLevel) {
      case "bad":
        return strength.bad;
      case "ok":
        return strength.ok;
      case "good":
        return strength.good;
      default:
        return strength.default;
    }
  }, [strengthLevel, strength]);

  return (
    <View
      style={styles.bar(color)}
      testID={`strength-progress-bar-${strengthLevel}`}
    />
  );
};

const stylesheet = createStyleSheet(
  ({
    themes: {
      components: { input },
    },
  }) => ({
    bar: (strength: string) => ({
      height: input.atoms.passwordIndicator.size.height,
      borderRadius: input.atoms.passwordIndicator.radius.default,
      flexGrow: 1,
      backgroundColor: strength,
    }),
  }),
);
