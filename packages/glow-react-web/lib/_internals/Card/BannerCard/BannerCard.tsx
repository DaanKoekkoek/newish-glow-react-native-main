import styles from "./BannerCard.module.scss";
import { Paragraph } from "foundations/Paragraph";
import { BannerCardProps } from "./BannerCard.types";
import { Heading } from "foundations/Heading";
import { Visual } from "_internals/Assets";
import { isValidElement } from "react";
import { Stagger } from "_internals/Animation";
import { tokenClassNames } from "_utility";
import { Button } from "components/Button";
import { useGenerateClassNames } from "_global-hooks";

export const BannerCard = ({
  title,
  children,
  variant = "default",
  image,
  callToAction,
  palette = "default",
  direction = "horizontal",
  animated = false,
}: BannerCardProps) => {
  const directionClass = useGenerateClassNames(
    styles,
    direction,
    "banner-card-direction",
  );

  return (
    <div
      className={tokenClassNames(
        styles,
        "banner-card",
        styles[`banner-card-variant-${variant}`],
        styles[`banner-card-palette-${palette}`],
        directionClass,
      )}
    >
      <StaggerAnimate animated={animated} delay={0.4}>
        <Visual
          pictureClassName={styles["banner-card-image"]}
          renderType="foreground"
          noPadding="all"
          resizeMode="cover"
          {...image}
          ratio={direction === "horizontal" ? "1/1" : image.ratio}
        />
      </StaggerAnimate>
      <div className={styles["banner-card-content"]}>
        <StaggerAnimate
          animated={animated}
          delay={0.6}
          className={styles["banner-card-text"]}
        >
          <Heading
            as="div"
            size="md"
            highlightClassName={styles["banner-card-heading-highlight"]}
          >
            {title}
          </Heading>
          {isValidElement(children) ? (
            children
          ) : (
            <Paragraph>{children}</Paragraph>
          )}
        </StaggerAnimate>
        <StaggerAnimate animated={animated} delay={0.8}>
          <Button icon={{ name: "arrow-right" }} {...callToAction} />
        </StaggerAnimate>
      </div>
    </div>
  );
};

type StaggerAnimateProps = {
  animated?: boolean;
  delay?: number;
  className?: string;
  children: React.ReactNode;
};

export const StaggerAnimate = ({
  animated = false,
  delay = 0,
  className,
  children,
}: StaggerAnimateProps) => {
  return animated ? (
    <Stagger open delay={delay} animation="fast" className={className}>
      {children}
    </Stagger>
  ) : (
    <div className={className}>{children}</div>
  );
};
