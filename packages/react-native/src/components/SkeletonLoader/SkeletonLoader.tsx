import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
  withSequence,
} from "react-native-reanimated";
import { createStyleSheet, useStyles } from "react-native-unistyles";

import type { SkeletonLoaderProps } from "./SkeletonLoader.types";

export const SkeletonLoader = ({
  size = "default",
  testID = "skeleton-loader",
}: SkeletonLoaderProps) => {
  const {
    styles,
    theme: {
      themes: {
        components: {
          progressIndicators: {
            skeletonLoader: {
              v1: {
                color: { background, gradient },
              },
            },
          },
        },
      },
    },
  } = useStyles(stylesheet);

  const translateX = useSharedValue(-2000);

  useEffect(() => {
    translateX.value = withSequence(
      // Immediate start animation
      withTiming(1000, {
        duration: 1000,
        easing: Easing.linear,
      }),
      // Reset translateX to -2000
      withTiming(-2000, { duration: 0 }),
      // Repeating animation with delay
      withRepeat(
        withTiming(1000, {
          duration: 1000,
          easing: Easing.linear,
        }),
        -1,
        false,
      ),
    );
  }, [translateX]);

  const animatedGradientStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  return (
    <View style={styles.square(size)} testID={testID}>
      <Animated.View style={[styles.gradientContainer, animatedGradientStyle]}>
        <LinearGradient
          colors={[
            background,
            gradient.stop_1,
            gradient.stop_2,
            gradient.stop_3,
            gradient.stop_4,
            background,
          ]}
          start={{ x: 0.7, y: 0 }}
          end={{ x: 0.3, y: 1 }}
          style={styles.gradient}
        />
      </Animated.View>
    </View>
  );
};

const stylesheet = createStyleSheet(
  ({
    themes: {
      components: {
        progressIndicators: {
          skeletonLoader: { v1: skeletonLoader },
        },
      },
    },
  }) => ({
    square: (size: string) => ({
      width: "100%",
      height:
        size === "default"
          ? skeletonLoader.size.height.default
          : size === "sm"
            ? skeletonLoader.size.height.sm
            : skeletonLoader.size.height.lg,
      borderRadius: skeletonLoader.radius,
      backgroundColor: skeletonLoader.color.background,
      overflow: "hidden",
    }),
    gradientContainer: {
      height: "100%",
      width: "200%",
    },
    gradient: {
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
  }),
);
