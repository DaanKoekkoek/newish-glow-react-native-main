import { MetaItemProps } from "./Header.types";
import styles from "./Header.module.scss";
import classNames from "classnames";

/**
 * MetaItem component renders a navigation link in the meta section of the header.
 *
 * The component behaves as follows:
 * - Always renders as an <a> element with the specified href (defaults to "#")
 * - When onClick handler is provided, it prevents the default navigation behavior
 *   and calls the handler instead, ignoring the href value
 * - When no onClick handler is provided, it functions as a standard hyperlink
 *
 * @param props - Component props
 * @returns A styled navigation link component
 */
export const MetaItem = ({
  children,
  active,
  id,
  className,
  testID,
  onClick,
  href = "#",
}: MetaItemProps): JSX.Element => {
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      event.preventDefault(); // Prevent default anchor behavior
      onClick();
    }
  };
  return (
    <a
      href={href}
      className={classNames(
        styles[`meta-item`],
        active && styles[`active`],
        className,
      )}
      data-id={id}
      data-testid={testID}
      onClick={handleClick}
    >
      {children}
    </a>
  );
};
