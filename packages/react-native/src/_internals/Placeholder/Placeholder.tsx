import { Paragraph } from "foundations/Paragraph";
import React from "react";
import { View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

export const Placeholder = () => {
  const { styles } = useStyles(stylesheet);

  return (
    <View style={styles.container}>
      <Paragraph>Replace me</Paragraph>
    </View>
  );
};

const stylesheet = createStyleSheet(() => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    width: "100%",
    flexGrow: 1,
    flexShrink: 1,
    alignSelf: "stretch",
    borderWidth: 2,
    borderColor: "black",
    borderStyle: "dashed",
  },
}));
