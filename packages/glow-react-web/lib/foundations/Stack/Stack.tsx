import styles from "./Stack.module.scss";
import type { StackProps } from "./Stack.types";
import { useGenerateClassNames } from "_global-hooks";
import { generateClassNames, tokenClassNames } from "_utility";

export const Stack = ({
  direction = "column",
  alignItems = "flex-start",
  alignSelf,
  justifyContent = "flex-start",
  children,
  gap = "default",
  wrap = "nowrap",
  grow = true,
  shrink = true,
  size,
  columnSize,
  testID = "stack",
  className,
  as: Tag = "div",
  ...props
}: StackProps) => {
  const internalAlignItems = columnSize ? "stretch" : alignItems;
  const directionClass = useGenerateClassNames(styles, direction, "direction");
  const alignItemsClass = useGenerateClassNames(
    styles,
    internalAlignItems,
    "align",
  );
  const alignSelfClass = useGenerateClassNames(
    styles,
    alignSelf ?? false,
    "align-self",
  );
  const justifyContentClass = useGenerateClassNames(
    styles,
    justifyContent,
    "justify",
  );
  const wrapClass = useGenerateClassNames(styles, wrap, "wrap");
  const growClass = useGenerateClassNames(styles, grow, "grow");
  const shrinkClass = useGenerateClassNames(styles, shrink, "shrink");
  const gapClass = useGenerateClassNames(styles, gap, "gap");

  const sizeClasses = generateClassNames(
    "stack-size",
    typeof size === "number"
      ? { mobileSmall: size }
      : (size ?? { mobileSmall: 12 }),
  );

  const columnSizeClasses = generateClassNames(
    "stack-column",
    typeof columnSize === "number"
      ? { mobileSmall: columnSize }
      : (columnSize ?? { mobileSmall: 12 }),
  );

  return (
    <Tag
      data-testid={testID}
      className={tokenClassNames(
        styles,
        "stack",
        directionClass,
        alignItemsClass,
        alignSelfClass,
        justifyContentClass,
        gapClass,
        wrapClass,
        growClass,
        shrinkClass,
        sizeClasses.map((c) => styles[c]),
        columnSizeClasses.map((c) => styles[c]),
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  );
};
