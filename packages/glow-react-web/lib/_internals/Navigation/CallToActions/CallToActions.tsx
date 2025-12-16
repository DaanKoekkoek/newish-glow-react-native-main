import React from "react";
import styles from "./CallToActions.module.scss";
import { tokenClassNames } from "_utility";
import { useGenerateClassNames } from "_global-hooks";
import { BreakpointKey } from "_theming/breakpoints";

type FillPerBreakpoint = {
  [Breakpoint in BreakpointKey]?: boolean;
};

type CallToActionsProps = {
  children: React.ReactElement | React.ReactElement[];
  testID?: string;
  className?: string;
  fill?: boolean | FillPerBreakpoint;
};

export const CallToActions = ({
  children,
  testID = "call-to-actions",
  className,
  fill = false,
}: CallToActionsProps) => {
  const fillClass = useGenerateClassNames(styles, fill, "fill");

  return (
    <div
      data-testid={testID}
      className={tokenClassNames(
        styles,
        "call-to-actions",
        {
          [styles["has-one-trigger"]]: React.Children.count(children) === 1,
        },
        fillClass,
        className,
      )}
    >
      {children}
    </div>
  );
};
