import { LocalNavigationProps } from "./LocalNavigation.types";
import styles from "./LocalNavigation.module.scss";
import classNames from "classnames";
import { Heading } from "foundations/Heading";
import React, { ReactNode } from "react";
import { Paragraph } from "foundations/Paragraph";
import { ActionButton } from "./ActionButton";
import { ensureExhaustive, tokenClassNames } from "_utility";
import { Display } from "foundations/Display";
import { Section } from "foundations/Section";
import { Column, Grid } from "foundations/Grid";

export const LocalNavigation = ({
  titleSize = "default",
  prominence = "default",
  palette = "default",
  ...props
}: LocalNavigationProps) => {
  switch (props.variant) {
    case "compact":
      return (
        <Wrapper prominence={prominence} variant="compact" palette={palette}>
          {!!props.leftAction && (
            <Left
              leftAction={props.leftAction}
              prominence={prominence}
              variant={props.variant}
            />
          )}
          <Middle
            title={props.title}
            titleSize={titleSize}
            variant={props.variant}
          />
          {!!props.rightAction && (
            <Right
              rightAction={props.rightAction}
              prominence={prominence}
              variant={props.variant}
            />
          )}
        </Wrapper>
      );
    case "default":
      return props.leftAction || props.rightAction ? (
        <Wrapper prominence={prominence} variant="default" palette={palette}>
          {!!props.leftAction && (
            <Left
              leftAction={props.leftAction}
              prominence={prominence}
              variant={props.variant}
            />
          )}
          <Middle
            paragraph={props.paragraph}
            paragraphClassName={props.paragraphClassName}
            title={props.title}
            titleSize={titleSize}
            variant={props.variant}
          />
          {!!props.rightAction && (
            <Right
              rightAction={props.rightAction}
              prominence={prominence}
              variant={props.variant}
            />
          )}
        </Wrapper>
      ) : (
        <Wrapper prominence={prominence} variant="default" palette={palette}>
          <Middle
            paragraph={props.paragraph}
            paragraphClassName={props.paragraphClassName}
            title={props.title}
            titleSize={titleSize}
            variant={props.variant}
          />
        </Wrapper>
      );
    default:
      return ensureExhaustive(props);
  }
};

const Wrapper = ({
  children,
  prominence,
  variant,
  palette,
}: {
  children: ReactNode;
  prominence: LocalNavigationProps["prominence"];
  variant: LocalNavigationProps["variant"];
  palette: LocalNavigationProps["palette"];
}) => (
  <Section
    as="nav"
    variant={prominence}
    palette={palette}
    className={tokenClassNames(
      styles,
      "local-navigation",
      styles[`local-navigation-prominence-${prominence}`],
    )}
  >
    <Grid>
      <Column>
        <div
          className={classNames(styles["local-navigation-variant"], {
            [styles["local-navigation-variant-compact"]]: variant === "compact",
            [styles["local-navigation-variant-default"]]:
              variant === "default" && React.Children.count(children) > 1,
            [styles["local-navigation-variant-no-actions"]]:
              variant === "default" && React.Children.count(children) === 1,
          })}
        >
          {children}
        </div>
      </Column>
    </Grid>
  </Section>
);

const Left = ({
  leftAction,
  prominence,
  variant,
}: {
  leftAction: LocalNavigationProps["leftAction"];
  prominence: LocalNavigationProps["prominence"];
  variant: LocalNavigationProps["variant"];
}) => (
  <div
    className={classNames(
      styles["local-navigation-action"],
      styles["local-navigation-action-left"],
    )}
  >
    <ActionButton
      action={leftAction}
      position="left"
      prominence={prominence}
      variant={variant}
    />
  </div>
);

const Middle = ({
  paragraph,
  paragraphClassName,
  variant,
  title,
  titleSize,
}: Pick<LocalNavigationProps, "variant" | "title" | "titleSize"> & {
  paragraph?: string;
  paragraphClassName?: string;
}) => (
  <div className={classNames(styles["local-navigation-middle"])}>
    {title && (
      <>
        {variant === "default" && titleSize === "lg" ? (
          <Display>{title}</Display>
        ) : (
          <Heading
            as="h1"
            alignment={variant === "compact" ? "center" : "left"}
            className={classNames(styles["local-navigation-title"], {
              [styles[`local-navigation-title-size-${titleSize}`]]:
                variant === "compact",
            })}
            size={
              variant === "default" && titleSize === "default"
                ? "xl"
                : variant === "compact" && titleSize === "default"
                  ? "sm"
                  : "md"
            }
          >
            {title}
          </Heading>
        )}
      </>
    )}
    {paragraph ? (
      <Paragraph className={paragraphClassName}>{paragraph}</Paragraph>
    ) : null}
  </div>
);

const Right = ({
  rightAction,
  prominence,
  variant,
}: {
  rightAction: LocalNavigationProps["rightAction"];
  prominence: LocalNavigationProps["prominence"];
  variant: LocalNavigationProps["variant"];
}) => (
  <div
    className={classNames(
      styles["local-navigation-action"],
      styles["local-navigation-action-right"],
    )}
  >
    <ActionButton
      action={rightAction}
      position="right"
      prominence={prominence}
      variant={variant}
    />
  </div>
);
