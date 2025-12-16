import { ErrorMessage } from "_internals/ErrorMessage";
import { HelperText } from "_internals/HelperText";
import { resolveThemePrimitives } from "_theming/resolveThemePrimitives";
import { mergeTestIds } from "_utility";
import { GlowGradient } from "foundations/GlowGradient";
import { Icon } from "foundations/Icon";
import { Paragraph } from "foundations/Paragraph";
import { useState, useEffect, useCallback } from "react";
import { View, Pressable } from "react-native";
import {
  useStyles,
  createStyleSheet,
  UnistylesRuntime,
} from "react-native-unistyles";

import type { CheckboxProps } from "./Checkbox.types";
import { InputLabel } from "../InputField/InputLabel";

export const Checkbox = ({
  accessibilityLabelledBy,
  checked = false,
  containerStyle,
  errorMessage,
  helperText,
  indeterminate = false,
  id,
  label,
  legend,
  onPress,
  state = "default",
  testID,
  isHovered = false,
}: CheckboxProps) => {
  const [pressed, setPressed] = useState<boolean>(false);
  const [hovered, setHovered] = useState<boolean>(isHovered);

  // Update hovered state whenever isHovered prop changes
  useEffect(() => {
    setHovered(isHovered);
  }, [isHovered]);

  const { styles } = useStyles(stylesheet, {
    checked: (checked || indeterminate) && state !== "error",
    disabled: state === "inactive",
    error: state === "error",
    pressed: pressed && state === "default",
    hovered: hovered && state === "default",
    checkedPressed: checked && pressed && state === "default",
  });

  const checkboxTestID = mergeTestIds(testID, "checkbox");

  const handleOnPress = useCallback(() => {
    if (state !== "inactive") {
      onPress({ id, checked: !checked });
    }
  }, [id, state, checked, onPress]);

  const handleOnPressInAndOut = useCallback(() => {
    setPressed((prev) => !prev);
  }, [setPressed]);

  const handleOnHover = useCallback(() => {
    setHovered((prev) => !prev);
  }, [setHovered]);

  const LabelElement = () => {
    return (
      <Paragraph
        size="sm"
        id={id}
        style={styles.label}
        aria-role="label"
        html-for={`input-checkbox-${id}`}
      >
        {label}
      </Paragraph>
    );
  };

  return !id || !onPress ? null : (
    <View
      testID={checkboxTestID || "checkbox"}
      accessibilityLabelledBy={accessibilityLabelledBy}
      style={styles.wrapper}
    >
      {legend?.text && <InputLabel {...legend} testID="legend-container" />}

      <View style={styles.checkboxLabelContainer}>
        <Pressable
          onPressIn={handleOnPressInAndOut}
          onPressOut={handleOnPressInAndOut}
          onPress={handleOnPress}
          onHoverIn={handleOnHover}
          onHoverOut={handleOnHover}
          style={[styles.container, containerStyle]}
          disabled={state === "inactive"}
          role="checkbox"
          aria-checked={checked}
          aria-label="input"
          id={`input-checkbox-${id}`}
          accessibilityLabelledBy={id}
          pointerEvents="box-only"
        >
          <View style={styles.checkbox}>
            {state === "default" && (checked || indeterminate) && (
              <GlowGradient
                style={{ opacity: pressed || hovered ? 0.8 : 1 }}
                type="Glow4"
                zIndex={0}
              />
            )}
            {state !== "error" && (checked || indeterminate || hovered) && (
              <View style={styles.iconContainer}>
                <Icon
                  style={styles.icon}
                  name={indeterminate ? "min" : "checkmark"}
                  solid
                  size="sm"
                  testID={`${indeterminate ? "min" : "checkmark"}-icon`}
                  allowFontScaling={false}
                />
              </View>
            )}
          </View>
          {label && typeof label === "string" && <LabelElement />}
        </Pressable>

        {label && typeof label === "object" && <LabelElement />}
      </View>
      {state !== "error" && <HelperText text={helperText} />}
      {state === "error" && <ErrorMessage text={errorMessage} />}
    </View>
  );
};

const version = "v1";

const stylesheet = createStyleSheet(
  ({
    themes: {
      components: {
        input,
        input: {
          checkbox: { [version]: checkbox },
        },
      },
    },
  }) => ({
    wrapper: {
      flexDirection: "column",
      alignItems: "flex-start",
    },
    checkboxLabelContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: input.gap.horizontal.default,
    },
    container: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: input.gap.horizontal.default,
      paddingVertical: checkbox.padding.vertical,
      alignSelf: "stretch",
    },
    checkbox: {
      height: checkbox.size.default,
      width: checkbox.size.default,
      backgroundColor: checkbox.color.background.unselected.default,
      borderRadius: checkbox.radius.default,
      overflow: "hidden",
      variants: {
        checked: {
          true: {
            borderWidth: checkbox.borderWidth.selected,
            borderColor: checkbox.color.border.selected,
            ...resolveThemePrimitives({
              value: checkbox.color.background.selected.default,
              property: "backgroundColor",
              themeName: UnistylesRuntime.themeName,
            }),
          },
          false: {
            borderWidth: checkbox.borderWidth.unselected.default,
            borderColor: checkbox.color.border.unselected.default,
          },
        },
        disabled: {
          true: {
            backgroundColor: checkbox.color.background.inactive,
            borderWidth: checkbox.borderWidth.inactive,
            borderColor: checkbox.color.border.inactive,
          },
        },
        error: {
          true: {
            borderWidth: checkbox.borderWidth.error,
            borderColor: checkbox.color.border.error,
          },
        },
        hovered: {
          true: {
            borderColor: checkbox.color.border.unselected.hover,
          },
        },
        pressed: {
          true: {
            borderWidth: checkbox.borderWidth.unselected.pressed,
            borderColor: checkbox.color.border.unselected.pressed,
          },
        },
        checkedPressed: {
          true: {
            borderWidth: checkbox.borderWidth.selected,
            borderColor: checkbox.color.border.selected,
          },
        },
      },
    },
    label: {
      variants: {
        disabled: {
          true: {
            color: checkbox.color.text.inactive,
          },
        },
      },
    },
    iconContainer: {
      position: "absolute",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
      width: "100%",
    },
    icon: {
      variants: {
        hovered: {
          true: { color: checkbox.color.icon.unselected.hover },
        },
        checked: { true: { color: checkbox.color.icon.selected } },
        disabled: { true: { color: checkbox.color.icon.inactive } },
      },
    },
  }),
);
