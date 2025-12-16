import type { BreakpointKeys } from "_theming/breakpoints";
import { GlowGradient } from "foundations/GlowGradient";
import { Heading } from "foundations/Heading";
import { Icon } from "foundations/Icon";
import React from "react";
import { Text, View } from "react-native";
import Svg, { Circle as SvgCircle } from "react-native-svg";
import { UnistylesRuntime, useStyles } from "react-native-unistyles";

import { stylesheetAtoms } from "./Stepper.atoms.styles";
import { stylesheetInpage } from "./Stepper.inpage.styles";
import type {
  StepperDottedLineProps,
  StepperMarkerProps,
} from "./Stepper.types";

const StepperDottedLine = ({
  active = false,
  direction = "horizontal",
}: StepperDottedLineProps) => {
  const { styles } = useStyles(stylesheetAtoms, {
    direction: direction === "horizontal" ? undefined : direction,
  });

  const stepperDot = {
    offset: 6,
    size: 2,
    count: 100,
  };

  const propSvg =
    direction === "horizontal"
      ? {
          width: "100%",
          height: stepperDot.size * 2,
          preserveaspectration: "xMinYMid",
          viewbox: `0 0 100% 100%`,
        }
      : {
          width: stepperDot.size * 2,
          height: "100%",
          preserveaspectration: "xMidYMid meet",
          viewbox: `0 0 100% 100%`,
        };

  const propCircle = (i: number) =>
    direction === "horizontal"
      ? {
          r: stepperDot.size,
          cx: (i + 0.5) * (stepperDot.size + stepperDot.offset),
          cy: stepperDot.size,
          fill: active
            ? styles.dotsActive.borderColor
            : styles.dots.borderColor,
        }
      : {
          r: stepperDot.size,
          cx: stepperDot.size,
          cy: (i + 0.5) * (stepperDot.size + stepperDot.offset),
          fill: active
            ? styles.dotsActive.borderColor
            : styles.dots.borderColor,
        };

  return (
    <View style={styles.space}>
      <Svg {...propSvg} style={styles.svg}>
        {[...Array(stepperDot.count)].map((_, i) => (
          <SvgCircle key={i} {...propCircle(i)} />
        ))}
      </Svg>
    </View>
  );
};

const StepperMarker = ({
  status,
  size,
  index,
  palette = "default",
}: StepperMarkerProps) => {
  const { styles } = useStyles(stylesheetAtoms, {
    size: size === "default" ? undefined : size,
    status: status === "default" ? undefined : status,
  });

  const breakpoint = UnistylesRuntime.breakpoint as BreakpointKeys;

  if (status === "active") {
    return (
      <View style={[styles.markerGradient]}>
        <GlowGradient
          type="Glow4"
          zIndex={2}
          style={[styles.markerGradient]}
          renderAs="static"
          brightness="dark"
        />
        <View
          style={[
            styles.markerBody,
            styles.markerGradientBody,
            styles.activeMarkerBodyPosition(breakpoint),
          ]}
        >
          <Heading size="md" style={styles.markerText}>
            {index}
          </Heading>
        </View>
      </View>
    );
  }
  if (status === "completed")
    return (
      <View style={styles.markerBorder}>
        <View style={styles.markerBody}>
          <Text style={styles.iconCompleted}>
            <Icon name="checkmark" size={size === "large" ? "md" : "sm"} />
          </Text>
        </View>
      </View>
    );
  else
    return (
      <View
        style={[
          styles.markerBorder,
          palette &&
            status === "inactive" &&
            styles.compoundStyleWithPalette(palette),
        ]}
      >
        <View style={styles.markerBody}>
          <Heading size="md" style={styles.markerText}>
            {index}
          </Heading>
        </View>
      </View>
    );
};

const StepperInpageMarker = ({
  status,
  index,
  palette = "default",
}: StepperMarkerProps) => {
  const { styles } = useStyles(stylesheetInpage, {
    status: status === "default" ? undefined : status,
  });

  if (status === "active") {
    return (
      <View style={styles.markerWrapper}>
        <GlowGradient
          type="Glow4"
          zIndex={2}
          style={styles.markerBorder}
          renderAs="static"
          brightness="dark"
        />
        <View style={[styles.activeMarkerBody, styles.markerBody]}>
          <Heading size="md">{index}</Heading>
        </View>
      </View>
    );
  }
  if (status === "completed")
    return (
      <View style={styles.markerBorder}>
        <View style={styles.markerBody}>
          <Text style={styles.iconCompleted}>
            <Icon name="checkmark" size="default" />
          </Text>
        </View>
      </View>
    );

  return (
    <View
      style={[
        styles.markerBorder,
        palette &&
          status === "default" &&
          styles.compoundStyleWithPaletteDefault(palette),
        palette &&
          status === "inactive" &&
          styles.compoundStyleWithPaletteInactive(palette),
      ]}
    >
      <View
        style={[
          styles.markerBody,
          palette &&
            status === "inactive" &&
            styles.compoundStyleWithPaletteInactive(palette),
        ]}
      >
        <Heading size="md" style={styles.markerText}>
          {index}
        </Heading>
      </View>
    </View>
  );
};

export { StepperDottedLine, StepperInpageMarker, StepperMarker };
