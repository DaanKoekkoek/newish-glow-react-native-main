import React, { useState } from "react";

import { BaseButton, BaseButtonIcon } from "./BaseButton";
import type { ButtonProps } from "./Button.types";

const Button = ({ testID, ...props }: ButtonProps) => {
  const [isPressed, setIsPressed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const config = {
    isPressed,
    onPressIn: () => {
      setIsPressed(true);
    },
    onPressOut: () => {
      setIsPressed(false);
    },
    isHovered,
    onHoverIn: () => {
      setIsHovered(true);
    },
    onHoverOut: () => {
      setIsHovered(false);
    },
  };

  return <BaseButton testID={testID} asText={false} {...props} {...config} />;
};

Button.Icon = BaseButtonIcon;

export { Button };
