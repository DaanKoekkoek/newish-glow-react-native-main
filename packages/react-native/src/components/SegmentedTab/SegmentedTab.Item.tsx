import { resolveThemePrimitives } from "_theming/resolveThemePrimitives";
import { useThemeProviderContext } from "components/index";
import { Icon } from "foundations/Icon";
import { Strong } from "foundations/Strong";
import React from "react";
import { View } from "react-native";
import {
  createStyleSheet,
  UnistylesRuntime,
  useStyles,
} from "react-native-unistyles";

import type {
  SegmentedTabItemProps,
  TabState,
  Tab,
} from "./SegmentedTab.types";

const isTabWithIcon = (content: Tab): content is Tab => {
  return (content as Tab).icon !== undefined;
};

export const SegmentedTabItem = ({
  content,
  selected,
  activeState,
  variant,
}: SegmentedTabItemProps): JSX.Element => {
  const { styles } = useStyles(stylesheet, {
    variant: variant === "default" ? undefined : variant,
  });
  const { brand } = useThemeProviderContext();

  const iconLabel = content.icon ? content.icon : "";

  return (
    <>
      <View
        style={styles.tab}
        aria-label={content.label + iconLabel}
        testID={content.label}
        aria-selected={selected}
      >
        {isTabWithIcon(content) && (
          <Icon
            brand={brand !== "simpel" ? brand : undefined}
            style={styles.icon(selected, activeState)}
            name={content.icon!}
          />
        )}
        <Strong
          size={isTabWithIcon(content) ? "xs" : "sm"}
          style={styles.text(selected, activeState)}
        >
          {content.label}
        </Strong>
      </View>
    </>
  );
};

const stylesheet = createStyleSheet(
  ({
    themes: {
      components: {
        tabs: {
          segmentedTab: { v1: segmentedTab },
        },
      },
    },
  }) => ({
    tab: {
      alignItems: "center",
    },
    icon: (selected: boolean, activeState: TabState) => {
      if (activeState === "inactive") {
        const iconColor = selected
          ? segmentedTab.color.icon.selected
          : segmentedTab.color.icon;

        return {
          color: iconColor.inactive,
        };
      }
      const iconColor = selected
        ? segmentedTab.color.icon.selected
        : segmentedTab.color.icon;

      return {
        variants: {
          variant: {
            subtle: {
              ...resolveThemePrimitives({
                value: iconColor.subtle,
                property: "color",
                themeName: UnistylesRuntime.themeName,
              }),
            },
            default: {
              ...resolveThemePrimitives({
                value: iconColor.default,
                property: "color",
                themeName: UnistylesRuntime.themeName,
              }),
            },
          },
        },
      };
    },
    text: (selected: boolean, active: TabState) => ({
      color:
        active !== "default"
          ? selected
            ? segmentedTab.color.text.selected.inactive
            : segmentedTab.color.text.inactive
          : segmentedTab.color.text.default,
    }),
  }),
);
