import type { AttentionVariant } from "_internals/Attention";
import { Platform } from "react-native";
import { createStyleSheet } from "react-native-unistyles";

const version = "v1";
const versionListItem = "v2";

export const AddOnListStyles = createStyleSheet(
  ({
    themes: {
      components: {
        lists: {
          addOnList: { [version]: addOnList },
          listItem: { [versionListItem]: listItem },
        },
        assets: {
          logosAndVisuals: { addOns },
        },
      },
    },
  }) => ({
    container: {
      minWidth: addOnList.size.minWidth,
      maxWidth: addOnList.size.maxWidth,
    },
    content: {
      flexDirection: "column",
      flex: 1,
    },
    descriptionAndPromo: {
      gap: addOnList.gap.sm,
    },
    list: {
      flexDirection: "column",
    },
    gradient: {
      position: "absolute",
      height: "100%",
      width: "100%",
      left: 0,
      bottom: 0,
    },
    gradientOverlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    item: (isFirstChild: boolean) => ({
      flexDirection: "row",
      alignItems: "center",
      width: "100%",
      columnGap: addOnList.gap.default,
      backgroundColor: addOnList.color.background.default,
      paddingTop: {
        desktop: isFirstChild
          ? addOnList.padding.vertical.desktop -
            addOnList.borderWidth.item.default
          : addOnList.padding.vertical.desktop,
        laptop: isFirstChild
          ? addOnList.padding.vertical.laptop -
            addOnList.borderWidth.item.default
          : addOnList.padding.vertical.laptop,
        mobile: isFirstChild
          ? addOnList.padding.vertical.mobile -
            addOnList.borderWidth.item.default
          : addOnList.padding.vertical.mobile,
        mobileSmall: isFirstChild
          ? addOnList.padding.vertical.mobileSmall -
            addOnList.borderWidth.item.default
          : addOnList.padding.vertical.mobileSmall,
        tablet: isFirstChild
          ? addOnList.padding.vertical.tablet -
            addOnList.borderWidth.item.default
          : addOnList.padding.vertical.tablet,
      },
      paddingBottom: {
        desktop:
          addOnList.padding.vertical.desktop -
          addOnList.borderWidth.item.default,
        laptop:
          addOnList.padding.vertical.laptop -
          addOnList.borderWidth.item.default,
        mobile:
          addOnList.padding.vertical.mobile -
          addOnList.borderWidth.item.default,
        mobileSmall:
          addOnList.padding.vertical.mobileSmall -
          addOnList.borderWidth.item.default,
        tablet:
          addOnList.padding.vertical.tablet -
          addOnList.borderWidth.item.default,
      },
      paddingHorizontal: {
        desktop:
          addOnList.padding.horizontal.desktop -
          addOnList.borderWidth.item.default,
        laptop:
          addOnList.padding.horizontal.laptop -
          addOnList.borderWidth.item.default,
        mobile:
          addOnList.padding.horizontal.mobile -
          addOnList.borderWidth.item.default,
        mobileSmall:
          addOnList.padding.horizontal.mobileSmall -
          addOnList.borderWidth.item.default,
        tablet:
          addOnList.padding.horizontal.tablet -
          addOnList.borderWidth.item.default,
      },
      borderColor: addOnList.color.border.item.default,
      borderTopWidth: addOnList.borderWidth.item.default,
      borderLeftWidth: addOnList.borderWidth.item.default,
      borderRightWidth: addOnList.borderWidth.item.default,
      borderBottomWidth: addOnList.borderWidth.item.inside,
      variants: {
        isFirstChild: {
          true: {
            borderTopLeftRadius: addOnList.radius.item.default,
            borderTopRightRadius: addOnList.radius.item.default,
          },
          false: {
            borderTopWidth: 0,
          },
        },
        isLastChild: {
          true: {
            borderBottomLeftRadius: addOnList.radius.item.default,
            borderBottomRightRadius: addOnList.radius.item.default,
          },
        },
      },
    }),
    header: {
      borderTopLeftRadius: addOnList.radius.item.default,
      borderTopRightRadius: addOnList.radius.item.default,
      width: "100%",
      height: "auto",
      justifyContent: "flex-end",
      overflow: "hidden",
      position: "relative",
    },
    imageContainer: {
      position: "relative",
      width: "100%",
      height: "100%",
    },
    image: {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      width: "100%",
      height: "100%",
      resizeMode: "cover",
      zIndex: -1,
    },
    title: {
      fontSize: addOnList.typography.fontSize.title,
      lineHeight: addOnList.typography.lineHeight.title,
      letterSpacing: addOnList.typography.letterSpacing.title,
      color: addOnList.color.text.default,
    },
    description: {
      ...Platform.select({
        web: {
          overflow: "hidden",
          textOverflow: "ellipsis",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          whiteSpace: "normal",
        },
      }),
      color: addOnList.color.text.default,
      fontSize: addOnList.typography.fontSize.body,
      lineHeight: addOnList.typography.lineHeight.body,
      letterSpacing: addOnList.typography.letterSpacing.body,
      maxHeight: addOnList.size.maxHeight.description,
    },
    addOn: {
      width: addOns.size.sm,
    },
    headingText: (hasHeaderImage: boolean) => ({
      position: "absolute",
      fontSize: addOnList.typography.fontSize.heading,
      lineHeight: addOnList.typography.lineHeight.heading,
      letterSpacing: addOnList.typography.letterSpacing.heading,
      paddingHorizontal: addOnList.padding.horizontal,
      paddingVertical: addOnList.padding.vertical,
      color: hasHeaderImage
        ? addOnList.color.text.heading.onImage
        : addOnList.color.text.heading.default,
      zIndex: 2,
    }),
    attention: (variant: AttentionVariant) => {
      return {
        color: listItem.color.text.attentionText[variant],
      };
    },
  }),
);
