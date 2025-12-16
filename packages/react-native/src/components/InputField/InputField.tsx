import { useFontFamily } from "_global-hooks";
import { maskDate, mergeTestIds } from "_utility";
import { Icon } from "foundations/Icon";
import type { Dispatch } from "react";
import React, { useRef, useReducer, useCallback } from "react";
import type {
  TextInputFocusEventData,
  NativeSyntheticEvent,
  PointerEvent,
  TextInputSelectionChangeEventData,
} from "react-native";
import { TextInput, View } from "react-native";
import { useStyles } from "react-native-unistyles";

import { InputFieldStyles } from "./Input.styles";
import type {
  InputFieldProps,
  InputVariant,
  InputType,
  AutoSuggestion,
} from "./Input.types";
import { InputAffix } from "./InputAffix";
import { InputContainer } from "./InputContainer";
import { InputDatePicker } from "./InputDatePicker";
import type { InputDropdownRef } from "./InputDropdown";
import { InputDropdown } from "./InputDropdown";

export const InputField = React.forwardRef<TextInput, InputFieldProps>(
  (
    {
      id,
      label,
      disabled = false,
      validated,
      helperText,
      customAffix,
      testID,
      onBlur,
      onFocus,
      onPointerLeave,
      onPointerEnter,
      onPointerDown,
      onChangeText,
      suffix,
      showHint = true,
      ...props
    },
    ref,
  ) => {
    const type = props.type ?? "text";

    let dateFormat: string = "DD/MM/YYYY";
    let minDate;
    let maxDate;
    if (props.type === "date") {
      dateFormat = props.dateFormat ?? dateFormat;
      minDate = props.minDate;
      maxDate = props.maxDate;
    }

    let autoSuggestions: AutoSuggestion[] = [];
    let autoSuggestCategory: boolean | undefined;
    let onSuggestionSelected: ((value: string) => void) | undefined;
    let onSearch: ((value: string) => void) | undefined;
    if (props.type === "autoSuggest" || props.type === "search") {
      autoSuggestions = props.autoSuggestions;
      onSuggestionSelected = props.onSuggestionSelected;

      if (props.type === "search") {
        onSearch = props.onSearch;
      }

      if (props.type === "autoSuggest") {
        autoSuggestCategory = props.autoSuggestCategory;
      }
    }

    const inputGroupRef = useRef<View | null>(null);
    const internalRef = useRef<TextInput | null>(null);
    const dropdownRef = useRef<InputDropdownRef | null>(null);

    const [state, dispatch] = useReducer(reducer, getDefaultState(type));

    const { styles } = useStyles(InputFieldStyles);
    const placeholderColor = usePlaceholderColor(disabled);

    const dropdownTestID = mergeTestIds(
      testID,
      "input-field-auto-suggest-dropdown",
    );
    const inputTestID = mergeTestIds(testID, "input-field");
    const inputContainerTestID = mergeTestIds(testID, "input-container");

    const handleFocus = useCallback(
      (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        dispatch({ type: "on-focus", payload: { disabled } });

        onFocus?.(e);
      },
      [disabled, onFocus],
    );

    const handleBlur = useCallback(
      (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        dispatch({ type: "on-blur" });

        onBlur?.(e);
      },
      [onBlur],
    );

    const handlePointerEnter = useCallback(
      (e: PointerEvent) => {
        dispatch({ type: "on-pointer-enter" });

        onPointerEnter?.(e);
      },
      [onPointerEnter],
    );

    const handlePointerLeave = useCallback(
      (e: PointerEvent) => {
        dispatch({ type: "on-pointer-leave" });

        onPointerLeave?.(e);
      },
      [onPointerLeave],
    );

    const handleOpenDatePicker = useCallback(() => {
      if (type === "date") {
        dispatch({ type: "open-date-picker" });
      }
    }, [type]);

    const handleRef = useCallback(
      (textInput: TextInput) => {
        internalRef.current = textInput;
        if (typeof ref === "function") {
          ref(textInput);
        } else if (ref) {
          ref.current = textInput;
        }
      },
      [ref, internalRef],
    );

    const handleCloseDatePicker = useCallback(() => {
      dispatch({ type: "close-date-picker" });
    }, [dispatch]);

    const handleSelectionChange = useCallback(
      (e: NativeSyntheticEvent<TextInputSelectionChangeEventData>) => {
        dispatch({
          type: "on-selection-change",
          caretPosition: e.nativeEvent.selection.start,
        });
      },
      [dispatch],
    );

    const handleChangeText = useCallback(
      (text: string) => {
        if (type === "date" && text.length > (props.value?.length ?? 0)) {
          onChangeText?.(maskDate(text, state.caretPosition, dateFormat));
          return;
        }

        onChangeText?.(text);
      },
      [onChangeText, type, props.value, state.caretPosition, dateFormat],
    );

    const handleSuggestionSelect = useCallback(
      (text: string) => {
        onChangeText?.(text);
        onSuggestionSelected?.(text);

        internalRef.current?.blur();
      },
      [onChangeText, onSuggestionSelected, internalRef],
    );

    const handleOnSearch = useCallback(() => {
      if (props.value) {
        onSearch?.(props.value);

        internalRef.current?.blur();
      }
    }, [onSearch, internalRef, props.value]);

    const isPassword = type === "password";
    const isSearch = type === "search";
    const isAutoSuggest = type === "autoSuggest";
    const variant = getVariant(disabled, validated?.success);
    const fontFamily = useFontFamily("Paragraph_Regular");

    return (
      <View>
        <InputContainer
          inputGroupRef={inputGroupRef}
          testID={inputContainerTestID}
          variant={variant}
          id={id}
          type={type}
          label={label}
          validated={validated}
          helperText={helperText}
          isHovered={state.isHovered}
          isFocused={state.isFocused}
          onPress={handleOpenDatePicker}
          suffix={suffix}
          showHint={showHint}
        >
          {isSearch && <Icon name="search" style={styles.inputIcon} />}
          <View style={styles.inputWrapper}>
            <TextInput
              accessible
              testID={inputTestID}
              placeholderTextColor={placeholderColor}
              style={[
                { fontFamily },
                styles.input,
                styles.textColor(disabled),
                styles.backgroundColor(disabled),
              ]}
              readOnly={disabled}
              aria-labelledby={id}
              onKeyPress={(event) =>
                //@ts-expect-error
                dropdownRef.current?.onKeyPress(event.nativeEvent.keyCode)
              }
              aria-disabled={disabled}
              secureTextEntry={isPassword && state.isPasswordHidden}
              importantForAccessibility={
                disabled ? "no-hide-descendants" : "auto"
              }
              ref={handleRef}
              onBlur={handleBlur}
              onFocus={handleFocus}
              onPointerEnter={handlePointerEnter}
              onPointerLeave={handlePointerLeave}
              onSelectionChange={handleSelectionChange}
              onChangeText={handleChangeText}
              cursorColor={styles.cursorColor.color}
              {...props}
            />
          </View>
          {type === "date" && (
            <InputDatePicker
              ownerRef={inputGroupRef}
              format={dateFormat.toUpperCase()}
              date={props.value}
              min={minDate}
              max={maxDate}
              isVisible={state.isDatePickerVisible}
              onClose={handleCloseDatePicker}
              onChange={onChangeText}
            />
          )}
          <InputAffixFactory
            type={type}
            state={state}
            variant={variant}
            dispatch={dispatch}
            inputRef={internalRef}
          />
          {customAffix}
        </InputContainer>
        {(isAutoSuggest || isSearch) && (
          <InputDropdown
            ref={dropdownRef}
            testID={dropdownTestID}
            value={props.value}
            autoSuggestions={autoSuggestions}
            autoSuggestCategory={autoSuggestCategory}
            isFocused={state.isFocused}
            withLabel={!!label}
            withSearch={type === "search"}
            onSuggestionSelect={handleSuggestionSelect}
            onSearch={handleOnSearch}
          />
        )}
      </View>
    );
  },
);

