import { forwardRef } from "react";
import type { TextInput } from "react-native";

import { InputField } from "../InputField";
import type { TextAreaProps } from "./TextArea.types";

export const TextArea = forwardRef<TextInput, TextAreaProps>((props, ref) => (
  <InputField {...props} ref={ref} multiline textAlignVertical="top" />
));
