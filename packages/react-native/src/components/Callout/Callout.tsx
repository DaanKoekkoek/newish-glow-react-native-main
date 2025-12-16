import { ensureExhaustive, mergeTestIds } from "_utility";
import { useThemeProviderContext } from "components/index";
import type { IconNames } from "foundations/Icon";
import { Icon } from "foundations/Icon";
import { Heading, Paragraph } from "foundations/index";
import React from "react";
import { Text, View } from "react-native";
import type { UnistylesBreakpoints } from "react-native-unistyles";
import { createStyleSheet, useStyles } from "react-native-unistyles";

import type { CalloutProps } from "./Callout.types";
import { Button } from "../Button";

const version = "v1";

export const Callout = ({
  status = "default",
  tipPosition = "default",
  content = "default",
  description,
  title,
  children,
  triggers,
  testID,
}: CalloutProps) => {
  const { styles, breakpoint } = useStyles(stylesheet, {
    status: status === "default" ? undefined : status,
    tipPosition: tipPosition === "default" ? undefined : tipPosition,
  });

  const calloutTestID = mergeTestIds(testID, "callout");
  const { brand } = useThemeProviderContext();

  const iconName = (status: CalloutProps["status"]): IconNames => {
    switch (status) {
      case "default":
        return "status-info";
      case "error":
        return "status-error";
      case "success":
        return "status-success";
      case "warning":
        return "status-warning";
      default:
        ensureExhaustive(status);
    }
  };

  const laptopOrDesktop = (
    ["laptop", "desktop"] as (keyof UnistylesBreakpoints)[]
  ).includes(breakpoint);
  const responsiveIconSize = laptopOrDesktop ? "md" : "default";
  const responsiveTitleSize = laptopOrDesktop ? "md" : "sm";
  const responsiveButtonSize = laptopOrDesktop ? "default" : "sm";

  const renderTrigger = (child: React.ReactElement, index: number) => {
    if (child.type === Button) {
      return React.cloneElement(child, {
        ...child.props,
        size: responsiveButtonSize,
        prominence: index === 0 ? "default" : "secondary",
        palette: "neutral", // for Switch
      });
    }

    return null;
  };

  return (
    <View testID={calloutTestID} style={[styles.container]}>
      <View style={[styles.top]}>
        <Text style={[styles.icon]}>
          <Icon
            brand={brand !== "simpel" ? brand : undefined}
            name={iconName(status)}
            size={responsiveIconSize}
            solid
          />
        </Text>
        <Heading size={responsiveTitleSize}>{title}</Heading>
      </View>
      {content === "default" ? (
        <Paragraph>{description}</Paragraph>
      ) : (
        children && children
      )}
      {React.Children.count(triggers) > 0 && (
        <View style={[styles.buttonContainer]}>
          {React.Children.map(triggers as React.ReactElement[], renderTrigger)}
        </View>
      )}
    </View>
  );
};

const stylesheet = createStyleSheet(
  ({
    themes: {
      components: {
        notifications: {
          callout: { [version]: callout },
        },
      },
    },
  }) => ({
    container: {
      borderWidth: callout.borderWidth.default,
      borderStyle: "solid",
      borderRadius: callout.radius.default,
      gap: callout.gap.vertical.default,
      paddingHorizontal: callout.padding.horizontal,
      paddingVertical: callout.padding.vertical,
      variants: {
        status: {
          default: {
            backgroundColor: callout.color.background.default.information,
            borderColor: callout.color.border.information,
          },
          error: {
            backgroundColor: callout.color.background.default.error,
            borderColor: callout.color.border.error,
          },
          success: {
            backgroundColor: callout.color.background.default.success,
            borderColor: callout.color.border.success,
          },
          warning: {
            backgroundColor: callout.color.background.default.warning,
            borderColor: callout.color.border.warning,
          },
        },
        tipPosition: {
          default: {
            borderBottomLeftRadius: callout.radius.none,
          },
          top: {
            borderTopLeftRadius: callout.radius.none,
          },
        },
      },
    },
    top: {
      alignItems: "center",
      flexDirection: "row",
      gap: callout.gap.horizontal.default,
    },
    icon: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      variants: {
        status: {
          default: {
            color: callout.color.icon.information,
          },
          error: {
            color: callout.color.icon.error,
          },
          success: {
            color: callout.color.icon.success,
          },
          warning: {
            color: callout.color.icon.warning,
          },
        },
      },
    },
    buttonContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: callout.gap.horizontal.default,
    },
  }),
);
