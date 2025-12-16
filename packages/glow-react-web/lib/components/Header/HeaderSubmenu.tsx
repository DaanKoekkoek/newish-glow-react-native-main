import { SubmenuProps } from "./Header.types";
import classNames from "classnames";
import styles from "./Header.module.scss";
import { Paragraph } from "foundations/Paragraph";
import { HeaderMenuButton } from "./HeaderMenuButton";

export const HeaderSubmenu = ({
  submenuItem,
  open,
  testID,
  onMouseEnter,
  onMouseLeave,
  onTouchStart, // Touch handler
}: SubmenuProps): JSX.Element | null => {
  if (!submenuItem || !open) return null;

  const { columns, featured } = submenuItem;

  // Ensure featured is treated as an array
  const featuredItems = featured
    ? Array.isArray(featured)
      ? featured
      : [featured]
    : [];

  return (
    <div
      className={classNames(styles["submenu"], {
        [styles["visible"]]: open,
      })}
      data-testid={testID ?? "header-submenu"}
      aria-hidden={!open}
      role="region"
      aria-label="Submenu navigation"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onTouchStart={(e) => {
        // Prevent propagation for SSR safety
        e.stopPropagation();
        if (onTouchStart) onTouchStart();
      }}
    >
      <div className={styles["submenu-content"]}>
        {columns.map((column, colIndex) => (
          <div
            key={`submenu-col-${colIndex}`}
            className={styles["submenu-column"]}
          >
            <Paragraph size="xs" className={styles["submenu-column-title"]}>
              {column.title}
            </Paragraph>
            <div className={styles["submenu-links"]}>
              {column.links.map((link, linkIndex) => (
                <HeaderMenuButton
                  href={link.href}
                  className={styles["submenu-link-item"]}
                  key={`submenu-link-${colIndex}-${linkIndex}`}
                  size="sm"
                  label={link.title}
                />
              ))}
            </div>
          </div>
        ))}
        <div
          className={classNames(
            styles["submenu-column"],
            styles["submenu-column-featured"],
          )}
        >
          {featuredItems.map((item, idx) => (
            <div
              key={`featured-item-${idx}`}
              className={styles["featured-item"]}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
