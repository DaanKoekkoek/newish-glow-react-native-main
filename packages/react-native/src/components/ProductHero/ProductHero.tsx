import type { BreakpointKeys } from "_theming/breakpoints";
import { LargeSticker } from "components/LargeSticker";
import { Image } from "foundations/Image";
import { useCallback, useState } from "react";
import { View } from "react-native";
import { UnistylesRuntime, useStyles } from "react-native-unistyles";

import { ProductHeroStyles } from "./ProductHero.styles";
import type { ProductHeroProps } from "./ProductHero.types";

export const ProductHero = ({
  largeSticker,
  image,
  status,
  variant = "default",
}: ProductHeroProps) => {
  const { styles } = useStyles(ProductHeroStyles);

  const breakpoint = UnistylesRuntime.breakpoint as BreakpointKeys;
  const isDefault =
    (variant === "default" && breakpoint === "mobile") ||
    breakpoint === "mobileSmall";
  const shouldCenter = breakpoint === "laptop" || breakpoint === "desktop";
  const [height, setHeight] = useState(0);

  const onLayout = useCallback(
    (event: { nativeEvent: { layout: { width: number; height: number } } }) => {
      const { height } = event.nativeEvent.layout;

      setHeight(height);
    },
    [],
  );

  if (isDefault) {
    return (
      <View style={{ minHeight: height }} testID="product-hero">
        <View style={styles.container}>
          <Image
            backgroundImageStyle={styles.image}
            {...image}
            resizeMode="contain"
          />
          <View onLayout={onLayout} style={styles.wrapperDefault}>
            <View style={styles.spacer} />
            <View style={styles.gap}>
              <LargeSticker
                {...largeSticker}
                {...(largeSticker?.type === "usp" && {
                  containerStyle: styles.largeStickerContainer,
                })}
              />
              <View style={[styles.status, shouldCenter && styles.alignCenter]}>
                {status}
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, styles.gap]}>
      <View>
        <Image
          backgroundImageStyle={styles.image}
          {...image}
          resizeMode="contain"
        />
        <View
          style={[
            styles.wrapperPromo,
            variant === "promo" && styles.promoPadding,
          ]}
        >
          <LargeSticker
            {...largeSticker}
            {...(largeSticker?.type === "usp" && {
              containerStyle: styles.largeStickerContainer,
            })}
          />
        </View>
      </View>
      <View style={[styles.status, shouldCenter && styles.alignCenter]}>
        {status}
      </View>
    </View>
  );
};
