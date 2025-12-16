import type { IconNames, IconProps } from "foundations/Icon";
import { Icon } from "foundations/Icon";
import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

import type { InputVariant } from "./Input.types";

interface Props {
  testID?: string;
  icon: IconNames;
  iconSize?: IconProps["size"];
  variant: InputVariant;
  onPress?: () => void;
}

export const InputAffix = ({
  testID,
  icon,
  iconSize = "default",
  variant,
  onPress,
}: Props) => {
  const [isFocused, setIsFocused] = useState(false);
  const isDisabled = variant === "disabled";
  const isPressable = typeof onPress !== "undefined";
  // TODO: Do we need to have error state here? in case we want to have error icon?
  const { styles } = useStyles(stylesheet, {
    state: getStyleState(variant, isPressable),
  });

  const handleAffixFocus = () => {
    setIsFocused(!isFocused);
  };

  return (
    <View style={styles.affixContainer}>
      {isPressable ? (
        <Pressable
          style={styles.affixButton}
          role="button"
          testID={testID}
          disabled={isDisabled}
          focusable={isDisabled}
          onPress={onPress}
          onFocus={handleAffixFocus}
          onBlur={handleAffixFocus}
        >
          <Text style={styles.toggle}>
            <Icon name={icon} size={iconSize} style={styles.inputIcon} />
          </Text>
        </Pressable>
      ) : (
        <Text testID={testID} style={styles.successText}>
          <Icon name={icon} size={iconSize} style={styles.inputIcon} />
        </Text>
      )}
    </View>
  );
};

function getStyleState(variant: InputVariant, isPressable: boolean) {
  if (variant === "default" || (isPressable && variant !== "disabled")) {
    return;
  }

  if (isPressable) {
    return "disabled";
  }

  return variant;
}

const stylesheet = createStyleSheet(
  ({
    themes: {
      components: { input },
    },
  }) => ({
    successText: {
      display: "flex",
      alignItems: "center",
      variants: {
        state: {
          success: {
            color: input.color.text.success,
          },
          error: {
            color: input.color.text.error,
          },
        },
      },
    },
    toggle: {
      display: "flex",
      alignItems: "center",
      userSelect: "none",
      variants: {
        state: {
          default: {
            color: input.color.text.default,
          },
          disabled: {
            color: input.color.text.inactive,
          },
        },
      },
    },
    affixContainer: {
      // paddingRight: input.field.padding.horizontal.default,
    },
    affixButton: {
      alignItems: "center",
      borderWidth: 0,
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
    },
    inputIcon: {
      color: input.color.icon.default,
    },
  }),
);
