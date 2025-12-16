export type PinCodeToken = string;

export type PinCodeSequence = PinCodeToken[];

export type PinInputState =
  | "default"
  | "error"
  | "success"
  | "disabled"
  | "loading";

export type PinHelperMessageState = "error" | "success" | "loading";

export type PinInputLength = 4 | 5 | 6;

export type PinProps = {
  length: PinInputLength;
  code?: PinCodeSequence;
  loadingMessage?: string;
  successMessage?: string;
  errorMessage?: string;
  state?: PinInputState;
  masked?: boolean;
  onCompleted?: (code: PinCodeSequence) => void;
  testID?: string | undefined;
};

/**
 * Props for the InputField.
 * @interface PinHelperMessageProps
 * @property {PinHelperMessageState} [state='base'] - The state of the input field
 * @property {string} [helperMessage=''] - The helper text of the input field
 */
export interface PinHelperMessageProps {
  state: PinHelperMessageState;
  helperMessage: string;
}

declare module "react-native" {
  interface TextInputChangeEventData {
    inputType?:
      | "insertFromPaste"
      | "insertText"
      | "deleteContentBackward"
      | "deleteContentForward"
      | string;
  }
}
