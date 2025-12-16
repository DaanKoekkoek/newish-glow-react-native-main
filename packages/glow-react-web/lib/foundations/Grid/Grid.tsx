import React from "react";
import { useAllowedChildren, useGenerateClassNames } from "_global-hooks";
import styles from "./Grid.module.scss";
import classNames from "classnames";
import { ColumnProps, GridProps } from "./Grid.types";

import { generateClassNames, tokenClassNames } from "_utility";

export const Grid = ({
  direction = "row",
  children,
  containerClassName,
  gridClassName,
  columnSize,
  fluid,
  noGutters = false,
  width = "default",
  testID = "grid",
}: GridProps) => {
  const gridChildren = useAllowedChildren(children, [Column]);
  const columnSizeClasses = generateClassNames(
    "grid-column",
    typeof columnSize === "number"
      ? { mobileSmall: columnSize }
      : (columnSize ?? { mobileSmall: 12 }),
  );

  const noGuttersClass = useGenerateClassNames(styles, noGutters, "no-gutters");

  const directions =
    typeof direction === "string"
      ? { mobileSmall: direction }
      : (direction ?? { mobileSmall: "row" });
  const directionClasses = generateClassNames("grid-direction", directions);

  return (
    <div
      data-testid={`${testID}-container`}
      {...(noGutters ? { ["data-no-gutters"]: true } : {})}
      className={tokenClassNames(
        styles,
        "container",
        containerClassName,
        styles[`container-width-${width}`],
        {
          [styles["container-fluid"]]: !!fluid,
        },
        noGuttersClass,
      )}
    >
      <div
        data-testid={`${testID}-grid`}
        className={classNames(
          styles.grid,
          directionClasses.map((directionClass) => styles[directionClass]),
          gridClassName,
        )}
      >
        {gridChildren.map((child, index) => (
          <Column
            key={index}
            columnSizeClasses={classNames(
              columnSizeClasses.map((sizeClass) => styles[sizeClass]),
            )}
            {...(child as React.ReactElement).props}
          >
            {(child as React.ReactElement).props.children}
          </Column>
        ))}
      </div>
    </div>
  );
};

export const Column = ({
  children,
  columnSizeClasses,
  size,
  className,
  testID = "column",
  ...props
}: ColumnProps) => {
  // If specific size per breakpoint is provided, it will be used, otherwise will take the columnSizeClasses prop value
  const columnSizes = generateClassNames(
    "grid-column",
    size ?? { mobileSmall: 12 },
  );

  return (
    <div
      {...props}
      data-testid={testID}
      className={classNames(
        styles.column,
        size
          ? columnSizes.map((sizeClass) => styles[sizeClass])
          : columnSizeClasses,

        className,
      )}
    >
      {children}
    </div>
  );
};
