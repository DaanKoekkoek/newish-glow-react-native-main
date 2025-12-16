import { HTMLInputTypeAttribute } from "react";

/**
 * Suffix icon actions to change the state of the input.
 *
 * All the required actions to change the state if needed in {@see InputAffixFactory}
 *
 * @internal
 */
export type SuffixIconAction = {
  type: "toggle-password-visibility" | "toggle-date-picker";
};

/**
 * Text field internal state
 *
 * @param isPasswordHidden - if true text field will show/hide the password.
 *
 * @internal
 */
export interface SuffixIconState {
  isPasswordHidden: boolean;
  isDatePickerVisible: boolean;
}

/**
 * Input field internal state reducer.
 *
 * @internal
 */
export const reducer = (
  state: SuffixIconState,
  action: SuffixIconAction,
): SuffixIconState => {
  switch (action.type) {
    case "toggle-password-visibility":
      return {
        ...state,
        isPasswordHidden: !state.isPasswordHidden,
      };
    case "toggle-date-picker":
      return {
        ...state,
        isDatePickerVisible: !state.isDatePickerVisible,
      };
  }
};

/**
 * Returns default internal state of input field
 *
 * @param type - each input type may have a different default state based on type.
 *
 * @internal
 */
export const getDefaultState = (
  type: HTMLInputTypeAttribute,
): SuffixIconState => {
  return {
    isPasswordHidden: type === "password",
    isDatePickerVisible: false,
  };
};
