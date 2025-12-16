import { UL, LI } from "@expo/html-elements";
import { useFontFamily } from "_global-hooks";
import { resolveThemePrimitives } from "_theming/resolveThemePrimitives";
import { mergeTestIds } from "_utility";
import { useThemeProviderContext } from "components/index";
import type { IconNames } from "foundations/Icon";
import { Icon } from "foundations/Icon";
import { useSectionContext } from "foundations/Section/SectionContext";
import React from "react";
import { Text, View, Platform } from "react-native";
import {
  createStyleSheet,
  useStyles,
  UnistylesRuntime,
} from "react-native-unistyles";

import type {
  DefaultListProps,
  DefaultListItemProps,
} from "./DefaultList.types";

/**
 * `DefaultList` is a flexible list component that supports multiple variants including Bulleted, Numbered,
 * and Icon lists. It allows for customization of color, size, and icon type for list items.
 * This component wraps items within semantic `UL` and `LI` elements from `@expo/html-elements`.
 *
 */
const version = "v1";
const versionTextStyles = "v1";

const DefaultList = ({
  variant = "bullet",
  color = "default",
  size = "default",
  children,
  inactive = false,
  testID,
  palette,
}: DefaultListProps) => {
  const { styles } = useStyles(stylesheet, {
    size: size === "default" ? undefined : size,
    inactive,
  });

  const listTestID = mergeTestIds(testID, "default-list");

  return (
    <UL testID={listTestID} style={styles.list}>
      {React.Children.map(children, (child, index) => {
        const element = child as React.ReactElement<DefaultListItemProps>;
        if (!React.isValidElement(element)) return null;
        return (
          <Item
            {...element.props}
            variant={variant}
            color={color}
            size={size}
            key={index}
            index={index}
            inactive={inactive}
            palette={palette}
          />
        );
      })}
    </UL>
  );
};

const Item = ({
  variant,
  index = 0,
  icon = "checkmark",
  inactive,
  size,
  color,
  testID,
  palette,
  children,
}: DefaultListItemProps) => {
  const { styles } = useStyles(stylesheet, {
    color: color === "default" ? undefined : color,
    size: size === "default" ? undefined : size,
    inactive,
  });

  const listItemTestID = mergeTestIds(testID, "default-list-item");
  const bulletFont = useFontFamily("Paragraph_Strong");
  const fontFamily = useFontFamily("Paragraph_Regular");

  const { sectionPalette } = useSectionContext();
  const { brand } = useThemeProviderContext();

  return (
    <LI testID={listItemTestID} style={styles.item} key={index}>
      <View style={styles.leftColumn}>
        {variant === "icon" && (
          <Text style={styles.leftColumnIcon}>
            <Icon
              brand={brand !== "simpel" ? brand : undefined}
              name={icon as IconNames}
              size="default"
            />
          </Text>
        )}
        {variant === "iconColored" && (
          <View style={styles.iconColoredContainer}>
            <Text
              style={[
                styles.iconColored,
                !inactive &&
                  styles.compoundStyleWithPalette(palette || sectionPalette),
              ]}
            >
              <Icon
                brand={brand !== "simpel" ? brand : undefined}
                name={icon as IconNames}
                size="default"
              />
            </Text>
          </View>
        )}
        {variant === "bullet" && (
          <Text style={[{ fontFamily: bulletFont }, styles.leftColumnText]}>
            •
          </Text>
        )}
        {variant === "numbered" && (
          <Text style={[{ fontFamily }, styles.leftColumnText]}>
            {index + 1}.
          </Text>
        )}
      </View>
      <View style={styles.rightColumn}>
        <Text style={[{ fontFamily }, styles.rightColumnText]}>{children}</Text>
      </View>
    </LI>
  );
};

/**
 * Placeholder component for `DefaultListItem`. Intended for use as a semantic
 * and structural element within `DefaultList`. Actual rendering logic is
 * handled by `DefaultList`, which extracts and uses the props of this component.
 *
 * This component is used within `DefaultList` and is not intended for standalone use.
 */
Item.displayName = "DefaultList.Item";

DefaultList.Item = Item;

