import type { OdidoPalette } from "_theming/tokenLoader";
import type { SectionVariant } from "foundations/Section";
import { createStyleSheet } from "react-native-unistyles";

import type { MySectionPadding } from "./MySection.types";

const version = "v1";

export const mySectionStyles = createStyleSheet(
  ({
    themes: {
      components: {
        section: {
          mySection: { [version]: mySection },
          atoms,
        },
      },
    },
  }) => ({
    section: {
      rowGap: mySection.padding.vertical.default,
      paddingBottom: mySection.padding.vertical.default,
      variants: {
        paddingTop: {
          none: {
            paddingTop: mySection.padding.top.none,
          },
          default: {
            paddingTop: mySection.padding.vertical.default,
            borderTopRightRadius: mySection.radius.top,
            borderTopLeftRadius: mySection.radius.top,
          },
        },
        hasImage: {
          true: {
            paddingTop: 0,
            paddingBottom: 0,
          },
        },
      },
    },
    container: {
      rowGap: mySection.gap.main.vertical,
    },
    backgroundOffset: {
      paddingBottom: mySection.padding.bottom,
      variants: {
        paddingTop: {
          none: {
            paddingTop: mySection.padding.top.none,
          },
          default: {
            paddingTop: mySection.padding.vertical.default,
          },
        },
      },
    },
    row: {
      rowGap: mySection.gap.main.vertical,
    },
    background: (
      variant: SectionVariant,
      paletteVariant: OdidoPalette,
      paddingTop: MySectionPadding,
    ) => {
      return {
        alignSelf: "auto",
        borderTopLeftRadius: paddingTop === "none" ? 0 : mySection.radius.top,
        borderTopRightRadius: paddingTop === "none" ? 0 : mySection.radius.top,
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
