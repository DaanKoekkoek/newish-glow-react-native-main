import { resolveThemePrimitives } from "_theming/resolveThemePrimitives";
import { mergeTestIds } from "_utility";
import { Heading, Paragraph } from "foundations/index";
import React, { useState, useEffect, useCallback } from "react";
import { View, StyleSheet, Platform } from "react-native";
import type { ColorValue } from "react-native";
import {
  createStyleSheet,
  useStyles,
  UnistylesRuntime,
} from "react-native-unistyles";

import type { CounterProps } from "./Counter.types";

const getUnits = (
  variant: string,
  digits: number,
  digitDaysLabel: string = "Dagen",
) => {
  if (variant === "default") {
    return digits === 1
      ? [{ unit: "days", label: digitDaysLabel }]
      : [
          { unit: "days", label: "Dagen" },
          { unit: "hours", label: "Uur" },
          { unit: "minutes", label: "Min." },
          { unit: "seconds", label: "Sec." },
        ].slice(-digits);
  } else if (variant === "hoursOnly") {
    return [
      { unit: "hours", label: "" },
      { unit: "minutes", label: "" },
    ];
  }
  return [];
};

const isUnitPassed = (
  unit: string,
  units: { unit: string }[],
  remainingTime: { [key: string]: number },
): boolean => {
  const unitNames = units.map((u) => u.unit);
  const currentUnitIndex = unitNames.indexOf(unit);
  const higherUnits = unitNames.slice(0, currentUnitIndex);
  const higherUnitsAreZero = higherUnits.every(
    (higherUnit) => remainingTime[higherUnit] === 0,
  );

  return remainingTime[unit] === 0 && higherUnitsAreZero;
};

const renderDigits = (
  updatedValue: number,
  styles: any,
  palette: string,
  size: string,
  isPassed: boolean,
) => {
  const digits = updatedValue.toString().padStart(2, "0").split("");

  return (
    <View style={[styles.digits]}>
      {digits.map((digit, index) => (
        <View
          style={StyleSheet.flatten([
            styles.singleDigits,
            styles.singleDigit(palette),
            index === digits.length - 1 ? styles.lastSingleDigit : {},
            isPassed ? styles.inactive : {},
          ])}
          key={index}
        >
          <Heading
            size={size === "large" ? "lg" : "md"}
            style={[styles.singleDigitValue, isPassed ? styles.inactive : {}]}
            key={index}
          >
            {digit}
          </Heading>
        </View>
      ))}
    </View>
  );
};

export const Counter = ({
  targetDate,
  variant = "default",
  prominence = "default",
  size = "default",
  palette = "default",
  digits = 4,
  digitDaysLabel = "Dagen",
  freeze = false,
  testID = "counter",
  onCompleted,
}: CounterProps & { onCompleted?: () => void }) => {
  const { styles } = useStyles(stylesheet, {
    prominence: prominence === "default" ? undefined : prominence,
    size: size === "default" ? undefined : size,
  });

  const calculateTimeLeft = useCallback(
    (digits: number): { [key: string]: number } => {
      const difference = +new Date(targetDate) - +new Date();
      let timeLeft: { [key: string]: number } = {};

      if (difference > 0) {
        const seconds = Math.floor(difference / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (variant === "hoursOnly") {
          timeLeft = {
            hours,
            minutes: minutes % 60,
          };
        } else {
          switch (digits) {
            case 1:
              timeLeft = {
                days: days > 0 ? days : 1,
              };
              break;
            case 2:
              timeLeft = {
                minutes,
                seconds: seconds % 60,
              };
              break;
            case 3:
              timeLeft = {
                hours,
                minutes: minutes % 60,
                seconds: seconds % 60,
              };
              break;
            case 4:
            default:
              timeLeft = {
                days,
                hours: hours % 24,
                minutes: minutes % 60,
                seconds: seconds % 60,
              };
              break;
          }
        }
      } else {
        timeLeft = {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        };
      }

      return timeLeft;
    },
    [targetDate, variant],
  );

  const [remainingTime, setRemainingTime] = useState<{ [key: string]: number }>(
    calculateTimeLeft(digits),
  );

  useEffect(() => {
    if (freeze) return;

    const { days, hours, minutes, seconds } = remainingTime;

    if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
      if (onCompleted) onCompleted();
      return;
    }

    const timer = setTimeout(() => {
      setRemainingTime(calculateTimeLeft(digits));
    }, 1000);

    return () => clearTimeout(timer);
  }, [calculateTimeLeft, remainingTime, digits, freeze, onCompleted]);

  const units = getUnits(variant, digits, digitDaysLabel);

  return (
    <View style={styles.counterContainer} testID={testID}>
      <View style={styles.counter}>
        {units.map(({ unit, label }, index) => (
          <View
            key={index}
            style={styles.counterChild}
            testID={mergeTestIds(testID, `unit_${unit}`)}
          >
            {unit && (
              <View style={styles.digits}>
                <View style={styles.singleDigits}>
                  {typeof remainingTime[unit] === "number" &&
                    renderDigits(
                      remainingTime[unit],
                      styles,
                      palette,
                      size,
                      isUnitPassed(unit, units, remainingTime),
                    )}
                </View>
                {index < units.length - 1 && (
                  <Heading
                    size={size === "large" ? "lg" : "md"}
                    style={StyleSheet.flatten([
                      styles.divider,
                      isUnitPassed(unit, units, remainingTime)
                        ? styles.inactiveDivider
                        : {},
                    ])}
                  >
                    :
                  </Heading>
                )}
              </View>
            )}
            {variant === "default" && (
              <Paragraph
                size="xs"
                style={[
                  digits === 1 ? styles.counterLabel : styles.label,
                  isUnitPassed(unit, units, remainingTime)
                    ? styles.inactiveLabel
                    : {},
                ]}
                testID={mergeTestIds(testID, `label_${unit}`)}
              >
                {label}
              </Paragraph>
            )}
          </View>
        ))}
      </View>
      {variant === "hoursOnly" && (
        <Paragraph
          size="xs"
          style={StyleSheet.flatten([
            styles.counterLabel,
            remainingTime.hours === 0 && remainingTime.minutes === 0
              ? styles.inactiveLabel
              : {},
          ])}
        >
          Uur over
        </Paragraph>
      )}
    </View>
  );
};