const stylesheet = createStyleSheet(
  ({
    themes: {
      components: {
        lists: {
          defaultList: { [version]: defaultList },
        },
        foundations: {
          typography: {
            textStyles: { [versionTextStyles]: textStyles },
          },
        },
      },
    },
  }) => ({
    list: {
      flexDirection: "column",
      variants: {
        size: {
          default: {
            gap: defaultList.gap.vertical.default,
          },
          sm: {
            gap: defaultList.gap.vertical.sm,
          },
        },
      },
    },
    item: {
      flexDirection: "row",
      alignItems: "center",
      variants: {
        size: {
          default: {
            gap: defaultList.gap.horizontal.default,
          },
          sm: {
            gap: defaultList.gap.horizontal.sm,
          },
        },
      },
    },
    leftColumn: {
      alignSelf: "flex-start",
    },
    leftColumnIcon: {
      height: defaultList.size.icon,
      width: defaultList.size.icon,
      variants: {
        color: {
          default: {
            color: defaultList.color.icon.default,
          },
          inverted: {
            color: defaultList.color.icon.inverted.default,
          },
        },
        size: {
          default: {
            fontSize: textStyles.paragraph.fontSize.default,
            paddingTop: defaultList.padding.container.icon.default.default.top,
          },
          sm: {
            fontSize: textStyles.paragraph.fontSize.sm,
            paddingTop: defaultList.padding.container.icon.default.sm.top,
          },
        },
        inactive: {
          true: {
            color: defaultList.color.icon.inactive,
          },
        },
      },
    },
    leftColumnText: {
      textAlign: "center",
      height: defaultList.size.icon,
      width: defaultList.size.icon,
      alignItems: "center",
      justifyContent: "center",
      variants: {
        size: {
          default: {
            fontSize: textStyles.paragraph.fontSize.default,
            lineHeight: textStyles.paragraph.lineHeight.default,
            letterSpacing: textStyles.paragraph.letterSpacing.default,
          },
          sm: {
            fontSize: textStyles.paragraph.fontSize.sm,
            lineHeight: textStyles.paragraph.lineHeight.default,
            letterSpacing: textStyles.paragraph.letterSpacing.sm,
          },
        },
        color: {
          default: {
            color: defaultList.color.icon.default,
          },
          inverted: {
            color: defaultList.color.icon.inverted.default,
          },
        },
        inactive: {
          true: {
            color: defaultList.color.icon.inactive,
          },
        },
      },
    },
    rightColumn: {
      flexShrink: 1,
      ...Platform.select({
        web: {},
        default: {
          paddingRight: 18,
        },
      }),
    },
    rightColumnText: {
      variants: {
        color: {
          default: {
            color: defaultList.color.text.default,
          },
          inverted: {
            color: defaultList.color.text.inverted.default,
          },
        },
        size: {
          default: {
            fontSize: textStyles.paragraph.fontSize.default,
            lineHeight: textStyles.paragraph.lineHeight.default,
            letterSpacing: textStyles.paragraph.letterSpacing.default,
          },
          sm: {
            fontSize: textStyles.paragraph.fontSize.sm,
            lineHeight: textStyles.paragraph.lineHeight.sm,
            letterSpacing: textStyles.paragraph.letterSpacing.sm,
          },
        },
        inactive: {
          true: {
            color: defaultList.color.text.inactive,
          },
        },
      },
    },
    iconColoredContainer: {
      borderRadius: defaultList.radius.container.icon.accent,
      ...resolveThemePrimitives({
        value: defaultList.color.container.accent,
        property: "backgroundColor",
        themeName: UnistylesRuntime.themeName,
      }),
      paddingTop: defaultList.padding.container.icon.accent.default.top,
      paddingBottom: defaultList.padding.container.icon.accent.default.bottom,
      paddingHorizontal:
        defaultList.padding.container.icon.accent.default.horizontal,
      variants: {
        size: {
          sm: {
            paddingTop: defaultList.padding.container.icon.accent.sm.top,
            paddingBottom: defaultList.padding.container.icon.accent.sm.bottom,
            paddingHorizontal:
              defaultList.padding.container.icon.accent.sm.horizontal,
          },
        },
      },
    },
    iconColored: {
      height: defaultList.size.icon,
      width: defaultList.size.icon,
      variants: {
        color: {
          default: {
            color: defaultList.color.icon.accent,
          },
          inverted: {
            color: defaultList.color.icon.inverted.default,
          },
        },
        size: {
          default: {
            paddingTop: defaultList.padding.container.icon.default.default.top,
          },
          sm: {
            paddingTop: defaultList.padding.container.icon.default.sm.top,
          },
        },
        inactive: {
          true: {
            color: defaultList.color.icon.inactive,
          },
        },
      },
    },
    compoundStyleWithPalette: (palette: DefaultListProps["palette"]) => {
      return resolveThemePrimitives({
        value: defaultList.color.icon.accent,
        property: "color",
        themeName: UnistylesRuntime.themeName,
        selectedVariant: palette,
      });
    },
  }),
);

export { DefaultList };
