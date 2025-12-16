import { useMemo } from "react";
import type { StyleProp, TextStyle } from "react-native";
import { Svg, Path } from "react-native-svg";
import { useStyles } from "react-native-unistyles";

import type { SpinnerIconProps } from "../Spinner.types";

const version = "v1";

const iconColor = (baseColor: string, style?: StyleProp<TextStyle>) => {
  const color = (Array.isArray(style) ? style : [style])
    .filter((s): s is TextStyle => !!s && typeof s === "object" && "color" in s)
    .find((s) => s.color)?.color;

  return color || baseColor;
};

export const SpinIcon = ({ size, color, style, testID }: SpinnerIconProps) => {
  const {
    theme: {
      themes: {
        semantics: {
          color: { text },
        },
        components: {
          progressIndicators: {
            spinner: {
              [version]: {
                color: { icon: colorIcon },
                size: { icon },
              },
            },
          },
        },
      },
    },
  } = useStyles();

  const loadingIndicatorSize = useMemo(() => icon[size], [size, icon]);

  const loadingIndicatorColor = useMemo(
    () => iconColor(colorIcon, style),
    [style, colorIcon],
  );

  const fill =
    !!color && color === "inverted"
      ? text.inverted.default
      : loadingIndicatorColor;

  return (
    <Svg
      width={loadingIndicatorSize}
      height={loadingIndicatorSize}
      viewBox="0 0 24 24"
      fill="none"
      testID={testID}
    >
      <Path
        d="M4.975 20.165l.978-1.138a9.148 9.148 0 005.336 2.211l-.11 1.496a10.644 10.644 0 01-6.204-2.57zm-3.71-8.954l1.497.11c.353-4.797 4.404-8.555 9.222-8.555 5.1 0 9.25 4.15 9.25 9.25a9.234 9.234 0 01-2.238 6.03l1.136.98a10.733 10.733 0 002.602-7.01c0-5.928-4.822-10.75-10.75-10.75-5.6 0-10.308 4.368-10.718 9.945zm1.497 1.5l-1.496.11a10.644 10.644 0 002.57 6.204l1.137-.978a9.148 9.148 0 01-2.211-5.336zm10.027 10.023a10.643 10.643 0 006.204-2.57l-.978-1.137a9.148 9.148 0 01-5.336 2.211l.11 1.496z"
        fill={fill}
      />
    </Svg>
  );
};
