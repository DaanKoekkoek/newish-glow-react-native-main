import { useThemeProviderContext } from "components/index";
import React from "react";
import { View } from "react-native";
import Animated from "react-native-reanimated";
import Svg, {
  Rect,
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
  Path,
  G,
  ClipPath,
} from "react-native-svg";
import { useStyles } from "react-native-unistyles";

import type {
  BaseSvgProps,
  LinearGradientProps,
  RadialGradientProps,
  GlowGradientProps,
  GradientSvgProps,
} from "./GlowGradient.types";
import { gradientConfiguration } from "./gradientConfiguration";

const CustomLinearGradient = ({
  id,
  x1,
  y1,
  x2,
  y2,
  stops,
  gradientUnits,
}: LinearGradientProps) => (
  <LinearGradient
    id={id}
    x1={x1}
    y1={y1}
    x2={x2}
    y2={y2}
    gradientUnits={gradientUnits}
  >
    {stops.map((stop, index) => (
      <Stop
        key={index}
        offset={stop.offset}
        stopColor={stop.stopColor}
        stopOpacity={stop.stopOpacity}
      />
    ))}
  </LinearGradient>
);

const CustomRadialGradient = ({
  id,
  cx,
  cy,
  r,
  gradientTransform,
  stops,
}: RadialGradientProps) => (
  <RadialGradient
    id={id}
    cx={cx}
    cy={cy}
    r={r}
    gradientUnits="userSpaceOnUse"
    gradientTransform={gradientTransform}
  >
    {stops.map((stop, index) => (
      <Stop
        key={index}
        offset={stop.offset}
        stopColor={stop.stopColor}
        stopOpacity={stop.stopOpacity}
      />
    ))}
  </RadialGradient>
);

const BaseSvg = ({ children }: BaseSvgProps) => (
  <Svg
    width="100%"
    height="100%"
    preserveAspectRatio="xMidYMid slice"
    viewBox="0 0 960 1080"
    fill="none"
  >
    {children}
  </Svg>
);

const BaseGradient = ({
  radialGradientsProps,
  linearGradientProps,
}: GradientSvgProps) => (
  <G>
    <G clipPath="url(#clip0)">
      <Path
        d="M960 0H0v1080h960V0z"
        fill={`url(#${linearGradientProps?.id})`}
      />
      {radialGradientsProps?.map((radialProps, index) => (
        <Path
          key={index}
          d="M960 0H0v1080h960V0z"
          fill={`url(#${radialProps.id})`}
        />
      ))}
    </G>
    <Defs>
      {!!linearGradientProps && (
        <CustomLinearGradient {...linearGradientProps} />
      )}
      {radialGradientsProps?.map((radialProps, index) => (
        <CustomRadialGradient key={index} {...radialProps} />
      ))}
      <ClipPath id="clip0">
        <Path fill="#fff" d="M0 0H960V1080H0z" />
      </ClipPath>
    </Defs>
  </G>
);

const GradientSvg = ({ ...props }: GradientSvgProps) => (
  <BaseSvg>
    <BaseGradient {...props} />
  </BaseSvg>
);

export const GlowGradient = ({
  brightness = "light",
  renderAs = "animated",
  zIndex = 0,
  type,
  style,
  animatedStyle,
  mask = false,
}: GlowGradientProps) => {
  const config = gradientConfiguration[type];

  if (!config) {
    throw new Error(`No gradient configuration found for type ${type}`);
  }

  const {
    lightLinearGradientProps,
    lightRadialGradientProps,
    darkLinearGradientProps,
    darkRadialGradientProps,
  } = config;

  const isLight = brightness === "light";

  const { brand } = useThemeProviderContext();
  const {
    theme: {
      themes: {
        semantics: {
          color: { text },
        },
      },
    },
  } = useStyles();

  if (brand !== "odido")
    return <Rect fill={text.default} width="960" height="1080" />;

  return mask ? (
    <BaseGradient
      linearGradientProps={
        (isLight ? lightLinearGradientProps : darkLinearGradientProps) ||
        undefined
      }
      radialGradientsProps={
        (isLight ? lightRadialGradientProps : darkRadialGradientProps) ||
        undefined
      }
    />
  ) : (
    <>
      {renderAs === "animated" && (
        <Animated.View style={[style, animatedStyle, { zIndex }]}>
          <GradientSvg
            linearGradientProps={
              (isLight ? darkLinearGradientProps : lightLinearGradientProps) ||
              undefined
            }
            radialGradientsProps={
              (isLight ? darkRadialGradientProps : lightRadialGradientProps) ||
              undefined
            }
          />
        </Animated.View>
      )}
      <View style={[style, { zIndex: zIndex - 1 }]} testID="glow-gradient">
        <GradientSvg
          linearGradientProps={
            (isLight ? lightLinearGradientProps : darkLinearGradientProps) ||
            undefined
          }
          radialGradientsProps={
            (isLight ? lightRadialGradientProps : darkRadialGradientProps) ||
            undefined
          }
        />
      </View>
    </>
  );
};
