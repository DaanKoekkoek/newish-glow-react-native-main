import type { BreakpointKeys } from "_theming/breakpoints";
import { AnimatedViewWithBoxShadow } from "_utility";
import { Icon } from "foundations/Icon";
import { Paragraph } from "foundations/Paragraph";
import React, { useMemo, useCallback, useEffect, useState } from "react";
import type { LayoutChangeEvent } from "react-native";
import { View, Platform, Pressable, useWindowDimensions } from "react-native";
import {
  Directions,
  Gesture,
  GestureDetector,
} from "react-native-gesture-handler";
import Animated, {
  LinearTransition,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { UnistylesRuntime, useStyles } from "react-native-unistyles";

import {
  snackbarStylesheet,
  snackbarItemStylesheet,
  snackbarAnimatorStylesheet,
} from "./Snackbar.style";
import type {
  SnackbarItemProps,
  SnackbarProps,
  SnackbarAnimatorProps,
} from "./Snackbar.types";
import { snackbarHelper } from "./snackbarHelper";
import { useSnackbar } from "./useSnackbar";
import { Button } from "../Button";
import { Spinner } from "../Spinner";

export const SnackbarItem = ({
  dismissSnack,
  onLayout,
  snack,
  windowWidth,
  testID,
}: SnackbarItemProps) => {
  const iconProps = useMemo((): typeof snack.icon => {
    switch (snack.type) {
      case "error":
        return { name: "status-error", solid: true };
      case "success":
        return { name: "status-success", solid: true };
      default: {
        return snack.icon;
      }
    }
  }, [snack]);

  const { styles } = useStyles(snackbarItemStylesheet, {
    status: snack.type === "default" ? undefined : snack.type,
  });

  return (
    <AnimatedViewWithBoxShadow
      layout={LinearTransition.duration(200)}
      shadowStylePreset="right"
      style={styles.shadowWrapper(windowWidth)}
      testID={testID || "snackbar-item"}
    >
      <Animated.View
        onLayout={onLayout}
        style={styles.layout}
        key={snack.id}
        aria-live="polite"
        aria-role="alert"
        aria-busy={snack.type === "loading"}
        accessibilityValue={{ text: snack.accessabilityMessage }}
      >
        <View style={styles.messageWrapper} pointerEvents="auto">
          {snack.type === "loading" ? (
            <Spinner containerStyle={styles.spinner} />
          ) : (
            !!iconProps?.name && (
              <Icon
                {...iconProps}
                style={styles.icon}
                testID={`${iconProps.name || "has"}-icon`}
              />
            )
          )}
          <Paragraph>{snack.message}</Paragraph>
          {snack.type === "loading" && (
            <Button
              onPress={dismissSnack}
              prominence="secondary"
              size="sm"
              pressableStyle={styles.button}
            >
              {snack.cancelButtonText || "Annuleren"}
            </Button>
          )}
        </View>
      </Animated.View>
    </AnimatedViewWithBoxShadow>
  );
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const SnackbarAnimator = ({
  breakpoint,
  endPause,
  index,
  offset,
  onSnackHide,
  onSnackPress,
  onSnackShow,
  snack,
  startPause,
  topOffset,
  updateHeight,
  safeAreaInsets = { top: 0, right: 0, bottom: 0, left: 0 },
}: SnackbarAnimatorProps) => {
  const defaultSnackItemHeight = 62;
  const exitAnimDistanceInPx = 32;

  // Hooks
  const {
    styles,
    theme: {
      screenSizes: { grid },
    },
  } = useStyles(snackbarAnimatorStylesheet);
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();

  const [mounted, setMounted] = useState(false);
  const [snackHeight, setSnackHeight] = useState<number>(
    snack?.height || defaultSnackItemHeight,
  );
  const edgeOffset = useMemo(
    () => grid.margin[breakpoint],
    [breakpoint, grid.margin],
  );

  const startingY = useMemo(
    () =>
      snack.position === "top"
        ? -(snack.height || defaultSnackItemHeight) -
          safeAreaInsets.top +
          topOffset
        : windowHeight - safeAreaInsets.bottom,
    [
      snack.position,
      snack.height,
      safeAreaInsets.top,
      safeAreaInsets.bottom,
      topOffset,
      windowHeight,
    ],
  );

  const opacity = useSharedValue(0);
  const position = useSharedValue(startingY);
  const offsetY = useSharedValue(startingY);

  const onLayoutHandler = useCallback(
    (event: LayoutChangeEvent) => {
      updateHeight(snack.id, event.nativeEvent.layout.height);
      setSnackHeight(event.nativeEvent.layout.height);
    },
    [snack.id, updateHeight],
  );

  const onPress = useCallback(
    () => onSnackPress?.(snack),
    [onSnackPress, snack],
  );
  const dismiss = useCallback(() => {
    snackbarHelper.dismiss(snack.id);
  }, [snack.id]);

  const setPosition = useCallback(() => {
    const animConfig = {
      duration: 300,
    };

    if (snack.position === "top") {
      const hiddenY = offset + edgeOffset + topOffset - exitAnimDistanceInPx;
      const visibleY = offset + edgeOffset + topOffset;

      offsetY.value = withTiming(
        snack.visible ? visibleY : hiddenY,
        animConfig,
      );
      position.value = withTiming(
        snack.visible ? visibleY : hiddenY,
        animConfig,
      );
    } else {
      const visibleY =
        windowHeight -
        snackHeight -
        offset -
        safeAreaInsets.bottom -
        edgeOffset -
        Platform.select({ default: 88, web: 0 });

      const hiddenY = visibleY + exitAnimDistanceInPx;
      const valY = snack.visible ? visibleY : hiddenY;

      offsetY.value = withTiming(valY, animConfig);
      position.value = withTiming(valY, animConfig);
    }

    opacity.value = withTiming(snack.visible ? 1 : 0, animConfig);
  }, [
    snack.position,
    snack.visible,
    opacity,
    offset,
    edgeOffset,
    topOffset,
    offsetY,
    position,
    windowHeight,
    snackHeight,
    safeAreaInsets,
  ]);

  const composedGesture = useMemo(() => {
    const panGesture = Gesture.Pan()
      .onUpdate((e) => {
        offsetY.value = e.translationY / 4 + position.value;
      })
      .onEnd(() => {
        runOnJS(setPosition)();
      });

    const flingGesture = Gesture.Fling()
      .direction(snack.position === "top" ? Directions.UP : Directions.DOWN)
      .onEnd(() => {
        offsetY.value = withTiming(startingY, {
          duration: 40,
        });
        runOnJS(dismiss)();
      });

    return snack.isSwipeable
      ? Gesture.Simultaneous(flingGesture, panGesture)
      : panGesture;
  }, [
    offsetY,
    startingY,
    position,
    setPosition,
    snack.position,
    dismiss,
    snack.isSwipeable,
  ]);

  useEffect(() => {
    if (!mounted && snack.visible) {
      setMounted(true);
      onSnackShow?.(snack);
    }

    if (mounted && !snack.visible) {
      setMounted(false);
      onSnackHide?.(snack);
    }
  }, [snack, mounted, onSnackShow, onSnackHide]);
  useEffect(() => {
    if (snack?.height) setSnackHeight(snack.height);
  }, [snack.height]);
  useEffect(() => {
    setPosition();
  }, [offset, snack.visible, snackHeight, setPosition]);

  const animatedStyles = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      {
        translateY: offsetY.value,
      },
    ],
  }));

  return (
    <GestureDetector key={snack.id} gesture={composedGesture}>
      <AnimatedPressable
        onPressIn={startPause}
        onPressOut={endPause}
        onPress={onPress}
        style={[
          styles.animator(
            snack.visible,
            snack.position === "bottom" ? index : undefined,
          ),
          animatedStyles,
        ]}
        testID="snackbar-animator"
      >
        <SnackbarItem
          dismissSnack={dismiss}
          onLayout={onLayoutHandler}
          snack={snack}
          windowWidth={windowWidth}
        />
      </AnimatedPressable>
    </GestureDetector>
  );
};

