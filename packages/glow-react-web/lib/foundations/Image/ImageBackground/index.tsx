import React from "react";
import classNames from "classnames";
import styles from "../styles/Image.module.scss";
import { positionToClassName } from "../utils.ts";
import { ImageProps } from "../Image.types.ts";

export const ImageBackground = React.forwardRef<
  HTMLDivElement,
  Omit<ImageProps, "ratio"> & { visible?: boolean; ratioClass: string }
>(
  (
    {
      src,
      alt,
      position = "center",
      resizeMode = "contain",
      children,
      ratioClass,
      testID,
      className,
      pictureClassName,
      visible = true,
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        data-testid={testID}
        className={classNames(
          styles["background-image"],
          className,
          ratioClass,
        )}
      >
        <div
          role="img"
          aria-label={alt}
          className={classNames(
            styles[positionToClassName(position)],
            pictureClassName,
          )}
          style={
            visible
              ? {
                  backgroundImage: `url(${src})`,
                  backgroundSize: resizeMode,
                }
              : undefined
          }
        >
          {children}
        </div>
      </div>
    );
  },
);
