import {
  useDerivedValue,
  withTiming,
  useAnimatedStyle,
} from "react-native-reanimated";
import { useStyles } from "react-native-unistyles";

import { topNavigationStyles } from "../TopNavigation.styles";
import { useTopNavigationContext } from "../TopNavigationContext";

export const useTopNavigationAnimation = (
  headingHeight: number,
  height: number,
  opacityYOffset: number,
  title?: string,
  subscriptionHeroTitle?: string,
) => {
  const { opacityOffset } = useTopNavigationContext();
  const { styles } = useStyles(topNavigationStyles);

  const topNavigationHeight = height
    ? height
    : headingHeight + styles.contentHeadingContainer.paddingVertical * 2;

  const startPosition = opacityOffset
    ? opacityOffset.y + topNavigationHeight
    : 0;

  const endPosition = opacityOffset
    ? startPosition + opacityOffset.height + topNavigationHeight
    : 0;

  const animatedOpacity = useDerivedValue(() => {
    const newOpacity = Math.min(
      Math.max(
        (opacityYOffset - startPosition) / (endPosition - startPosition),
        0,
      ),
      1,
    );

    return withTiming(newOpacity);
  }, [opacityYOffset, startPosition, endPosition]);

  const opacityTitleAnimation = useAnimatedStyle(() => {
    return {
      opacity:
        !subscriptionHeroTitle && !!title ? 1 : animatedOpacity.value || 0,
    };
  });

  const opacityShadowAnimation = useAnimatedStyle(() => {
    return {
      opacity: animatedOpacity.value || 0,
    };
  });
  return { opacityShadowAnimation, opacityTitleAnimation };
};
