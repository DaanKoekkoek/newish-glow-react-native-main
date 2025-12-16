import { hexToRGB, mergeTestIds } from "_utility";
import { LinearGradient } from "expo-linear-gradient";
import { GlowGradient } from "foundations/GlowGradient";
import { useSectionContext } from "foundations/Section/SectionContext";
import { Display, Heading, Paragraph } from "foundations/index";
import React, { useState } from "react";
import { View, Pressable } from "react-native";
import Animated from "react-native-reanimated";
import { useStyles } from "react-native-unistyles";

import { FeatureCardStyles } from "./FeatureCard.style";
import type {
  FeatureCardProps,
  FeatureCardContainerProps,
} from "./FeatureCard.types";
import { useCardAnimation } from "./hooks";
import { BaseButton } from "../Button/BaseButton";
import type { BrandName } from "../ThemeProvider";
import { useThemeProviderContext } from "../ThemeProvider";

const FeatureCard = ({
  title,
  description,
  image,
  onPress,
  palette,
  style = "default",
  type = "visual",
  variant = "default",
  gradient = "Glow1",
  testID,
}: FeatureCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const { sectionPalette } = useSectionContext();

  const { styles } = useStyles(FeatureCardStyles, {
    variant: variant === "default" ? undefined : variant,
    style: style === "default" ? undefined : style,
  });

  const featureCardTestID = mergeTestIds(testID, "feature-card");

  const {
    theme: {
      themes: {
        components: { card },
      },
    },
  } = useStyles();

  const { visualAnimation, gradientAnimation } = useCardAnimation(
    isHovered,
    card.atoms.productVisuals.size.one.height,
  );

  const config = {
    image,
    isHovered,
    onPress,
    palette,
    sectionPalette,
    style,
    type,
    variant,
    visualAnimation,
    title,
    description,
  };

  const { brand } = useThemeProviderContext();

  return (
    <Pressable
      role="button"
      testID={featureCardTestID}
      style={[
        styles.card,
        brand === "odido" && type === "text" && styles.backgroundColorWithGlow,
        styles.compoundStyleWithPalette(style, palette || sectionPalette),
      ]}
      onPress={onPress}
      onHoverIn={() => setIsHovered(true)}
      onHoverOut={() => setIsHovered(false)}
    >
      {type === "backgroundImage" ? (
        <>
          <Animated.Image
            style={[styles.backgroundImage, visualAnimation]}
            source={image?.localSrc || { uri: image?.src as string }}
            resizeMode="cover"
          />

          <LinearGradient
            colors={[
              hexToRGB(
                style === "alternate" && brand === "odido"
                  ? "#FFFFFFBF"
                  : "#000000BF",
              ),
              hexToRGB(
                style === "alternate" && brand === "odido"
                  ? "#FFFFFF00"
                  : "#00000000",
              ),
              hexToRGB(
                style === "alternate" && brand === "odido"
                  ? "#FFFFFF00"
                  : "#00000000",
              ),
            ]}
            locations={variant === "compact" ? [0, 0.75, 1] : [0, 0.5, 1]}
            start={{ x: 0, y: 1 }}
            end={{ x: 0, y: 0 }}
            style={styles.backgroundGradient}
          >
            <FeatureCardContainer {...config} />
          </LinearGradient>
        </>
      ) : type === "text" ? (
        <>
          {brand === "odido" && (
            <GlowGradient
              style={styles.backgroundGlow}
              animatedStyle={gradientAnimation}
              type={gradient}
              zIndex={2}
            />
          )}
          <View style={styles.glowContent}>
            <FeatureCardContainer {...config} />
          </View>
        </>
      ) : (
        <FeatureCardContainer {...config} />
      )}
    </Pressable>
  );
};

const FeatureCardContainer = ({
  description,
  image,
  isHovered,
  style = "default",
  title,
  type = "visual",
  variant = "default",
  visualAnimation,
}: FeatureCardContainerProps) => {
  const { brand } = useThemeProviderContext();

  const { styles } = useStyles(FeatureCardStyles, {
    variant: variant === "default" ? undefined : variant,
    style: style === "default" ? undefined : style,
  });

  const isButtonInverted = (brand: BrandName) => {
    if (brand === "switch") {
      return style === "alternate";
    }

    if (
      type === "backgroundImage" ||
      (type === "text" && style === "alternate")
    ) {
      return style === "default";
    }
    return style === "alternate";
  };

  return (
    <View style={styles.contentContainer(variant, type)}>
      <View>
        {type === "visual" && (
          <Animated.Image
            testID="visual"
            style={[styles.frontImage, visualAnimation]}
            source={image?.localSrc || { uri: image?.src as string }}
            resizeMode="contain"
          />
        )}
        {type === "text" && (
          <View style={styles.titleContainer}>
            {variant === "compact" ? (
              <Heading size="md" as="h3" style={styles.copyColor}>
                {title}
              </Heading>
            ) : (
              <Display size="sm" style={styles.copyColor}>
                {title}
              </Display>
            )}
          </View>
        )}
      </View>
      <View style={styles.body}>
        <View style={styles.copyBody}>
          {type !== "text" && (
            <Heading
              size={variant === "compact" ? "md" : "lg"}
              as="h3"
              style={[
                type === "backgroundImage"
                  ? styles.copyColorWithBackground
                  : styles.copyColor,
              ]}
            >
              {title}
            </Heading>
          )}
          <Paragraph
            size={variant === "compact" ? "sm" : "lg"}
            style={
              type === "backgroundImage"
                ? styles.copyColorWithBackground
                : styles.copyColor
            }
          >
            {description}
          </Paragraph>
        </View>
        <View style={styles.buttonBody}>
          <BaseButton
            asText
            isHovered={isHovered}
            inverted={isButtonInverted(brand)}
            size={variant === "compact" ? "sm" : "default"}
            pointerEvents="none"
          >
            <BaseButton.Icon name="arrow-right" />
          </BaseButton>
        </View>
      </View>
    </View>
  );
};

export { FeatureCard };