const version = "v1";

const stylesheet = createStyleSheet(
  ({
    themes: {
      components: {
        counter: { [version]: counter },
      },
    },
  }) => ({
    counterContainer: {
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      gap: counter.gap.vertical.default,
    },
    counter: {
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
    },
    counterChild: {
      flexDirection: "column",
      alignItems: "center",
      gap: counter.gap.vertical.default,
    },
    digits: {
      alignItems: "center",
      flexDirection: "row",
    },
    singleDigits: {
      alignItems: "flex-start",
    },
    lastSingleDigit: {
      marginRight: 0,
    },
    singleDigit: (palette: CounterProps["palette"]) => ({
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      variants: {
        prominence: {
          default: {
            backgroundColor: counter.color.background.default,
            color: counter.color.text.digit.default,
          },
          subtle: {
            backgroundColor: resolveThemePrimitives({
              value: counter.color.background.subtle,
              property: "backgroundColor",
              themeName: UnistylesRuntime.themeName,
              selectedVariant: palette,
            })["backgroundColor"] as ColorValue,
            color: counter.color.text.digit.subtle,
          },
        },
        size: {
          default: {
            padding: counter.padding.horizontal,
            marginRight: counter.gap.horizontal.default,
            borderRadius: counter.radius.default,
          },
          large: {
            borderRadius: counter.radius.lg,
            padding: counter.padding.horizontal,
            marginRight: counter.gap.horizontal.lg,
          },
        },
      },
    }),
    singleDigitValue: {
      textAlign: "center",
      variants: {
        prominence: {
          default: {
            color: counter.color.text.digit.default,
          },
          subtle: {
            color: counter.color.text.digit.subtle,
          },
        },
        size: {
          default: {
            width: counter.size.digit.width.default,
          },
          large: {
            width: counter.size.digit.width.lg,
          },
        },
      },
    },
    divider: {
      paddingVertical: 8,
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      variants: {
        prominence: {
          default: {
            color: counter.color.text.divider.default,
          },
          subtle: {
            color: counter.color.text.divider.subtle,
          },
        },
        size: {
          default: {
            width: counter.size.divider.width.default,
            borderRadius: counter.radius.default,
          },
          large: {
            width: counter.size.divider.width.lg,
            borderRadius: counter.radius.lg,
          },
        },
      },
    },
    counterLabel: {
      justifyContent: "center",
      alignItems: "center",
      variants: {
        prominence: {
          default: {
            color: counter.color.text.label.default,
          },
          inactive: {
            color: counter.color.text.label.inactive,
          },
        },
        size: {
          default: {
            width: "100%",
          },
          large: {
            width: "100%",
          },
        },
      },
      textAlign: "center",
    },
    label: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "center",
      ...Platform.select({
        web: {
          whiteSpace: "nowrap",
        },
      }),
      variants: {
        prominence: {
          default: {
            color: counter.color.text.label.default,
          },
          inactive: {
            color: counter.color.text.label.inactive,
          },
        },
        size: {
          default: {
            width: counter.size.label.width.default,
          },
          large: {
            width: counter.size.label.width.lg,
          },
        },
      },
      textAlign: "center",
    },
    inactive: {
      backgroundColor: counter.color.background.inactive,
      color: counter.color.text.digit.inactive,
    },
    inactiveLabel: {
      color: counter.color.text.label.inactive,
    },
    inactiveDivider: {
      color: counter.color.text.divider.inactive,
    },
  }),
);
