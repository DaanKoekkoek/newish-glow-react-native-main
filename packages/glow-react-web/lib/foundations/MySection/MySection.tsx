import classNames from "classnames";
import { Heading, type HeadingRenderType } from "foundations/Heading";
import type {
  MySectionProps,
  MySectionGridProps,
  MySectionTitle,
} from "./MySection.types";

import styles from "./MySection.module.scss";
import { Column, Grid, Section } from "foundations/index";
import React from "react";
import { tokenClassNames } from "_utility";

const titleSizeMap: Record<MySectionTitle["size"], HeadingRenderType> = {
  xl: "h1",
  lg: "h2",
  md: "h3",
} as const;

export const MySection = ({
  children,
  className,
  image,
  paddingTop = true,
  palette = "default",
  title,
  testID = "my-section",
  variant = "default",
  ...props
}: MySectionProps) => (
  <Section
    type="my"
    {...props}
    palette={palette}
    image={image}
    variant={variant}
    paddingTop={paddingTop ? "default" : "none"}
    testID={testID}
    className={tokenClassNames(
      styles,
      "my-section",
      {
        [styles["is-emphasised"]]: variant === "emphasised",
        [styles["has-no-padding-top"]]: !paddingTop,
      },
      className,
    )}
  >
    {!!title && !!title.text && (
      <Grid
        containerClassName={classNames(
          styles["my-section-title"],
          styles["my-section-container"],
          {
            [styles["has-no-padding-top"]]: !paddingTop,
          },
        )}
      >
        <Column>
          <Heading as={title.as || titleSizeMap[title.size]} size={title.size}>
            {title.text}
          </Heading>
        </Column>
      </Grid>
    )}
    {children}
  </Section>
);

export const MySectionGrid = ({
  children,
  columnSize = 12,
  direction,
}: MySectionGridProps) => {
  return (
    <Grid
      columnSize={columnSize}
      direction={direction}
      containerClassName={styles["my-section-container"]}
      gridClassName={styles["my-section-grid"]}
    >
      {React.Children.map(children, (child, index) => (
        <Column key={index}>{child}</Column>
      ))}
    </Grid>
  );
};
