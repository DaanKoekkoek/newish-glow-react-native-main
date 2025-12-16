import type { AttentionVariant } from "_internals/Attention";
import { resolveThemePrimitives } from "_theming/index";
import { UnistylesRuntime, createStyleSheet } from "react-native-unistyles";

import type { ListBackground, ListProps } from "./List.types";

const version = "v2";

export const listStyles = createStyleSheet(
  ({
    themes: {
      components: {
        lists: {
          listItem: { [version]: listItem },
        },
      },
    },
  }) => ({
    list: {
      flexDirection: "column",
      borderRadius: listItem.radius.default,
      variants: {
        background: {
          none: {
            backgroundColor: listItem.color.background.none,
          },
          subtle: {
            backgroundColor: listItem.color.background.subtle,
          },
        },
      },
    },
    listPalette: (
      background: ListBackground,
      palette: ListProps["palette"],
    ) => {
      if (background === "none" || background === "subtle") {
        return {};
      }
      return resolveThemePrimitives({
        value: listItem.color.background.default,
        property: "backgroundColor",
        themeName: UnistylesRuntime.themeName,
        selectedVariant: palette,
      });
    },
    itemWrapper: {
      variants: {
        background: {
          none: {
            paddingHorizontal: listItem.padding.horizontal.none,
          },
        },
      },
    },
    divider: {
      paddingLeft: listItem.padding.horizontal.default,
      variants: {
        background: {
          none: {
            paddingLeft: listItem.padding.horizontal.none,
          },
        },
      },
    },
    itemWrapperContent: {
      minHeight: listItem.size.content.minHeight,
      flexDirection: "row",
      alignItems: "center",
      width: "100%",
      gap: listItem.gap.horizontal,
    },
    itemContentWrapper: {
      flexDirection: "row",
      gap: listItem.gap.horizontal,
      flex: 1,
      alignItems: "center",
    },
    item: {
      padding: listItem.padding.horizontal.default,
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      variants: {
        background: {
          none: {
            paddingHorizontal: listItem.padding.horizontal.none,
          },
        },
      },
    },
    itemStandalone: {
      borderRadius: listItem.radius.default,
    },
    itemMiddle: {
      flexDirection: "row",
      borderTopLeftRadius: listItem.radius.none,
    },
    itemTop: {
      borderTopLeftRadius: listItem.radius.default,
      borderTopRightRadius: listItem.radius.default,
      borderBottomLeftRadius: listItem.radius.none,
      borderBottomRightRadius: listItem.radius.none,
    },
    itemBottom: {
      borderTopLeftRadius: listItem.radius.none,
      borderTopRightRadius: listItem.radius.none,
      borderBottomLeftRadius: listItem.radius.default,
      borderBottomRightRadius: listItem.radius.default,
    },
    itemIcon1: {
      color: listItem.color.icon.default,
      fontSize: listItem.size.icon.default,
      alignSelf: "flex-start",
      height: listItem.size.icon.default,
    },
    itemIcon2: {
      color: listItem.color.icon.default,
      fontSize: listItem.size.icon.default,
      lineHeight: listItem.size.icon.default,
      alignItems: "center",
      display: "flex",
      minWidth: 16,
    },
    itemContent: {
      flexDirection: "column",
      flex: 1,
    },
    itemContentTitle: {
      color: listItem.color.text.title.default,
    },
    itemContentDescription: {
      color: listItem.color.text.description,
    },
    itemContentDetail: {
      color: listItem.color.text.detail,
    },
    itemAction: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-end",
      gap: listItem.gap.horizontal,
      flex: 1,
    },
    attention: (variant: AttentionVariant) => {
      return {
        color: listItem.color.text.attentionText[variant],
      };
    },
  }),
);
