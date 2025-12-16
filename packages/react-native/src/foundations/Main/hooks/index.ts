import { Platform } from "react-native";
import { useAnimatedStyle, withTiming, Easing } from "react-native-reanimated";
import type { SharedValue } from "react-native-reanimated";

export const useMainHooks = (
  hasVerticalOverflow: boolean,
  headerScrollY: SharedValue<number>,
  stickyBarScrollY: SharedValue<number>,
) => {
  const scrollbarWidth = () => {
    if (!hasVerticalOverflow || Platform.OS !== "web") return 0;

    const outer = document.createElement("div");
    outer.style.visibility = "hidden";
    outer.style.overflow = "scroll";
    document.body.appendChild(outer);

    const inner = document.createElement("div");
    outer.appendChild(inner);

    const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;
    outer.remove();

    return scrollbarWidth;
  };

  const animatedNavStyle = useAnimatedStyle(
    () => ({
      transform: [
        {
          translateY: withTiming(headerScrollY.value, {
            duration: 150,
            easing: Easing.out(Easing.ease),
          }),
        },
      ],
    }),
    [headerScrollY],
  );

  const animatedStickyBarStyle = useAnimatedStyle(
    () => ({
      transform: [
        {
          translateY: withTiming(stickyBarScrollY.value, {
            duration: 150,
            easing: Easing.out(Easing.ease),
          }),
        },
      ],
    }),
    [stickyBarScrollY],
  );

  return { scrollbarWidth, animatedNavStyle, animatedStickyBarStyle };
};
