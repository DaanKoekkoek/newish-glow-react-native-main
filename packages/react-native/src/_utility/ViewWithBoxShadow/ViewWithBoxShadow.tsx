import React from "react";
import type { View, ViewStyle } from "react-native";
import { ShadowedView } from "react-native-fast-shadow";
import Animated from "react-native-reanimated";

import { type ViewWithBoxShadowProps } from "./ViewWithBoxShadow.types";
import { useViewWithBoxShadow } from "./useViewWithBoxShadow";

const AnimatedShadowedView = Animated.createAnimatedComponent(ShadowedView);

export const ViewWithBoxShadow = React.forwardRef<View, ViewWithBoxShadowProps>(
  ({ children, style, shadowStylePreset = "default", testID }, ref) => {
    const boxShadowStyle = useViewWithBoxShadow(shadowStylePreset);

    return (
      <AnimatedShadowedView
        ref={ref}
        style={[style, boxShadowStyle] as ViewStyle[]}
        testID={testID}
      >
        {children}
      </AnimatedShadowedView>
    );
  },
);
