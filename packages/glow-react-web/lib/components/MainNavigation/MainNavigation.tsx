import { useRef, useState } from "react";
import classNames from "classnames";
import { BaseText } from "_internals/Typography";
import { Grid, Column } from "foundations/Grid";
import { AFM } from "foundations/Afm";
import { AgentBar } from "components/AgentBar";
import type {
  MainNavigationProps,
  MainNavigationMoveLogo,
} from "./MainNavigation.types";
import { NavDesktop } from "./_MainNavigation.desktop";
import { NavMobile } from "./_MainNavigation.mobile";
import { tokenClassNames } from "_utility";
import { useMergeRefs } from "_global-hooks";
import { NavLink } from "./_MainNavigation.link";
import styles from "./styles/MainNavigation.module.scss";

export const MainNavigation = ({
  navigationTree,
  search,
  cart,
  user,
  skip,
  logo,
  palette = "default",
  ariaLabel,
  metaLinks,
  variant = "default",
  layout = "default",
  afmBanner,
  sticky = false,
  status,
  customerService,
  testID = "main-navigation",
  agentBar,
  routeKey,
}: MainNavigationProps) => {
  const [moveLogo, setMoveLogo] = useState<MainNavigationMoveLogo>(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuForSearchRef = useRef<HTMLDivElement>(null);
  const mergedRefs = useMergeRefs(menuForSearchRef, menuRef);

  return (
    <nav
      data-testid={testID}
      className={tokenClassNames(
        styles,
        "main-navigation",
        styles[`main-navigation-palette-${palette}`],
        {
          [styles["is-sticky"]]: sticky,
          [styles["is-alternate-layout"]]: layout === "alternate",
        },
      )}
    >
      {variant === "default" ? (
        <>
          {afmBanner && (
            <div className={styles["main-navigation-afm-wrapper"]}>
              <Grid>
                <Column>
                  <AFM className={styles["main-navigation-afm"]} />
                </Column>
              </Grid>
            </div>
          )}
          {agentBar && (
            <AgentBar
              {...agentBar}
              className={styles["main-navigation-agent-bar"]}
            />
          )}
          {!!skip && (
            <BaseText
              as="a"
              href={skip.href}
              onClick={skip.onClick}
              className={styles["main-navigation-skip"]}
            >
              {skip.label}
            </BaseText>
          )}
          <div ref={mergedRefs}>
            {metaLinks && metaLinks.length > 0 && (
              <div className={styles["main-navigation-meta"]}>
                <Grid>
                  <Column>
                    <div className={styles["main-navigation-meta-links"]}>
                      {metaLinks.map((metaLink, index) => (
                        <NavLink
                          {...metaLink}
                          key={index}
                          className={classNames(
                            styles["main-navigation-meta-link"],
                            {
                              [styles["is-active"]]: metaLink.active,
                            },
                          )}
                        >
                          {metaLink.label}
                        </NavLink>
                      ))}
                    </div>
                  </Column>
                </Grid>
              </div>
            )}
            <div className={styles["main-navigation-bar"]}>
              <Grid>
                <Column
                  className={classNames(styles["main-navigation-content"], {
                    [styles["has-logo-only"]]:
                      !search && !navigationTree && !cart && !user,
                  })}
                >
                  <NavDesktop
                    routeKey={routeKey}
                    moveLogo={moveLogo}
                    variant={variant}
                    palette={palette}
                    ariaLabel={ariaLabel}
                    search={search}
                    logo={logo}
                    cart={cart}
                    user={user}
                    navigationTree={navigationTree}
                    ref={menuRef}
                    searchPortalRef={menuForSearchRef}
                  />
                  <NavMobile
                    routeKey={routeKey}
                    onMoveLogo={(val) => {
                      setMoveLogo(val);
                    }}
                    palette={palette}
                    ariaLabel={ariaLabel}
                    search={search}
                    cart={cart}
                    user={user}
                    navigationTree={navigationTree}
                    ref={menuRef}
                  />
                </Column>
              </Grid>
            </div>
          </div>
        </>
      ) : (
        <div>
          <Grid>
            <Column className={styles["main-navigation-content"]}>
              <NavDesktop
                variant={variant}
                ariaLabel={ariaLabel}
                logo={logo}
                status={status}
                customerService={customerService}
              />
            </Column>
          </Grid>
        </div>
      )}
    </nav>
  );
};
