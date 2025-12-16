import { useThemeProviderContext } from "components/index";
import { Icon, Grid } from "foundations/index";
import React from "react";
import { View } from "react-native";
import { useStyles } from "react-native-unistyles";

import { FooterStyles } from "./Footer.styles";
import type { FooterBreadcrumbProps } from "./Footer.types";
import { FooterContext } from "./FooterContext";

const FooterBreadcrumbs = ({ children }: FooterBreadcrumbProps) => {
  const { styles } = useStyles(FooterStyles);
  const { brand } = useThemeProviderContext();

  return (
    <FooterContext.Provider value={{ molecule: "breadcrumbs" }}>
      <Grid>
        <Grid.Column style={styles.footerBreadcrumb}>
          {React.Children.map(children, (child, index) => {
            const isLastChild = index === React.Children.count(children) - 1;
            return (
              <React.Fragment key={index}>
                <View>{child}</View>
                {!isLastChild && (
                  <Icon
                    brand={brand !== "simpel" ? brand : undefined}
                    name="chevron-right"
                    size="sm"
                  />
                )}
              </React.Fragment>
            );
          })}
        </Grid.Column>
      </Grid>
    </FooterContext.Provider>
  );
};
FooterBreadcrumbs.displayName = "Footer.Breadcrumbs";

export { FooterBreadcrumbs };
