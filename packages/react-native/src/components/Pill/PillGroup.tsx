import React from "react";

import type { PillGroupProps } from "./PillGroup.types";

export const PillGroup = ({ disabled, children }: PillGroupProps) => {
  if (!children) return null;

  return (
    <>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, {
          disabled: disabled || child?.props.disabled,
        }),
      )}
    </>
  );
};
