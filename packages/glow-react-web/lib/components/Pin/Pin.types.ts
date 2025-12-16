import { OTPInput } from "input-otp";
import { ComponentPropsWithRef, ReactNode } from "react";

/**
 * @type PinProps
 * @property {string?} [code] - Code state controlling the input.
 * @property {(code?: string) => void} [setCode] - Setter for the controlled code (or callback for uncontrolled value).
 * @property {"default" | "error" | "success" | "disabled" | "loading"} [state] - State, used to show help messages as well as loading indicator.
 * @property {string?} [errorMessage] - Help message shown when `state === "error"`.
 * @property {string?} [loadingMessage] - Help message shown when `state === "loading"`.
 * @property {string?} [successMessage] - Help message shown when `state === "success"`.
 * @property {boolean?} [masked] - Visually hide input characters.
 * @property {(code?: string) => void} [onCompleted] - Callback called when final digit has been entered.
 *
 * This is an extension of [guilhermerodz/input-otp](https://github.com/guilhermerodz/input-otp), click link for more customization options.
 */
export type PinProps = Omit<
  ComponentPropsWithRef<typeof OTPInput>,
  "children" | "onChange" | "onComplete" | "render" | "value"
> & {
  children: ReactNode;
  code?: string;
  errorMessage?: string;
  loadingMessage?: string;
  masked?: boolean;
  onCompleted?: (code: string) => void;
  setCode?: (code: string) => void;
  state?: "default" | "error" | "success" | "disabled" | "loading";
  successMessage?: string;
  testID?: string;
};
