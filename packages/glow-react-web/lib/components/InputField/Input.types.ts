import { ChangeEvent, FocusEvent, PointerEvent } from "react";
import dayjs from "dayjs";
import type { LegendProps } from "_internals/Form";
import { TextLinkAsAnchor } from "components/TextLink";
import type { Locale } from "date-fns";
import { OdidoPalette } from "_internals/Color";

type InputFieldIconSuffixType = "default" | "solid";

/**
 * Represents the state of the InputField.
 * We are deprecating "disabled" and "success" in favor of "inactive" and "valid" respectively.
 * @deprecated The value "disabled" is deprecated, use "inactive" instead
 * @deprecated The value "success" is deprecated, use "valid" instead
 * @type {"default" | "error" | "valid" | "inactive" | "disabled" | "success"}
 */
export type InputVariant =
  | "default"
  | "error"
  | "valid"
  | "inactive"
  /** @deprecated Use "inactive" instead */
  | "disabled"
  /** @deprecated Use "valid" instead */
  | "success";

/**
 * Represents the validation state of an input field.
 *
 * @type {InputValidation}
 */
export type InputValidation =
  | {
      /**
       * Indicates a validful validation state.
       *
       * @type {true}
       * @memberof InputValidation
       */
      valid: true;
    }
  | {
      /**
       * Indicates a failed validation state.
       *
       * @type {false}
       * @memberof InputValidation
       */
      valid: false;

      /**
       * The error message associated with the failed validation state.
       *
       * @type {string}
       * @memberof InputValidation
       */
      message: string;
    };

/**
 * Represents the validation state of an input field.
 * @typedef {Object} InputValidated
 * @property {boolean} valid - Indicates the validation result. If `true`, validation succeeded; if `false`, validation failed.
 * @property {string} [message] - The error message associated with the failed validation state. Required only if `valid` is `false`.
 */
export type InputValidated = Omit<InputValidation, "message"> &
  (InputValidation["valid"] extends false
    ? { message: string }
    : NonNullable<unknown>);

/**
 * Represents the TextInput properties of React Native's TextInput. Can omit default props to exclude it in the InputField.
 *
 */
type CommonInputProps = {
  /**
   * Identifier applied on both the label and input-field
   *
   * @type {string}
   * @memberof InputFieldProps
   */
  id: string;

  /**
   * The unique identifier for the input field.
   *
   * @type {string}
   * @memberof InputFieldProps
   */
  testID?: string;

  /**
   * Indicates whether the input field is inactive.
   *
   * @type {boolean}
   * @memberof InputFieldProps
   */
  inactive?: boolean;

  /**
   * The current value of the input field.
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
   * Properties for the legend associated with the input field.
   *
   * @type {LegendProps}
   */
  legend?: LegendProps;

  /**
   * Validation state of the input field.
   *
   * @type {InputValidation}
   * @memberof InputFieldProps
   */
  validated?: InputValidation;

  /**
   * Indicates whether to display the hint. Default is true
   *
   * @type {boolean}
   * @memberof InputFieldProps
   */
  showHelper?: boolean;

  /**
   * Indicates whether to display the hint. Default is true
   *
   * @type {boolean}
   * @memberof InputFieldProps
   */
  showClear?: boolean;

  /**
   * Callback onBlur
   *
   *
   * @type {Function}
   * @param e - Focus event
   * @memberof InputFieldProps
   */
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;

  /**
   * Callback onFocus
   *
   *
   * @type {Function}
   * @param e - Focus event
   * @memberof InputFieldProps
   */
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void;

  /**
   * Callback onPointerLeave
   *
   *
   * @type {Function}
   * @param e - Focus event
   * @memberof InputFieldProps
   */
  onPointerLeave?: (e: PointerEvent<HTMLElement>) => void;

  /**
   * Callback onPointerEnter
   *
   *
   * @type {Function}
   * @param e - Focus event
   * @memberof InputFieldProps
   */
  onPointerEnter?: (e: PointerEvent<HTMLElement>) => void;

  /**
   * Callback onChange called when text is changing
   *
   *
   * @type {Function}
   * @param event - event from input
   * @memberof InputFieldProps
   */
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
};

/**
 * Represents the properties for an input field component.
 *
 * @export
 * @interface InputFieldProps
 * @extends {TextInputProps}
 * @property {string} [iconClassName] - Apply a className directly on a prefix/suffix icon of the input. Currently only applicable to type of search.
 * @property {InputFieldIconSuffixType} [suffix='solid'] - Whether to set the clear suffix icon solid or not.
 */
export type InputFieldProps = CommonInputProps &
  React.InputHTMLAttributes<HTMLInputElement> & {
    iconClassName?: string;
    suffix?: InputFieldIconSuffixType;
  };

