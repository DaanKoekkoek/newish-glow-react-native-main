import { useAllowedChildren } from "_global-hooks";
import { Button } from "components/Button";
import { TextLink } from "components/TextLink";
import React from "react";
import { View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

import type { CallToActionProps } from "./CallToAction.types";

export const CallToAction = ({
  primaryAction,
  secondaryAction,
  isHovered,
}: CallToActionProps) => {
  const isButton = useAllowedChildren(secondaryAction, [Button]).length > 0;
  const isTextLink = useAllowedChildren(secondaryAction, [TextLink]).length > 0;
  const { styles } = useStyles(stylesheet);

  return (
    <View style={styles.container(isButton)}>
      <Button
        {...primaryAction.props}
        isHovered={isHovered}
        pointerEvents="none"
      />
      {secondaryAction &&
        (isButton ? (
          <Button
            {...secondaryAction.props}
            fill
            prominence="secondary"
            isHovered={isHovered}
          />
        ) : (
          isTextLink && (
            <TextLink
              {...secondaryAction.props}
              isHovered={isHovered}
              size="sm"
            />
          )
        ))}
    </View>
  );
};

const stylesheet = createStyleSheet(
  ({
    themes: {
      components: {
        card: {
          atoms: { callToAction },
        },
      },
    },
  }) => ({
    container: (isButton: boolean | undefined) => {
      return {
        gap: isButton
          ? callToAction.gap.vertical.default
          : callToAction.gap.vertical.lg,
      };
    },
  }),
);
