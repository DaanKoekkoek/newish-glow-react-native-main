import { useId } from "react";
import Svg, {
  ClipPath,
  Defs,
  G,
  LinearGradient,
  Path,
  RadialGradient,
  Stop,
} from "react-native-svg";
import { useStyles } from "react-native-unistyles";

import type { AppIconProps } from "../AppIcon.types";

export const GlowAppIcon: React.FC<AppIconProps> = ({
  disabled,
  size,
  children,
}: AppIconProps) => {
  const clipPathId = useId();
  const linearGradientId = useId();
  const radialGradientId_1 = useId();
  const radialGradientId_2 = useId();
  const radialGradientId_3 = useId();
  const radialGradientId_4 = useId();

  const {
    theme: {
      themes: {
        components: {
          assets: {
            logosAndVisuals: { appIcons },
          },
        },
      },
    },
  } = useStyles();

  const disabledFillColor = appIcons.color.fill.inactive;

  return (
    <Svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <Defs>
        <ClipPath id={clipPathId}>{children}</ClipPath>
        <LinearGradient
          id={linearGradientId}
          x1="64"
          y1="-0.000211928"
          x2="8.2695"
          y2="70.5337"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0.777327" stopColor="#97A9FF" />
          <Stop offset="1" stopColor="#80AAFF" />
        </LinearGradient>
        <RadialGradient
          id={radialGradientId_1}
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(34.1925 -3.07197) rotate(80.501) scale(74.8507 45.793)"
        >
          <Stop offset="0.65" stopColor="#AAC6FF" />
          <Stop offset="0.84" stopColor="#8BADFF" />
          <Stop offset="1" stopColor="#8BADFF" stopOpacity="0" />
        </RadialGradient>
        <RadialGradient
          id={radialGradientId_2}
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(46.2691 26.3235) rotate(80.8698) scale(51.7685 33.8022)"
        >
          <Stop stopColor="#958CFC" />
          <Stop offset="0.33941" stopColor="#958CFC" />
          <Stop offset="0.739171" stopColor="#A9A3FF" />
          <Stop offset="1" stopColor="#A9A3FF" stopOpacity="0" />
        </RadialGradient>
        <RadialGradient
          id={radialGradientId_3}
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(42.6029 6.97377) rotate(75.4645) scale(61.7846 33.1299)"
        >
          <Stop offset="0.578582" stopColor="#AE94E8" />
          <Stop offset="0.697843" stopColor="#958DFF" />
          <Stop offset="1" stopColor="#988EFC" stopOpacity="0" />
        </RadialGradient>
        <RadialGradient
          id={radialGradientId_4}
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(41.0544 -3.35148) rotate(90) scale(49.5153 37.0363)"
        >
          <Stop offset="0.00787439" stopColor="#FF914E" />
          <Stop offset="0.565" stopColor="#F6AA93" />
          <Stop offset="0.708535" stopColor="#DFA3B4" />
          <Stop offset="1" stopColor="#DFA3B4" stopOpacity="0" />
        </RadialGradient>
      </Defs>
      <G clipPath={`url(#${clipPathId})`}>
        <Path
          d="M64 -0.000213623H0V63.9998H64V-0.000213623Z"
          fill={disabled ? `${disabledFillColor}` : `url(#${linearGradientId})`}
        />
        <Path
          d="M64 -0.000213623H0V63.9998H64V-0.000213623Z"
          fill={
            disabled ? `${disabledFillColor}` : `url(#${radialGradientId_1})`
          }
        />
        <Path
          d="M64 -0.000213623H0V63.9998H64V-0.000213623Z"
          fill={
            disabled ? `${disabledFillColor}` : `url(#${radialGradientId_2})`
          }
          fillOpacity={disabled ? "1" : "0.9"}
        />
        <Path
          d="M64 -0.000213623H0V63.9998H64V-0.000213623Z"
          fill={
            disabled ? `${disabledFillColor}` : `url(#${radialGradientId_3})`
          }
        />
        <Path
          d="M64 -0.000213623H0V63.9998H64V-0.000213623Z"
          fill={
            disabled ? `${disabledFillColor}` : `url(#${radialGradientId_4})`
          }
        />
      </G>
    </Svg>
  );
};
