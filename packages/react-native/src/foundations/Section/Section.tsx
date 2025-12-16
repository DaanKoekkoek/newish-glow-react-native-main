import { Section as ExpoSection } from "@expo/html-elements";
import { usePropAcrossBreakpoints } from "_global-hooks";
import { type BreakpointKeys, resolveThemePrimitives } from "_theming/index";
import {
  SubscriptionHeroProvider,
  useSubscriptionHeroContext,
} from "components/SubscriptionHero/SubscriptionHeroContext";
import { useThemeProviderContext } from "components/ThemeProvider";
import { useTopNavigationContext } from "components/TopNavigation/TopNavigationContext";
import { GlowGradient } from "foundations/GlowGradient";
import { Image } from "foundations/index";
import React, { useRef, useEffect, useId } from "react";
import type { View } from "react-native";
import Animated, {
  useAnimatedRef,
  useSharedValue,
  measure,
} from "react-native-reanimated";
import {
  createStyleSheet,
  useStyles,
  UnistylesRuntime,
} from "react-native-unistyles";

import type {
  SectionProps,
  SectionInfoProps,
  SectionPaddingPerBreakpointType,
} from "./Section.types";
import { SectionContext } from "./SectionContext";

export const SectionMain = ({
  paddingTop = "default",
  paddingBottom = "default",
  variant = "default",
  glow = "Glow1",
  image,
  style,
  palette = "default",
  children,
  imageStyle,
}: SectionProps) => {
  const sectionHeight = useSharedValue<number>(0);
  const sectionRef = useAnimatedRef<View>();
  const sectionTopPaddingValue: SectionPaddingPerBreakpointType =
    usePropAcrossBreakpoints(paddingTop);
  const sectionBottomPaddingValue: SectionPaddingPerBreakpointType =
    usePropAcrossBreakpoints(paddingBottom);
  const breakpoint = UnistylesRuntime.breakpoint as BreakpointKeys;

  const { updateSectionInfo, removeSectionInfo } = useTopNavigationContext();
  const { hasSubscriptionHero } = useSubscriptionHeroContext();
  const { theme } = useThemeProviderContext();
  const { styles } = useStyles(stylesheet, {
    variant: variant === "default" ? undefined : variant,
    paddingTop:
      sectionTopPaddingValue[breakpoint] === "default" ? undefined : "none",
    paddingBottom:
      sectionBottomPaddingValue[breakpoint] === "default" ? undefined : "none",
  });

  const updateSectionInfoRef = useRef(updateSectionInfo);

  const uniqueId = useId();
  const uuidRef = useRef(uniqueId);
  const uuid = uuidRef.current;

  useEffect(() => {
    updateSectionInfoRef.current = updateSectionInfo;
  }, [updateSectionInfo]);

  useEffect(() => {
    const sectionInfo: SectionInfoProps = {
      uuid,
      sectionHeight,
      sectionVariant: variant,
      sectionPalette: palette,
      hasSubscriptionHero,
    };
    updateSectionInfoRef.current?.(sectionInfo);
  }, [
    sectionHeight.value,
    hasSubscriptionHero,
    variant,
    palette,
    sectionHeight,
    uuid,
  ]);

  useEffect(() => {
    return () => {
      removeSectionInfo(uuid);
    };
  }, [uuid, removeSectionInfo]);

  const handleSectionLayout = () => {
    const measuredSection = measure(sectionRef);
    if (measuredSection && measuredSection.height && measuredSection.pageY) {
      const { height } = measuredSection;
      sectionHeight.value = height;
    }
  };

  const {
    theme: {
      themes: {
        components: { section },
      },
    },
  } = useStyles(stylesheet);

  return (
    <SectionContext.Provider
      value={{ sectionPalette: palette ? palette : undefined }}
    >
      <Animated.View
        ref={sectionRef}
        collapsable={false}
        onLayout={handleSectionLayout}
      >
        <ExpoSection
          testID="section"
          style={[
            styles.section,
            !image && styles.sectionSpacing,
            !!palette &&
              variant === "subtle" &&
              styles.compoundStyleWithPalette(palette),
            style,
          ]}
        >
          {image && variant === "image" ? (
            <Image
              backgroundImageStyle={[styles.sectionSpacing, imageStyle]}
              src={image.src}
              localSrc={image.localSrc}
              alt={image.alt}
              resizeMode={image.resizeMode}
            >
              {children}
            </Image>
          ) : variant === "emphasised" &&
            section.atoms.glow.visibility.emphasised ? (
            <>
              <GlowGradient
                type={glow}
                brightness={theme}
                zIndex={0}
                renderAs="static"
                style={styles.backgroundGlow}
              />
              {children}
            </>
          ) : (
            children
          )}
        </ExpoSection>
      </Animated.View>
    </SectionContext.Provider>
  );
};

export const Section = ({ children, ...props }: SectionProps) => {
  return (
    <SubscriptionHeroProvider>
      <SectionMain {...props}>{children}</SectionMain>
    </SubscriptionHeroProvider>
  );
};

const stylesheet = createStyleSheet(
  ({
    screenSizes: { grid },
    themes: {
      components: { section },
      semantics: { padding },
    },
  }) => ({
    compoundStyleWithPalette: (palette: SectionProps["palette"]) => {
      return resolveThemePrimitives({
        value: section.atoms.color.background.subtle,
        property: "backgroundColor",
        themeName: UnistylesRuntime.themeName,
        selectedVariant: palette,
      });
    },
    section: {
      variants: {
        variant: {
          default: {
            backgroundColor: section.atoms.color.background.default,
          },
          subtle: {
            backgroundColor: section.atoms.color.background.subtle,
          },
          emphasised: {
            backgroundColor: section.atoms.color.background.emphasised,
          },
          image: {
            backgroundColor: section.atoms.color.background.image,
          },
        },
      },
    },
    sectionSpacing: {
      rowGap: grid.gap,
      aspectRatio: "auto",
      variants: {
        paddingTop: {
          default: {
            paddingTop: padding.section.default,
          },
          none: {
            paddingTop: padding.section.none,
          },
        },
        paddingBottom: {
          default: {
            paddingBottom: padding.section.default,
          },
          none: {
            paddingBottom: padding.section.none,
          },
        },
      },
    },
    backgroundGlow: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
  }),
);
