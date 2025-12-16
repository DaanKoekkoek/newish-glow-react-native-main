import { useAllowedChildren } from "_global-hooks";
import { Background } from "_internals/Background";
import { Grid } from "foundations/Grid";
import React from "react";
import { type ViewStyle } from "react-native";
import { useStyles } from "react-native-unistyles";

import { stylesheet } from "./ShopSection.styles";
import type { ShopSectionProps } from "./ShopSection.types";
import IMAGES from "../Image/Image.mock";

export const ShopSection = ({
  children,
  variant = "default",
  paddingTop = "default",
  paddingBottom = "default",
  showSidepanel = true,
  glow = "Glow1",
  image = { localSrc: IMAGES["mid-hero"] },
  palette = "default",
}: ShopSectionProps) => {
  const { styles } = useStyles(stylesheet, {
    paddingTop: paddingTop === "default" ? undefined : paddingTop,
    paddingBottom: paddingBottom === "default" ? undefined : paddingBottom,
  });

  const containerChildren = useAllowedChildren(children, [
    ShopSection.Container,
  ]);
  const sideChildren = useAllowedChildren(children, [ShopSection.Sidebar]);
  const backgroundVariant = variant === "subtle" ? "default" : variant;

  return (
    <Background
      backgroundStyle={styles.background(variant, palette)}
      image={image}
      variant={backgroundVariant}
      glow={glow}
    >
      <Grid
        containerStyle={styles.gridContainer}
        rowStyle={styles.gridRow as ViewStyle}
      >
        <Grid.Column style={styles.main} mobileSmall={12} laptop={8}>
          {containerChildren}
        </Grid.Column>
        <Grid.Column style={styles.aside} mobileSmall={12} laptop={4}>
          {showSidepanel ? sideChildren : null}
        </Grid.Column>
      </Grid>
    </Background>
  );
};

const Container = ({
  children,
}: {
  children: React.ReactElement | React.ReactElement[];
}) => <>{children}</>;

ShopSection.Container = Container;
Container.displayName = "ShopSection.Container";

const Sidebar = ({
  children,
}: {
  children: React.ReactElement | React.ReactElement[];
}) => <>{children}</>;

ShopSection.Sidebar = Sidebar;
Sidebar.displayName = "ShopSection.Sidebar";
