import React, { useRef, useState, useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import classNames from "classnames";
import {
  AnchoredScale,
  Fade,
  Grow,
  Stagger,
  Slide,
} from "_internals/Animation";
import { BaseText } from "_internals/Typography";
import { BannerCard } from "_internals/Card";
import { NavIcon, DropdownPanel, FocusTrap } from "_internals/Navigation";
import { OdidoPalette } from "_internals/Color";
import { Grid, Column } from "foundations/Grid";
import { Logos } from "foundations/Logos";
import { AnimatedLogo } from "foundations/Logos/AnimatedLogo/AnimatedLogo";
import { Paragraph } from "foundations/Paragraph";
import { Icon } from "foundations/Icon";
import { Button } from "components/Button";
import { CartDropdown } from "_internals/ShoppingCart";
import { Status } from "components/Status";
import { useDesktopNavigation } from "./hooks";
import type {
  MainNavigationTree,
  MainNavigationAdditions,
  PanelID,
  MainNavigationLogo,
  MainNavigationVariant,
  MainNavigationProps,
  MainNavigationMoveLogo,
} from "./MainNavigation.types";
import { NavSearch } from "./_MainNavigation.search";
import { NavLink } from "./_MainNavigation.link";
import styles from "./styles/MainNavigation.module.scss";
import { Avatar } from "_internals/Navigation";

type NavDesktopProps = MainNavigationAdditions & {
  moveLogo?: MainNavigationMoveLogo;
  navigationTree?: MainNavigationTree[];
  logo?: MainNavigationLogo;
  palette?: OdidoPalette;
  variant?: MainNavigationVariant;
  searchPortalRef?: React.RefObject<HTMLDivElement>;
};

export const NavDesktop = React.memo(
  React.forwardRef<HTMLDivElement, NavDesktopProps>(
    (
      {
        moveLogo,
        search,
        cart,
        user,
        logo,
        navigationTree,
        ariaLabel,
        palette,
        status,
        customerService,
        variant,
        routeKey,
        searchPortalRef,
      },
      ref,
    ) => {
      const cartButtonRef = useRef<HTMLButtonElement>(null);
      const userButtonRef = useRef<HTMLButtonElement>(null);
      const localPortalRef = useRef<HTMLDivElement>(null);
      const portalTarget =
        (ref as React.RefObject<HTMLDivElement>)?.current ??
        localPortalRef.current;
      const [isClient, setIsClient] = useState(false);

      useEffect(() => setIsClient(true), []);

      const {
        activePanelId,
        activePanelRef,
        handleButtonMouseLeave,
        handlePanelBlur,
        handlePanelFocus,
        handleButtonMouseClick,
        handlePanelMouseEnter,
        handlePanelMouseLeave,
        isSearchOpen,
        isPanelOpen,
        closeSearch,
        openSearch,
        openPanel,
      } = useDesktopNavigation({
        searchOpen: search?.open,
        routeKey: routeKey,
      });

      const activeBranch = useMemo(
        () =>
          navigationTree?.find(
            (branch) => `branch-${branch.id}` === activePanelId,
          ),
        [navigationTree, activePanelId],
      );
      const branchLists = useMemo(
        () => activeBranch?.links ?? [],
        [activeBranch],
      );
      const branchPromotions = useMemo(
        () => activeBranch?.promotions ?? [],
        [activeBranch],
      );
      const columnCount = useMemo(
        () => branchLists.length + (branchPromotions.length > 0 ? 1 : 0),
        [branchLists, branchPromotions],
      );
      const isDropdownOpen =
        !!activePanelId && activePanelId !== "cart" && activePanelId !== "user";

      const moveLogoState =
        typeof moveLogo === "boolean"
          ? { search: moveLogo, level: moveLogo }
          : moveLogo || { search: false, level: false };

      return (
        <>
          {variant === "default" && (
            <Fade
              testID="backdrop"
              open={isDropdownOpen || isSearchOpen}
              zIndex={9998}
              position="relative"
            >
              <button
                type="button"
                className={styles["main-navigation-backdrop"]}
                aria-label={ariaLabel?.backdrop}
                onClick={closeSearch}
              />
            </Fade>
          )}

          <div
            className={classNames(styles["main-navigation-controls"], {
              [styles["main-navigation-actions-list-subtle"]]:
                variant === "subtle",
            })}
          >
            {search && (
              <Fade
                open={isSearchOpen}
                reverseOnExit
                className={styles["main-navigation-search"]}
                testID="search-box-desktop"
              >
                {({ fadeCompleted }) => (
                  <FocusTrap
                    active={fadeCompleted}
                    returnFocusOnDeactivate
                    focus="mount"
                  >
                    <NavSearch
                      open={fadeCompleted}
                      onClose={closeSearch}
                      ariaLabel={ariaLabel}
                      {...search}
                      ref={searchPortalRef}
                    />
                  </FocusTrap>
                )}
              </Fade>
            )}

            {variant === "default" && navigationTree && (
              <ul
                className={classNames(
                  styles["main-navigation-actions-list"],
                  styles["main-navigation-list-branches"],
                )}
              >
                {navigationTree.map((branch) => {
                  const panelId = `branch-${branch.id}` as PanelID;
                  return (
                    <li key={branch.id}>
                      {branch.links && branch.links.length > 0 ? (
                        <BaseText
                          as="button"
                          type="button"
                          onMouseEnter={() => openPanel(panelId)}
                          onFocus={() => openPanel(panelId)}
                          onMouseLeave={handleButtonMouseLeave}
                          onBlur={handleButtonMouseLeave}
                          className={classNames(
                            styles["main-navigation-button"],
                            {
                              [styles["is-active"]]: activePanelId === panelId,
                            },
                          )}
                        >
                          <span>{branch.label}</span>
                        </BaseText>
                      ) : (
                        (() => {
                          const { links, promotions, label, ...rest } = branch;
                          void links;
                          void promotions;
                          return (
                            <NavLink
                              {...rest}
                              className={styles["main-navigation-button"]}
                            >
                              <span>{label}</span>
                            </NavLink>
                          );
                        })()
                      )}
                    </li>
                  );
                })}
              </ul>
            )}

            {logo && (
              <Slide
                index={0}
                animation="fast"
                direction="top"
                reverseOnExit
                offsetY={moveLogoState.level ? -20 : 0}
                className={styles["main-navigation-logo"]}
              >
                <DesktopNavLogo
                  logo={logo}
                  isPanelOpen={
                    isSearchOpen || moveLogoState.level || moveLogoState.search
                  }
                />
              </Slide>
            )}

            {variant === "subtle" ? (
              <ul
                className={classNames(
                  styles["main-navigation-actions-list"],
                  styles["main-navigation-actions-list-subtle"],
                )}
              >
                {customerService && (
                  <li className={styles["main-navigation-service"]}>
                    <div className={styles["main-navigation-service-contact"]}>
                      {customerService.phoneNumber && (
                        <Paragraph
                          size="sm"
                          className={styles["main-navigation-service-text"]}
                        >
                          {customerService.phoneNumber}
                        </Paragraph>
                      )}
                      {status && <Status {...status} />}
                    </div>
                    {customerService.openingHours && (
                      <NavLink
                        href={customerService.openingHours.href}
                        className={styles["main-navigation-service-link"]}
                      >
                        {customerService.openingHours.label}
                      </NavLink>
                    )}
                  </li>
                )}
              </ul>
            ) : (
              <ul
                className={classNames(
                  styles["main-navigation-actions-list"],
                  styles["main-navigation-actions-list-actions"],
                )}
              >
                {user?.link && (
                  <li>
                    {user.panel ? (
                      <button
                        type="button"
                        ref={userButtonRef}
                        onMouseEnter={() => openPanel("user")}
                        onFocus={() => openPanel("user")}
                        onClick={() => handleButtonMouseClick("user")}
                        onMouseLeave={handleButtonMouseLeave}
                        onBlur={handleButtonMouseLeave}
                        className={styles["main-navigation-button"]}
                      >
                        {user.link.initials ? (
                          <Avatar
                            palette={palette}
                            size="sm"
                            className={styles["main-navigation-user-avatar"]}
                          >
                            {user.link.initials}
                          </Avatar>
                        ) : (
                          <>
                            <NavIcon
                              badgeStatus={user.link.badge}
                              className={styles["main-navigation-icon"]}
                            />
                            <BaseText>{user.link.title}</BaseText>
                          </>
                        )}
                      </button>
                    ) : (
                      <NavLink
                        href={user.link.href}
                        className={styles["main-navigation-link"]}
                      >
                        {user.link.initials ? (
                          <Avatar
                            palette={palette}
                            size="sm"
                            className={styles["main-navigation-user-avatar"]}
                          >
                            {user.link.initials}
                          </Avatar>
                        ) : (
                          <>
                            <NavIcon
                              badgeStatus={user.link.badge}
                              className={styles["main-navigation-icon"]}
                            />
                            <span>{user.link.title}</span>
                          </>
                        )}
                      </NavLink>
                    )}
                  </li>
                )}
                {search && (
                  <li>
                    <button
                      type="button"
                      onClick={openSearch}
                      className={classNames(
                        styles["main-navigation-button"],
                        styles["main-navigation-search-button"],
                      )}
                      aria-label={
                        isSearchOpen
                          ? ariaLabel?.search.close
                          : ariaLabel?.search.open
                      }
                    >
                      <Icon name="search" />
                      <BaseText>{search.title}</BaseText>
                    </button>
                  </li>
                )}
                {cart && cart.link && cart.panel && (
                  <li>
                    <button
                      type="button"
                      ref={cartButtonRef}
                      onMouseEnter={() => openPanel("cart")}
                      onFocus={() => openPanel("cart")}
                      onClick={() => handleButtonMouseClick("cart")}
                      onMouseLeave={handleButtonMouseLeave}
                      onBlur={handleButtonMouseLeave}
                      className={styles["main-navigation-button"]}
                    >
                      <NavIcon
                        type="cart"
                        badgeStatus={cart.link.badge}
                        className={styles["main-navigation-icon"]}
                      />
                      {cart.link.title}
                    </button>
                  </li>
                )}
              </ul>
            )}
          </div>

          {variant === "default" &&
            portalTarget &&
            createPortal(
              <div
                ref={activePanelRef}
                onMouseEnter={handlePanelMouseEnter}
                onMouseLeave={handlePanelMouseLeave}
                onFocus={handlePanelFocus}
                onBlur={handlePanelBlur}
                tabIndex={-1}
              >
                <DesktopNavDropdown
                  activePanelId={activePanelId}
                  isPanelOpen={isPanelOpen}
                  cart={cart}
                  user={user}
                  activeBranchLinks={branchLists}
                  activeBranchPromotions={branchPromotions}
                  columnCount={columnCount}
                  activeBranch={activeBranch}
                  palette={palette}
                  cartButtonRef={cartButtonRef}
                  userButtonRef={userButtonRef}
                />
              </div>,
              portalTarget,
            )}

          {!isClient && (
            <div ref={localPortalRef} style={{ display: "none" }} />
          )}
        </>
      );
    },
  ),
);

const DesktopNavLogo = ({
  logo,
  isPanelOpen,
}: {
  logo: MainNavigationProps["logo"];
  isPanelOpen?: boolean;
}) => {
  if (!logo) return null;

  const {
    videoSrc,
    brand,
    variant,
    onClick,
    href,
    title,
    target,
    lang,
    testID,
  } = logo;

  const logoContent =
    (brand === "odido" || brand === "sim-wallet") && videoSrc ? (
      <AnimatedLogo
        open={!isPanelOpen}
        loop={false}
        videoSrc={videoSrc}
        testID={testID}
        size={{ mobileSmall: "default", desktop: "lg" }}
      />
    ) : (
      <Logos
        brand={brand}
        variant={variant}
        testID={testID}
        size={{ mobileSmall: "default", desktop: "lg" }}
      />
    );

  return (
    <>
      {href || onClick ? (
        <NavLink
          href={href}
          onClick={onClick}
          title={title}
          target={target}
          lang={lang}
          className={styles["main-navigation-logo-link"]}
        >
          {logoContent}
        </NavLink>
      ) : (
        logoContent
      )}
    </>
  );
};

type DesktopNavDropdownProps = {
  activePanelId: PanelID | null;
  isPanelOpen: boolean;
  cartButtonRef: React.RefObject<HTMLButtonElement>;
  userButtonRef: React.RefObject<HTMLButtonElement>;
  activeBranch?: MainNavigationTree;
  activeBranchLinks: MainNavigationTree["links"];
  activeBranchPromotions: MainNavigationTree["promotions"];
  cart?: MainNavigationProps["cart"];
  user?: MainNavigationProps["user"];
  columnCount: number;
  palette?: OdidoPalette;
};

const DesktopNavDropdown = React.memo(
  ({
    activePanelId,
    isPanelOpen,
    cartButtonRef,
    userButtonRef,
    cart,
    user,
    activeBranch,
    activeBranchLinks,
    activeBranchPromotions,
    columnCount,
    palette,
  }: DesktopNavDropdownProps) => {
    if (!activePanelId) return null;

    if (activePanelId === "cart" || activePanelId === "user") {
      const panel = activePanelId === "cart" ? cart?.panel : user?.panel;
      return (
        <AnchoredScale
          offsetY={-10}
          key={activePanelId}
          sourceRef={activePanelId === "cart" ? cartButtonRef : userButtonRef}
          open={isPanelOpen}
          animation="fast"
          direction="top-right"
          className={styles[`main-navigation-popup-${activePanelId}`]}
        >
          {({ onScaleComplete, onExitComplete }) => (
            <FocusTrap
              active
              enableArrowKeyNavigation
              focus="arrowdown"
              closeOnEscape
              className={classNames(
                styles[`main-navigation-popup-${activePanelId}-panel`],
                {
                  [styles["has-avatar-button"]]:
                    activePanelId === "user" && user?.link.initials,
                },
              )}
            >
              <Stagger
                key={activePanelId}
                open={isPanelOpen}
                delay={0.3}
                onExitComplete={onExitComplete}
                onEnterComplete={onScaleComplete}
              >
                {panel && activePanelId === "cart" && (
                  <CartDropdown animated maxHeight {...panel} />
                )}
                {panel && activePanelId === "user" && (
                  <DropdownPanel animated maxHeight {...panel} />
                )}
              </Stagger>
            </FocusTrap>
          )}
        </AnchoredScale>
      );
    }

    return (
      <Grow
        reverseOnClose
        open={isPanelOpen}
        animation="gentle"
        className={styles["main-navigation-dropdown"]}
      >
        {(growDelay) => (
          <Stagger
            key={activePanelId}
            open={isPanelOpen}
            delay={growDelay - 0.15}
          >
            <FocusTrap
              active
              focus="arrowdown"
              closeOnEscape
              enableArrowKeyNavigation
              returnFocusOnDeactivate
            >
              <Grid>
                <Column
                  className={classNames(
                    styles["main-navigation-dropdown-column"],
                    {
                      [styles[`has-${columnCount}-columns`]]: columnCount > 0,
                    },
                  )}
                >
                  <div className={styles["main-navigation-dropdown-lists"]}>
                    {activeBranchLinks &&
                      activeBranchLinks.map((link, i) => (
                        <ul
                          key={i}
                          className={styles["main-navigation-dropdown-list"]}
                        >
                          <li
                            className={styles["main-navigation-dropdown-title"]}
                          >
                            <NavLink
                              {...link}
                              className={classNames({
                                [styles["main-navigation-link"]]: link.href,
                                [styles["main-navigation-button"]]:
                                  !link.href && link.onClick,
                                [styles["main-navigation-text"]]:
                                  !link.href && !link.onClick,
                              })}
                            >
                              <Paragraph as="span" size="xs">
                                {link.label}
                              </Paragraph>
                            </NavLink>
                          </li>
                          <li>
                            <ul
                              className={
                                styles["main-navigation-dropdown-sublist"]
                              }
                            >
                              {link.sublinks?.map((sublink, j) => (
                                <React.Fragment key={`${i}-${j}`}>
                                  <li
                                    className={
                                      styles["main-navigation-dropdown-item"]
                                    }
                                  >
                                    <NavLink
                                      {...sublink}
                                      className={classNames({
                                        [styles["main-navigation-link"]]:
                                          sublink.href,
                                        [styles["main-navigation-button"]]:
                                          !sublink.href && sublink.onClick,
                                        [styles["main-navigation-text"]]:
                                          !sublink.href && !sublink.onClick,
                                      })}
                                    >
                                      <Paragraph as="span" size="sm">
                                        {sublink.label}
                                      </Paragraph>
                                    </NavLink>
                                  </li>
                                  {activeBranch &&
                                    !activeBranchPromotions?.length &&
                                    activeBranchLinks.length > 0 &&
                                    activeBranchLinks.length - 1 === i &&
                                    link.sublinks &&
                                    link.sublinks.length - 1 === j && (
                                      <li>
                                        <Button
                                          as={
                                            activeBranch.href ? "a" : "button"
                                          }
                                          href={activeBranch.href}
                                          onClick={activeBranch.onClick}
                                          className={
                                            styles[
                                              `main-navigation-branch-${
                                                activeBranch?.href
                                                  ? "link"
                                                  : "button"
                                              }`
                                            ]
                                          }
                                          prominence="secondary"
                                          icon={{
                                            name: "arrow-right",
                                            position: "right",
                                          }}
                                        >
                                          {activeBranch.label}
                                        </Button>
                                      </li>
                                    )}
                                </React.Fragment>
                              ))}
                            </ul>
                          </li>
                        </ul>
                      ))}
                  </div>

                  {activeBranchPromotions &&
                    activeBranchPromotions.length > 0 && (
                      <Stagger
                        open
                        delay={growDelay}
                        animation="gentle"
                        className={styles["main-navigation-dropdown-promo"]}
                      >
                        {[
                          ...activeBranchPromotions.map((promo) => {
                            const { image, ...rest } = promo;
                            return (
                              <BannerCard
                                animated
                                key={promo.title}
                                palette={palette}
                                image={{ resizeMode: "contain", ...image }}
                                {...rest}
                              />
                            );
                          }),
                          <Button
                            as={activeBranch?.href ? "a" : "button"}
                            href={activeBranch?.href}
                            prominence="secondary"
                            key="promo-button"
                            icon={{ name: "arrow-right", position: "right" }}
                          >
                            {activeBranch?.label}
                          </Button>,
                        ]}
                      </Stagger>
                    )}
                </Column>
              </Grid>
            </FocusTrap>
          </Stagger>
        )}
      </Grow>
    );
  },
);