/**
 * Text field internal state
 *
 * @param isPasswordHidden - if true text field will try to use secureTextEntry to hide the password.
 * @param isHovered - will be true if pointer is on the input field
 * @param isFocused - will be true if text field is focused
 *
 * @internal
 */
interface State {
  isPasswordHidden: boolean;
  isDatePickerVisible: boolean;
  isHovered: boolean;
  isFocused: boolean;
  selectedDate: string;
  caretPosition: number;
}

/**
 * Actions to change the state of the input.
 *
 * NOTE: add all the required actions to change the state if needed in {@see InputAffixFactory}
 *
 * @internal
 */
type Action =
  | { type: "toggle-password-visibility" }
  | { type: "on-blur" }
  | { type: "on-pointer-leave" }
  | { type: "on-pointer-enter" }
  | { type: "open-date-picker" }
  | { type: "close-date-picker" }
  | { type: "on-selection-change"; caretPosition: number }
  | { type: "on-focus"; payload: { disabled?: boolean } };

/**
 * Input field internal state reducer.
 *
 * @internal
 */
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "toggle-password-visibility":
      return {
        ...state,
        isPasswordHidden: !state.isPasswordHidden,
      };

    case "on-selection-change":
      return {
        ...state,
        caretPosition: action.caretPosition,
      };
    case "open-date-picker":
      return {
        ...state,
        isDatePickerVisible: true,
      };
    case "close-date-picker":
      return {
        ...state,
        isDatePickerVisible: false,
      };

    case "on-pointer-enter":
      return {
        ...state,
        isHovered: true,
      };
    case "on-pointer-leave":
      return {
        ...state,
        isHovered: false,
      };
    case "on-focus":
      return {
        ...state,
        isFocused: !action.payload.disabled,
      };
    case "on-blur":
      return {
        ...state,
        isFocused: false,
      };
  }
}