/**
 * Represents the properties for an autosuggestion input field component (a search input with suggestions).
 *
 * @export
 * @interface SearchInputFieldProps
 * @extends {InputFieldProps}
 */
export type SearchInputFieldProps = InputFieldProps & {
  /**
   * Flag to indicate if suggestions should be shown
   *
   * @type {boolean}
   * @memberof SearchInputFieldProps
   */
  open: boolean;

  /**
   * List of suggested values to display
   *
   * @type {AutoSuggestion[]}
   * @memberof SearchInputFieldProps
   */
  autoSuggestions: AutoSuggestion[];

  /**
   * Callback function when a search is triggered (e.g., after entering text or selecting a suggestion)
   *
   * @type {Function}
   * @param selected - selected text value
   * @memberof SearchInputFieldProps
   */
  onSearch?: (selected?: string) => void;

  /**
   * Callback function when a suggestion is selected
   *
   * @type {Function}
   * @param text - selected suggestion text
   * @memberof SearchInputFieldProps
   */
  onSuggestionSelect?: (text: string) => void;

  /**
   * Callback function when the dropdown of suggestions is opened
   *
   * @type {Function}
   * @memberof SearchInputFieldProps
   */
  onOpenDropdown?: () => void;

  /**
   * Callback function when the dropdown of suggestions is closed
   *
   * @type {Function}
   * @memberof SearchInputFieldProps
   */
  onCloseDropdown?: () => void;
};

/**
 * Represents a suggestion item in the autosuggest list.
 * @type {AutoSuggestion}
 * @property {string} value - The raw value to be used when the suggestion is selected.
 * @property {string} text - The text to be displayed for the suggestion.
 * @property {string} [category] - Optional category label for the suggestion.
 */
export type AutoSuggestion = {
  value: string;
  text: string;
  category?: string;
};

/**
 * Represents properties for the InputAutosuggestion component.
 * @type {InputAutosuggestionProps}
 * @extends {Omit<InputFieldProps, "type">}
 * @property {AutoSuggestion[]} autoSuggestions - A list of suggestions to show in the dropdown.
 * @property {TextLinkAsAnchor} [category] - Optional link shown below the input, styled as a text link.
 * @property {string} [autoSuggestClassName] - Additional className to apply directly on the InputContaienr of autosuggest.
 * @property {(item: AutoSuggestion) => void} [onSuggestionSelect] - Callback triggered when a suggestion is selected.
 * @property {"default" | "search"} [variant='default'] - Default variant shows a minimal version of the autocomplete, while search shows additional icosn, and an additional link to directly navigate to the given query.
 * @property {string} [popupClassName] - Additional className applied on the autosuggestion popup container.
 * @property {string} [popupListClassName] - Additional className applied on the search result list of the autosuggestion popup container.
 * @property {boolean} [fill='false'] - Grows the autosuggest popup container to the available viewport if set to `true`.
 * @property {InputFieldIconSuffixType} [suffix='solid'] - Whether to set the clear icon to solid or not.
 */
export type InputAutosuggestionProps = Omit<InputFieldProps, "type"> & {
  autoSuggestions: AutoSuggestion[];
  category?: TextLinkAsAnchor;
  autoSuggestClassName?: string;
  onSuggestionSelect?: (item: AutoSuggestion) => void;
  variant?: "default" | "search";
  popupClassName?: string;
  popupListClassName?: string;
  fill?: boolean;
  suffix?: InputFieldIconSuffixType;
};

export type DaysOfTheWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6;

/**
 * Represents properties for the InputDatePicker component.
 * @type {Omit<InputFieldProps, "onChange" | "type">}
 * @extends {InputFieldProps}
 * @property {string} [format="DD-MM-YYYY"] - Date format.
 * @property {dayjs.ConfigType} [min] - Allowed minimum date.
 * @property {dayjs.ConfigType} [max] - Allowed maximum date.
 * @property {(date: string) => void} [onChange] - Called when the date from a datepicker is selected.
 * @property {string} [palette="default"] - Applies brand-specific styling to the datepicker.
 * @property {DaysOfTheWeek[]} [excludeDaysOfWeek] - Exclude days from the calendar.
 * @property {string} [locale] - Accepts a registered locale from react-datepicker.
 */
export type InputDatePickerProps = Omit<
  InputFieldProps,
  "onChange" | "type"
> & {
  format?: string;
  min?: dayjs.ConfigType;
  max?: dayjs.ConfigType;
  onChange?: (date: string) => void;
  palette?: OdidoPalette;
  excludeDaysOfWeek?: DaysOfTheWeek[];
  locale?: {
    code: string;
    object?: Locale;
  };
};
