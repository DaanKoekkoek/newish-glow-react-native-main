import type { BreakpointKeys } from "_theming/breakpoints";
import { Icon } from "foundations/Icon";
import { Paragraph, Stack } from "foundations/index";
import React from "react";
import { View } from "react-native";
import {
  useStyles,
  createStyleSheet,
  UnistylesRuntime,
} from "react-native-unistyles";

import { type NotifyBarProps } from "./NotifyBar.types";
import { Button } from "../Button";
import { useThemeProviderContext } from "../ThemeProvider";

export const NotifyBar = ({
  message,
  actionText,
  closeText,
  onActionPress = () => {},
  onClose,
  icon,
  state = "default",
}: NotifyBarProps) => {
  const { styles } = useStyles(notifyBarStyles, {
    state: state === "default" ? null! : state,
  });

  const iconName =
    state === "error"
      ? "status-error"
      : state === "success"
        ? "oval-checkmark"
        : icon;

  const breakpoint = UnistylesRuntime.breakpoint as BreakpointKeys;

  const { brand, theme } = useThemeProviderContext();

  return (
    <View style={[styles.container, styles.containerGridOffset(breakpoint)]}>
      <Stack
        grow={false}
        alignItems="center"
        justifyContent="center"
        direction={{ mobileSmall: "column", laptop: "row" }}
        style={styles.textContainer}
      >
        {iconName && (
          <Icon
            brand={brand !== "simpel" ? brand : undefined}
            name={iconName}
            size="default"
            style={styles.icon}
          />
        )}
        <Paragraph size="sm" style={styles.message}>
          {message}
        </Paragraph>
      </Stack>
      {(actionText || closeText) && (
        <View style={styles.buttonContainer}>
          {actionText && (
            <Button
              size="sm"
              onPress={onActionPress}
              inverted={
                theme !== "dark" || (theme === "dark" && state === "default")
              }
            >
              {actionText}
            </Button>
          )}
          {closeText && (
            <Button
              size="sm"
              prominence="secondary"
              onPress={onClose}
              inverted={
                theme !== "dark" || (theme === "dark" && state === "default")
              }
            >
              {closeText}
            </Button>
          )}
        </View>
      )}
    </View>
  );
};

export const notifyBarStyles = createStyleSheet(
  ({
    themes: {
      components: {
        notifications: {
          notifyBar: { v1: notifyBar },
        },
      },
    },
  }) => ({
    container: {
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: notifyBar.padding.vertical,
      paddingHorizontal: notifyBar.padding.horizontal,
      gap: {
        mobileSmall: notifyBar.gap.vertical.default,
        mobile: notifyBar.gap.vertical.default,
        tablet: notifyBar.gap.vertical.default,
        laptop: notifyBar.gap.horizontal.lg,
        desktop: notifyBar.gap.horizontal.lg,
      },
      flexDirection: {
        mobileSmall: "column",
        mobile: "column",
        tablet: "column",
        laptop: "row",
        desktop: "row",
      },
      variants: {
        state: {
          default: {
            backgroundColor: notifyBar.color.background.default,
          },
          success: {
            backgroundColor: notifyBar.color.background.success,
          },
          error: {
            backgroundColor: notifyBar.color.background.error,
          },
        },
      },
    },
    containerGridOffset: (breakpoint: BreakpointKeys) => {
      return {
        marginHorizontal: notifyBar.padding.horizontal[breakpoint] * -1,
      };
    },
    message: {
      variants: {
        state: {
          default: {
            color: notifyBar.color.text.default,
          },
          success: {
            color: notifyBar.color.text.success,
          },
          error: {
            color: notifyBar.color.text.error,
          },
        },
      },
    },
    icon: {
      height: notifyBar.size.icon.default,
      width: notifyBar.size.icon.default,
      variants: {
        state: {
          default: {
            color: notifyBar.color.icon.default,
          },
          success: {
            color: notifyBar.color.icon.success,
          },
          error: {
            color: notifyBar.color.icon.error,
          },
        },
      },
    },
    textContainer: {
      gap: {
        mobileSmall: notifyBar.gap.vertical.sm,
        mobile: notifyBar.gap.vertical.sm,
        tablet: notifyBar.gap.vertical.sm,
        laptop: notifyBar.gap.horizontal.default,
        desktop: notifyBar.gap.horizontal.default,
      },
    },
    buttonContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      gap: notifyBar.gap.horizontal.default,
    },
  }),
);
