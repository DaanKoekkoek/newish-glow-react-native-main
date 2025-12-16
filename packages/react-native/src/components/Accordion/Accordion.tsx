import { resolveThemePrimitives } from "_theming/resolveThemePrimitives";
import type { SwitchPalette } from "_theming/tokenLoader";
import { mergeTestIds } from "_utility";
import { Heading, Paragraph } from "foundations/index";
import React, { useState, useEffect, useCallback } from "react";
import { View, Pressable, Platform } from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
  useSharedValue,
  useReducedMotion,
  runOnJS,
} from "react-native-reanimated";
import {
  createStyleSheet,
  UnistylesRuntime,
  useStyles,
} from "react-native-unistyles";

import type { AccordionProps, AccordionStepProps } from "./Accordion.types";

const versionDivider = "v1";
const versionAccordion = "v2";

const Accordion = ({
  children,
  testID,
  inverted = false,
  palette = "default",
}: AccordionProps) => {
  const [active, setActive] = useState<Set<number>>(new Set());

  const accordionTestID = mergeTestIds(testID, "accordion");
  const stepTestID = mergeTestIds(testID, "accordion-step");

  const activeHandler = (id: number) => {
    if (active.has(id)) {
      active.delete(id);
    } else {
      active.add(id);
    }
    setActive(new Set<number>(active));
  };

  return (
    <View testID={accordionTestID}>
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) {
          throw new Error(
            "Accordion component only accepts Accordion.Step as children.",
          );
        }
        return (
          <Step
            key={index}
            testID={stepTestID}
            active={active.has(index)}
            activeHandler={activeHandler}
            title={child.props.title}
            children={child.props.children}
            onPress={child.props.onPress}
            inverted={inverted ?? false}
            index={index}
            palette={palette}
          />
        );
      })}
    </View>
  );
};

/**
 * Step sub component for the Accordion component.
 */
const Step = ({
  title,
  children,
  active,
  inverted = false,
  index,
  activeHandler,
  onPress,
  testID,
  palette = "default",
}: AccordionStepProps) => {
  const [panelHeight, setPanelHeight] = useState(0);
  const [measured, setMeasured] = useState(Platform.OS === "web");
  const [shouldRenderBody, setShouldRenderBody] = useState(active);
  const { styles } = useStyles(stylesheet, {
    inverted: inverted === false ? "false" : "true",
  });

  const reduceMotion = useReducedMotion();
  // TODO: this is not translated atm
  const a11yLabelPrefix = active ? "Close" : "Open";

  const animatedStyles = useAnimatedStyle(() => {
    return reduceMotion
      ? {
          height: active ? panelHeight : 0,
          opacity: active ? 1 : 0,
        }
      : {
          height: withTiming(
            active ? panelHeight : 0,
            {
              duration: 300,
            },
            () => {
              if (!active) {
                runOnJS(setShouldRenderBody)(false);
              }
            },
          ),
          opacity: withTiming(active ? 1 : 0, {
            duration: 300,
          }),
        };
  }, [reduceMotion, active, panelHeight]);

  const togglePress = (id: number = 0) => {
    onPress?.();
    activeHandler?.(id);
  };

  const onLayout = useCallback(
    (event: { nativeEvent: { layout: { width: number; height: number } } }) => {
      const { height } = event.nativeEvent.layout;
      setPanelHeight(height);
    },
    [],
  );

  const handleLayout = Platform.OS === "web" ? onLayout : undefined;

  useEffect(() => {
    if (active) {
      setShouldRenderBody(true);
    }
  }, [active]);

  useEffect(() => {
    if (panelHeight) {
      setMeasured(true);
    }
  }, [panelHeight]);

  const panelContent = React.isValidElement(children) ? (
    children
  ) : (
    <Paragraph style={styles.bodyText}>{children}</Paragraph>
  );

  return (
    <View
      testID={testID}
      style={[styles.step, index === 0 && styles.borderTop]}
    >
      <Pressable
        style={styles.headerBox}
        aria-label={`${a11yLabelPrefix} ${title}`}
        role="button"
        onPress={() => togglePress(index)}
      >
        <Heading size="md" as="h3" style={styles.headerText}>
          {title}
        </Heading>
        <AccordionIcon active={active} inverted={inverted} palette={palette} />
      </Pressable>
      {shouldRenderBody && measured && (
        <Animated.View style={[styles.overflow, animatedStyles]}>
          <View style={styles.body} onLayout={handleLayout} collapsable={false}>
            {panelContent}
          </View>
        </Animated.View>
      )}
      {!measured && (
        <View style={[styles.body, styles.hidden]} onLayout={onLayout}>
          {panelContent}
        </View>
      )}
    </View>
  );
};

