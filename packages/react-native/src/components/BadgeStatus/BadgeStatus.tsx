import { mergeTestIds } from "_utility";
import { Icon } from "foundations/Icon";
import { Paragraph } from "foundations/Paragraph";
import { Text, View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

import { type BadgeStatusProps } from "./BadgeStatus.types";

const version = "v1";

export const BadgeStatus = ({
  count = 1,
  variant = "default",
  size = "default",
  testID,
}: BadgeStatusProps) => {
  const { styles } = useStyles(stylesheet, {
    variant: variant === "default" ? undefined : variant,
    size: size === "default" ? undefined : size,
  });

  const badgeStatusTestID = mergeTestIds(testID, "badge-status");
  const adjustedCount = count > 99 ? "99+" : count;

  return (
    <View testID={badgeStatusTestID} style={styles.badgeStatusContainer}>
      {variant === "default" && (
        <Paragraph style={styles.badgeNumber}>{adjustedCount}</Paragraph>
      )}
      {variant === "success" && (
        <View style={styles.badgeIconScale}>
          <Text style={styles.badgeIcon}>
            <Icon name="checkmark" size="sm" style={styles.badgeIcon} />
          </Text>
        </View>
      )}
      {variant === "error" && (
        <View style={styles.badgeIconScale}>
          <Text style={styles.badgeIcon}>
            <Icon name="close" size="sm" style={styles.badgeIcon} />
          </Text>
        </View>
      )}
    </View>
  );
};

const stylesheet = createStyleSheet(
  ({
    themes: {
      components: {
        badges: {
          badgeStatus: { [version]: badgeStatus },
        },
      },
    },
  }) => ({
    badgeStatusContainer: {
      borderRadius: badgeStatus.radius.default,
      backgroundColor: badgeStatus.color.background.default,
      alignItems: "center",
      alignContent: "center",
      justifyContent: "center",
      textAlign: "center",
      variants: {
        variant: {
          default: {
            paddingHorizontal: badgeStatus.padding.horizontal.number.default,
            paddingVertical: badgeStatus.padding.vertical.number.default,
          },
          success: {
            paddingHorizontal: badgeStatus.padding.horizontal.icon.default,
            paddingVertical: badgeStatus.padding.vertical.icon.default,
            backgroundColor: badgeStatus.color.background.success,
          },
          error: {
            paddingHorizontal: badgeStatus.padding.horizontal.icon.default,
            paddingVertical: badgeStatus.padding.vertical.icon.default,
            backgroundColor: badgeStatus.color.background.error,
          },
        },
        size: {
          default: {
            height: badgeStatus.size.badge.default,
            minWidth: badgeStatus.size.badge.default,
          },
          sm: {
            paddingHorizontal: badgeStatus.padding.horizontal.number.sm,
            paddingVertical: badgeStatus.padding.vertical.number.sm,
            height: badgeStatus.size.badge.sm,
            minWidth: badgeStatus.size.badge.sm,
          },
        },
      },
    },
    badgeNumber: {
      fontSize: badgeStatus.typography.fontSize.default,
      lineHeight: badgeStatus.typography.lineHeight.default,
      letterSpacing: badgeStatus.typography.letterSpacing.default,
      color: badgeStatus.color.text.default,
      display: "flex",
      alignItems: "center",
      alignContent: "center",
      justifyContent: "center",
      textAlign: "center",
      variants: {
        size: {
          sm: {
            fontSize: badgeStatus.typography.fontSize.sm,
            lineHeight: badgeStatus.typography.lineHeight.sm,
            letterSpacing: badgeStatus.typography.letterSpacing.sm,
          },
        },
      },
    },
    badgeIconScale: {
      alignItems: "center",
      justifyContent: "center",
      alignContent: "center",
      textAlign: "center",
      variants: {
        platform: {
          ios: {},
          android: {},
          windows: {},
          macos: {},
          web: {},
        },
        size: {
          sm: {
            transform: [{ scaleX: 0.5 }, { scaleY: 0.5 }],
          },
        },
      },
    },
    badgeIcon: {
      position: "absolute",
      width: badgeStatus.size.icon.default,
      height: badgeStatus.size.icon.default,
      color: badgeStatus.color.icon.default,
      variants: {
        variant: {
          sm: {
            width: badgeStatus.size.icon.sm,
            height: badgeStatus.size.icon.sm,
          },
        },
      },
    },
  }),
);
