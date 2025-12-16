import { resolveThemePrimitives } from "_theming/resolveThemePrimitives";
import { ensureExhaustive } from "_utility";
import { useSectionContext } from "foundations/Section/SectionContext";
import React, { useEffect, useState } from "react";
import { Pressable, View } from "react-native";
import {
  UnistylesRuntime,
  createStyleSheet,
  useStyles,
} from "react-native-unistyles";

import { SegmentedTabItem } from "./SegmentedTab.Item";
import { Panel } from "./SegmentedTab.Panel";
import { SegmentedTabSelector } from "./SegmentedTab.Selector";
import type {
  TabItemMeasures,
  TabState,
  TabVariant,
  SegmentedTabButtonsProps,
} from "./SegmentedTab.types";
import { useSegmentedTabContext } from "./useSegmentedTabContext";

export const SegmentedTabButtons = ({
  options,
  variant = "default",
  active = 0,
  state = "default",
  backgroundPalette,
  shadowPalette,
}: SegmentedTabButtonsProps): JSX.Element => {
  const { activeTab, setActiveTab, onTabChange } = useSegmentedTabContext();
  const { sectionPalette } = useSectionContext();

  const [tabItemMeasures, setTabItemMeasures] = useState<TabItemMeasures[]>([]);

  const isActiveState = state === "default";

  const { styles } = useStyles(stylesheet);

  const buttonWidth = options.length === 3 ? "33.333%" : "50%";

  if (options.length > 3) throw new Error("supply no more than 3 options.");

  const handleTabItemClick = (index: number) => {
    setActiveTab(index);
    if (onTabChange) onTabChange(index);
  };

  useEffect(() => {
    setActiveTab(active);
  }, [active, setActiveTab]);

  return (
    <View
      style={[
        styles.tab,
        styles.tabBackground(
          variant,
          state,
          backgroundPalette || sectionPalette,
        ),
      ]}
    >
      {options.map((tab, index) => (
        <Pressable
          key={index}
          collapsable={false}
          style={[styles.buttonBase, { width: buttonWidth }]}
          disabled={!isActiveState}
          onLayout={(event) => {
            const { width, x } = event.nativeEvent.layout;
            setTabItemMeasures((oldArray) => {
              const newArray = [...oldArray];
              newArray[index] = { width, x };
              return newArray;
            });
          }}
          onPress={() => handleTabItemClick(index)}
        >
          <SegmentedTabItem
            content={tab}
            selected={index === activeTab}
            activeState={state}
            variant={variant}
          />
        </Pressable>
      ))}
      <SegmentedTabSelector
        active={activeTab}
        activeState={state}
        tabItemMeasures={tabItemMeasures}
        variant={variant}
        palette={shadowPalette || sectionPalette}
      />
    </View>
  );
};

SegmentedTabButtons.Panel = Panel;

export { SegmentedTabItem };

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
      padding: segmentedTab.padding.horizontal,
      borderRadius: segmentedTab.radius.default,
      flexDirection: "row",
      overflow: "hidden",
    },
    buttonBase: {
      zIndex: 2,
      paddingTop: segmentedTab.padding.vertical,
      paddingBottom: segmentedTab.padding.vertical,
    },
    tabBackground: (
      variant: TabVariant,
      state: TabState,
      palette: SegmentedTabButtonsProps["backgroundPalette"],
    ) => {
      if (state === "inactive")
        return {
          backgroundColor: segmentedTab.color.background.inactive,
        };
      else {
        switch (variant) {
          case "default":
            return resolveThemePrimitives({
              value: segmentedTab.color.background.default,
              property: "backgroundColor",
              themeName: UnistylesRuntime.themeName,
              selectedVariant: palette,
            });
          case "subtle":
            return resolveThemePrimitives({
              value: segmentedTab.color.background.subtle,
              property: "backgroundColor",
              themeName: UnistylesRuntime.themeName,
              selectedVariant: palette,
            });
          default:
            ensureExhaustive(variant);
        }
      }
    },
  }),
);
