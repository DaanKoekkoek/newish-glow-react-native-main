import type dayjs from "dayjs";
import type React from "react";
import type { TextInput } from "react-native";

/**
 * Represents the state of the InputField.
 * @type {"default" | "error" | "success" | "disabled"}
 */
export type InputVariant = "default" | "error" | "success" | "disabled";

/**
 * Represents the type of Auto suggestion.
 */

export type AutoSuggestion = {
  category?: string;
  value: string;
  text: string;
};

/**
 * Represents the type of the InputField.
 * @type {"text" | "password" | "date" | "autoSuggest" | "search"}
 */
export type InputType = "text" | "password" | "date" | "autoSuggest" | "search"; // "file"

/**
 * Represents the validation state of an input field.
 *
 * @type {InputValidation}
 */
export type InputValidation =
  | {
      /**
       * Indicates a successful validation state.
       *
       * @type {true}
       * @memberof InputValidation
       */
      success: true;
    }
  | {
      /**
       * Indicates a failed validation state.
       *
       * @type {false}
       * @memberof InputValidation
       */
      success: false;

      /**
       * The error message associated with the failed validation state.
       *
       * @type {string}
       * @memberof InputValidation
       */
      message: string;
    };

/**
 * Represents the properties for an input field label.
 *
 * @interface InputLabelProps
 */
export interface InputLabelProps {
  /**
   * The text displayed as the label for the input field.
   *
   * @type {string}
   * @memberof InputLabelProps
   */
  text: string;

  /**
   * Indicates whether the input field is optional.
   *
   * @type {boolean}
   * @memberof InputLabelProps
   * @default false
   */
  optional?: boolean;

  /**
   * Adds an id to the label for accessibility.
   *
   * @type {(string | (() => void))}
   * @memberof InputLabelProps
   */
  id?: string;

  /**
   * Provides additional information about the input field.
   * This can be a modal then callback can be used to open the modal.
   * Or it can be a text which will be shown with tooltip.
   *
   * @type {(string | (() => void))}
   * @memberof InputLabelProps
   */
  info?: string | (() => void);

  /**
   * TestID for the label, which can be used in unit tests.
   *
   * @type {string}
   * @memberof InputLabelProps
   */
  testID?: string;
}

/**
 * Represents the TextInput properties of React Native's TextInput. Can omit default props to exclude it in the InputField.
 *
 * @type {Omit<RnTextInputProps>}
 */
export type TextInputProps = Omit<
  React.ComponentProps<typeof TextInput>,
  "onSelectionChange" | "label" | "style"
>;

type CommonInputProps = TextInputProps & {
  /**
   * The unique identifier for the input field.
   *
   * @type {string}
   * @memberof InputFieldProps
   */
  id?: string;

  /**
   * Indicates whether the input field is disabled.
   *
   * @type {boolean}
   * @memberof InputFieldProps
   */
  disabled?: boolean;

  /**
   * The current value of the input field.
   *
   * if type="date" is used pass the value with specified format defined in `dateFormat` field
   *
   * @type {string}
   * @memberof InputFieldProps
   */
  value?: string;

  /**
   * Placeholder text displayed inside the input field.
   *
   * @type {string}
   * @memberof InputFieldProps
   */
  placeholder?: string;

  /**
   * Helper text displayed below the input field to provide additional information.
   *
   * @type {string}
   * @memberof InputFieldProps
   */
  helperText?: string;

  /**
   * Properties for the label associated with the input field.
   *
   * @type {InputLabelProps}
   * @memberof InputFieldProps
   */
  label?: InputLabelProps;

  /**
   * Validation state of the input field.
   *
   * @type {InputValidation}
   * @memberof InputFieldProps
   */
  validated?: InputValidation;

  /**
   * AutoComplete attribute for the input field to specify whether the browser should provide auto-completion options.
   *
   * @type {InputAutocomplete}
   * @memberof InputFieldProps
   */
  autoComplete?: InputAutocomplete;

  /**
   * Custom Affix to be displayed with the input field.
   *
   * @type {React.ReactNode}
   * @memberof InputFieldProps
   * @internal
   */
  customAffix?: React.ReactNode;

  /**
   * Suffix to be displayed with the input field group.
   *
   * @type {string}
   * @memberof InputFieldProps
   */
  suffix?: string;

  /**
   * Indicates whether to display the hint. Default is true
   *
   * @type {boolean}
   * @memberof InputFieldProps
   */
  showHint?: boolean;
};

