import classNames from "classnames";
import styles from "./Header.module.scss";
import { HeaderMobileSubmenuProps } from "./Header.types";
import { Paragraph } from "foundations/Paragraph";
import { HeaderMenuButton } from "./HeaderMenuButton";
import { Heading } from "foundations/Heading";
import { Icon } from "foundations/Icon";

export const HeaderMobileSubmenu = ({
  headerState,
  mainLinks = [],
  activeSubmenuItem,
  onLinkClick,
  onBackClick = () => {},
  onCloseClick = () => {},
  testID,
}: HeaderMobileSubmenuProps): JSX.Element | null => {
  if (headerState !== "level1" && headerState !== "level2") {
    return null;
  }

  // Find the title of the active submenu for level2 navigation
  const activeMenuTitle =
    mainLinks.find(
      (_, index) =>
        activeSubmenuItem &&
        headerState === "level2" &&
        activeSubmenuItem === mainLinks[index]?.submenu,
    )?.title || "";

  // Ensure featured is treated as an array for level 2
  const featuredItems =
    activeSubmenuItem?.featured && headerState === "level2"
      ? Array.isArray(activeSubmenuItem.featured)
        ? activeSubmenuItem.featured
        : [activeSubmenuItem.featured]
      : [];

  return (
    <div
      className={classNames(
        styles["mobile-menu-overlay"],
        styles["visible-mobile-only"],
        {
          [styles["level2"]]: headerState === "level2",
        },
      )}
      data-testid={testID ?? "header-mobile-submenu"}
      aria-hidden={false}
    >
      {/* Level 1 */}
      {headerState === "level1" && (
        <div className={styles["mobile-menu-content"]}>
          {mainLinks.map((link, index) => (
            <button
              type="button"
              key={`mobile-menu-${index}`}
              className={styles["mobile-menu-item"]}
              onClick={() => onLinkClick && onLinkClick(index)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  onLinkClick && onLinkClick(index);
                }
              }}
            >
              {link.title}
            </button>
          ))}
        </div>
      )}

      {/* Level 2 submenu */}
      {headerState === "level2" && activeSubmenuItem && (
        <>
          {/* Level 2 submenu header */}
          <div className={styles["mobile-header"]}>
            <HeaderMenuButton
              onClick={onBackClick}
              iconLeft={<Icon name="chevron-left" />}
              label=""
              testID="mobile-submenu-back-button"
              hideLabel={true}
            />
            <Heading size="md" alignment="center" testID="mobile-submenu-title">
              {activeMenuTitle}
            </Heading>
            <HeaderMenuButton
              onClick={onCloseClick}
              iconLeft={<Icon name="close" />}
              label=""
              testID="mobile-submenu-close-button"
              hideLabel={true}
            />
          </div>
          {/* Level 2 Submenu Content */}
          <div className={styles["mobile-menu-content"]}>
            {activeSubmenuItem.columns.map((column, colIndex) => (
              <div
                key={`mobile-submenu-col-${colIndex}`}
                className={styles["mobile-submenu-column"]}
              >
                <Paragraph
                  size="xs"
                  className={styles["mobile-submenu-column-title"]}
                >
                  {column.title}
                </Paragraph>
                <div className={styles["mobile-submenu-links"]}>
                  {column.links.map((link, linkIndex) => (
                    <HeaderMenuButton
                      href={link.href}
                      className={styles["mobile-submenu-link-item"]}
                      key={`mobile-submenu-link-${colIndex}-${linkIndex}`}
                      size="sm"
                      label={link.title}
                      iconRight={<Icon name="chevron-right" size={"sm"} />}
                    />
                  ))}
                </div>
              </div>
            ))}
            {featuredItems.length > 0 && (
              <div
                className={classNames(
                  styles["mobile-submenu-column"],
                  styles["mobile-submenu-column-featured"],
                )}
              >
                {featuredItems.map((item, idx) => (
                  <div
                    key={`mobile-featured-item-${idx}`}
                    className={styles["mobile-featured-item"]}
                  >
                    {item}
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};