/**
 * Returns default internal state of input field
 *
 * @param type - each input type may have a different default state based on type.
 *
 * @internal
 */
function getDefaultState(type: InputType): State {
  return {
    isPasswordHidden: type === "password",
    isDatePickerVisible: false,
    isFocused: false,
    isHovered: false,
    selectedDate: "",
    caretPosition: 0,
  };
}

/**
 * returns the proper input field variant based on validation and disabled field.
 *
 * @param disabled - input disabled prop
 * @param validationSuccess - input validation result
 *
 * @internal
 */
function getVariant(disabled?: boolean, validationSuccess?: boolean) {
  if (disabled) return "disabled";
  if (validationSuccess) return "success";
  if (validationSuccess === false) return "error";
  return "default";
}

/**
 * returns placeholder color from the theme
 * Note we are doing this here because we can't do this with styles.
 *
 * @internal
 */
function usePlaceholderColor(disabled?: boolean) {
  const {
    theme: {
      themes: {
        components: { input },
      },
    },
  } = useStyles();
  if (disabled) {
    return input.color.text.inactive;
  }

  return input.color.text.subtle;
}

/**
 * Props required to create Affix button functionality
 *
 * @param variant - state of text input
 * @param type - type of the input field
 * @param input - items we need to implement input related actions
 *
 * @internal
 */
type InputAffixFactoryProps = {
  variant: InputVariant;
  type: InputType;
  inputRef: React.MutableRefObject<TextInput | null>;
  state: State;
  dispatch: Dispatch<Action>;
};

/**
 * Based on input type creates InputAffix buttons
 *
 * @internal
 */
const InputAffixFactory: React.FC<InputAffixFactoryProps> = (props) => {
  switch (props.type) {
    case "password":
      return <PasswordAffixGroup {...props} />;

    case "date":
      return <DateAffixGroup {...props} />;

    case "text":
    default:
      return <TextAffixGroup {...props} />;
  }
};

/**
 * Affix Buttons for regular text field, only shows a checkmark if text is validated
 *
 * @internal
 */
const TextAffixGroup: React.FC<InputAffixFactoryProps> = (props) => {
  if (props.variant !== "success") {
    return null;
  }
  return <InputAffix icon="status-success" variant="success" iconSize="sm" />;
};

/**
 * Affix Buttons for password text field
 *
 * @internal
 */
const PasswordAffixGroup: React.FC<InputAffixFactoryProps> = (props) => {
  const icon = props.state.isPasswordHidden ? "visible" : "invisible";

  const handleTogglePassword = () => {
    props.dispatch({ type: "toggle-password-visibility" });

    // return the focus to the text input after clicking on show password
    props.inputRef.current?.focus();
  };

  return (
    <>
      <TextAffixGroup {...props} />
      <InputAffix
        testID="input-field-affix-password-toggle"
        icon={icon}
        variant={props.variant}
        onPress={handleTogglePassword}
      />
    </>
  );
};

/**
 * Affix Buttons for date text field
 *
 * @internal
 */
const DateAffixGroup: React.FC<InputAffixFactoryProps> = (props) => {
  const handleToggle = () => {
    props.dispatch({ type: "open-date-picker" });
  };
  return (
    <>
      <TextAffixGroup {...props} />
      <InputAffix
        testID="glow-input-field-affix-date-picker"
        icon="calendar"
        variant="default"
        onPress={handleToggle}
      />
    </>
  );
};
