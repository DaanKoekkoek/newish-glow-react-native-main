import { resolveThemePrimitives } from "_theming/resolveThemePrimitives";
import { useCardAnimation } from "components/FeatureCard/hooks/index";
import { useThemeProviderContext } from "components/ThemeProvider";
import { GlowGradient } from "foundations/GlowGradient";
import { Heading } from "foundations/Heading";
import { View } from "react-native";
import {
  createStyleSheet,
  UnistylesRuntime,
  useStyles,
} from "react-native-unistyles";

import type { HighlightProps } from "./Highlight.types";

const version = "v1";

export const Highlight = ({
  variant = "default",
  state = "default",
  selected,
  children,
  style,
}: HighlightProps) => {
  const isSpacious = variant === "spacious";
  const isCompact = variant === "compact";
  const isInactive = state === "inactive";

  const { brand } = useThemeProviderContext();

  const {
    theme: {
      themes: {
        components: { card },
      },
    },
  } = useStyles();

  const { gradientAnimation } = useCardAnimation(
    state === "hover",
    card.atoms.productVisuals.size.one.height,
  );

  const { styles } = useStyles(stylesheet, {
    isSpacious,
    isCompact,
    isInactive,
    selected,
  });

  return (
    <View style={[styles.highlight, style]} testID="highlight">
      {selected && !isInactive && brand === "odido" && (
        <GlowGradient
          brightness="dark"
          style={styles.backgroundSvg}
          type="Glow4"
          animatedStyle={gradientAnimation}
          zIndex={0}
        />
      )}
      <Heading size={isCompact ? "xs" : "sm"} style={styles.highlightHeading}>
        {children}
      </Heading>
    </View>
  );
};

export const stylesheet = createStyleSheet(
  ({
    themes: {
      components: {
        highlight: { [version]: highlight },
      },
    },
  }) => ({
    highlight: {
      position: "relative",
      backgroundColor: highlight.color.background.default,
      borderTopRightRadius: highlight.radius.default,
      paddingVertical: highlight.padding.vertical.default,
      paddingHorizontal: highlight.padding.horizontal.default,
      overflow: "hidden",
      variants: {
        selected: {
          true: {
            ...resolveThemePrimitives({
              value: highlight.color.background.selected,
              property: "backgroundColor",
              themeName: UnistylesRuntime.themeName,
            }),
          },
        },
        isInactive: {
          true: {
            backgroundColor: highlight.color.background.inactive,
          },
        },
        isSpacious: {
          true: {
            paddingVertical: highlight.padding.vertical.spacious,
            paddingHorizontal: highlight.padding.horizontal.spacious,
            borderTopRightRadius: highlight.radius.spacious,
          },
        },
        isCompact: {
          true: {
            paddingVertical: highlight.padding.vertical.compact,
            paddingHorizontal: highlight.padding.horizontal.compact,
            borderTopRightRadius: highlight.radius.compact,
          },
        },
      },
    },
    highlightHeading: {
      color: highlight.color.text.default,
      variants: {
        isInactive: {
          true: {
            color: highlight.color.text.inactive,
          },
        },
      },
    },
    backgroundSvg: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "150%",
      height: "200%",
    },
  }),
);