/**
 * Represents the properties for an input field component.
 *
 * @export
 * @interface InputFieldProps
 * @extends {TextInputProps}
 */
export type InputFieldProps =
  | (CommonInputProps & { type?: "text" | "password" })
  | (CommonInputProps & {
      type: "date";

      /**
       * Specifies the date format when type is 'date'
       * default is 'dd-mm-yyyy'
       *
       * @type {string}
       * @memberof InputFieldProps
       */
      dateFormat?: string;

      /**
       * Specifies the min date
       *
       * @type {dayjs.ConfigType}
       * @memberof InputFieldProps
       */
      minDate?: dayjs.ConfigType;

      /**
       * Specifies the max date
       *
       * @type {dayjs.ConfigType}
       * @memberof InputFieldProps
       */
      maxDate?: dayjs.ConfigType;
    })
  | (CommonInputProps & {
      type?: "autoSuggest";
      /**
       * Specifies to show suggestion categories
       *
       *
       * @type {boolean}
       * @memberof InputFieldProps
       */
      autoSuggestCategory?: boolean;

      /**
       * List of options for suggestions
       *
       *
       * @type {AutoSuggestion[]}
       * @memberof InputFieldProps
       */
      autoSuggestions: AutoSuggestion[];

      /**
       * Callback called after suggestion is selected
       *
       *
       * @type {Function}
       * @param value - selected value
       * @memberof InputFieldProps
       */
      onSuggestionSelected?: (value: string) => void;
    })
  | (CommonInputProps & {
      type?: "search";

      /**
       * List of options for search suggestions
       *
       *
       * @type {AutoSuggestion[]}
       * @memberof InputFieldProps
       */
      autoSuggestions: AutoSuggestion[];

      /**
       * Callback called after suggestion is selected
       *
       *
       * @type {Function}
       * @param value - selected value
       * @memberof InputFieldProps
       */
      onSuggestionSelected?: (value: string) => void;

      /**
       * Callback called clicking Zoek op link buton
       *
       *
       * @type {Function}
       * @param value - selected value
       * @memberof InputFieldProps
       */
      onSearch?: (value: string) => void;
    });

/**
 * Represents the error type of inputfield.
 * @enum - Contains enum of allowed options for autoComplete
 */
export type InputAutocomplete =
  | "additional-name"
  | "address-line1"
  | "address-line2"
  | "birthdate-day"
  | "birthdate-full"
  | "birthdate-month"
  | "birthdate-year"
  | "cc-csc"
  | "cc-exp"
  | "cc-exp-day"
  | "cc-exp-month"
  | "cc-exp-year"
  | "cc-number"
  | "country"
  | "current-password"
  | "email"
  | "family-name"
  | "given-name"
  | "honorific-prefix"
  | "honorific-suffix"
  | "name"
  | "new-password"
  | "off"
  | "one-time-code"
  | "postal-code"
  | "street-address"
  | "tel"
  | "username"
  | "cc-family-name"
  | "cc-given-name"
  | "cc-middle-name"
  | "cc-name"
  | "cc-type"
  | "nickname"
  | "organization"
  | "organization-title"
  | "url"
  | "gender"
  | "name-family"
  | "name-given"
  | "name-middle"
  | "name-middle-initial"
  | "name-prefix"
  | "name-suffix"
  | "password"
  | "password-new"
  | "postal-address"
  | "postal-address-country"
  | "postal-address-extended"
  | "postal-address-extended-postal-code"
  | "postal-address-locality"
  | "postal-address-region"
  | "sms-otp"
  | "tel-country-code"
  | "tel-device"
  | "tel-national"
  | "username-new";
