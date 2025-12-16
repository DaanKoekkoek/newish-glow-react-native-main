import { View } from "react-native";
import Animated from "react-native-reanimated";
import { useStyles, createStyleSheet } from "react-native-unistyles";

import type { SpinnerSize, SpinnerProps } from "./Spinner.types";
import { useLoadingAnimation } from "./hooks";
import { SpinIcon } from "./icons/loading";

const Spinner = ({
  containerStyle,
  style,
  size = "default",
  color,
}: SpinnerProps) => {
  const { rotationAnimation } = useLoadingAnimation();

  const { styles } = useStyles(stylesheet);

  return (
    <View
      style={[styles.container, styles.containerSize(size), containerStyle]}
    >
      <Animated.View style={[rotationAnimation]}>
        <SpinIcon
          size={size}
          color={color || "default"}
          style={style}
          testID="loading-icon"
        />
      </Animated.View>
    </View>
  );
};

const stylesheet = createStyleSheet(
  ({
    themes: {
      semantics: {
        size: { icon },
      },
    },
  }) => ({
    container: {
      justifyContent: "center",
      alignItems: "center",
    },
    containerSize: (size: SpinnerSize) => {
      return {
        width: icon[size],
        height: icon[size],
      };
    },
  }),
);

export { Spinner };
