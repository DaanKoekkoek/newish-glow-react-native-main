import { useFontFamily } from "_global-hooks";
import type { CommonPalette } from "_theming/tokenLoader";
import { Paragraph } from "foundations/Paragraph";
import React from "react";
import { View, Text } from "react-native";
import { useStyles } from "react-native-unistyles";

import { DottedGraphStyles, version } from "./DottedGraph.styles";
import type { DottedGraphProps } from "./DottedGraph.types";

export const DottedGraph = ({
  variant = 24,
  size = "default",
  palette = "default",
  percentage,
  value,
  label,
}: DottedGraphProps) => {
  const { styles, theme } = useStyles(DottedGraphStyles, {
    variant: size === "default" ? undefined : size,
  });

  const numberFontFamily = useFontFamily("Heading_Medium");

  const {
    themes: {
      components: {
        graph: {
          dottedGraph: { [version]: dottedGraph },
        },
      },
    },
  } = theme;

  const baseDotRadius = dottedGraph.size.dot.base[size] / 2;
  const percentageDotRadius = dottedGraph.size.dot.percentage[size] / 2;
  const angleStep = (2 * Math.PI) / variant;
  const graphSize = dottedGraph.size.container[size];
  const radius = graphSize / 2;

  const getAttentionColor = (palette: CommonPalette) => {
    return typeof dottedGraph.color.dot.attention === "object"
      ? dottedGraph.color.dot.attention[
          palette as keyof typeof dottedGraph.color.dot.attention
        ]
      : dottedGraph.color.dot.attention;
  };

  const getDotColor = (palette: CommonPalette, isActive: boolean) => {
    return isActive
      ? dottedGraph.color.dot.percentage[
          palette as keyof typeof dottedGraph.color.dot.percentage
        ]
      : dottedGraph.color.dot.base;
  };

  return (
    <View style={styles.container}>
      {Array.from({ length: variant }).map((_, index) => {
        const isActive = index < percentage;
        const dotRadius = isActive ? percentageDotRadius : baseDotRadius;
        const angle = -Math.PI / 2 + index * angleStep;
        const distanceFromCenter = radius - baseDotRadius * 2;
        const x = Math.cos(angle) * distanceFromCenter;
        const y = Math.sin(angle) * distanceFromCenter;
        const isAttentionColor = percentage === 1 && index === 0;
        const attentionColor = getAttentionColor(palette);
        const dotColor = getDotColor(palette, isActive);

        return (
          <View
            key={index}
            style={[
              styles.dot,
              {
                width: dotRadius * 2,
                height: dotRadius * 2,
                borderRadius: dotRadius,
                backgroundColor: isAttentionColor ? attentionColor : dotColor,
                transform: [{ translateX: x }, { translateY: y }],
              },
            ]}
          />
        );
      })}
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