export const Snackbar = ({
  onSnackHide,
  onSnackPress,
  onSnackShow,
  context = "persists",
  topOffset = 0,
  testID,
  safeAreaInsets = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
}: SnackbarProps) => {
  const { snacks, handlers } = useSnackbar({ context });
  const { startPause, endPause, updateHeight, calculateOffset } = handlers;

  const breakpoint = UnistylesRuntime.breakpoint as BreakpointKeys;
  const {
    styles,
    theme: {
      screenSizes: { grid },
    },
  } = useStyles(snackbarStylesheet);

  return (
    <View
      style={styles.container(context)}
      pointerEvents="box-none"
      testID={testID || "snackbar"}
    >
      {snacks.map((snack, index) => (
        <SnackbarAnimator
          breakpoint={breakpoint}
          endPause={endPause}
          index={index}
          key={snack.id}
          offset={calculateOffset(snack, {
            reverseOrder: false,
            gutter: grid.gap[breakpoint],
          })}
          onSnackHide={onSnackHide}
          onSnackPress={onSnackPress}
          onSnackShow={onSnackShow}
          snack={snack}
          startPause={startPause}
          topOffset={topOffset}
          updateHeight={updateHeight}
          safeAreaInsets={safeAreaInsets}
        />
      ))}
    </View>
  );
};
