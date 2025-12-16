import { LI } from "@expo/html-elements";
import { Attention } from "_internals/Attention";
import { Strong, Paragraph } from "foundations/index";
import React, { useState } from "react";
import type { GestureResponderEvent } from "react-native";
import { View, Pressable } from "react-native";
import { useStyles } from "react-native-unistyles";

import { AddOnListStyles } from "./AddOnList.styles";
import type { AddOnListListItemProps } from "./AddOnList.types";
import { BaseButton } from "../Button/BaseButton";

const AddOnListItem = ({
  attention,
  isFirstChild = true,
  isLastChild = true,
  actionLabel,
  addOn,
  title,
  description,
  isDesktop,
  variant = "default",
  palette = "default",
  onPress,
}: AddOnListListItemProps) => {
  const { styles } = useStyles(AddOnListStyles, {
    isFirstChild,
    isLastChild,
  });

  const [isHovered, setIsHovered] = useState<boolean>(false);

  const pressableConfiguration = {
    onHoverIn: () => setIsHovered(true),
    onHoverOut: () => setIsHovered(false),
  };

  return (
    <Pressable
      {...pressableConfiguration}
      testID="addon-list-item"
      onPress={(e: GestureResponderEvent) => onPress(e)}
    >
      <LI style={styles.item(isFirstChild)} aria-labelledby="listitem">
        {addOn && <View style={styles.addOn}>{addOn}</View>}
        <View style={styles.content}>
          <Strong style={styles.title}>{title}</Strong>
          <View style={styles.descriptionAndPromo}>
            {description && (
              <Paragraph
                numberOfLines={2}
                ellipsizeMode="tail"
                style={styles.description}
              >
                {description}
              </Paragraph>
            )}
            {!!attention && (
              <Attention
                {...attention}
                style={styles.attention(attention.variant || "information")}
                size="sm"
              />
            )}
          </View>
        </View>
        {actionLabel && (
          <View>
            <BaseButton
              size={isDesktop ? "default" : "sm"}
              onPress={(e: GestureResponderEvent) => onPress(e)}
              isHovered={isHovered}
              pointerEvents="none"
              prominence={variant === "default" ? "emphasised" : "secondary"}
              palette={palette}
            >
              {actionLabel}
            </BaseButton>
          </View>
        )}
      </LI>
    </Pressable>
  );
};

AddOnListItem.displayName = "AddOnList.Item";

export { AddOnListItem };
