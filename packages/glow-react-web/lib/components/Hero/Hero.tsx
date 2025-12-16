import React from "react";
import type { HeroProps } from "./Hero.types";
import classNames from "classnames";
import styles from "./Hero.module.scss";
import { Visual } from "_internals/Assets";
import { LargeSticker } from "components/LargeSticker";
import { Paragraph } from "foundations/Paragraph";
import { Heading, HeadingSize } from "foundations/Heading";
import { Visible } from "utilities/Visibility";
import { tokenClassNames } from "_utility";

export const Hero = ({
  sticker,
  palette = "default",
  variant = "default",
  layout = "default",
  order = "default",
  size = "default",
  visual,
  heading,
  children,
  footnote,
  callToAction,
  testID = "hero",
}: HeroProps) => {
  const headingSize: { title: HeadingSize; subTitle: HeadingSize } =
    heading?.size === "default" || !heading?.size
      ? { title: "xl", subTitle: "lg" }
      : { title: "lg", subTitle: "md" };

  const shouldRenderStickerBefore =
    !!sticker && variant === "solid" && order === "inverted";
  const shouldRenderStickerAfter =
    !!sticker && variant === "solid" && order === "default";
  const shouldRenderVisualInside = !!visual && variant === "solid";
  const shouldRenderVisualOutside = !!visual && variant === "default";

  return (
    <div
      data-testid={testID}
      className={tokenClassNames(
        styles,
        "hero",
        styles[`has-palette-${palette}`],
        styles[`is-variant-${variant}`],
        {
          [styles[`is-layout-${layout}`]]: layout !== "default",
          [styles["is-order-inverted"]]: order === "inverted",
          [styles["hero-size-compact"]]: size === "compact",
        },
      )}
    >
      {heading ? (
        <>
          {shouldRenderStickerBefore && (
            <Visible above="laptop">
              <HeroSticker
                {...sticker}
                testID={`${testID}-sticker`}
                palette={palette}
              />
            </Visible>
          )}
          <div className={classNames(styles["hero-content"])}>
            <div className={styles["hero-content-copy"]}>
              <div className={styles["hero-content-copy-title"]}>
                <Heading
                  highlightClassName={
                    styles["hero-content-copy-title-highlight"]
                  }
                  testID={`${testID}-heading-title`}
                  size={headingSize.title}
                  as="h3"
                >
                  {heading.title}
                </Heading>
                <Heading
                  highlightClassName={
                    styles["hero-content-copy-title-highlight"]
                  }
                  testID={`${testID}-heading-subtitle`}
                  size={headingSize.subTitle}
                  as="h4"
                >
                  {heading.subTitle}
                </Heading>
              </div>
              {!!children && (
                <div className={styles["hero-content-copy-description"]}>
                  {React.isValidElement(children) ||
                  React.Children.count(children) > 1 ? (
                    children
                  ) : (
                    <Paragraph testID={`${testID}-description`}>
                      {children}
                    </Paragraph>
                  )}
                </div>
              )}
              {!!callToAction && (
                <div className={styles["hero-content-copy-cta"]}>
                  {callToAction}
                </div>
              )}
              {!!footnote && (
                <div className={styles["hero-content-copy-footnote"]}>
                  {React.isValidElement(footnote) ? (
                    footnote
                  ) : (
                    <Paragraph testID={`${testID}-footnote`} size="sm">
                      {footnote}
                    </Paragraph>
                  )}
                </div>
              )}
            </div>
            {shouldRenderVisualInside && (
              <HeroImage
                {...visual}
                testID={`${testID}-inner-image`}
                sticker={sticker}
                palette={palette}
                variant={variant}
                className={styles["hero-content-image"]}
              />
            )}
          </div>
          {shouldRenderVisualOutside && (
            <HeroImage
              {...visual}
              testID={`${testID}-image`}
              sticker={sticker}
              palette={palette}
              variant={variant}
            />
          )}
          {shouldRenderStickerAfter && (
            <Visible above="laptop" className={styles["hero-sticker-order"]}>
              <HeroSticker
                {...sticker}
                testID={`${testID}-sticker`}
                palette={palette}
              />
            </Visible>
          )}
        </>
      ) : (
        <HeroImage
          {...visual}
          testID={`${testID}-image`}
          sticker={sticker}
          palette={palette}
          variant={variant}
        />
      )}
    </div>
  );
};

type HeroImageProps = {
  variant?: HeroProps["variant"];
  sticker?: HeroProps["sticker"];
  palette?: HeroProps["palette"];
} & Partial<HeroProps["visual"]>;

const HeroImage = React.memo(
  ({
    variant = "default",
    sticker,
    palette = "default",
    renderType = "foreground",
    className,
    ...props
  }: HeroImageProps) => {
    return (
      <div className={classNames(styles["hero-image"], className)}>
        <Visual
          className={styles["hero-image-visual"]}
          fill={["height", "width"]}
          noPadding="all"
          position="center"
          resizeMode="contain"
          renderType={renderType}
          {...props}
        />
        {!!sticker && (
          <div
            className={classNames(styles["hero-image-sticker"], {
              [styles["is-solid"]]: variant === "solid",
            })}
          >
            <HeroSticker {...sticker} palette={palette} />
          </div>
        )}
      </div>
    );
  },
);

HeroImage.displayName = "HeroImage";

type HeroStickerProps = {
  palette?: HeroProps["palette"];
  testID?: string;
} & HeroProps["sticker"];

const HeroSticker = ({ palette, ...props }: HeroStickerProps) => {
  if (props.type === "default") {
    const { description, ...rest } = props;

    return (
      <LargeSticker
        palette={palette}
        className={styles["hero-sticker"]}
        description={description}
        {...rest}
      />
    );
  }

  return (
    <LargeSticker
      palette={palette}
      className={styles["hero-sticker"]}
      list={props.list}
      {...props}
    />
  );
};
