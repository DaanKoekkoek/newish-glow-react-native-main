import { Text } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

export const VisuallyHidden = ({ children }: { children: string }) => {
  const { styles } = useStyles(stylesheet);

  return <Text style={styles.wrapper}>{children}</Text>;
};

const stylesheet = createStyleSheet(() => ({
  wrapper: {
    position: "absolute",
    width: 1,
    height: 1,
    margin: -1,
    zIndex: -10000,
    overflow: "hidden",
    opacity: 0.00000001,
    pointerEvents: "none",
  },
}));
