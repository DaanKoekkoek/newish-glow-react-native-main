import { Platform } from "react-native";
import { createStyleSheet } from "react-native-unistyles";

export const selectorStyles = createStyleSheet(
  ({
    themes: {
      components: {
        selector,
        foundations: { typography },
      },
    },
  }) => ({
    wrapper: {
      alignItems: "flex-start",
    },
    defaultContainer: {
      borderRadius: selector.radius.default,
      backgroundColor: selector.color.border.default,
      padding: selector.borderWidth.default,
      variants: {
        isDisabled: {
          true: {
            backgroundColor: selector.color.background.inactive,
          },
        },
        isDisabledAndSelected: {
          true: {
            backgroundColor: selector.color.border.selected.inactive,
          },
        },
        isHoveredAndEnabled: {
          true: {
            backgroundColor: selector.color.border.hover,
          },
        },
        isHighlighted: {
          true: {
            paddingTop: 0,
            borderTopRightRadius: 0,
            borderTopLeftRadius: 0,
          },
        },
      },
    },
    gradientContainer: {
      borderRadius: selector.radius.default,
      padding: selector.borderWidth.default,
      variants: {
        isHighlighted: {
          true: {
            paddingTop: 0,
            borderTopRightRadius: 0,
            borderTopLeftRadius: 0,
          },
        },
      },
    },
    dummyBorderEffect: {
      borderRadius: {
        desktop: selector.radius.default.desktop - selector.borderWidth.default,
        laptop: selector.radius.default.laptop - selector.borderWidth.default,
        mobile: selector.radius.default.mobile - selector.borderWidth.default,
        mobileSmall:
          selector.radius.default.mobileSmall - selector.borderWidth.default,
        tablet: selector.radius.default.tablet - selector.borderWidth.default,
      },
      padding: selector.borderWidth.default,
      backgroundColor: selector.color.background.default,
      variants: {
        isSelectedAndSwitch: {
          true: {
            borderColor: selector.color.border.selected.default,
          },
        },
        isHighlighted: {
          true: {
            paddingTop: 0,
            borderTopRightRadius: 0,
            borderTopLeftRadius: 0,
          },
        },
        isSelected: {
          true: {
            backgroundColor: "transparent",
          },
        },
        isDisabled: {
          true: {
            backgroundColor: selector.color.background.inactive,
          },
        },
      },
    },
    selector: {
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "center",
      gap: selector.gap.vertical.sm,
      ...Platform.select({
        web: {
          outlineStyle: "none",
        },
      }),
      borderRadius: {
        desktop: selector.radius.default.desktop - selector.borderWidth.default,
        laptop: selector.radius.default.laptop - selector.borderWidth.default,
        mobile: selector.radius.default.mobile - selector.borderWidth.default,
        mobileSmall:
          selector.radius.default.mobileSmall - selector.borderWidth.default,
        tablet: selector.radius.default.tablet - selector.borderWidth.default,
      },
      paddingVertical:
        selector.padding.vertical.default -
        selector.borderWidth.selected.default,
      paddingHorizontal:
        selector.padding.horizontal.default -
        selector.borderWidth.selected.default,
      backgroundColor: selector.color.background.default,
      variants: {
        isDisabled: {
          true: {
            backgroundColor: selector.color.background.inactive,
            borderColor: selector.color.background.inactive,
          },
        },
        isCompact: {
          true: {
            paddingHorizontal:
              selector.padding.horizontal.default -
              selector.borderWidth.selected.default,
            paddingTop:
              selector.padding.vertical.sm -
              selector.borderWidth.selected.default,
            paddingBottom:
              selector.padding.vertical.sm -
              selector.borderWidth.selected.default,
          },
        },
        isHighlightedAndCompact: {
          true: {
            paddingTop: selector.padding.vertical.sm,
          },
        },
        isSelected: {
          true: {
            borderColor: "transparent",
          },
        },

        isHighlighted: {
          true: {
            borderTopWidth: 0,
            borderTopRightRadius: 0,
            borderTopLeftRadius: 0,
          },
        },
        isHighlightedAndDefault: {
          true: {
            paddingTop: selector.padding.vertical.default,
          },
        },
        isExtended: {
          true: {
            gap: selector.gap.vertical.lg,
            alignItems: "baseline",
            paddingTop:
              selector.padding.vertical.default -
              selector.borderWidth.selected.default,
            paddingBottom:
              selector.padding.vertical.lg -
              selector.borderWidth.selected.default,
            paddingHorizontal:
              selector.padding.horizontal.default -
              selector.borderWidth.selected.default,
          },
        },
        isHighlightedAndExtended: {
          true: {
            paddingTop: selector.padding.vertical.default,
          },
        },
      },
    },
    labelGroup: {
      gap: selector.gap.vertical.sm,
    },
    label: {
      flexDirection: "row",
      flexWrap: "wrap",
      flexShrink: 1,
      fontSize: selector.typography.fontSize.title.default,
      lineHeight: selector.typography.lineHeight.title.default,
      letterSpacing: selector.typography.letterSpacing.title.default,
      variants: {
        isDisabled: {
          true: {
            color: selector.color.text.inactive,
          },
        },
        isExtended: {
          true: {
            gap: selector.gap.vertical.sm,
            fontSize: selector.typography.fontSize.title.lg,
            lineHeight: selector.typography.lineHeight.title.lg,
            letterSpacing: selector.typography.letterSpacing.title.lg,
          },
        },
        isCompact: {
          true: {
            alignSelf: "center",
          },
        },
      },
    },
    titleStrikethrough: {
      textDecorationLine: "line-through",
      marginRight: selector.gap.vertical.sm,
      paddingTop: selector.padding.strikethroughTitle.top,
      lineHeight: typography.textStyles.v1.heading.lineHeight.md,
      fontSize: typography.textStyles.v1.heading.fontSize.md,
      letterSpacing: typography.textStyles.v1.heading.letterSpacing.md,
      color: selector.color.text.strikethrough.default,
      variants: {
        isDisabled: {
          true: {
            color: selector.color.text.strikethrough.inactive,
          },
        },
      },
    },
    title: {
      alignSelf: "center",
    },
    titleContainer: {
      flexShrink: 1,
      flexWrap: "wrap",
      flexDirection: "row",
    },
    badgeContainer: {
      width: "100%",
      display: "flex",
      justifyContent: "flex-start",
    },
    promotion: {
      width: "100%",
      display: "flex",
      justifyContent: "flex-start",
      color: selector.color.text.promotion,
      letterSpacing: typography.textStyles.v1.paragraph.letterSpacing.sm,
      fontSize: typography.textStyles.v1.paragraph.fontSize.sm,
      lineHeight: typography.textStyles.v1.paragraph.lineHeight.sm,
      variants: {
        isDisabled: {
          true: {
            color: selector.color.text.inactive,
          },
        },
      },
    },
    description: {
      width: "100%",
      display: "flex",
      justifyContent: "flex-start",
      variants: {
        isDisabled: {
          true: {
            color: selector.color.text.inactive,
          },
        },
      },
    },
    secondaryAction: {
      width: "100%",
    },
    backgroundSvg: {
      position: "absolute",
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      width: "100%",
      height: "100%",
    },
    textLink: {
      variants: {
        isDisabled: {
          true: {
            pointerEvents: "none",
            color: selector.color.text.inactive,
          },
        },
      },
    },
    list: {
      width: "100%",
    },
    priceTitleCheckbox: {
      flexDirection: "row",
      alignItems: "center",
      width: "100%",
      columnGap: selector.gap.horizontal.sm,
      variants: {
        isExtended: {
          true: {
            columnGap: selector.gap.horizontal.md,
          },
        },
      },
    },
    titlePrice: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
    },
    checkboxPrice: {
      alignSelf: "center",
    },
    checkboxContainer: {
      paddingVertical: 0,
    },
    checkbox: {
      variants: {
        isExtended: {
          true: {
            paddingTop: selector.padding.checkbox.top,
          },
        },
      },
    },
  }),
);
