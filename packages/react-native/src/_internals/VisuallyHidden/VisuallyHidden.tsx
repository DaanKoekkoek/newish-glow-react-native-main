import { mergeTestIds } from "_utility";
import { Text } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

export const VisuallyHidden = ({
  children,
  testID = "text",
}: {
  children: string;
  testID?: string;
}) => {
  const { styles } = useStyles(stylesheet);
  const mergedTestIds = mergeTestIds(testID, "hidden");

  return (
    <Text style={styles.wrapper} testID={mergedTestIds}>
      {children}
    </Text>
  );
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
