import { useFontFamily } from "_global-hooks";
import { Highlight } from "_internals/Highlight";
import { TextLink } from "components/TextLink";
import { useThemeProviderContext } from "components/ThemeProvider";
import type { LinearGradientProps } from "expo-linear-gradient";
import { LinearGradient } from "expo-linear-gradient";
import { Strong, Paragraph } from "foundations/index";
import React, { useState } from "react";
import type { ViewStyle } from "react-native";
import { Pressable, Text, View } from "react-native";
import { useStyles } from "react-native-unistyles";

import { selectorStyles } from "./Selector.styles";
import type { SelectorProps } from "./Selector.types";
import { Checkbox } from "../Checkbox";
import { Divider } from "../Divider";

export const Selector = ({
  onPress,
  title,
  selected = false,
  state = "default",
  variant = "default",
  type = "radio",
  price,
  badge,
  promotion,
  secondaryAction,
  highlight,
  list,
  titleStrikethrough,
  description,
}: SelectorProps): JSX.Element => {
  const { brand } = useThemeProviderContext();

  const [isHovered, setIsHovered] = useState<boolean>(false);
  const isDisabled = state === "inactive";
  const isCompact = variant === "compact";
  const isExtended = variant === "extended";
  const isDisabledAndSelected = isDisabled && selected;
  const isHoveredAndEnabled = !isDisabled && isHovered;
  const isHighlightedAndExtended = !!highlight && isExtended;
  const isHighlightedAndCompact = !!highlight && isCompact;
  const isHighlightedAndDefault = !!highlight && !isCompact && !isExtended;
  const highlightState = isHovered
    ? "hover"
    : state === "inactive"
      ? "inactive"
      : "default";

  const {
    styles,
    theme: {
      themes: {
        semantics: {
          color: { border },
        },
      },
    },
  } = useStyles(selectorStyles, {
    isDisabled,
    isExtended,
    isCompact,
    isSelected: selected,
    isDisabledAndSelected,
    isHoveredAndEnabled,
    isHighlighted: !!highlight,
    isHighlightedAndExtended,
    isHighlightedAndCompact,
    isHighlightedAndDefault,
    isSelectedAndSwitch: selected && brand === "switch",
  });

  const possibleSecondaryAction = variant !== "compact" && secondaryAction && (
    <View style={styles.secondaryAction}>
      {React.isValidElement(secondaryAction) && (
        <TextLink
          children=""
          {...secondaryAction.props}
          textStyle={styles.textLink}
          disabled={isDisabled}
          size="sm"
        />
      )}
    </View>
  );

  const defaultList = isExtended && list && (
    <View style={styles.list}>
      {React.createElement(list.type, {
        ...list.props,
        inactive: !!isDisabled,
      })}
    </View>
  );

  const possibleHighlight = !!highlight && (
    <Highlight
      children={highlight}
      state={highlightState}
      selected={selected}
    />
  );

  const possibleBadge = !!badge && !isCompact && (
    <View style={styles.badgeContainer}>
      <View>
        <View>
          {React.createElement(badge.type, {
            ...badge.props,
            inactive: state === "inactive",
          })}
        </View>
      </View>
    </View>
  );

  const possibleCheckbox = type === "checkbox" && (
    <View style={styles.checkbox}>
      <Checkbox
        checked={selected}
        containerStyle={styles.checkboxContainer}
        id="checkbox"
        isHovered={isHovered}
        state={state === "inactive" ? "inactive" : "default"}
        onPress={onPress}
      />
    </View>
  );

  const possiblePromotion = !!promotion && !isCompact && (
    <Paragraph size="sm" style={styles.promotion}>
      <Text numberOfLines={1}>{promotion}</Text>
    </Paragraph>
  );

  const possibleDescription = !!description && !isCompact && !isExtended && (
    <Paragraph style={styles.description} size="sm">
      {description}
    </Paragraph>
  );

  const priceTitleCheckboxFlex: ViewStyle = {
    justifyContent: type === "checkbox" ? "flex-start" : "center",
  };

  const fontFamily = useFontFamily("Paragraph_Strong");

  const titleAndPrice = (
    <View style={styles.priceTitleCheckbox}>
      {type === "checkbox" && (
        <View style={styles.checkboxPrice}>{possibleCheckbox}</View>
      )}
      <View style={[styles.titlePrice, isCompact && priceTitleCheckboxFlex]}>
        <Strong style={styles.label} size="default">
          {!!titleStrikethrough && isExtended && (
            <Text style={[{ fontFamily }, styles.titleStrikethrough]}>
              {titleStrikethrough}
            </Text>
          )}
          <Text>{title}</Text>
          {possiblePromotion}
          {possibleDescription}
        </Strong>
      </View>
      {!!price && !isCompact && (
        <View style={{ alignSelf: "flex-end" }}>
          {React.createElement(price.type, {
            ...price.props,
            state: isDisabled ? "disabled" : "default",
            size: isExtended ? "lg" : "default",
          })}
        </View>
      )}
    </View>
  );

  const possibleDivider = variant === "extended" && secondaryAction && (
    <Divider prominence="subtle" />
  );

  const labelSpecialStyleToHandleFlex: ViewStyle = {
    flex: isCompact && type !== "checkbox" ? 1 : 1,
  };

  const label = (
    <View style={labelSpecialStyleToHandleFlex}>
      <View style={styles.labelGroup}>
        {possibleBadge}
        {titleAndPrice}
      </View>
    </View>
  );

  const selector = (
    <View style={styles.dummyBorderEffect}>
      <View style={styles.selector}>
        {label}
        {defaultList}
        {possibleDivider}
        {possibleSecondaryAction}
      </View>
    </View>
  );

  const pressableConfiguration = {
    testID: "selector",
    disabled: isDisabled,
    onPress,
    onHoverIn: () => setIsHovered(true && !isDisabled),
    onHoverOut: () => setIsHovered(false),
  };

  const lineargradientParams: LinearGradientProps = {
    colors: isHovered
      ? [
          border.selected.gradient.hover.stop_4,
          border.selected.gradient.hover.stop_3,
          border.selected.gradient.hover.stop_2,
          border.selected.gradient.hover.stop_1,
        ]
      : [
          border.selected.gradient.default.stop_4,
          border.selected.gradient.default.stop_3,
          border.selected.gradient.default.stop_2,
          border.selected.gradient.default.stop_1,
        ],
    start: { x: 1, y: 0 },
    end: { x: 0, y: 1 },
    style: styles.gradientContainer,
  };

  return (
    <View style={styles.wrapper} testID="wrapper">
      <Pressable {...pressableConfiguration} style={{ width: "100%" }}>
        {possibleHighlight}
        {selected && !isDisabled ? (
          <LinearGradient {...lineargradientParams}>{selector}</LinearGradient>
        ) : (
          <View style={styles.defaultContainer} testID="defaultContainer">
            {selector}
          </View>
        )}
      </Pressable>
    </View>
  );
};
