import { useThemeProviderContext } from "components/index";
import { MaskIcon } from "foundations/Icon";
import { View } from "react-native";
import Animated from "react-native-reanimated";

import type { GlowIconProps } from "./GlowIcon.types";
import { GlowGradient } from "../GlowGradient/GlowGradient";

export const GlowIcon = ({
  name,
  size,
  solid,
  renderAs = "static",
  style,
  animatedStyle,
  zIndex = 0,
  brightness = "light",
  ...gradientProps
}: GlowIconProps) => {
  const { brand } = useThemeProviderContext();

  return (
    <>
      {renderAs === "animated" && (
        <Animated.View style={[style, animatedStyle, { zIndex }]}>
          <MaskIcon
            brand={brand !== "simpel" ? brand : undefined}
            name={name}
            size={size}
            solid={solid}
          >
            <GlowGradient
              {...gradientProps}
              brightness={brightness}
              zIndex={0}
              mask
            />
          </MaskIcon>
        </Animated.View>
      )}
      <View style={[style, { zIndex: zIndex - 1 }]}>
        <MaskIcon
          brand={brand !== "simpel" ? brand : undefined}
          name={name}
          size={size}
          solid={solid}
        >
          <GlowGradient
            {...gradientProps}
            brightness={
              renderAs === "animated"
                ? brightness === "dark"
                  ? "light"
                  : "dark"
                : brightness
            }
            zIndex={0}
            mask
          />
        </MaskIcon>
      </View>
    </>
  );
};
