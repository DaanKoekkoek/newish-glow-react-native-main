import type { CallToActionProps } from "_internals/CallToAction";
import { CallToAction } from "_internals/CallToAction";
import { Highlight, PriceContext } from "_internals/index";
import type { BreakpointKeys } from "_theming/index";
import { LinearGradient } from "expo-linear-gradient";
import { GlowIcon } from "foundations/GlowIcon";
import { Title } from "foundations/Title/Title";
import { Image, Paragraph } from "foundations/index";
import React, { useState } from "react";
import { View, Pressable, type ViewStyle } from "react-native";
import Animated from "react-native-reanimated";
import { useStyles, UnistylesRuntime } from "react-native-unistyles";

import { defaultCardStyles } from "./DefaultCard.styles";
import type {
  DefaultCardProps,
  DefaultCardContainerProps,
  DefaultCardContentProps,
} from "./DefaultCard.types";
import { Badge } from "../Badge";
import { useCardAnimation } from "../FeatureCard/hooks";

const versionDefaultCard = "v1";
const versionHighlight = "v1";

const DefaultCard = ({
  visual = "none",
  variant = "default",
  highlightText,
  palette = "default",
  price,
  callToAction,
  ...props
}: DefaultCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const showHighlight = !!highlightText;
  const isHoveredAndNotEmphasized = isHovered && variant !== "emphasized";
  const outline = variant === "outline" && !isHovered;

  const callToActionProps = callToAction?.props;
  let primaryActionPress;

  if (callToActionProps) {
    Object.entries(callToActionProps).map(([key, value]) => {
      if (
        key === "primaryAction" &&
        Object.keys(callToAction?.props).length === 1
      ) {
        primaryActionPress = (value as any).props?.onPress;
      }
    });
  }

  const { styles } = useStyles(defaultCardStyles, {
    showHighlight,
    isHoveredAndNotEmphasized,
    outline,
  });

  const isPressable =
    callToAction?.props && Object.keys(callToAction?.props).length;

  const breakpoint = UnistylesRuntime.breakpoint as BreakpointKeys;

  const config = {
    visual,
    variant,
    highlightText,
    palette,
    price,
    callToAction,
    breakpoint,
    isHovered,
    ...props,
  };

  return (
    <Pressable
      onPress={isPressable ? primaryActionPress : undefined}
      style={
        [
          !!highlightText && { ...styles.cardContainerRadiusReset },
          styles.cardContainer(breakpoint, isHovered, variant),
          styles.cardContainerHovered,
        ] as ViewStyle
      }
      onHoverIn={() => setIsHovered(true)}
      onHoverOut={() => setIsHovered(false)}
    >
      <DefaultCardContainer {...config} />
    </Pressable>
  );
};

const DefaultCardContainer = ({
  isHovered = false,
  price = {
    priceProps: { value: "", size: "xl" },
  },
  breakpoint,
  ...props
}: DefaultCardContainerProps) => {
  const {
    styles,
    theme: {
      themes: {
        semantics: {
          color: { gradient },
        },
      },
    },
  } = useStyles(defaultCardStyles);

  const config = {
    breakpoint,
    isHovered,
    price,
    ...props,
  };

  const gradientColors = isHovered
    ? [gradient.blue_300, gradient.purple_300, gradient.orange_300]
    : [gradient.blue_500, gradient.purple_500, gradient.orange_700];

  return props.variant === "emphasized" ? (
    <View>
      <LinearGradient colors={gradientColors} style={styles.gradientBorder}>
        <View style={[styles.gradientContentWrapper]}>
          <DefaultCardContent {...config} />
        </View>
      </LinearGradient>
    </View>
  ) : (
    <View>
      <DefaultCardContent {...config} />
    </View>
  );
};

const DefaultCardContent = ({
  visual,
  highlightText,
  image,
  badgeText,
  variant,
  title,
  paragraph,
  palette,
  price,
  icon,
  list,
  callToAction,
  isHovered,
}: DefaultCardContentProps) => {
  const illustrationOrImage =
    (image?.src || image?.localSrc) &&
    (visual === "image" || visual === "illustration");

  const {
    styles,
    theme: {
      themes: {
        components: {
          card,
          card: {
            defaultCard: { [versionDefaultCard]: defaultCard },
          },
          highlight: { [versionHighlight]: highlight },
        },
      },
    },
  } = useStyles(defaultCardStyles);

  const { visualAnimation } = useCardAnimation(
    isHovered,
    card.atoms.productVisuals.size.one.height,
  );

  const breakpoint = UnistylesRuntime.breakpoint as BreakpointKeys;
  const nonEmphasizedVariant = variant === "emphasized" ? undefined : variant;

  return (
    <View
      style={[
        styles.cardBackground,
        styles.cardBackgroundColour(variant, breakpoint, palette),
      ]}
    >
      {highlightText && (
        <Highlight
          selected={variant === "emphasized"}
          style={{
            borderTopRightRadius:
              (isHovered || variant === "outline") && variant !== "emphasized"
                ? highlight.radius.default[breakpoint] -
                  defaultCard.radius.default[breakpoint]
                : highlight.radius.default[breakpoint],
          }}
        >
          {highlightText}
        </Highlight>
      )}
      {illustrationOrImage && (
        <View>
          {visual === "illustration" ? (
            <View
              style={[
                styles.imageWrapper,
                styles.imageWrapperBackground(palette),
                !highlightText &&
                  styles.cardBackgroundTopRadius(
                    breakpoint,
                    nonEmphasizedVariant,
                  ),
              ]}
            >
              <Animated.View style={visualAnimation}>
                <Image {...image} resizeMode="contain" />
              </Animated.View>
            </View>
          ) : (
            <View style={styles.imageWrapper}>
              <Animated.View style={visualAnimation}>
                <Image {...image} resizeMode="cover" />
              </Animated.View>
            </View>
          )}
          {badgeText && (
            <View style={[styles.badge, styles.badgeOverImage]}>
              <Badge text={badgeText!} palette={palette} />
            </View>
          )}
        </View>
      )}
      <View style={[styles.content, styles.contentPadding]}>
        {!!icon && visual === "icon" && (
          <View>
            <GlowIcon type="Glow4" {...icon} size="xl" zIndex={0} />
          </View>
        )}
        <View style={styles.badgeTitle}>
          {!illustrationOrImage && badgeText && (
            <Badge text={badgeText!} palette={palette} />
          )}
          <View>
            <Title {...title.props} />
          </View>
        </View>
        <View style={styles.contentText}>
          {paragraph && <Paragraph {...paragraph.props} />}
          {list && list}
          {price && <PriceContext {...price} />}
          {callToAction && (
            <CallToAction {...callToAction.props} isHovered={isHovered} />
          )}
        </View>
      </View>
    </View>
  );
};

const DefaultCardCta = (_props: CallToActionProps) => null;
DefaultCardCta.displayName = "DefaultCard.Cta";
DefaultCard.Cta = DefaultCardCta;

export { DefaultCard };
