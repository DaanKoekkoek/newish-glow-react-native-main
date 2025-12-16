import { ErrorMessage } from "_internals/ErrorMessage";
import { HelperText } from "_internals/HelperText";
import React from "react";
import { View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

import type { CheckboxGroupProps } from "./CheckboxGroup.types";
import { InputLabel } from "../InputField/InputLabel";

export const CheckboxGroup = ({
  children,
  errorMessage,
  helperText,
  legend,
  state = "default",
}: CheckboxGroupProps) => {
  const { styles } = useStyles(stylesheet);

  return !children ? null : (
    <View style={styles.container} testID="checkbox-group-container">
      {legend?.text && <InputLabel {...legend} testID="legend-container" />}
      {children}
      {state !== "error" && <HelperText text={helperText} />}
      {state === "error" && <ErrorMessage text={errorMessage} />}
    </View>
  );
};

const stylesheet = createStyleSheet(() => ({
  container: {
    alignItems: "stretch",
    flexDirection: "column",
  },
}));
