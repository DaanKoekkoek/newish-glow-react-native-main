import type { BreakpointKeys } from "_theming/breakpoints";
import { useCallback, useEffect } from "react";
import {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  interpolate,
  Easing,
} from "react-native-reanimated";
import { useStyles } from "react-native-unistyles";

import type { ModalWidth, ModalPosition } from "../Modal.types";

const version = "v1";

export const useModalAnimation = (
  isVisible: boolean,
  width: ModalWidth,
  breakpoint?: BreakpointKeys,
  position?: ModalPosition,
) => {
  const scaleProgress = useSharedValue(0);
  const fadeProgress = useSharedValue(0);
  const buttonFadeProgress = useSharedValue(0);
  const slideProgress = useSharedValue(0);

  const {
    theme: {
      themes: {
        components: {
          overlay: {
            modal: { [version]: modal },
          },
        },
      },
    },
  } = useStyles();

  useEffect(() => {
    if (isVisible) {
      scaleProgress.value = withTiming(1, {
        duration: 500,
        easing: Easing.out(Easing.exp),
      });
      fadeProgress.value = withTiming(1, {
        duration: 300,
        easing: Easing.linear,
      });
      slideProgress.value = withTiming(1, {
        duration: 500,
        easing: Easing.inOut(Easing.exp),
      });
    } else {
      scaleProgress.value = 0;
      fadeProgress.value = 0;
      slideProgress.value = 0;
    }
  }, [scaleProgress, fadeProgress, slideProgress, isVisible]);

  const closeButtonAnimation = useAnimatedStyle(() => {
    if (scaleProgress.value === 1) {
      buttonFadeProgress.value = withTiming(1, {
        duration: 300,
        easing: Easing.out(Easing.exp),
      });
    }

    return {
      opacity: interpolate(buttonFadeProgress.value, [0, 1], [0, 1]),
    };
  });

  const backdropAnimation = useAnimatedStyle(() => ({
    opacity: fadeProgress.value,
  }));

  const modalAnimation = useAnimatedStyle(() => {
    let translateXValue = 0;
    let translateYValue = 0;

    if (position === "right") {
      translateXValue = interpolate(
        slideProgress.value,
        [0, 1],
        [
          breakpoint
            ? modal.size.maxWidth[width][breakpoint]
            : modal.size.maxWidth.default.desktop,
          0,
        ],
      );
    } else if (position === "bottom") {
      translateYValue = interpolate(
        slideProgress.value,
        [0, 1],
        [
          breakpoint
            ? modal.size.maxWidth[width][breakpoint]
            : modal.size.maxWidth.default.desktop,
          0,
        ],
      );
    }
    const transform = [
      { translateX: translateXValue },
      { translateY: translateYValue },
      { scale: position === "default" ? scaleProgress.value : 1 },
    ];

    return {
      transform,
      opacity: fadeProgress.value,
    };
  });

  return { closeButtonAnimation, backdropAnimation, modalAnimation };
};

export const useScrollLockWeb = () => {
  const lockScroll = useCallback(() => {
    document.body.style.overflow = "hidden";
  }, []);

  const unlockScroll = useCallback(() => {
    document.body.style.overflow = "";
  }, []);

  return {
    lockScroll,
    unlockScroll,
  };
};
