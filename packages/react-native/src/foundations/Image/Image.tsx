import React from "react";
import { ImageBackground, Image as NativeImage } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

import type { ImageProps } from "./Image.types";

// NOTE: This is currently an internal component.
export const Image = ({
  src,
  localSrc,
  alt,
  placeholderSrc,
  srcSet,
  type = "background",
  children,
  ratio = "16/9",
  imageStyle,
  backgroundImageStyle,
  resizeMode = "cover",
  onLoad = () => {},
  onError = () => {},
  onLoadStart = () => {},
  onLoadEnd = () => {},
  ...props
}: ImageProps) => {
  const { styles } = useStyles(stylesheet, {
    ratio,
  });

  const config = {
    style:
      type === "background"
        ? [styles.background, styles.image, backgroundImageStyle]
        : [styles.foreground, styles.image, imageStyle],
    loadingIndicatorSource: { uri: placeholderSrc },
    source: src && !localSrc ? { uri: src } : localSrc,
    accessibilityLabel: alt,
    resizeMode,
    srcSet,
    testID: "image",
    ...props,
  };

  if (!src && !localSrc) {
    return null;
  }

  return (
    <>
      {type === "background" ? (
        <ImageBackground
          onLoad={({ nativeEvent }) => onLoad(nativeEvent)}
          onError={({ nativeEvent }) => onError(nativeEvent)}
          {...config}
        >
          {children}
        </ImageBackground>
      ) : (
        <>
          <NativeImage
            onLoad={({ nativeEvent }) => onLoad(nativeEvent)}
            onError={({ nativeEvent }) => onError(nativeEvent)}
            {...config}
          />
          {children}
        </>
      )}
    </>
  );
};

const stylesheet = createStyleSheet(() => ({
  image: {
    width: undefined,
    height: undefined,
    alignSelf: "stretch",
  },
  background: {
    variants: {
      ratio: {
        "1/1": {
          aspectRatio: 1 / 1,
        },
        "2/1": {
          aspectRatio: 2 / 1,
        },
        "3/1": {
          aspectRatio: 3 / 1,
        },
        "3/4": {
          aspectRatio: 3 / 4,
        },
        "4/3": {
          aspectRatio: 4 / 3,
        },
        "16/9": {
          aspectRatio: 16 / 9,
        },
        "9/16": {
          aspectRatio: 9 / 16,
        },
      },
    },
  },
  foreground: {
    variants: {
      ratio: {
        "1/1": {
          aspectRatio: 1 / 1,
        },
      },
    },
  },
}));
