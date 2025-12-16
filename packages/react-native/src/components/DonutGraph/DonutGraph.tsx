import { useFontFamily } from "_global-hooks";
import type { CommonPalette } from "_theming/tokenLoader";
import { Paragraph } from "foundations/Paragraph";
import React from "react";
import { View, Text } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { useStyles } from "react-native-unistyles";

import { DonutGraphStyles, version } from "./DonutGraph.styles";
import type { DonutGraphProps } from "./DonutGraph.types";

export const DonutGraph = ({
  label,
  value,
  palette = "default",
  size = "default",
  percentage = 0,
}: DonutGraphProps) => {
  const { styles, theme } = useStyles(DonutGraphStyles, {
    variant: size === "default" ? undefined : size,
  });

  const numberFontFamily = useFontFamily("Heading_Medium");

  const {
    themes: {
      components: {
        graph: {
          donutGraph: { [version]: donutGraph },
        },
      },
    },
  } = theme;

  const circleWidth = donutGraph.borderWidth.donut.base[size];
  const progressWidth = donutGraph.borderWidth.donut.percentage[size];
  const graphSize = donutGraph.size.container[size];
  const circleSize = donutGraph.size.donut.base[size] / 2 - circleWidth / 2;
  const percentageSize =
    donutGraph.size.donut.percentage[size] / 2 - progressWidth / 2;
  const radius = (graphSize - progressWidth) / 2;
  const progressLineSize = 2 * Math.PI * radius;
  const strokeDashoffset = progressLineSize * (1 - percentage / 100);

  const getStrokeColor = (palette: CommonPalette) => {
    return donutGraph.color.donut.percentage[
      palette as keyof typeof donutGraph.color.donut.percentage
    ];
  };

  return (
    <View style={styles.container}>
      <Svg
        width={graphSize}
        height={graphSize}
        viewBox={`0 0 ${graphSize} ${graphSize}`}
      >
        <Circle
          cx={graphSize / 2}
          cy={graphSize / 2}
          r={circleSize}
          stroke={donutGraph.color.donut.base}
          strokeWidth={circleWidth}
          fill="none"
        />
        <Circle
          cx={graphSize / 2}
          cy={graphSize / 2}
          r={percentageSize}
          stroke={getStrokeColor(palette)}
          strokeWidth={progressWidth}
          fill="none"
          strokeDasharray={progressLineSize}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${graphSize / 2} ${graphSize / 2})`}
        />
      </Svg>
      <View style={styles.textContainer}>
        <Text style={[{ fontFamily: numberFontFamily }, styles.number]}>
          {value}
        </Text>
        <Paragraph
          size={size === "default" ? "xxs" : "lg"}
          style={styles.label}
        >
          {label}
        </Paragraph>
      </View>
    </View>
  );
};
