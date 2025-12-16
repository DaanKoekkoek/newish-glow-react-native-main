import { useThemeProviderContext } from "components/index";
import { Icon } from "foundations/Icon";
import { Strong, Paragraph } from "foundations/index";
import React from "react";
import { View, Pressable } from "react-native";
import { useStyles, createStyleSheet } from "react-native-unistyles";

import type { InputLabelProps } from "./Input.types";

export const InputLabel = ({
  id,
  text,
  optional,
  info,
  testID,
}: InputLabelProps) => {
  const { styles } = useStyles(stylesheet);
  const { brand } = useThemeProviderContext();

  return (
    <View style={styles.labelContainer} testID={testID}>
      {!!text && (
        <Paragraph id={id} size="sm">
          <Strong>{text}</Strong>
        </Paragraph>
      )}
      <View style={styles.infoContainer}>
        {!!optional && (
          <Paragraph size="sm" style={styles.optional}>
            Optioneel
          </Paragraph>
        )}
        <InfoContainer info={info}>
          <Icon
            brand={brand !== "simpel" ? brand : undefined}
            name="status-info"
            style={styles.infoIcon}
            size="default"
          />
        </InfoContainer>
      </View>
    </View>
  );
};

const InfoContainer: React.FC<
  React.PropsWithChildren<{ info: InputLabelProps["info"] }>
> = ({ info, children }) => {
  if (typeof info === "string") {
    //TODO: replace this with <Tooltip> component when ready.
    return <View>{children}</View>;
  }

  if (typeof info === "function") {
    return (
      <Pressable accessible onPress={info}>
        {children}
      </Pressable>
    );
  }

  return null;
};

const stylesheet = createStyleSheet(
  ({
    themes: {
      components: { input },
    },
  }) => ({
    optional: {
      color: input.color.text.subtle,
    },
    labelContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignSelf: "stretch",
    },
    infoContainer: {
      columnGap: input.gap.horizontal.default,
      display: "flex",
      flexDirection: "row",
    },
    infoIcon: {
      color: input.color.icon.default,
    },
  }),
);
