import React, { useMemo, useEffect } from "react";
import classNames from "classnames";
import { Fade, Grow, Slide, Stagger } from "_internals/Animation";
import { NavIcon, FocusTrap, Avatar } from "_internals/Navigation";
import { BannerCard } from "_internals/Card";
import { Visible } from "utilities/Visibility";
import { useMobileNavigation } from "./hooks";
import type {
  MainNavigationTree,
  MainNavigationAdditions,
  MainNavigationAriaLabel,
  MainNavigationMoveLogo,
  BranchId,
} from "./MainNavigation.types";
import { Heading } from "foundations/Heading";
import { Paragraph } from "foundations/Paragraph";
import { Icon } from "foundations/Icon";
import { Divider } from "components/Divider";
import { Button } from "components/Button";
import { NavSearch } from "./_MainNavigation.search";
import { OdidoPalette } from "_internals/Color";
import { NavLink } from "./_MainNavigation.link";
import styles from "./styles/MainNavigation.module.scss";
import { debounce } from "_utility";

type NavMobileProps = MainNavigationAdditions & {
  navigationTree?: MainNavigationTree[];
  palette?: OdidoPalette;
  onMoveLogo: (moveLogo: MainNavigationMoveLogo) => void;
};

export const NavMobile = React.memo(
  React.forwardRef<HTMLDivElement, NavMobileProps>(
    (
      {
        cart,
        user,
        search,
        navigationTree,
        ariaLabel,
        palette,
        routeKey,
        onMoveLogo,
      },
      ref,
    ) => {
      const {
        activeLevel,
        activeBranchId,
        growOffsetTop,
        isClosingMenu,
        isMenuOpen,
        isSearchOpen,
        openBranch,
        openSearch,
        closeSearch,
        returnToTopLevel,
        toggleMenu,
      } = useMobileNavigation({
        externalControlsRef: ref,
        searchOpen: search?.open,
        routeKey: routeKey,
      });

      useEffect(() => {
        onMoveLogo({ search: isSearchOpen, level: activeLevel === 2 });

        const handleResize = debounce(() => {
          if (window.innerWidth >= 700) {
            onMoveLogo(false);
          } else {
            onMoveLogo({ search: isSearchOpen, level: activeLevel === 2 });
          }
        }, 100);

        window.addEventListener("resize", handleResize);

        return () => {
          window.removeEventListener("resize", handleResize);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [isSearchOpen, activeLevel]);

      const activeBranch = useMemo(() => {
        if (!activeBranchId) return undefined;
        return navigationTree?.find((b) => b.id === activeBranchId.id);
      }, [navigationTree, activeBranchId]);

      return (
        <>
          {search && (
            <>
              <Fade
                testID="backdrop"
                open={isSearchOpen}
                reverseOnExit
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
              <Fade
                open={isSearchOpen}
                reverseOnExit
                className={classNames(
                  styles["main-navigation-search"],
                  styles["is-mobile"],
                )}
                testID="search-box-mobile"
                zIndex={9999}
              >
                {({ fadeCompleted }) => (
                  <FocusTrap active={fadeCompleted} focus="mount">
                    <NavSearch
                      open={fadeCompleted}
                      onClose={closeSearch}
                      ariaLabel={ariaLabel}
                      {...search}
                    />
                  </FocusTrap>
                )}
              </Fade>
            </>
          )}

          <Visible
            as="div"
            below="laptop"
            className={styles["main-navigation-mobile"]}
          >
            <Slide
              index={0}
              animation="fast"
              direction="top"
              reverseOnExit
              offsetY={activeLevel === 2 ? -20 : 0}
            >
              <>
                <ul className={styles["main-navigation-mobile-actions"]}>
                  {user && user.link && (
                    <li>
                      <NavLink
                        {...user.link}
                        className={styles["main-navigation-user-link"]}
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
                          <NavIcon badgeStatus={user.link.badge} />
                        )}
                      </NavLink>
                    </li>
                  )}

                  {search && (
                    <li>
                      <button
                        type="button"
                        onClick={openSearch}
                        className={styles["main-navigation-search-open-button"]}
                        aria-label={
                          isSearchOpen
                            ? ariaLabel?.search.close
                            : ariaLabel?.search.open
                        }
                      >
                        <Icon name="search" />
                      </button>
                    </li>
                  )}

                  {cart?.link && (
                    <li>
                      <NavLink
                        {...cart.link}
                        className={styles["main-navigation-cart-link"]}
                      >
                        <NavIcon type="cart" badgeStatus={cart.link.badge} />
                      </NavLink>
                    </li>
                  )}

                  {navigationTree && navigationTree.length > 0 && (
                    <li>
                      <button
                        type="button"
                        className={classNames(
                          styles["main-navigation-dropdown-toggle-button"],
                          { [styles["is-expanded"]]: isMenuOpen },
                        )}
                        onClick={toggleMenu}
                        aria-expanded={isMenuOpen}
                        aria-label={
                          isMenuOpen
                            ? ariaLabel?.menu.close
                            : ariaLabel?.menu.open
                        }
                      >
                        <Icon name="menu" />
                        <Icon name="close" />
                      </button>
                    </li>
                  )}
                </ul>
              </>
            </Slide>

            <Grow
              animateOpacity={activeLevel === 2}
              reverseOnClose
              open={isMenuOpen}
              animation="gentle"
              className={styles["main-navigation-mobile-dropdown"]}
              offset={{ top: growOffsetTop }}
            >
              <Slide
                index={0}
                animation={activeLevel === 1 ? "gentle" : "fast"}
                shouldAnimate={!!activeBranchId}
                direction="bottom"
                reverseOnExit
                className={styles["main-navigation-mobile-slides"]}
              >
                {(slideDelay) => [
                  <FocusTrap
                    key="level-1"
                    active={activeLevel === 1}
                    focus="arrowdown"
                    enableArrowKeyNavigation
                    closeOnEscape
                    className={styles["main-navigation-mobile-slide-1"]}
                  >
                    <Stagger
                      as="ul"
                      delay={slideDelay}
                      open={!activeBranchId && !isClosingMenu}
                      className={styles["main-navigation-dropdown-list"]}
                    >
                      {navigationTree &&
                        navigationTree.map((branch) => (
                          <MobileNavItem
                            key={branch.id}
                            branch={branch}
                            openBranch={
                              branch.links && branch.links.length > 0
                                ? openBranch
                                : undefined
                            }
                            activeBranch={activeBranchId}
                          />
                        ))}
                    </Stagger>
                  </FocusTrap>,

                  <FocusTrap
                    key="level-2"
                    active={activeLevel === 2}
                    focus="arrowdown"
                    enableArrowKeyNavigation
                    closeOnEscape
                    className={styles["main-navigation-mobile-slide-2"]}
                  >
                    <Stagger
                      delay={slideDelay}
                      reverseOnClose
                      open={activeLevel === 2}
                    >
                      <div
                        className={
                          styles["main-navigation-mobile-slide-2-actions"]
                        }
                      >
                        <button
                          type="button"
                          className={
                            styles[
                              "main-navigation-mobile-slide-2-action-back-button"
                            ]
                          }
                          onClick={() =>
                            returnToTopLevel(() => openBranch(null))
                          }
                          aria-label={ariaLabel?.menu.return}
                        >
                          <Icon name="arrow-left" />
                        </button>
                        <Heading
                          as="div"
                          size="md"
                          className={
                            styles[
                              "main-navigation-mobile-slide-2-action-title"
                            ]
                          }
                        >
                          {activeBranch && activeBranch.label}
                        </Heading>
                        <button
                          className={classNames(
                            styles["main-navigation-dropdown-toggle-button"],
                            { [styles["is-expanded"]]: isMenuOpen },
                          )}
                          type="button"
                          onClick={toggleMenu}
                          aria-expanded={isMenuOpen}
                          aria-label={
                            isMenuOpen
                              ? ariaLabel?.menu.close
                              : ariaLabel?.menu.open
                          }
                        >
                          <Icon name="menu" />
                          <Icon name="close" />
                        </button>
                      </div>

                      {activeBranch &&
                        activeBranch.links &&
                        activeBranch.links.map((link, i) => (
                          <Stagger
                            as="ul"
                            open={!!activeBranch}
                            reverseOnClose
                            delay={slideDelay}
                            key={i}
                            className={classNames(
                              styles["main-navigation-dropdown-list"],
                              {
                                [styles["has-one-list-only"]]:
                                  activeBranch.links &&
                                  activeBranch.links.length === 1,
                              },
                            )}
                          >
                            <div
                              className={
                                styles["main-navigation-dropdown-title"]
                              }
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
                            </div>

                            {link.sublinks && link.sublinks.length > 0 && (
                              <ul
                                className={
                                  styles["main-navigation-dropdown-sublist"]
                                }
                              >
                                {link.sublinks.map((sublink, j) => (
                                  <li
                                    key={j}
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
                                        <span>{sublink.label}</span>
                                        {(sublink.href || sublink.onClick) && (
                                          <Icon
                                            name="chevron-right"
                                            size="sm"
                                          />
                                        )}
                                      </Paragraph>
                                    </NavLink>
                                    {link.sublinks &&
                                      j < link.sublinks.length - 1 && (
                                        <Divider prominence="subtle" />
                                      )}
                                  </li>
                                ))}
                              </ul>
                            )}

                            {activeBranch.links &&
                              i === activeBranch.links.length - 1 && (
                                <Button
                                  fill={{ mobileSmall: true, tablet: false }}
                                  as={activeBranch.href ? "a" : "button"}
                                  href={activeBranch.href}
                                  onClick={activeBranch.onClick}
                                  className={
                                    styles[
                                      `main-navigation-branch-${
                                        activeBranch.href ? "link" : "button"
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
                              )}
                          </Stagger>
                        ))}

                      {activeBranch &&
                        activeBranch.promotions &&
                        activeBranch.promotions?.length > 0 && (
                          <Stagger
                            open={!!activeBranch}
                            reverseOnClose
                            delay={slideDelay}
                            animation="gentle"
                            className={styles["main-navigation-dropdown-promo"]}
                          >
                            {activeBranch.promotions.map((promo) => {
                              const { image, ...rest } = promo;
                              return (
                                <BannerCard
                                  key={promo.title}
                                  palette={palette}
                                  image={{
                                    resizeMode: "contain",
                                    ratio: "3/1",
                                    ...image,
                                  }}
                                  {...rest}
                                  direction="vertical"
                                />
                              );
                            })}
                          </Stagger>
                        )}
                    </Stagger>
                  </FocusTrap>,
                ]}
              </Slide>
            </Grow>
          </Visible>
        </>
      );
    },
  ),
);

type MobileNavItemProps = {
  branch: MainNavigationTree;
  activeBranch: BranchId | null;
  openBranch?: (id: BranchId) => void;
  ariaLabel?: MainNavigationAriaLabel;
};

const MobileNavItem = React.memo(
  ({ branch, openBranch, activeBranch }: MobileNavItemProps) => {
    if (openBranch) {
      return (
        <button
          type="button"
          aria-haspopup="true"
          aria-expanded={activeBranch?.id === branch.id}
          onClick={() => openBranch({ id: branch.id })}
          className={styles["main-navigation-button"]}
        >
          <Heading
            size="lg"
            as="span"
            className={styles["main-navigation-button-heading"]}
          >
            {branch.label}
          </Heading>
        </button>
      );
    }

    if (branch.href) {
      return (
        <a href={branch.href} className={styles["main-navigation-link"]}>
          <Heading
            size="lg"
            as="span"
            className={styles["main-navigation-button-heading"]}
          >
            {branch.label}
          </Heading>
        </a>
      );
    }

    return (
      <button
        type="button"
        onClick={branch.onClick}
        className={styles["main-navigation-button"]}
      >
        <Heading
          size="lg"
          as="span"
          className={styles["main-navigation-button-heading"]}
        >
          {branch.label}
        </Heading>
      </button>
    );
  },
);
