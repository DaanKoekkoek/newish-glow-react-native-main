import type { MenuButtonProps } from "./Header.types";
import styles from "./Header.module.scss";
import classNames from "classnames";

export const HeaderMenuButton = ({
  label,
  iconLeft,
  iconRight,
  active,
  className,
  testID,
  onClick,
  href,
  children,
  hideLabel = false,
  ...rest
}: MenuButtonProps & {
  href?: string;
  children?: React.ReactNode;
  size?: string;
}): JSX.Element => {
  const commonProps = {
    className: classNames(
      styles["menu-button"],
      active && styles["active"],
      className,
    ),
    "data-testid": testID,
  };

  const content = (
    <>
      {iconLeft && (
        <span className={styles["menu-button-icon"]}>{iconLeft}</span>
      )}
      {!hideLabel && (
        <span className={styles["menu-button-label"]}>{children || label}</span>
      )}
      {iconRight && (
        <span className={styles["menu-button-icon"]}>{iconRight}</span>
      )}
    </>
  );

  // If href is provided, render as an anchor
  if (href) {
    return (
      <a href={href} {...commonProps} {...rest}>
        {content}
      </a>
    );
  }

  // Otherwise, render as a button
  return (
    <button type="button" onClick={onClick} {...commonProps} {...rest}>
      {content}
    </button>
  );
};
