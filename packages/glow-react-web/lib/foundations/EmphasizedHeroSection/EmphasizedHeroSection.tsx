import React from "react";
import styles from "./EmphasizedHeroSection.module.scss";
import classNames from "classnames";
import { Column, GlowGradient, Grid, Section } from "foundations/index";
import type { EmphasizedHeroSectionProps } from "./EmphasizedHeroSection.types";
import { EmphasizedHeroProps } from "components/EmphasizedHero";

export const EmphasizedHeroSection = ({
  children,
  custom,
  order = "default",
  palette = "default",
  background = "default",
  testID = "emphasized-hero-section",
}: EmphasizedHeroSectionProps) => (
  <Section
    testID={testID}
    palette={palette}
    variant={
      background === "emphasised" ||
      background === "subtle" ||
      background === "default"
        ? background
        : undefined
    }
    paddingTop="none"
    className={classNames(styles["emphasised-hero"], {
      [styles["is-emphasised"]]: background === "emphasised",
    })}
  >
    <div
      data-testid={`${testID}-container`}
      className={classNames(styles["emphasised-hero-container"], {
        [styles["is-inverted"]]: order === "inverted",
      })}
    >
      {background === "custom" && !!custom && custom}
      {background === "default" && (
        <Grid
          testID="grid-gradient"
          gridClassName={styles["emphasised-gradient-grid"]}
          containerClassName={styles["emphasised-gradient-container"]}
          direction={order === "inverted" ? "row-reverse" : "row"}
        >
          <Column
            size={{ mobileSmall: 12, tablet: 9 }}
            className={styles["emphasised-gradient-column"]}
          >
            <GlowGradient
              preserveAspectRatio="none"
              zIndex={1}
              className={classNames(
                styles["emphasised-gradient"],
                styles["emphasised-gradient-left"],
              )}
              palette={palette}
            />
          </Column>
          <Column
            size={{ mobileSmall: 12, tablet: 3 }}
            className={styles["emphasised-gradient-column"]}
          >
            <GlowGradient
              preserveAspectRatio="none"
              zIndex={1}
              className={classNames(
                styles["emphasised-gradient"],
                styles["emphasised-gradient-right"],
              )}
              palette={palette}
            />
          </Column>
        </Grid>
      )}
      <div className={styles["emphasised-children"]}>
        {React.Children.map(children, (child, index) => {
          if (!isEmphasizedHeroElement(child)) return child;
          return React.cloneElement(child, {
            key: `emphasized-hero-${index}`,
            background,
            order,
            palette,
          });
        })}
      </div>
    </div>
  </Section>
);

const isEmphasizedHeroElement = (
  element: React.ReactNode,
): element is React.ReactElement<EmphasizedHeroProps> =>
  React.isValidElement(element) &&
  typeof element.props === "object" &&
  element.props !== null &&
  "heading" in element.props; // required prop
