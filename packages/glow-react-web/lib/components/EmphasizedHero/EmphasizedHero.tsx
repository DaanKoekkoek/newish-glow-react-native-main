import React from "react";
import classNames from "classnames";
import styles from "./EmphasizedHero.module.scss";
import { EmphasizedHeroProps } from "./EmphasizedHero.types";

import { GlowGradient, Heading, Paragraph, Display } from "foundations/index";
import { Visual } from "_internals/Assets";
import { LargeSticker } from "components/LargeSticker";
import { Visible } from "utilities/Visibility";
import { tokenClassNames } from "_utility";

export const EmphasizedHero = React.memo(
  ({
    palette = "default",
    background = "default",
    order = "default",
    countdown,
    children,
    heading,
    callToAction,
    footnote,
    sticker,
    visual,
    testID = "emphasized-hero",
  }: EmphasizedHeroProps) => {
    if (!heading) return null;

    return (
      <div
        className={tokenClassNames(
          styles,
          "emphasised-hero",
          styles[`emphasised-palette-${palette}`],
        )}
        data-testid={testID}
      >
        <div className={styles["emphasised-grid"]}>
          <div
            className={classNames(styles["emphasised-content-column"], {
              [styles["is-inverted"]]: order === "inverted",
            })}
          >
            {background === "default" && (
              <Visible
                as="div"
                below="laptop"
                className={classNames(
                  styles["emphasised-content-background"],
                  styles["emphasised-content-background-description"],
                )}
              >
                <GlowGradient
                  preserveAspectRatio="none"
                  zIndex={1}
                  palette={palette}
                  className={styles["emphasised-content-gradient"]}
                />
              </Visible>
            )}
            <div className={styles["emphasised-content"]}>
              {!!countdown && (
                <div className={styles["emphasised-content-counter"]}>
                  {countdown}
                </div>
              )}
              {(!!children || !!heading.title) && (
                <div className={styles["emphasised-content-description"]}>
                  {!!heading.title && (
                    <div className={styles["emphasised-content-heading"]}>
                      <Display
                        as="div"
                        highlightClassName={
                          styles["emphasised-hero-title-highlight"]
                        }
                        size="sm"
                      >
                        {heading.title}
                      </Display>
                      <Heading
                        as="div"
                        highlightClassName={
                          styles["emphasised-hero-title-highlight"]
                        }
                        size="lg"
                      >
                        {heading.subTitle}
                      </Heading>
                    </div>
                  )}
                  {React.Children.count(children) > 1 ||
                  React.isValidElement(children) ? (
                    <div className={styles["emphasised-content-children"]}>
                      {children}
                    </div>
                  ) : (
                    <Paragraph>{children}</Paragraph>
                  )}
                </div>
              )}
              {!!callToAction && (
                <div className={styles["emphasised-content-cta"]}>
                  {callToAction}
                </div>
              )}
              {React.isValidElement(footnote) ? (
                footnote
              ) : (
                <Paragraph>{footnote}</Paragraph>
              )}
            </div>
          </div>
          <div className={styles["emphasised-media-column"]}>
            {background === "default" && (
              <Visible
                as="div"
                below="laptop"
                className={classNames(
                  styles["emphasised-content-background"],
                  styles["emphasised-content-background-image"],
                )}
              >
                <GlowGradient
                  preserveAspectRatio="none"
                  zIndex={1}
                  palette={palette}
                  className={styles["emphasised-content-gradient"]}
                />
              </Visible>
            )}
            <Visual
              noPadding={{ mobileSmall: "all", laptop: "bottom" }}
              {...visual}
              className={styles["emphasised-media-visual"]}
            >
              {!!sticker && (
                <div className={styles["emphasised-media-sticker-container"]}>
                  <LargeSticker
                    {...sticker}
                    palette={palette}
                    className={styles["emphasised-media-sticker"]}
                  />
                </div>
              )}
            </Visual>
          </div>
        </div>
      </div>
    );
  },
);
