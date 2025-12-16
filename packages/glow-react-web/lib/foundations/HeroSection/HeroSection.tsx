import React from "react";
import styles from "./HeroSection.module.scss";
import {
  Grid,
  Column,
  Section,
  Heading,
  Paragraph,
  Stack,
} from "foundations/index";
import { HeroSectionProps } from "./HeroSection.types";
import { HeroProps } from "components/Hero";
import { tokenClassNames } from "_utility";

export const HeroSection = ({
  children,
  title,
  description,
  paddingTop = "default",
  palette = "default",
}: HeroSectionProps) => {
  const isArrayPalette = Array.isArray(palette);
  const paletteColor = isArrayPalette ? palette[0] : palette;

  return (
    <Section
      paddingTop={paddingTop}
      className={tokenClassNames(
        styles,
        "hero-section",
        styles[`has-palette-${paletteColor}`],
      )}
      palette={paletteColor}
    >
      {(!!title || !!description) && (
        <Grid width="narrow">
          <Column>
            <Stack gap={150}>
              {!!title && (
                <Heading
                  highlightClassName={styles["hero-section-title-highlight"]}
                  as="h2"
                  size="xl"
                >
                  {title}
                </Heading>
              )}
              {React.isValidElement(description) ? (
                description
              ) : (
                <Paragraph size="lg">{description}</Paragraph>
              )}
            </Stack>
          </Column>
        </Grid>
      )}
      {React.Children.map(children, (child, index) => {
        if (!isHeroElement(child)) return null;

        const childPalette = isArrayPalette
          ? (palette[index] ?? "default")
          : palette;

        return (
          <Grid key={index}>
            <Column>
              {React.cloneElement(child, {
                key: `hero-${index}`,
                order: index % 2 === 0 ? "inverted" : "default",
                palette: childPalette,
                ...child.props,
              } as HeroProps)}
            </Column>
          </Grid>
        );
      })}
    </Section>
  );
};

const isHeroElement = (
  element: React.ReactNode,
): element is React.ReactElement<HeroProps> =>
  React.isValidElement(element) &&
  typeof element.props === "object" &&
  element.props !== null &&
  "heading" in element.props; // required prop

HeroSection.displayName = "HeroSection";
