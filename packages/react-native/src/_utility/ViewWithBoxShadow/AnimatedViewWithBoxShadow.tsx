import type { ViewStyle } from "react-native";
import { ShadowedView } from "react-native-fast-shadow";
import Animated from "react-native-reanimated";

import type { AnimatedViewWithBoxShadowProps } from "./ViewWithBoxShadow.types";
import { useViewWithBoxShadow } from "./useViewWithBoxShadow";

const CustomView = Animated.createAnimatedComponent(ShadowedView);

export const AnimatedViewWithBoxShadow = ({
  children,
  layout,
  style,
  shadowStylePreset = "default",
  testID,
}: AnimatedViewWithBoxShadowProps) => {
  const animatedBoxShadowStyle = useViewWithBoxShadow(shadowStylePreset);

  return (
    <CustomView
      layout={layout}
      style={[style, animatedBoxShadowStyle as ViewStyle]}
      testID={testID}
    >
      {children}
    </CustomView>
  );
};
