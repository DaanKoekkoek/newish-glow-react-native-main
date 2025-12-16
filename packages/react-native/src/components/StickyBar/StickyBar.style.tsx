import type { BreakpointKeys } from "_theming/breakpoints";
import { Platform } from "react-native";
import { createStyleSheet } from "react-native-unistyles";

import type { StickyBarPosition } from "./StickyBar.types";

export const stickyBarStyle = createStyleSheet(
  ({
    themes: {
      components: {
        overlay: {
          stickyBar: { v1: stickyBar },
        },
      },
    },
  }) => ({
    stickyBarShadow: {
      width: "100%",
      maxWidth: "100%",
    },
    stickyBar: (scrollBarOffset: number, windowWidth: number) => ({
      display: "flex",
      left: 0,
      right: scrollBarOffset,
      backgroundColor: stickyBar.color.background,
      elevation: 2,
      width: "100%",
      maxWidth: windowWidth - scrollBarOffset,
      variants: {
        position: {
          top: {
            position: "absolute",
          },
          bottom: {
            position: "relative",
          },
        },
      },
    }),
    stickyBarPosition: (position: StickyBarPosition, inset: number) => ({
      ...Platform.select({ web: { [position]: inset }, default: {} }),
    }),
    container: (
      breakpoint: BreakpointKeys,
      inset = 0,
      position: StickyBarPosition,
      scrollBarWidth: number,
    ) => ({
      display: "flex",
      backgroundColor: stickyBar.color.background,
      alignItems: "center",
      marginHorizontal: "auto",
      width: "100%",
      maxWidth: "100%",
      paddingRight: stickyBar.padding.horizontal[breakpoint] - scrollBarWidth,
      paddingLeft: stickyBar.padding.horizontal,
      paddingVertical: stickyBar.padding.vertical,
      paddingBottom:
        position === "bottom"
          ? Platform.select({
              default: stickyBar.padding.vertical[breakpoint] + inset,
              web: stickyBar.padding.vertical[breakpoint],
            })
          : stickyBar.padding.vertical[breakpoint],
    }),
    row: {
      alignItems: "center",
      justifyContent: "space-between",
      overflow: "hidden",
      width: "100%",
      maxWidth: "100%",
      variants: {
        layout: {
          default: {
            alignItems: "center",
            flexDirection: "row",
          },
          stacked: {
            alignItems: "flex-end",
            flexDirection: "column",
          },
        },
      },
    },
    rowMaxWidth: {
      display: "flex",
      variants: {
        width: {
          default: {
            maxWidth: stickyBar.size.maxWidth.default,
          },
          narrow: {
            maxWidth: stickyBar.size.maxWidth.narrow,
          },
        },
      },
    },
    gap: {
      columnGap: stickyBar.gap.horizontal,
      rowGap: stickyBar.gap.vertical,
    },
    content: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden",
      variants: {
        layout: {
          default: {
            width: "auto",
            flexGrow: 1,
            flexBasis: 0,
            flexShrink: 1,
          },
          stacked: {
            width: "100%",
            flexGrow: 1,
          },
        },
      },
    },
    actionButtonIcon: {
      alignSelf: "center",
    },
    contentChild: {
      maxWidth: "100%",
      flexGrow: 1,
      flexBasis: 0,
      flexShrink: 1,
    },
    buttonWrapper: {
      flexGrow: 0,
      variants: {
        layout: {
          default: {
            alignSelf: "center",
          },
          stacked: {
            width: "100%",
          },
        },
      },
    },
    buttonStyle: {
      variants: {
        layout: {
          stacked: {
            width: "100%",
            alignSelf: "flex-end",
            maxWidth: stickyBar.size.button.maxWidth,
          },
        },
      },
    },
  }),
);
