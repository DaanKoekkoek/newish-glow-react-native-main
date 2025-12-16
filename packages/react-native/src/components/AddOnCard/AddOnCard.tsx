import { Highlight } from "_internals/Highlight";
import type { BreakpointKeys } from "_theming/breakpoints";
import { LinearGradient } from "expo-linear-gradient";
import { Addon, Heading, Paragraph } from "foundations/index";
import React, { useCallback, useMemo, useState } from "react";
import { View, Pressable } from "react-native";
import { useStyles } from "react-native-unistyles";

import { AddOnCardStyles } from "./AddOnCard.styles";
import type { AddOnCardProps } from "./AddOnCard.types";
import { Button } from "../Button";
import { BaseButton } from "../Button/BaseButton";
import { Price } from "../Price";

export const AddOnCard = ({
  id,
  onPress,
  title,
  description,
  promotion,
  button = {
    selected: { text: "Wijzig" },
    unselected: { text: "Voeg toe" },
  },
  highlight,
  applyHighlightOffset,
  addon: visualVariant,
  direction = "vertical",
  selected = false,
  state = "default",
  price,
}: AddOnCardProps) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const isDisabled = state === "inactive";
  const highlightOperator =
    !highlight && !applyHighlightOffset
      ? "noHighlight"
      : !highlight && !!applyHighlightOffset
        ? "highlightOffset"
        : "highlight";
  const highlightState = isHovered
    ? "hover"
    : state === "inactive"
      ? "inactive"
      : "default";

  const onPressHandler = useCallback(() => {
    onPress(id);
  }, [id, onPress]);

  const { styles, breakpoint: bp } = useStyles(AddOnCardStyles, {
    isDisabled,
    isSelected: selected,
    highlightOperator,
    direction,
    isHovered,
    isDisabledAndSelected: isDisabled && selected,
  });
  const breakpoint = bp as BreakpointKeys;

  // Responsive styles
  const isDesktop = breakpoint === "desktop";
  const isLaptopOrDesktop = breakpoint === "laptop" || isDesktop;
  const responsiveTitleSize = isLaptopOrDesktop ? "md" : "sm";
  const responsiveButtonSize = isLaptopOrDesktop ? "default" : "sm";
  const responsivePrice = isDesktop ? "lg" : "default";

  const colorsSetup = useMemo(() => {
    let colors; // Minimal [string, string] color and gradients depending on state
    if (selected && isHovered) {
      colors = [
        styles.hoverGradientSetup01.backgroundColor,
        styles.hoverGradientSetup02.backgroundColor,
        styles.hoverGradientSetup03.backgroundColor,
        styles.hoverGradientSetup04.backgroundColor,
      ];
    } else if (selected && !isDisabled) {
      colors = [
        styles.selectedGradientSetup01.backgroundColor,
        styles.selectedGradientSetup02.backgroundColor,
        styles.selectedGradientSetup03.backgroundColor,
        styles.selectedGradientSetup04.backgroundColor,
      ];
    } else if (selected && isDisabled) {
      colors = [
        styles.inactiveSelectedState.backgroundColor,
        styles.inactiveSelectedState.backgroundColor,
      ];
    } else if (isDisabled) {
      colors = [
        styles.inactiveState.backgroundColor,
        styles.inactiveState.backgroundColor,
      ];
    } else if (isHovered) {
      colors = ["transparent", "transparent"];
    } else {
      colors = [
        styles.gradientContainer.backgroundColor,
        styles.gradientContainer.backgroundColor,
      ];
    }
    return colors;
  }, [isDisabled, isHovered, selected, styles]);

  const possibleHighlight = highlight && (
    <View testID="add-on-card-highlight">
      <Highlight
        variant="default"
        state={highlightState}
        selected={selected}
        children={highlight!}
      />
    </View>
  );

  const addonVisual = (
    <Addon
      name={visualVariant}
      size={direction === "horizontal" ? "sm" : "default"}
      state={isDisabled ? "inactive" : "default"}
      testID="add-on-card-visual"
    />
  );

  const content = (
    <View style={styles.contentStyles}>
      <Heading
        size={responsiveTitleSize}
        as="h3"
        style={isDisabled ? styles.disabledText : styles.defaultText}
      >
        {title}
      </Heading>
      {description && (
        <Paragraph
          size="sm"
          style={isDisabled ? styles.disabledText : styles.defaultText}
          testID="add-on-card-description"
        >
          {description}
        </Paragraph>
      )}
      {promotion && (
        <Paragraph
          style={styles.promotion}
          size="sm"
          testID="add-on-card-promotion"
        >
          {promotion}
        </Paragraph>
      )}
    </View>
  );

  const footerContainer = (!!button || !!price?.value) && (
    <View style={styles.footer} testID="add-on-card-footer">
      {price?.value && (
        <Price
          {...price}
          state={isDisabled ? "disabled" : "default"}
          size={responsivePrice}
          testID="add-on-card-price"
        />
      )}
      {!!button && (
        <View style={styles.button} testID="add-on-card-button">
          <BaseButton
            asText
            isHovered={isHovered}
            prominence="secondary"
            size={responsiveButtonSize}
            state={isDisabled ? "disabled" : undefined}
            pointerEvents="none"
          >
            {selected ? button.selected?.text : button.unselected?.text}
            {selected && button.selected?.icon?.name && (
              <Button.Icon
                name={button.selected?.icon.name}
                solid={button.selected?.icon?.solid}
              />
            )}
            {!selected && button.unselected?.icon?.name && (
              <Button.Icon
                name={button.unselected?.icon.name}
                solid={button.unselected?.icon?.solid}
              />
            )}
          </BaseButton>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.wrapper} testID="add-on-card">
      <Pressable
        style={styles.pressable}
        disabled={state === "inactive"}
        aria-checked={selected}
        onPress={onPressHandler}
        onHoverIn={() => setIsHovered(true && !isDisabled)}
        onHoverOut={() => setIsHovered(false)}
        testID="add-on-card-pressable"
      >
        {possibleHighlight}
        <LinearGradient
          style={styles.gradientContainer}
          colors={colorsSetup}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 1 }}
        >
          <View style={styles.gradientBorderEffect(breakpoint)}>
            <View style={styles.card(breakpoint)} testID="add-on-card-jsx">
              <View style={styles.visualsAddon}>{addonVisual}</View>
              <View style={styles.contentContainer}>
                {content}
                {footerContainer}
              </View>
            </View>
          </View>
        </LinearGradient>
      </Pressable>
    </View>
  );
};
