import type { BreakpointKeys } from "_theming/breakpoints";
import type { StackJustifyContentPerBreakpointType } from "foundations/Stack";
import { Platform } from "react-native";
import { createStyleSheet } from "react-native-unistyles";

const version = "v1";

export const FooterStyles = createStyleSheet(
  ({
    themes: {
      components: {
        textLink: { [version]: textLink },
        // TODO: get tokens
        // navigation: {},
      },
    },
  }) => ({
    footer: {
      backgroundColor: "#000",
    },
    footerTop: {
      backgroundColor: "#000",
      rowGap: {
        mobileSmall: 48,
        laptop: 0,
      },
      paddingTop: {
        mobileSmall: 48,
        laptop: 0,
      },
    },
    footerBottom: {
      backgroundColor: "#000",
      paddingTop: {
        mobileSmall: 48,
        laptop: 0,
      },
    },
    footerBreadcrumb: {
      alignItems: "center",
      flexDirection: "row",
      flexWrap: "wrap",
      columnGap: 16,
      paddingVertical: 16,
    },
    footerLink: {
      textDecorationLine: "none",
      variants: {
        grid: {
          default: {
            color: "#fff",
          },
          breadcrumbs: {
            color: "#000",
          },
        },
      },
    },
    footerIcon: {
      color: "#fff",
    },
    footerGrid: {
      gap: 32,
      flexDirection: {
        mobileSmall: "column",
        laptop: "row",
      },
      flexWrap: "wrap",
      paddingVertical: {
        mobileSmall: 0,
        laptop: 64,
      },
    },
    footerGridJustifyContent: (
      breakpoint: BreakpointKeys,
      justifyContentValue?: StackJustifyContentPerBreakpointType,
    ) => ({ justifyContent: justifyContentValue?.[breakpoint] }),
    footerGridColumn: {
      flexShrink: 1,
      width: {
        mobileSmall: "100%",
        laptop: "auto",
      },
      variants: {
        justify: {
          true: {},
          false: {
            flexGrow: 1,
          },
        },
      },
    },
    footerGridColumnTitle: {
      color: "#fff",
      paddingBottom: 32,
    },
    footerGridColumnHeight: {
      overflow: "hidden",
      height: "auto",
      ...Platform.select({
        web: {},
        default: {
          paddingBottom: 32,
        },
      }),
    },
    footerGridColumnItems: {
      rowGap: 16,
      columnGap: 12,
    },
    footerGridHeightCalculation: {
      opacity: 0,
      position: "absolute",
      top: -9999,
      left: -9999,
    },
    footerGridColumnCollapsible: {
      alignItems: "flex-start",
      flexDirection: "row",
      justifyContent: "space-between",
      userSelect: "none",
      columnGap: 8,
    },
    footerGridColumnIcon: {
      color: "#fff",
    },
    footerGridColumnIconContainer: {
      width: 24,
      height: 24,
    },
    footerGridColumnIconAbsolute: {
      position: "absolute",
      left: 0,
      top: 0,
    },
    footerSocials: {
      flexWwrap: "wrap",
      alignSelf: {
        laptop: "center",
      },
      flexDirection: "row",
      gap: 8,
    },
    footerAppStores: {
      flexWrap: "wrap",
      alignSelf: {
        laptop: "flex-end",
      },
      flexDirection: "row",
      gap: 8,
    },
    footerAssorted: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 8,
      paddingTop: {
        mobileSmall: 48,
        laptop: 0,
      },
    },
    footerCopyrightContainer: {
      paddingBottom: {
        mobileSmall: 48,
        laptop: 64,
      },
      paddingTop: 24,
    },
    footerCopyRight: {
      color: "#fff",
    },
  }),
);
