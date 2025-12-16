import { useFontFamily } from "_global-hooks";
import type { IconProps } from "foundations/Icon";
import { Icon } from "foundations/Icon";
import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Pressable,
  Platform,
  type LayoutChangeEvent,
  Dimensions,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
  withDelay,
  useReducedMotion,
  useAnimatedRef,
  useSharedValue,
} from "react-native-reanimated";
import { useStyles } from "react-native-unistyles";

import { stylesheet } from "./Tooltip.styles";
import { type TooltipProps, type ToolTipPosition } from "./Tooltip.types";
import { useThemeProviderContext } from "../ThemeProvider";

const dimensions = Dimensions.get("window");

const Tooltip = ({
  description,
  children,
  animated = false,
  closeIcon = false,
  testID = "",
  posHorizontal = "Left",
}: TooltipProps) => {
  const [show, setShow] = useState(false);
  const [extraStyles, setExtraStyles] = useState(false);
  const [tip, setTip] = useState<ToolTipPosition>("default");
  const [windowDimensions, setWindowDimensions] = useState(dimensions);
  const [posVertical, setPosVertical] = useState<"top" | "bottom">("top");

  const refTooltip = useAnimatedRef<View>();
  const refTooltipBody = useRef<View>(null);
  const reduceMotion = useReducedMotion();
  const fontFamily = useFontFamily("Paragraph_Regular");
  const translateX = useSharedValue<{ x: number }>({ x: 0 });

  const { brand } = useThemeProviderContext();
  const { styles } = useStyles(stylesheet, {
    tipPosition: tip === "default" ? undefined : tip,
    brand,
  });

  const DURATION = 200;
  const DELAYWRAPPER = show ? 0 : 200;
  const DELAYTEXT = show ? 220 : 0;

  const animatedTooltip = useAnimatedStyle(() => ({
    opacity:
      animated && !reduceMotion && Platform.OS === "web"
        ? withDelay(DELAYWRAPPER, withTiming(show ? 1 : 0))
        : show
          ? 1
          : 0,
    transform:
      animated && !reduceMotion && Platform.OS === "web"
        ? [
            { scale: withDelay(DELAYWRAPPER, withTiming(show ? 1 : 0)) },
            { translateX: translateX.value.x },
          ]
        : [{ scale: show ? 1 : 0 }, { translateX: translateX.value.x }],
  }));

  const animatedTooltipText = useAnimatedStyle(() => ({
    opacity:
      animated && !reduceMotion && Platform.OS === "web"
        ? withDelay(DELAYTEXT, withTiming(show ? 1 : 0))
        : show
          ? 1
          : 0,
    transform:
      animated && !reduceMotion && Platform.OS === "web"
        ? [
            {
              translateY: withDelay(
                DELAYTEXT,
                withTiming(show ? 0 : 10, {
                  duration: DURATION,
                }),
              ),
            },
          ]
        : [],
  }));

  const animatedTooltipTip = useAnimatedStyle(() => ({
    opacity:
      animated && !reduceMotion && Platform.OS === "web"
        ? withTiming(show ? 1 : 0)
        : show
          ? 1
          : 0,
  }));

  const buttonProps =
    Platform.OS === "web" && !closeIcon
      ? {
          onPress: () => toggleVisibility(!show),
          onMouseEnter: () => toggleVisibility(true),
          onMouseLeave: () => toggleVisibility(false),
        }
      : { onPress: () => toggleVisibility(!show) };

  const onLayoutText = (event: LayoutChangeEvent) => {
    if (event.nativeEvent.layout.width >= styles.text.maxWidth) {
      setExtraStyles(true);
    }
  };

  const handlePosition = (window: typeof windowDimensions) => {
    let tHeight = 0;
    refTooltip.current?.measure((x, y, width, height, pageX, pageY) => {
      const pos = pageX + width + 3;
      if (posHorizontal === "Right") {
        if (pos >= window.width) {
          translateX.value = { x: window.width - pos };
        } else {
          translateX.value = { x: 0 };
        }
      }
      if (posHorizontal === "Left") {
        if (pageX < 0) {
          translateX.value = { x: -pageX };
        } else {
          translateX.value = { x: 0 };
        }
      }
      tHeight = height;
    });

    refTooltipBody.current?.measure((x, y, width, height, pageX, pageY) => {
      if (pageY - tHeight < 0) {
        setPosVertical("bottom");
      } else {
        setPosVertical("top");
      }
      setTip(`${posVertical}${posHorizontal}` as ToolTipPosition);
    });
  };

  const toggleVisibility = (show: boolean) => {
    setShow(show);
  };

  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", ({ window }) => {
      setWindowDimensions(window);
    });
    return () => subscription?.remove?.();
  }, []);

  handlePosition(windowDimensions);

  return (
    <View style={styles.wrapper}>
      <Animated.View
        style={[styles.tooltip, animatedTooltip]}
        ref={refTooltip}
        testID={testID}
      >
        <Animated.View style={[styles.container, animatedTooltipText]}>
          <Animated.Text
            style={[
              { fontFamily },
              styles.text,
              extraStyles && styles.textWidth,
            ]}
            onLayout={onLayoutText}
          >
            {description}
          </Animated.Text>
          {!!closeIcon && (
            <Animated.Text
              style={styles.icon}
              onPress={() => toggleVisibility(false)}
              testID={testID}
            >
              <Icon
                brand={brand !== "simpel" ? brand : undefined}
                name="close"
                style={styles.icon}
              />
            </Animated.Text>
          )}
        </Animated.View>
      </Animated.View>
      <Pressable
        {...buttonProps}
        role="button"
        testID={testID}
        ref={refTooltipBody}
      >
        {brand === "simpel" && show && (
          <Animated.View style={[styles.tip, animatedTooltipTip]} />
        )}
        {children}
      </Pressable>
    </View>
  );
};

const TooltipIcon = (props: IconProps) => {
  const { styles } = useStyles(stylesheet);
  const { brand } = useThemeProviderContext();
  return (
    <Icon
      brand={brand !== "simpel" ? brand : undefined}
      {...props}
      style={styles.triggerIcon}
    />
  );
};

TooltipIcon.displayName = "Tooltip.Icon";

Tooltip.Icon = TooltipIcon;

export { Tooltip };