const AccordionIcon = ({
  active,
  inverted,
  palette,
}: {
  active?: boolean;
  inverted?: boolean;
  palette: SwitchPalette;
}) => {
  const { styles } = useStyles(stylesheet, {
    inverted,
  });
  const reduceMotion = useReducedMotion();
  const rotateMin = useSharedValue(0);
  const rotatePlus = useSharedValue(90);

  useEffect(() => {
    if (reduceMotion) {
      rotateMin.value = active ? 180 : 0;
      rotatePlus.value = active ? 0 : -90;
    } else {
      rotateMin.value = withTiming(active ? 180 : 0, { duration: 300 });
      rotatePlus.value = withTiming(active ? 0 : -90, { duration: 300 });
    }
  }, [active, reduceMotion, rotateMin, rotatePlus]);

  const animatedMinStyles = useAnimatedStyle(
    () => ({
      transform: [{ rotate: `${rotateMin.value}deg` }],
    }),
    [rotateMin],
  );
  const animatedPlusStyles = useAnimatedStyle(
    () => ({
      transform: [{ rotate: `${rotatePlus.value}deg` }],
    }),
    [rotatePlus],
  );

  return (
    <View style={styles.icon}>
      <Animated.View style={[styles.iconMin(palette), animatedMinStyles]} />
      <Animated.View style={[styles.iconMin(palette), animatedPlusStyles]} />
    </View>
  );
};

const stylesheet = createStyleSheet(
  ({
    themes: {
      components: {
        accordion: { [versionAccordion]: accordion },
        divider: { [versionDivider]: divider },
      },
    },
  }) => ({
    step: {
      borderBottomWidth: divider.size.height.subtle,
      variants: {
        inverted: {
          false: {
            borderColor: divider.color.background.default,
          },
          true: {
            borderColor: divider.color.background.inverted,
          },
        },
      },
    },
    borderTop: {
      borderTopWidth: divider.size.height.subtle,
      borderColor: divider.color.background.default,
      variants: {
        inverted: {
          false: {
            borderColor: divider.color.background.default,
          },
          true: {
            borderColor: divider.color.background.inverted,
          },
        },
      },
    },
    headerBox: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: accordion.padding.vertical,
      paddingHorizontal: accordion.padding.horizontal,
      gap: accordion.gap.horizontal,
    },
    headerText: {
      flexShrink: 1,
      variants: {
        inverted: {
          false: {
            color: accordion.color.text.default,
          },
          true: {
            color: accordion.color.text.inverted,
          },
        },
      },
    },
    body: {
      rowGap: accordion.gap.vertical,
      paddingBottom: accordion.padding.vertical,
      variants: {
        inverted: {
          false: {
            color: accordion.color.text.default,
          },
          true: {
            color: accordion.color.text.inverted,
          },
        },
      },
    },
    bodyText: {
      variants: {
        inverted: {
          true: {
            color: accordion.color.text.inverted,
          },
          false: {
            color: accordion.color.text.default,
          },
        },
      },
    },
    hidden: {
      opacity: 0,
      position: "absolute",
      top: -9999,
      left: -9999,
    },
    icon: {
      alignContent: "center",
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
      width: 20,
    },
    iconMin: (palette: SwitchPalette) => {
      return {
        position: "absolute",
        height: 2,
        width: 20,
        variants: {
          inverted: {
            false: {
              ...resolveThemePrimitives({
                value: accordion.color.icon.default,
                property: "backgroundColor",
                themeName: UnistylesRuntime.themeName,
                selectedVariant: palette,
              }),
            },
            true: {
              ...resolveThemePrimitives({
                value: accordion.color.icon.inverted,
                property: "backgroundColor",
                themeName: UnistylesRuntime.themeName,
              }),
            },
          },
        },
      };
    },
    overflow: {
      overflow: "hidden",
    },
  }),
);

Step.displayName = "Accordion.Step";

Accordion.Step = Step;

export { Accordion };
