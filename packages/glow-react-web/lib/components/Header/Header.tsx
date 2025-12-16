import { HeaderProps, HeaderState } from "./Header.types";
import styles from "./Header.module.scss";
import classNames from "classnames";
import { MetaNav } from "./MetaNav";
import { HeaderMain } from "./HeaderMain";
import { HeaderSubmenu } from "./HeaderSubmenu";
import { HeaderMobileSubmenu } from "./HeaderMobileSubmenu";
import { useState, useCallback, useMemo } from "react";
import { HeaderMenuButton } from "./HeaderMenuButton";
import { Icon } from "foundations/Icon";
import { HeaderBadgedIcon } from "./HeaderBadgedIcon";
import { AFM } from "foundations/Afm";
import { useSubmenuHover } from "./hooks/useSubmenuHover";
import { HeaderNavHelp } from "./HeaderNavHelp";

export const Header = ({
  metaLinks,
  mainLinks,
  searchAutoSuggestions,
  onSearch,
  variant = "default",
  layout = "default",
  AFMbanner = false,
  brand = "odido",
  sticky = false,
  className,
  testID,
  buttonOptions = {},
  helpOptions = {},
  logoHref,
}: HeaderProps): JSX.Element => {
  const isSubtleVariant = variant === "subtle";
  const isAlternateLayout = layout === "alternate";

  const [headerState, setHeaderState] = useState<HeaderState>("default");
  const [activeMobileMenuIndex, setActiveMobileMenuIndex] = useState<
    number | null
  >(null);

  const {
    activeMenuIndex,
    setActiveMenuIndex,
    handleMenuHoverStart,
    handleMenuHoverEnd,
    handleSubmenuHover,
    handleMenuTouch,
    handleSubmenuTouch,
    isTouchDevice,
  } = useSubmenuHover({ headerState });

  const handleSearchButtonClick = useCallback(() => {
    // Always use the default search behavior
    setHeaderState("search");
    setActiveMenuIndex(null);
  }, [setActiveMenuIndex]);

  const handleMenuButtonClick = useCallback(() => {
    setHeaderState((prevState) => {
      if (prevState === "level1") {
        return "default";
      }
      // Reset mobile menu index when opening level1 menu
      setActiveMobileMenuIndex(null);
      return "level1";
    });
  }, []);

  // Handler for mobile menu link click
  const handleMobileLinkClick = useCallback(
    (index: number) => {
      if (mainLinks && mainLinks[index].submenu) {
        setActiveMobileMenuIndex(index);
        setHeaderState("level2");
      }
    },
    [mainLinks],
  );

  // Handler for mobile back button click
  const handleMobileBackClick = useCallback(() => {
    setHeaderState("level1");
    setActiveMobileMenuIndex(null);
  }, []);

  // Handler for mobile close button click
  const handleMobileCloseClick = useCallback(() => {
    setHeaderState("default");
    setActiveMobileMenuIndex(null);
  }, []);

  // Get active submenu item for mobile view
  const activeMobileSubmenuItem =
    activeMobileMenuIndex !== null &&
    mainLinks &&
    mainLinks[activeMobileMenuIndex]?.submenu;

  const desktopLeftColumnItems = useMemo(() => {
    // Always return an array, which might be empty for subtle variant
    // This ensures the column is still rendered even when empty
    if (!isSubtleVariant && mainLinks) {
      return mainLinks.map((link, index) => (
        <HeaderMenuButton
          key={`main-link-${index}`}
          label={link.title}
          onClick={() => {
            // For touch devices, handle the touch event on click
            if (isTouchDevice) {
              // Pass a synthetic event for onClick - not ideal but necessary for handler compatibility
              const syntheticEvent = {
                preventDefault: () => {},
              } as React.TouchEvent;
              handleMenuTouch(index, syntheticEvent);
            }
          }}
          testID={`menu-button-${index}`}
          active={activeMenuIndex === index}
          onMouseEnter={() => handleMenuHoverStart(index)}
          onMouseLeave={handleMenuHoverEnd}
          onTouchStart={(event) => handleMenuTouch(index, event)}
        />
      ));
    }
    // Return empty array for subtle variant, column will still be rendered
    return [];
  }, [
    isSubtleVariant,
    mainLinks,
    activeMenuIndex,
    handleMenuHoverStart,
    handleMenuHoverEnd,
    handleMenuTouch,
    isTouchDevice,
  ]);

  const desktopRightColumnItems = useMemo(() => {
    // For subtle variant, show only the HeaderNavHelp
    if (isSubtleVariant) {
      return helpOptions.phone && helpOptions.link
        ? [
            <HeaderNavHelp
              key="header-nav-help"
              phoneNumber={helpOptions.phone}
              isOpen={helpOptions.status || false}
              link={helpOptions.link}
              testID="header-nav-help"
            />,
          ]
        : [];
    }

    // For non-subtle variant, show the regular menu buttons
    const loginButtonOpts = buttonOptions.loginButton || {};
    const loginButton = loginButtonOpts.visible !== false && (
      <HeaderMenuButton
        key="login-button"
        label={loginButtonOpts.label || "My Odido"}
        iconLeft={
          <HeaderBadgedIcon
            iconName={loginButtonOpts.iconName || "profile"}
            badgeVariant={loginButtonOpts.loggedIn ? undefined : "error"}
            testID="my-profile-badge"
          />
        }
        onClick={loginButtonOpts.onClick}
        onMouseEnter={loginButtonOpts.onHover}
        testID="my-odido-button"
        hideLabel={loginButtonOpts.hideLabel ?? isSubtleVariant}
      />
    );

    const searchButtonOpts = buttonOptions.searchButton || {};
    const searchButton = searchButtonOpts.visible !== false && (
      <HeaderMenuButton
        key="search-button"
        label={searchButtonOpts.label || "Search"}
        iconLeft={<Icon name={searchButtonOpts.iconName || "search"} />}
        onClick={handleSearchButtonClick}
        onMouseEnter={searchButtonOpts.onHover}
        testID="search-button"
        hideLabel={searchButtonOpts.hideLabel ?? false}
      />
    );

    const shopButtonOpts = buttonOptions.shopButton || {};
    const shopButton = shopButtonOpts.visible !== false && (
      <HeaderMenuButton
        key="shop-button"
        label={shopButtonOpts.label || "Shop"}
        iconLeft={
          <HeaderBadgedIcon
            iconName={shopButtonOpts.iconName || "shop"}
            badgeValue={shopButtonOpts.value ?? 0}
            testID="shop-badge"
          />
        }
        onClick={shopButtonOpts.onClick}
        onMouseEnter={shopButtonOpts.onHover || shopButtonOpts.onMouseEnter}
        onMouseLeave={shopButtonOpts.onMouseLeave}
        onTouchStart={shopButtonOpts.onTouchStart}
        testID="shop-button"
        hideLabel={shopButtonOpts.hideLabel ?? true}
      />
    );

    return isAlternateLayout
      ? [loginButton, searchButton, shopButton]
      : [searchButton, shopButton, loginButton];
  }, [
    isSubtleVariant,
    isAlternateLayout,
    handleSearchButtonClick,
    helpOptions,
    buttonOptions.loginButton,
    buttonOptions.searchButton,
    buttonOptions.shopButton,
  ]);

  const mobileLeftColumnItems = useMemo(() => {
    // For subtle variant, return empty array (hide all menu icons)
    if (isSubtleVariant) {
      return [];
    }

    const searchButtonOpts = buttonOptions.searchButton || {};
    const searchButton = searchButtonOpts.visible !== false && (
      <HeaderMenuButton
        key="search-button-mobile"
        label={searchButtonOpts.label || "Search"}
        iconLeft={<Icon name={searchButtonOpts.iconName || "search"} />}
        onClick={handleSearchButtonClick}
        onMouseEnter={searchButtonOpts.onHover}
        testID="search-button-mobile"
        hideLabel={searchButtonOpts.hideLabel ?? true}
      />
    );

    const shopButtonOpts = buttonOptions.shopButton || {};
    const shopButton = shopButtonOpts.visible !== false && (
      <HeaderMenuButton
        key="shop-button-mobile"
        label={shopButtonOpts.label || "Shop"}
        iconLeft={
          <HeaderBadgedIcon
            iconName={shopButtonOpts.iconName || "shop"}
            badgeValue={shopButtonOpts.value ?? 0}
            testID="shop-badge-mobile"
          />
        }
        onClick={shopButtonOpts.onClick}
        onMouseEnter={shopButtonOpts.onHover || shopButtonOpts.onMouseEnter}
        onMouseLeave={shopButtonOpts.onMouseLeave}
        onTouchStart={
          shopButtonOpts.onTouchStart
            ? () => shopButtonOpts.onTouchStart?.()
            : undefined
        }
        testID="shop-button-mobile"
        hideLabel={shopButtonOpts.hideLabel ?? true}
      />
    );
    return [searchButton, shopButton];
  }, [
    handleSearchButtonClick,
    isSubtleVariant,
    buttonOptions.searchButton,
    buttonOptions.shopButton,
  ]);

  const mobileRightColumnItems = useMemo(() => {
    // For subtle variant, show only help if available
    if (isSubtleVariant) {
      return helpOptions.phone && helpOptions.link
        ? [
            <HeaderNavHelp
              key="header-nav-help-mobile"
              phoneNumber={helpOptions.phone}
              isOpen={helpOptions.status || false}
              link={helpOptions.link}
              testID="header-nav-help-mobile"
            />,
          ]
        : [];
    }

    const loginButtonOpts = buttonOptions.loginButton || {};
    const loginButton = loginButtonOpts.visible !== false && (
      <HeaderMenuButton
        key="login-button-mobile"
        label={loginButtonOpts.label || "My Odido"}
        iconLeft={
          <HeaderBadgedIcon
            iconName={loginButtonOpts.iconName || "profile"}
            badgeVariant={loginButtonOpts.loggedIn ? undefined : "error"}
            testID="my-profile-badge-mobile"
          />
        }
        onClick={loginButtonOpts.onClick}
        onMouseEnter={loginButtonOpts.onHover}
        testID="my-odido-button-mobile"
        hideLabel={loginButtonOpts.hideLabel ?? true}
      />
    );

    const menuButton = (
      <HeaderMenuButton
        key="mobile-menu-button"
        label={headerState === "level1" ? "Close" : "Menu"}
        iconLeft={<Icon name={headerState === "level1" ? "close" : "menu"} />}
        onClick={handleMenuButtonClick}
        testID="mobile-menu-button"
        hideLabel={true}
      />
    );

    return [loginButton, menuButton];
  }, [
    handleMenuButtonClick,
    headerState,
    isSubtleVariant,
    helpOptions,
    buttonOptions.loginButton,
  ]);

  // Active submenu item for desktop view
  const activeSubmenuItem =
    activeMenuIndex !== null &&
    mainLinks &&
    mainLinks[activeMenuIndex]?.submenu;

  return (
    <header
      className={classNames(
        styles["token-navigation-main-navigation-v1"],
        styles["token-color-background"],
        styles["token-color-text"],
        styles["token-column-count"],
        styles["token-margin"],
        styles["token-paragraph"],
        styles.header,
        {
          [styles["submenu-open"]]: activeMenuIndex !== null,
          [styles["search-mode"]]: headerState === "search",
          [styles["mobile-menu-open"]]: headerState === "level1",
          [styles["mobile-submenu-open"]]: headerState === "level2",
          [styles["sticky"]]:
            (sticky && headerState !== "level2") || headerState === "level1",
        },
        className,
      )}
      data-testid={testID}
      role="banner"
    >
      {AFMbanner && !isSubtleVariant && (
        <div className={styles["afm-banner"]}>
          <AFM testID="header-afm-banner" />
        </div>
      )}
      {!isSubtleVariant && metaLinks && (
        <MetaNav
          itemList={metaLinks.map((item) => item.label)}
          active={
            metaLinks.find((item) => item.active)?.label || metaLinks[0]?.label
          }
          onSelect={(selected) => {
            const item = metaLinks.find((item) => item.label === selected);
            if (item && item.onClick) {
              item.onClick();
            }
          }}
          testID="header-meta-nav"
        />
      )}
      <HeaderMain
        className={styles["visible-laptop-and-up"]}
        leftColumnItems={desktopLeftColumnItems}
        rightColumnItems={desktopRightColumnItems}
        searchAutoSuggestions={searchAutoSuggestions}
        mainLinks={mainLinks}
        variant={variant}
        layout={layout}
        brand={brand}
        headerState={headerState}
        onHeaderStateChange={setHeaderState}
        key="desktop-header"
        testID="header-main-desktop"
        onSearch={onSearch}
        logoHref={logoHref}
      />
      <HeaderMain
        className={styles["visible-mobile-only"]}
        leftColumnItems={mobileLeftColumnItems}
        rightColumnItems={mobileRightColumnItems}
        mainLinks={mainLinks}
        searchAutoSuggestions={searchAutoSuggestions}
        variant={variant}
        layout={isSubtleVariant ? "alternate" : layout}
        brand={brand}
        headerState={headerState}
        onHeaderStateChange={setHeaderState}
        key="mobile-header"
        testID="header-main-mobile"
        onSearch={onSearch}
        logoHref={logoHref}
      />
      {/* Mobile submenu */}
      <HeaderMobileSubmenu
        headerState={headerState}
        mainLinks={mainLinks}
        activeSubmenuItem={activeMobileSubmenuItem || undefined}
        onLinkClick={handleMobileLinkClick}
        onBackClick={handleMobileBackClick}
        onCloseClick={handleMobileCloseClick}
        testID="header-mobile-submenu"
      />

      {headerState !== "search" &&
        headerState !== "level1" &&
        headerState !== "level2" && (
          <HeaderSubmenu
            submenuItem={activeSubmenuItem || undefined}
            open={activeMenuIndex !== null}
            onMouseEnter={() => handleSubmenuHover(true)}
            onMouseLeave={() => handleSubmenuHover(false)}
            onTouchStart={handleSubmenuTouch}
            testID="header-submenu"
          />
        )}
    </header>
  );
};
