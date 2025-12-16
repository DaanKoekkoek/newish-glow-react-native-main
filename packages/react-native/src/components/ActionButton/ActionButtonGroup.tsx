import React from "react";
import { View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

import { ActionButton } from "./ActionButton";
import type {
  ActionButtonGroupProps,
  ActionButtonProps,
} from "./ActionButton.types";

const version = "v1";

const ActionButtonGroup = ({ children }: ActionButtonGroupProps) => {
  const { styles } = useStyles(stylesheet);

  return <View style={styles.wrapper}>{children}</View>;
};

const GroupButton: React.FC<ActionButtonProps> = (props): JSX.Element => {
  const { styles } = useStyles(stylesheet);
  return <ActionButton {...props} style={styles.groupActionButton} />;
};

const stylesheet = createStyleSheet(
  ({
    themes: {
      components: {
        button: {
          actionButtonGroup: { [version]: actionButtonGroup },
        },
      },
    },
  }) => ({
    wrapper: {
      flexDirection: "row",
      columnGap: actionButtonGroup.gap.horizontal,
    },
    groupActionButton: {
      flex: 1,
    },
  }),
);

GroupButton.displayName = "ActionButtonGroup.Button";

ActionButtonGroup.Button = GroupButton;

export { ActionButtonGroup };
