import { Section, Grid, Column } from "foundations/index";
import classNames from "classnames";
import type { ShopSectionProps } from "./ShopSection.types";

import styles from "./ShopSection.module.scss";
import { tokenClassNames } from "_utility";

export const ShopSection = ({
  children,
  aside,
  above,
  testID = "shop-section",
  paddingTop = "default",
  ...props
}: ShopSectionProps) => {
  return (
    <Section
      {...props}
      type="shop"
      testID={testID}
      className={tokenClassNames(
        styles,
        "shop-section",
        styles[`shop-section-padding-${paddingTop}`],
      )}
    >
      {!!above && (
        <Grid>
          <Column>{above}</Column>
        </Grid>
      )}
      <Grid gridClassName={styles["shop-section-grid"]}>
        <Column
          className={classNames(
            styles["shop-section-column"],
            styles["shop-section-main"],
          )}
          size={{ mobileSmall: 12, laptop: aside ? 8 : 12 }}
        >
          {children}
        </Column>
        {!!aside && (
          <Column
            size={{ mobileSmall: 12, laptop: 4 }}
            className={classNames(
              styles["shop-section-column"],
              styles["shop-section-sidebar"],
            )}
          >
            <div className={styles["shop-section-sidebar-sticky"]}>{aside}</div>
          </Column>
        )}
      </Grid>
    </Section>
  );
};
