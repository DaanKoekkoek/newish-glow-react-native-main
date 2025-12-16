import { mergeTestIds } from "_utility";
import { Paragraph } from "foundations/Paragraph";
import { View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

import type { ActionButtonProps } from "./ActionButton.types";
import { ActionButtonIcon } from "./ActionButtonIcon";

const version = "v1";

export const ActionButton = ({
  onPress,
  label,
  style,
  testID,
  prominence,
  palette = "default",
  ...props
}: ActionButtonProps) => {
  const { styles } = useStyles(stylesheet, {
    emphasised: prominence === "emphasised",
  });

  const actionButtonTestID = mergeTestIds(testID, "action-button");

  return (
    <View testID={actionButtonTestID} style={[styles.wrapper, style]}>
      <ActionButtonIcon
        onPress={onPress}
        {...props}
        stretched
        prominence={prominence}
        size={prominence === "emphasised" ? "md" : "default"}
        palette={palette}
      />
      <Paragraph size="xs" style={styles.label}>
        {label}
      </Paragraph>
    </View>
  );
};

const stylesheet = createStyleSheet(
  ({
    themes: {
      components: {
        button: {
          actionButton: { [version]: actionButton },
        },
      },
    },
  }) => ({
    wrapper: {
      paddingVertical: actionButton.padding.container.vertical.default,
      rowGap: actionButton.gap.vertical.default,
      alignItems: "center",
      minWidth: actionButton.size.minWidth,
      alignSelf: "flex-start",
      flexGrow: 1,
      variants: {
        emphasised: {
          true: {
            rowGap: actionButton.gap.vertical.emphasised,
            backgroundColor: actionButton.color.container.emphasised,
            borderRadius: actionButton.radius.container.emphasised,
            paddingVertical: actionButton.padding.container.vertical.emphasised,
          },
        },
      },
    },
    label: {
      zIndex: -1,
      textAlign: "center",
    },
  }),
);
