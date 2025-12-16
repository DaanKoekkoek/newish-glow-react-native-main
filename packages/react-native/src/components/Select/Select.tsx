import { Picker } from "@react-native-picker/picker";
import { mergeTestIds } from "_utility";
import React, { useMemo, useState } from "react";
import type { TextInput } from "react-native";
import { View, Platform, TouchableOpacity, Modal } from "react-native";
import { useStyles } from "react-native-unistyles";

import { SelectStyles } from "./Select.styles";
import type { SelectProps } from "./Select.types";
import { InputField } from "../InputField";
import { InputAffix } from "../InputField/InputAffix";

const PLACEHOLDER = "Maak je keuze";

const PLACEHOLDER_OPTION = (placeholder = PLACEHOLDER) => ({
  label: placeholder,
  value: placeholder,
});

export const Select = React.forwardRef<TextInput, SelectProps>(
  (
    {
      value,
      label,
      options,
      disabled,
      placeholder = PLACEHOLDER,
      onValueChange,
      testID,
      ...props
    },
    ref,
  ) => {
    const optionsWithPlaceholder = useMemo(
      () => [PLACEHOLDER_OPTION(placeholder), ...options],
      [options, placeholder],
    );
    const [pickerVisible, setPickerVisible] = useState(false);
    const [selectedOption, setSelectedOption] = useState(value);

    const { styles } = useStyles(SelectStyles);

    let children: React.ReactNode[] = [];

    if (optionsWithPlaceholder && optionsWithPlaceholder.length > 0) {
      children = optionsWithPlaceholder.map((option, i) => (
        <Picker.Item key={i} {...option} />
      ));
    }

    const togglePicker = () => {
      if (disabled) return;
      setPickerVisible((val) => !val);
    };

    const handleValueChange = (itemValue: string, itemIndex: number) => {
      // Skip setting value from placeholder item
      if (itemIndex === 0) return;

      setSelectedOption(itemValue);
      onValueChange?.(itemValue, itemIndex);

      if (Platform.OS === "web") {
        togglePicker();
      }
    };

    const SelectTestID = mergeTestIds(testID, "select");

    const inputAffixVariant = disabled ? "disabled" : "default";
    const inputValue = optionsWithPlaceholder.find(
      ({ value }) => value === selectedOption,
    )?.label;

    const input = (
      <InputField
        ref={ref}
        label={label}
        editable={false}
        value={inputValue}
        disabled={disabled}
        testID={SelectTestID}
        placeholder={placeholder}
        showSoftInputOnFocus={false}
        customAffix={
          <InputAffix
            icon="chevron-down"
            // Needed for proper styling of icon in disabled state
            onPress={() => {}}
            variant={inputAffixVariant}
          />
        }
        {...props}
      />
    );

    const picker = (
      <Picker
        testID={SelectTestID}
        enabled={!disabled}
        style={[styles.picker, !!label && styles.pickerWithLabel]}
        placeholder={placeholder}
        onValueChange={handleValueChange}
        selectedValue={selectedOption}
      >
        {children}
      </Picker>
    );

    if (Platform.OS === "ios") {
      return (
        <View>
          <TouchableOpacity onPress={togglePicker} activeOpacity={1}>
            <View pointerEvents="box-only">{input}</View>
          </TouchableOpacity>
          <Modal visible={pickerVisible} transparent animationType="slide">
            <TouchableOpacity onPress={togglePicker} style={{ flex: 1 }} />
            <View style={styles.pickerContainer}>{picker}</View>
          </Modal>
        </View>
      );
    }

    if (Platform.OS === "android") {
      return (
        <TouchableOpacity onPress={togglePicker} activeOpacity={1}>
          <View>
            {input}
            {picker}
          </View>
        </TouchableOpacity>
      );
    }

    return (
      <View>
        {input}
        {picker}
      </View>
    );
  },
);
