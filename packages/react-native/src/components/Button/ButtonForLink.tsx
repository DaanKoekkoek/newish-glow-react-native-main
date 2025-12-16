import { useState } from "react";

import { BaseButton } from "./BaseButton";
import type { TextButtonProps } from "./Button.types";

const ButtonForLink = (props: TextButtonProps) => {
  const [isPressed, setIsPressed] = useState<boolean>(false);
  const [isHover, setIsHover] = useState<boolean>(false);

  const config = {
    isPressed,
    onPressIn: () => {
      setIsPressed(true);
    },
    onPressOut: () => {
      setIsPressed(false);
    },
    isHover,
    onHoverIn: () => {
      setIsHover(true);
    },
    onHoverOut: () => {
      setIsHover(false);
    },
  };

  return <BaseButton asText {...config} {...props} />;
};

export { ButtonForLink };
