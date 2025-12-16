import { resolveThemePrimitives } from "_theming/resolveThemePrimitives";
import { useThemeProviderContext } from "components/index";
import React, { useEffect, useRef, useState } from "react";
import { type ViewStyle, Platform, View } from "react-native";
import { ShadowedView } from "react-native-fast-shadow";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
} from "react-native-reanimated";
import {
  UnistylesRuntime,
  createStyleSheet,
  useStyles,
} from "react-native-unistyles";

import type {
  SegmentedTabSelectorProps,
  TabState,
  TabVariant,
} from "./SegmentedTab.types";

const AnimatedShadowView = Animated.createAnimatedComponent(ShadowedView);

export const SegmentedTabSelector = ({
  active,
  tabItemMeasures,
  activeState,
  variant,
  palette,
}: SegmentedTabSelectorProps): JSX.Element => {
  const [shadowOffsetIndex, setShadowOffsetIndex] = useState(0);

  const selectorPosition = useSharedValue(0);
  const selectorWidth = useSharedValue(0);
  const isInitialRender = useRef(true);

  const { brand } = useThemeProviderContext();
  const {
    styles,
    theme: {
      themes: {
        components: {
          tabs: {
            segmentedTab: { v1: segmentedTab },
          },
        },
      },
    },
  } = useStyles(stylesheet);

  const showShadow =
    brand === "odido" && activeState === "default" && variant === "default";
  const themeName = UnistylesRuntime.themeName;
  const isWeb = Platform.OS === "web";
  const isIOS = Platform.OS === "ios";

  const shadowOffsets = [
    segmentedTab.dropShadow.stop_1,
    segmentedTab.dropShadow.stop_2,
    segmentedTab.dropShadow.stop_3,
  ].map(({ x, y }) => ({
    width: x,
    height: y,
  }));

  const shadowColour = Object.values(
    resolveThemePrimitives({
      value: segmentedTab.dropShadow.color,
      property: "shadowColor",
      themeName,
      selectedVariant: palette,
    }),
  )[0];

  const shadowOffsetHeight = useSharedValue(shadowOffsets[1].height);
  const shadowOffsetWidth = useSharedValue(shadowOffsets[1].width);

  useEffect(() => {
    if (tabItemMeasures.length === 0) return;

    const tabMeasure = tabItemMeasures[active] || {
      width: 0,
      x: 0,
    };

    const adjustableWidth = tabMeasure.width;
    const adjustableLeft = tabMeasure.x;

    if (!isInitialRender.current) {
      selectorPosition.value = withSpring(adjustableLeft, {
        stiffness: 135,
        damping: 20,
        mass: 1,
      });

      selectorWidth.value = withSpring(adjustableWidth, {
        stiffness: 135,
        damping: 20,
        mass: 1,
      });
    } else {
      selectorPosition.value = adjustableLeft;
      selectorWidth.value = adjustableWidth;
      isInitialRender.current = false;
    }
  }, [active, selectorPosition, selectorWidth, tabItemMeasures]);

  useEffect(() => {
    if (!showShadow) return;
    const updateShadowOffset = () => {
      setShadowOffsetIndex(
        (prevIndex) => (prevIndex + 1) % shadowOffsets.length,
      );
    };

    shadowOffsetHeight.value = withTiming(
      shadowOffsets[shadowOffsetIndex].height,
      { duration: 7000 },
      (isFinished) => {
        if (isFinished) {
          runOnJS(updateShadowOffset)();
        }
      },
    );

    shadowOffsetWidth.value = withTiming(
      shadowOffsets[shadowOffsetIndex].width,
      { duration: 7000 },
      (isFinished) => {
        if (isFinished) {
          runOnJS(updateShadowOffset)();
        }
      },
    );
  }, [
    shadowOffsetHeight,
    shadowOffsetIndex,
    shadowOffsetWidth,
    shadowOffsets,
    showShadow,
  ]);

  const animatedSelectorStyle = useAnimatedStyle(
    () => ({
      left: selectorPosition.value,
      width: selectorWidth.value,
    }),
    [selectorPosition, selectorWidth],
  );

  const animatedBoxShadowStyle = useAnimatedStyle((): ViewStyle => {
    const style: ViewStyle = {};

    if (isWeb) {
      (style as any).boxShadow =
        `${String(shadowColour)} ${shadowOffsetWidth.value}px ${shadowOffsetHeight.value}px ${segmentedTab.dropShadow.blur}px ${segmentedTab.dropShadow.spread}px`;
    } else {
      style.shadowOffset = {
        width: shadowOffsetWidth.value,
        height: shadowOffsetHeight.value,
      };
      style.shadowColor = String(shadowColour);
      style.shadowOpacity = 1;
      style.shadowRadius = isIOS ? 15 : segmentedTab.dropShadow.blur;
    }

    return style;
  }, [
    isWeb,
    shadowColour,
    shadowOffsetWidth.value,
    shadowOffsetHeight.value,
    segmentedTab.dropShadow.blur,
    segmentedTab.dropShadow.spread,
    isIOS,
  ]);

  return (
    <View style={styles.container}>
      {showShadow ? (
        <AnimatedShadowView
          testID="tab-selector"
          style={[
            animatedSelectorStyle,
            animatedBoxShadowStyle,
            styles.selector,
            styles.selectorBackgroundColor(activeState, variant),
          ]}
        />
      ) : (
        <Animated.View
          testID="tab-selector"
          style={[
            animatedSelectorStyle,
            styles.selector,
            styles.selectorBackgroundColor(activeState, variant),
          ]}
        />
      )}
    </View>
  );
};

const stylesheet = createStyleSheet(
  ({
    themes: {
      components: {
        tabs: {
          segmentedTab: { v1: segmentedTab },
        },
      },
    },
  }) => ({
    container: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      overflow: "hidden",
    },
    selector: {
      position: "absolute",
      zIndex: 10,
      borderRadius: segmentedTab.radius.default,
      bottom: segmentedTab.padding.horizontal,
      top: segmentedTab.padding.vertical,
    },
    selectorBackgroundColor: (active: TabState, variant: TabVariant) => ({
      backgroundColor:
        active === "default"
          ? segmentedTab.color.background.selected[variant]
          : segmentedTab.color.background.selected.inactive,
    }),
  }),
);
