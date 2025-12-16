import type { BreakpointKeys } from "_theming/breakpoints";
import { Platform } from "react-native";
import { createStyleSheet } from "react-native-unistyles";

const versionAddOnCard = "v1";
const versionHighlight = "v1";

export const AddOnCardStyles = createStyleSheet(
  ({
    themes: {
      semantics: { color },
      components: {
        card,
        card: {
          addOnCard: { [versionAddOnCard]: addOnCard },
        },
        highlight: { [versionHighlight]: highlight },
        assets: { logosAndVisuals },
      },
    },
  }) => ({
    wrapper: {
      ...Platform.select({
        web: {
          flexGrow: 1,
        },
      }),
      width: "100%",
      variants: {
        direction: {
          vertical: {
            maxWidth: addOnCard.size.maxWidth.vertical,
            minWidth: addOnCard.size.minWidth.vertical,
          },
          horizontal: {
            minWidth: addOnCard.size.minWidth.horizontal,
            maxWidth: addOnCard.size.maxWidth.horizontal,
          },
        },
      },
    },
    pressable: {
      flexGrow: 1,
    },
    highlightGlowGradient: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      ...Platform.select({
        web: {
          width: "100%",
          default: "120%",
        },
      }),
      height: 72,
      flexGrow: 1,
    },
    highlightHeading: {
      variants: {
        isDisabled: {
          true: {
            color: highlight.color.text.inactive,
          },
          false: {
            color: highlight.color.text.default,
          },
        },
      },
    },
    selectedGradientSetup01: {
      backgroundColor: color.gradient.orange_700,
    },
    selectedGradientSetup02: {
      backgroundColor: color.gradient.purple_700,
    },
    selectedGradientSetup03: {
      backgroundColor: color.gradient.blue_300,
    },
    selectedGradientSetup04: {
      backgroundColor: color.gradient.blue_500,
    },
    hoverGradientSetup01: {
      backgroundColor: color.gradient.orange_300,
    },
    hoverGradientSetup02: {
      backgroundColor: color.gradient.purple_300,
    },
    hoverGradientSetup03: {
      backgroundColor: color.gradient.blue_300,
    },
    hoverGradientSetup04: {
      backgroundColor: color.gradient.blue_300,
    },
    inactiveState: {
      backgroundColor: addOnCard.color.background.inactive,
    },
    inactiveSelectedState: {
      backgroundColor: addOnCard.color.border.selected.inactive,
    },
    gradientContainer: {
      flexGrow: 1,
      borderRadius: addOnCard.radius.default,
      backgroundColor: addOnCard.color.border.default,
      variants: {
        isSelected: {
          true: {
            padding: addOnCard.borderWidth.selected.default,
          },
          false: {
            padding: addOnCard.borderWidth.default,
          },
        },
        isDisabledAndSelected: {
          true: {
            backgroundColor: "transparent",
          },
          false: {
            backgroundColor: addOnCard.color.background.default,
          },
        },
        isHovered: {
          true: {
            backgroundColor: addOnCard.color.border.hover,
          },
          false: {
            backgroundColor: addOnCard.color.border.default,
          },
        },
        highlightOperator: {
          highlight: {
            paddingTop: 0,
            borderTopRightRadius: 0,
            borderTopLeftRadius: 0,
          },
          highlightOffset: {},
          noHighlight: {},
        },
      },
    },
    gradientBorderEffect: (breakpoint: BreakpointKeys) => ({
      flexGrow: 1,
      backgroundColor: addOnCard.color.background.default,
      overflow: "hidden",
      variants: {
        highlightOperator: {
          highlight: {
            borderTopRightRadius: 0,
            borderTopLeftRadius: 0,
            paddingTop: 0,
          },
          highlightOffset: {},
          noHighlight: {},
        },
        isSelected: {
          true: {
            backgroundColor: "transparent",
            borderRadius:
              addOnCard.radius.default[breakpoint] -
              addOnCard.borderWidth.default,
          },
          false: {
            backgroundColor: addOnCard.color.background.default,
            borderRadius:
              addOnCard.radius.default[breakpoint] -
              addOnCard.borderWidth.default +
              0.5,
          },
        },
        isDisabled: {
          true: {
            backgroundColor: addOnCard.color.background.inactive,
          },
          false: {
            backgroundColor: addOnCard.color.background.default,
          },
        },
      },
    }),
    backgroundSvg: {
      position: "absolute",
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      width: "100%",
      height: "100%",
    },
    card: (breakpoint: BreakpointKeys) => ({
      width: "100%",
      flexGrow: 1,
      justifyContent: "space-between",
      overflow: "hidden",
      backgroundColor: addOnCard.color.background.default,
      ...Platform.select({
        web: {
          outlineStyle: "none",
        },
      }),
      borderRadius:
        addOnCard.radius.default[breakpoint] -
        addOnCard.borderWidth.selected.default,
      variants: {
        isSelected: {
          true: {
            paddingVertical:
              addOnCard.padding.vertical.default.default[breakpoint] -
              addOnCard.borderWidth.selected.default,
            paddingHorizontal:
              addOnCard.padding.horizontal.default.default[breakpoint] -
              addOnCard.borderWidth.selected.default,
            borderRadius:
              addOnCard.radius.default[breakpoint] -
              addOnCard.borderWidth.selected.default,
          },
          false: {
            paddingVertical:
              addOnCard.padding.vertical.default.default[breakpoint] -
              addOnCard.borderWidth.default,
            paddingHorizontal:
              addOnCard.padding.horizontal.default.default[breakpoint] -
              addOnCard.borderWidth.default,
            borderRadius: addOnCard.radius.default,
          },
        },
        isDisabled: {
          true: {
            backgroundColor: addOnCard.color.background.inactive,
          },
          false: {
            backgroundColor: addOnCard.color.background.default,
          },
        },
        direction: {
          vertical: {
            flexDirection: "column",
            alignItems: "stretch",
            gap: addOnCard.gap.vertical.body.default,
            rowGap: addOnCard.gap.vertical.body.default,
          },
          horizontal: {
            flexDirection: "row",
            alignItems: "center",
            gap: addOnCard.gap.horizontal.body.default,
            rowGap: addOnCard.gap.horizontal.body.default,
          },
        },
        highlightOperator: {
          highlight: {
            paddingTop: addOnCard.padding.vertical.default.default,
            borderTopWidth: 0,
            borderTopRightRadius: 0,
            borderTopLeftRadius: 0,
          },
          highlightOffset: {},
          noHighlight: {},
        },
      },
    }),
    contentContainer: {
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "baseline",
      flex: 1,
      variants: {
        direction: {
          horizontal: {
            gap: addOnCard.gap.horizontal.content.vertical,
          },
          vertical: {
            gap: addOnCard.gap.vertical.content.vertical,
          },
        },
      },
    },
    contentStyles: {
      gap: addOnCard.gap.vertical.text.vertical,
    },
    visualsAddon: {
      variants: {
        direction: {
          horizontal: {
            aspectRatio: 1,
            flexBasis: logosAndVisuals.addOns.size.sm,
          },
          vertical: {
            aspectRatio: 2 / 1,
          },
        },
      },
    },
    promotion: {
      variants: {
        isDisabled: {
          true: {
            color: card.atoms.color.text.inactive,
          },
          false: {
            color: card.atoms.color.text.promotion,
          },
        },
      },
    },
    footer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-end",
      width: "100%",
      variants: {
        direction: {
          horizontal: {
            gap: addOnCard.gap.horizontal.footer.horizontal,
          },
          vertical: {
            gap: addOnCard.gap.vertical.footer.horizontal,
          },
        },
      },
    },
    button: {
      alignSelf: "flex-end",
    },
    disabledText: {
      color: card.atoms.color.text.inactive,
    },
    defaultText: {
      color: card.atoms.color.text.default,
    },
  }),
);
