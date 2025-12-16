import { GlowGradient } from "foundations/GlowGradient/GlowGradient";
import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Platform } from "react-native";
import {
  GestureHandlerRootView,
  GestureDetector,
  Gesture,
} from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  runOnJS,
} from "react-native-reanimated";
import {
  createStyleSheet,
  UnistylesRuntime,
  useStyles,
} from "react-native-unistyles";

import type { SliderProps } from "./Slider.types";
import { resolveThemePrimitives } from "../../_theming/resolveThemePrimitives";
import type { OdidoPalette } from "../../_theming/tokenLoader";
import { Button } from "../Button";

export const Slider = ({
  minValue,
  maxValue,
  value = 0,
  step = 1,
  palette = "default",
  onValueChange,
}: SliderProps) => {
  const [buttonWidth, setButtonWidth] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const [maxOffset, setMaxOffset] = useState(0);

  const isWeb = Platform.OS === "web";
  const isIos = Platform.OS === "ios";
  const isAndroid = Platform.OS === "android";

  const buttonRef = useRef<View>(null);
  const offset = useSharedValue(0);

  const { styles } = useStyles(stylesheet);

  const calculateMaxOffset = (containerWidth: number, buttonWidth: number) =>
    containerWidth - buttonWidth;

  const handleLayout = (event: {
    nativeEvent: { layout: { width: number } };
  }) => {
    const { width } = event.nativeEvent.layout;
    setContainerWidth(width);

    if (buttonRef.current) {
      buttonRef.current.measure(
        (x: any, y: any, width: React.SetStateAction<number>) => {
          setButtonWidth(width);
        },
      );
    }
  };

  useEffect(() => {
    if (containerWidth && buttonWidth) {
      const newMaxOffset = calculateMaxOffset(containerWidth, buttonWidth);
      setMaxOffset(newMaxOffset);
      // Calculate the initial offset based on the position
      const initialOffset =
        value != null && value !== 0 && value <= maxValue && value >= minValue
          ? ((value - minValue) / (maxValue - minValue)) * newMaxOffset
          : offset.value;
      //ios is slightly off, so i'm adjusting for that
      offset.value = initialOffset - (isIos ? 10 : 0);
    }
  }, [
    value,
    minValue,
    maxValue,
    containerWidth,
    buttonWidth,
    offset,
    maxOffset,
    isWeb,
    isIos,
  ]);

  const pan = Gesture.Pan()
    .onChange((event) => {
      const newOffset = Math.max(
        Math.min(offset.value + event.changeX, maxOffset),
        0,
      );
      offset.value = newOffset + (isIos ? 10 : 0);
    })
    .onEnd(() => {
      const normalizedOffset = offset.value / maxOffset;
      const rawValue = minValue + normalizedOffset * (maxValue - minValue);
      const snappedValue = Math.round(rawValue / step) * step;

      const snappedOffset =
        ((snappedValue - minValue) / (maxValue - minValue)) * maxOffset;

      offset.value = snappedOffset + (isIos ? 10 : 0);

      if (onValueChange && isAndroid) {
        runOnJS(onValueChange)(snappedValue);
      } else if (onValueChange) {
        onValueChange(snappedValue);
      }
    });

  const tap = Gesture.Tap().onStart((event) => {
    const tapX = event.x; // Position relative to the track
    const normalizedTap = Math.max(0, Math.min(tapX, containerWidth));

    const normalizedOffset = normalizedTap / containerWidth;
    const rawValue = minValue + normalizedOffset * (maxValue - minValue);

    const snappedValue = Math.round(rawValue / step) * step;

    const snappedOffset =
      ((snappedValue - minValue) / (maxValue - minValue)) * maxOffset;

    offset.value = snappedOffset + (isIos ? 10 : 0);

    if (onValueChange) {
      runOnJS(onValueChange)(snappedValue);
    }
  });

  const gradientStyle = useAnimatedStyle(() => ({
    width:
      buttonWidth === 0 ? 0 : offset.value + buttonWidth / 2 + (isIos ? 10 : 0),
  }));

  const sliderStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: offset.value }],
  }));

  return (
    <GestureHandlerRootView testID="slider-handle" style={styles.container}>
      <GestureDetector gesture={tap}>
        <View
          style={[styles.sliderTrackBackground(palette), styles.sliderTrack]}
          onLayout={handleLayout}
        >
          <Animated.View style={[styles.gradientTrack, gradientStyle]}>
            <GlowGradient
              zIndex={0}
              type="Linear4"
              renderAs="static"
              style={StyleSheet.absoluteFill}
            />
          </Animated.View>
          <GestureDetector gesture={pan}>
            <Animated.View
              collapsable={false}
              style={[styles.sliderHandle, sliderStyle]}
            >
              <View ref={buttonRef} collapsable={false}>
                <Button>
                  <Button.Icon name="slider" />
                </Button>
              </View>
            </Animated.View>
          </GestureDetector>
        </View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

const version = "v1";

const stylesheet = createStyleSheet(
  ({
    themes: {
      components: {
        input: {
          slider: { [version]: slider },
        },
      },
    },
  }) => ({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    sliderTrackBackground: (palette: OdidoPalette) => {
      return resolveThemePrimitives({
        value: slider.color.background.default,
        property: "backgroundColor",
        themeName: UnistylesRuntime.themeName,
        selectedVariant: palette,
      });
    },

    sliderTrack: {
      width: "100%",
      height: slider.size.height,
      borderRadius: slider.radius.default,
      justifyContent: "center",
    },
    sliderHandle: {
      position: "absolute",
    },
    gradientTrack: {
      backgroundColor: slider.color.background.selected,
      position: "absolute",
      height: "100%",
      borderRadius: slider.radius.default,
      overflow: "hidden",
    },
  }),
);
