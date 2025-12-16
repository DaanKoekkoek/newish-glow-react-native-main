import classNames from "classnames";
import styles from "./Visibility.module.scss";
import type { VisibilityProps } from "./Visibility.types";

export const Visible = ({
  as: Tag = "span",
  children,
  above,
  below,
  only,
  className,
  testID = "visible",
}: VisibilityProps) => {
  let visibleClass = "";

  if (above) visibleClass = styles[`visible-above-${above}`];
  if (below) visibleClass = styles[`visible-below-${below}`];
  if (only) visibleClass = styles[`visible-only-${only}`];

  return (
    <Tag data-testid={testID} className={classNames(className, visibleClass)}>
      {children}
    </Tag>
  );
};
