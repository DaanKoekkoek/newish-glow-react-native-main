import {
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";

interface CardProductVisualTheme {
  hover: number;
  default: number;
}

export const useCardAnimation = (
  isHovered: boolean,
  cardProductvisual: CardProductVisualTheme,
) => {
  const visualHoverProgress = useDerivedValue(
    () =>
      withTiming(
        isHovered
          ? cardProductvisual.hover / cardProductvisual.default
          : cardProductvisual.default / cardProductvisual.default,
      ),
    [cardProductvisual.default, cardProductvisual.hover, isHovered],
  );
  const gradientHoverProgress = useDerivedValue(
    () => withTiming(isHovered ? 1 : 0, { duration: 200 }),
    [isHovered],
  );

  const visualAnimation = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: visualHoverProgress.value,
        },
      ],
    };
  }, [visualHoverProgress]);

  const gradientAnimation = useAnimatedStyle(() => {
    return {
      opacity: gradientHoverProgress.value,
    };
  }, [gradientHoverProgress]);

  return { visualAnimation, gradientAnimation };
};
