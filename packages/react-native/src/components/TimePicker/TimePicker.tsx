import type { ItemValue } from "@react-native-picker/picker/typings/Picker";
import { mergeTestIds } from "_utility";
import { InputHint } from "components/InputField/InputHint";
import { InputLabel } from "components/InputField/InputLabel";
import { Select } from "components/Select";
import { useState } from "react";
import { View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

import type {
  TimePickerMinutesStep,
  TimePickerOptions,
  TimePickerProps,
  TimePickerValues,
} from "./TimePicker.types";

const NOT_SELECTED = "-1";

const generateMinutesOptions = (
  step: TimePickerMinutesStep,
): TimePickerOptions[] => {
  return Array.from({ length: Math.ceil(60 / step) }, (_, i) => {
    const minutes = String(i * step).padStart(2, "0");
    return {
      value: minutes,
      label: minutes,
    };
  });
};

export const TimePicker = ({
  hoursOptions,
  label,
  validated,
  minutesStep = 5,
  disabled = false,
  placeholderHours,
  placeholderMinutes,
  helperText = "",
  testID,
  onValueChange,
}: TimePickerProps) => {
  const { styles } = useStyles(stylesheet);

  const [selectedOptions, setSelectedOptions] = useState({
    hours: NOT_SELECTED,
    minutes: NOT_SELECTED,
  });

  const minutesOptions: TimePickerOptions[] =
    generateMinutesOptions(minutesStep);

  const handleValueChange = (
    type: keyof TimePickerValues,
    value: ItemValue,
  ) => {
    const newValues = { ...selectedOptions, [type]: value };

    setSelectedOptions(newValues);

    if (
      newValues.hours !== NOT_SELECTED &&
      newValues.minutes !== NOT_SELECTED
    ) {
      onValueChange?.(newValues);
    }
  };

  const timePickerTestID = mergeTestIds(testID, "timePicker");

  return (
    <View style={styles.wrapper} testID={timePickerTestID}>
      {label && (
        <InputLabel
          text={label?.text}
          optional={label?.optional}
          info={label?.info}
        />
      )}
      <View style={styles.inputContainer}>
        <View style={styles.selectContainer}>
          <Select
            validated={validated}
            placeholder={placeholderHours}
            testID={`${timePickerTestID}-hours`}
            onValueChange={(value, _) => handleValueChange("hours", value)}
            options={hoursOptions}
            disabled={disabled}
            showHint={false}
          />
        </View>
        <View style={styles.selectContainer}>
          <Select
            validated={validated}
            placeholder={placeholderMinutes}
            testID={`${timePickerTestID}-minutes`}
            onValueChange={(value, _) => handleValueChange("minutes", value)}
            options={minutesOptions}
            disabled={disabled}
            showHint={false}
          />
        </View>
      </View>
      {helperText && (
        <InputHint
          isError={validated?.success === false}
          text={validated?.success === false ? validated.message : helperText}
        />
      )}
    </View>
  );
};

const stylesheet = createStyleSheet(
  ({
    themes: {
      components: { input },
    },
  }) => ({
    wrapper: {
      display: "flex",
      position: "relative",
      flexDirection: "column",
      rowGap: input.gap.vertical.default,
    },
    inputContainer: {
      flexDirection: "row",
      gap: input.gap.vertical.default,
      alignItems: "stretch",
      flexGrow: 1,
    },
    selectContainer: {
      flex: 1,
    },
  }),
);
