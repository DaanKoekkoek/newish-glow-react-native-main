import type { Dispatch, HTMLInputTypeAttribute } from "react";
import type { InputVariant } from "components/InputField";
import type {
  SuffixIconState,
  SuffixIconAction,
} from "components/InputField/InputField.reducer";

type CommonProps = {
  type: HTMLInputTypeAttribute;
  variant?: InputVariant;
  testID?: string;
  onClick?: () => void;
  className?: string;
};

// Prefix-only
type PrefixIconProps = {
  position: "prefix";
} & CommonProps;

// Suffix types
type PasswordSuffixIconProps = {
  position: "suffix";
  type: "password";
  state: SuffixIconState;
  dispatch: Dispatch<SuffixIconAction>;
} & CommonProps;

type DateSuffixIconProps = {
  position: "suffix";
  type: "date";
  state: SuffixIconState;
} & CommonProps;

type SearchSuffixIconProps = {
  position: "suffix";
  type: "search";
} & CommonProps;

type TextSuffixIconProps = {
  position: "suffix";
  type: "text";
} & CommonProps;

type FileSuffixIconProps = {
  position: "suffix";
  type: "file";
  fileInputRef?: React.MutableRefObject<HTMLInputElement | null>;
} & CommonProps;

type SuffixIconProps =
  | PasswordSuffixIconProps
  | (SearchSuffixIconProps & {
      solid?: boolean;
      className?: string;
    })
  | DateSuffixIconProps
  | TextSuffixIconProps
  | (FileSuffixIconProps & {
      showClear?: boolean;
    });

export type InputIconProps = PrefixIconProps | SuffixIconProps;

export type InputType = React.HTMLInputTypeAttribute;

export type SupportedInputIconTypes =
  | "password"
  | "search"
  | "date"
  | "text"
  | "file";
