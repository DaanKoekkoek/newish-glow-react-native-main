import { Footer as ExpoFooter, Nav } from "@expo/html-elements";
import { useAllowedChildren } from "_global-hooks";
import {
  TextLink,
  useThemeProviderContext,
  type TextLinkProps,
} from "components/index";
import {
  Icon,
  type IconProps,
  Grid,
  Paragraph,
  StoreButton,
  Logos,
  type StoreButtonProps,
} from "foundations/index";
import React from "react";
import { View } from "react-native";
import { useStyles } from "react-native-unistyles";

import { FooterStyles } from "./Footer.styles";
import type {
  FooterGridProps,
  FooterProps,
  FooterBottomProps,
} from "./Footer.types";
import { FooterBreadcrumbs } from "./FooterBreadcrumb";
import { FooterContext, useFooterContext } from "./FooterContext";
import { FooterGrid } from "./FooterGrid";

const Footer = ({ children }: FooterProps) => {
  const { styles } = useStyles(FooterStyles);

  const breadcrumbChildren = useAllowedChildren(children, [Footer.Breadcrumbs]);
  const topBottomChildren = useAllowedChildren(children, [
    Footer.Top,
    Footer.Bottom,
  ]);

  return (
    <>
      <Nav>{breadcrumbChildren}</Nav>
      <ExpoFooter style={styles.footer}>{topBottomChildren}</ExpoFooter>
    </>
  );
};
Footer.displayName = "Footer";

const FooterTop = ({ children }: FooterProps) => {
  const { styles } = useStyles(FooterStyles);
  const allowedChildren = useAllowedChildren(children, [Footer.Grid]);
  return (
    <View style={styles.footerTop} testID="footer-top">
      {allowedChildren}
    </View>
  );
};
FooterTop.displayName = "Footer.Top";

const FooterBottom = ({ children, copyright }: FooterBottomProps) => {
  const { styles } = useStyles(FooterStyles);
  const allowedChildren = useAllowedChildren(children, [
    Footer.Grid,
    Footer.Assorted,
  ]);
  return (
    <View style={styles.footerBottom} testID="footer-bottom">
      {allowedChildren}
      <Grid>
        <Grid.Column style={styles.footerCopyrightContainer}>
          {React.isValidElement(copyright) ? (
            copyright
          ) : (
            <Paragraph style={styles.footerCopyRight} size="xs">
              {copyright}
            </Paragraph>
          )}
        </Grid.Column>
      </Grid>
    </View>
  );
};
FooterBottom.displayName = "Footer.Bottom";

const Assorted = ({ children }: FooterGridProps) => {
  const { styles } = useStyles(FooterStyles);
  return (
    <FooterContext.Provider value={{ molecule: "default", atom: "assorted" }}>
      <Grid>
        <Grid.Column style={styles.footerAssorted}>{children}</Grid.Column>
      </Grid>
    </FooterContext.Provider>
  );
};
Assorted.displayName = "Footer.Assorted";

const AppStores = ({ children }: FooterProps) => {
  const { styles } = useStyles(FooterStyles);
  return <View style={styles.footerAppStores}>{children}</View>;
};
AppStores.displayName = "Footer.AppStores";

const AppStore = ({ ...props }: StoreButtonProps) => {
  return <StoreButton {...props} variant="inverted" prominence="secondary" />;
};
AppStore.displayName = "Footer.AppStore";

const Socials = ({ children }: FooterProps) => {
  const { styles } = useStyles(FooterStyles);
  return <View style={styles.footerSocials}>{children}</View>;
};
Socials.displayName = "Footer.Socials";

const Logo = () => <Logos variant="inverted" />;
Logo.displayName = "Footer.Logo";

const FooterLink = ({ ...props }: TextLinkProps) => {
  const { molecule, atom } = useFooterContext();
  const { styles } = useStyles(FooterStyles, {
    grid: molecule === "default" ? undefined : "breadcrumbs",
  });

  return (
    <TextLink
      {...props}
      textStyle={styles.footerLink}
      style={styles.footerLink}
      size={atom === "assorted" ? "xs" : "sm"}
    />
  );
};
FooterLink.displayName = "Footer.Link";

const FooterIcon = ({ ...props }: IconProps) => {
  const { styles } = useStyles(FooterStyles);
  const { brand } = useThemeProviderContext();

  return (
    <Icon
      solid
      {...props}
      style={styles.footerIcon}
      brand={brand !== "simpel" ? brand : undefined}
      size="md"
    />
  );
};
FooterIcon.displayName = "Footer.Icon";

Footer.Top = FooterTop;
Footer.Bottom = FooterBottom;
Footer.Grid = FooterGrid;
Footer.Breadcrumbs = FooterBreadcrumbs;
Footer.Assorted = Assorted;
Footer.AppStores = AppStores;
Footer.AppStore = AppStore;
Footer.Socials = Socials;
Footer.Logo = Logo;
Footer.Link = FooterLink;
Footer.Icon = FooterIcon;

export { Footer };
