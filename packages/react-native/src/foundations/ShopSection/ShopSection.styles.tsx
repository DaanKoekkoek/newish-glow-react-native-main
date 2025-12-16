import type { OdidoPalette } from "_theming/tokenLoader";
import type { SectionVariant } from "foundations/Section";
import { Platform } from "react-native";
import { createStyleSheet } from "react-native-unistyles";

const version = "v1";

export const stylesheet = createStyleSheet(
  ({
    themes: {
      components: {
        section: {
          shopSection: { [version]: shopSection },
          atoms,
        },
      },
    },
  }) => ({
    gridContainer: {
      variants: {
        paddingTop: {
          default: {
            paddingTop: shopSection.padding.vertical.default,
          },
          large: {
            paddingTop: shopSection.padding.vertical.lg,
          },
          none: {
            paddingTop: shopSection.padding.vertical.none,
          },
        },
        paddingBottom: {
          default: {
            paddingBottom: shopSection.padding.vertical.default,
          },
          large: { paddingBottom: shopSection.padding.vertical.lg },
        },
      },
    },
    main: {
      rowGap: shopSection.gap.main.vertical,
    },
    aside: {
      rowGap: shopSection.gap.aside.vertical,
      ...Platform.select({
        web: {
          alignSelf: "flex-start",
        },
      }),
    },
    gridRow: {
      ...Platform.select({
        web: {
          flexWrap: {
            mobileSmall: "wrap",
            mobile: "wrap",
            tablet: "wrap",
            laptop: "nowrap",
            desktop: "nowrap",
          },
        },
      }),
      flexDirection: "row",
    },
    background: (variant: SectionVariant, paletteVariant: OdidoPalette) => {
      return {
        alignSelf: "auto",
        backgroundColor:
          variant === "subtle"
            ? typeof atoms.color.background.subtle === "object"
              ? atoms.color.background.subtle[paletteVariant]
              : atoms.color.background.subtle
            : atoms.color.background[variant],
      };
    },
  }),
);
