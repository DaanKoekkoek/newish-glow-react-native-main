import { useAllowedChildren, usePropAcrossBreakpoints } from "_global-hooks";
import { Background } from "_internals/Background";
import type { BreakpointKeys } from "_theming/breakpoints";
import { Grid, Heading } from "foundations/index";
import React from "react";
import { View } from "react-native";
import { useStyles, UnistylesRuntime } from "react-native-unistyles";

import { mySectionStyles } from "./MySection.styles";
import type {
  MySectionProps,
  MySectionGridProps,
  MySectionTitleProps,
  MySectionPaddingPerBreakpoint,
} from "./MySection.types";

const MySection = ({
  children,
  paddingTop = "default",
  image,
  variant = "default",
  palette = "default",
  glow,
}: MySectionProps) => {
  const breakpoint = UnistylesRuntime.breakpoint as BreakpointKeys;
  const sectionTopPaddingValue: MySectionPaddingPerBreakpoint =
    usePropAcrossBreakpoints(paddingTop);

  const { styles } = useStyles(mySectionStyles, {
    paddingTop:
      sectionTopPaddingValue[breakpoint] === "default" ? undefined : "none",
    hasImage: !!image && variant === "image",
  });

  const allowedChildren = useAllowedChildren(children, [MySection.Container]);

  return (
    <Background
      backgroundStyle={styles.background(
        variant,
        palette,
        sectionTopPaddingValue[breakpoint] ?? "default",
      )}
      image={image}
      variant={variant}
      glow={glow}
    >
      <View
        style={[
          styles.section,
          !!image && variant === "image" && styles.backgroundOffset,
        ]}
      >
        {allowedChildren}
      </View>
    </Background>
  );
};

const Container = ({ children }: MySectionProps) => {
  const { styles } = useStyles(mySectionStyles);
  const allowedChildren = useAllowedChildren(children, [
    MySection.Grid,
    MySection.Title,
  ]);

  return (
    <View style={styles.container}>
      {React.Children.map(allowedChildren, (child, index) => {
        return <React.Fragment key={index}>{child}</React.Fragment>;
      })}
    </View>
  );
};

MySection.Container = Container;
Container.displayName = "MySection.Container";

const MyGrid = ({ children, ...props }: MySectionGridProps) => {
  const { styles } = useStyles(mySectionStyles);
  return (
    <Grid {...props} variant="narrow" rowStyle={styles.row}>
      {React.Children.map(children, (child, index) => (
        <Grid.Column key={index}>{child}</Grid.Column>
      ))}
    </Grid>
  );
};

MySection.Grid = MyGrid;
MyGrid.displayName = "MySection.Grid";

const Title = ({ size = "md", as = "h2", children }: MySectionTitleProps) => {
  const { styles } = useStyles(mySectionStyles);
  return (
    <Grid variant="narrow" rowStyle={styles.row}>
      <Grid.Column>
        <Heading size={size} as={as}>
          {children}
        </Heading>
      </Grid.Column>
    </Grid>
  );
};

MySection.Title = Title;
Title.displayName = "MySection.Title";

export { MySection };
