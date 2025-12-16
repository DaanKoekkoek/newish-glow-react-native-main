import React from "react";
import styles from "./Box.module.scss";
import { GlowGradient } from "foundations/GlowGradient";
import type { BoxProps } from "./Box.types";
import { tokenClassNames } from "_utility";

export const Box = React.forwardRef<HTMLDivElement, BoxProps>(
  (
    {
      prominence = "default",
      size = "default",
      testID = "box",
      grow = false,
      palette,
      children,
      style,
      className,
    },
    ref,
  ) => {
    const boxClasses = tokenClassNames(
      styles,
      "box",
      {
        [styles[`box-prominence-${prominence}`]]: prominence !== "default",
        [styles["box-grow"]]: grow === true,
        [styles["box-size-sm"]]: size === "sm",
        [styles[`box-palette-${palette}`]]: !!palette,
      },
      className,
    );

    return (
      <div data-testid={testID} className={boxClasses} style={style} ref={ref}>
        {prominence === "emphasised" ? (
          <>
            <GlowGradient
              zIndex={0}
              palette={palette}
              className={styles["box-gradient"]}
            />
            {children}
          </>
        ) : (
          children
        )}
      </div>
    );
  },
);
