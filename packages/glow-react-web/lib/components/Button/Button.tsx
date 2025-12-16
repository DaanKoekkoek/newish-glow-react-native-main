import React from "react";
import { BaseButton, PolymorphicRef } from "_internals/Button";
import type { ButtonProps } from "./Button.types";

export const Button = React.forwardRef(
  <C extends React.ElementType = "button">(
    {
      size = "default",
      inverted = false,
      state = "default",
      testID = "button",
      ...rest
    }: ButtonProps<C>,
    ref: PolymorphicRef<C>,
  ) => (
    <BaseButton
      as={rest.as as C}
      ref={ref}
      size={size}
      inverted={inverted}
      state={state}
      testID={testID}
      {...rest}
    />
  ),
);
