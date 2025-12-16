import { Nav } from "@expo/html-elements";
import { ViewWithBoxShadow } from "_utility";
import { Grid, Heading } from "foundations/index";
import React, { useState, useCallback } from "react";
import { View, Pressable } from "react-native";
import Animated from "react-native-reanimated";
import { useStyles } from "react-native-unistyles";

import { topNavigationStyles } from "./TopNavigation.styles";
import type {
  TopNavigationProps,
  TopNavigationContentProps,
} from "./TopNavigation.types";
import { useTopNavigationContext } from "./TopNavigationContext";
import { useTopNavigationAnimation } from "./hooks";

const AnimatedViewWithShadowBox =
  Animated.createAnimatedComponent(ViewWithBoxShadow);

const TopNavigationBase = ({
  title,
  action,
  showTitle = true,
  height = 0,
  palette = "default",
  variant = "default",
  opacityYOffset = 0,
  mirrorColor = false,
  paletteType,
}: TopNavigationProps) => {
  const [headingHeight, setHeadingHeight] = useState(0);
  const { subscriptionHeroTitle } = useTopNavigationContext();
  const { styles } = useStyles(topNavigationStyles, {
    sectionVariant:
      variant === "default"
        ? undefined
        : variant === "subtle" && mirrorColor
          ? variant
          : undefined,
  });
  const { opacityShadowAnimation } = useTopNavigationAnimation(
    headingHeight,
    height,
    opacityYOffset,
    title,
    subscriptionHeroTitle,
  );

  const config = {
    title,
    showTitle,
    palette,
    opacityYOffset,
    variant,
    action,
    headingHeight,
    height,
    onHeadingHeightChange: setHeadingHeight,
  };

  return !!action || !!title ? (
    <Nav
      testID="top-navigation"
      style={[
        styles.navigationContainer(height ?? 0),
        variant === "subtle" || paletteType
          ? styles.dynamicPaletteBackground(palette, paletteType)
          : styles.backgroundColor,
      ]}
    >
      <>
        <AnimatedViewWithShadowBox
          shadowStylePreset="bottom"
          testID="top-navigation-shadow"
          style={[
            styles.shadow,
            styles.shadowTopOffset(height || headingHeight),
            opacityShadowAnimation,
          ]}
        />
        <TopNavigationContent {...config} />
      </>
    </Nav>
  ) : null;
};

const TopNavigationContent = ({
  title,
  showTitle,
  action,
  headingHeight,
  height = 0,
  opacityYOffset = 0,
  onHeadingHeightChange,
}: TopNavigationContentProps) => {
  const [actionWidth, setActionWidth] = useState(0);
  const { styles } = useStyles(topNavigationStyles, {
    hasActions: !!(action?.left || action?.right),
  });
  const { subscriptionHeroTitle } = useTopNavigationContext();
  const { opacityTitleAnimation } = useTopNavigationAnimation(
    headingHeight,
    height,
    opacityYOffset,
    title,
  );

  const handleTitleLayout = useCallback(
    (event: { nativeEvent: { layout: { width: number; height: number } } }) => {
      const { height } = event.nativeEvent.layout;
      onHeadingHeightChange(height);
    },
    [onHeadingHeightChange],
  );

  const handleActionLayout = useCallback(
    (event: { nativeEvent: { layout: { width: number; height: number } } }) => {
      const { width } = event.nativeEvent.layout;
      setActionWidth(width);
    },
    [setActionWidth],
  );

  return (
    <Grid>
      <Grid.Column style={styles.contentColumn}>
        {!!action && action.left && (
          <View
            testID="top-navigation-left-button"
            onLayout={handleActionLayout}
          >
            <Pressable style={styles.navigationButtonWrapper}>
              {action.left}
            </Pressable>
          </View>
        )}
        {!!action && !action.left && action.right && (
          <View style={styles.navigationMinWidth(actionWidth)} />
        )}
        {showTitle && !!(subscriptionHeroTitle || title) && (
          <View
            style={[styles.contentHeadingContainer, styles.contentAlignment]}
            onLayout={!height ? handleTitleLayout : undefined}
          >
            <Animated.View
              testID="top-navigation-content"
              style={[styles.contentHeading, opacityTitleAnimation]}
            >
              <Heading size="sm" alignment="center">
                {subscriptionHeroTitle || title}
              </Heading>
            </Animated.View>
          </View>
        )}
        {!!action && action.right && (
          <View testID="top-navigation-right-button">
            <Pressable style={styles.navigationButtonWrapper}>
              {action.right}
            </Pressable>
          </View>
        )}

        {!!action && !action.right && action.left && (
          <View style={styles.navigationMinWidth(actionWidth)} />
        )}
      </Grid.Column>
    </Grid>
  );
};

export { TopNavigationBase };
