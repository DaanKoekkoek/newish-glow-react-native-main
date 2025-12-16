import { resolveThemePrimitives } from "_theming/resolveThemePrimitives";
import type { OdidoPalette } from "_theming/tokenLoader";
import { ensureExhaustive, mergeTestIds } from "_utility";
import { useSectionContext } from "foundations/Section/SectionContext";
import { Strong } from "foundations/Strong";
import { View } from "react-native";
import {
  createStyleSheet,
  useStyles,
  UnistylesRuntime,
} from "react-native-unistyles";

import { type BadgeProps, type BadgeProminence } from "./Badge.types";

const version = "v1";

export const Badge = ({
  text,
  prominence = "default",
  inactive = false,
  palette,
  testID,
}: BadgeProps) => {
  const { styles } = useStyles(stylesheet, {
    prominence: prominence === "default" ? undefined : prominence,
  });

  const { sectionPalette } = useSectionContext();

  const badgeTestID = mergeTestIds(testID, "badge");
  return (
    <View
      testID={badgeTestID}
      style={[
        styles.badgeContainer,
        inactive
          ? styles.badgeInactiveContainerState(prominence)
          : styles.badgeContainerState(prominence, palette || sectionPalette),
      ]}
    >
      <Strong
        size="sm"
        style={[styles.badge, styles.badgeState(prominence, inactive)]}
      >
        {text}
      </Strong>
    </View>
  );
};

const stylesheet = createStyleSheet(
  ({
    themes: {
      components: {
        badges: {
          badge: { [version]: badge },
        },
      },
    },
  }) => ({
    badgeContainer: {
      alignSelf: "flex-start",
      borderStyle: "solid",
      borderWidth: badge.borderWidth.default,
      paddingHorizontal: badge.padding.horizontal.default,
      paddingVertical: badge.padding.vertical.default,
      borderRadius: badge.radius.default,
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 1,
      variants: {
        prominence: {
          outline: {
            borderWidth: badge.borderWidth.outline,
            paddingHorizontal:
              badge.padding.horizontal.default - badge.borderWidth.outline,
            paddingVertical:
              badge.padding.vertical.default - badge.borderWidth.outline,
          },
          subtle: {
            borderWidth: badge.borderWidth.subtle,
          },
        },
      },
    },
    badge: {
      color: badge.color.text.default,
      variants: {
        prominence: {
          outline: {
            color: badge.color.text.outline,
          },
          subtle: {
            color: badge.color.text.subtle,
          },
        },
      },
    },
    badgeInactiveContainerState: (prominence: BadgeProminence) => {
      return {
        backgroundColor: badge.color.background.inactive[prominence],
        borderColor: badge.color.border.inactive[prominence],
      };
    },
    badgeContainerState: (
      prominence: BadgeProminence,
      palette?: OdidoPalette,
    ) => {
      switch (prominence) {
        case "outline":
          return {
            backgroundColor: badge.color.background.outline,
            ...resolveThemePrimitives({
              value: badge.color.border.outline,
              property: "borderColor",
              themeName: UnistylesRuntime.themeName,
              selectedVariant: palette,
            }),
          };
        case "subtle":
          return {
            ...resolveThemePrimitives({
              value: badge.color.background.subtle,
              property: "backgroundColor",
              themeName: UnistylesRuntime.themeName,
              selectedVariant: palette,
            }),
            borderColor: badge.color.border.subtle,
          };
        case "default":
          return {
            ...resolveThemePrimitives({
              value: badge.color.background.default,
              property: "backgroundColor",
              themeName: UnistylesRuntime.themeName,
              selectedVariant: palette,
            }),
            borderColor: badge.color.border.default,
          };
        default:
          ensureExhaustive(prominence);
      }
    },
    badgeState: (prominence: BadgeProminence, inactive) =>
      inactive === true
        ? {
            color: badge.color.text.inactive[prominence],
          }
        : {},
  }),
);
