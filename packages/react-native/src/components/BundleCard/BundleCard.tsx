import { Button } from "components/Button";
import type { DonutGraphProps } from "components/DonutGraph";
import { DonutGraph } from "components/DonutGraph";
import type { DottedGraphProps } from "components/DottedGraph";
import { DottedGraph } from "components/DottedGraph";
import { Heading } from "foundations/Heading";
import React from "react";
import { View } from "react-native";
import { useStyles } from "react-native-unistyles";

import { BundleCardStyles } from "./BundleCard.styles";
import type { BundleCardProps } from "./BundleCard.types";

export const BundleCard = ({
  topLabel,
  bottomLabel,
  buttonLabel,
  variant = "default",
  graphProps,
  palette = "default",
  onPressButton,
}: BundleCardProps) => {
  const { styles } = useStyles(BundleCardStyles, {
    variant: variant === "default" ? undefined : variant,
  });
  const button = variant === "empty" ? "Bundel kopen" : "Bijkopen";

  return (
    <View style={styles.container(palette)}>
      <View style={styles.leftSection}>
        <View style={styles.labels}>
          <Heading style={styles.product(palette)} size="md">
            {topLabel}
          </Heading>
          <Heading size="md">{bottomLabel}</Heading>
        </View>
        <Button
          size="sm"
          palette={palette}
          prominence={variant === "default" ? "secondary" : "default"}
          onPress={onPressButton}
          fill={variant === "empty"}
        >
          {buttonLabel ?? button}
        </Button>
      </View>
      {variant === "default" && graphProps ? (
        <DonutGraph
          {...(graphProps as DonutGraphProps)}
          palette={palette}
          size="default"
        />
      ) : (
        <DottedGraph
          {...(graphProps as DottedGraphProps)}
          palette={palette}
          percentage={
            variant === "empty"
              ? 0
              : (graphProps as DottedGraphProps)?.percentage
          }
          label={
            variant === "empty"
              ? undefined
              : (graphProps as DottedGraphProps)?.label
          }
          value={
            variant === "empty"
              ? undefined
              : (graphProps as DottedGraphProps)?.value
          }
          size="default"
        />
      )}
    </View>
  );
};
