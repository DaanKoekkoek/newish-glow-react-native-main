import { GlowGradient } from "foundations/GlowGradient";
import { Image } from "foundations/index";
import React from "react";
import { View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

import type { BackgroundProps } from "./Background.types";

export const Background = ({
  variant = "default",
  glow = "Glow1",
  brightness = "light",
  image,
  children,
  backgroundStyle,
}: BackgroundProps) => {
  const { styles } = useStyles(stylesheet);

  return (
    <View
      testID="background"
      style={[
        styles.background,
        !image && styles.backgroundSpacing,
        backgroundStyle,
      ]}
    >
      {image && variant === "image" ? (
        <Image
          backgroundImageStyle={styles.backgroundSpacing}
          src={image.src}
          localSrc={image.localSrc}
          alt={image.alt}
          resizeMode={image.resizeMode}
        >
          {children}
        </Image>
      ) : variant === "emphasised" ? (
        <>
          <GlowGradient
            type={glow}
            brightness={brightness}
            zIndex={0}
            renderAs="static"
            style={styles.backgroundGlow}
          />
          {children}
        </>
      ) : (
        children
      )}
    </View>
  );
};

const stylesheet = createStyleSheet(() => ({
  background: {
    alignSelf: "baseline",
    overflow: "hidden",
  },
  backgroundSpacing: {
    aspectRatio: "auto",
  },
  backgroundGlow: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
}));
