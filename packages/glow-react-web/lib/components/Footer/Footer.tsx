import React from "react";
import { FooterProps, FooterLink } from "./Footer.types";
import { TextLink } from "components/TextLink";
import { Paragraph } from "foundations/Paragraph";
import { FooterAccordion } from "./FooterAccordion";
import styles from "./Footer.module.scss";
import classNames from "classnames";
import { Logos } from "foundations/Logos";
import { Column, Grid, Icon, StoreButton } from "foundations/index";
import { BaseText } from "_internals/Typography";
import { tokenClassNames } from "_utility";

export const Footer = ({
  columnLinks,
  socialLinks,
  storeLinks,
  assortedLinks,
  copyright,
  testID,
  brand = "odido",
}: FooterProps) => {
  return (
    <footer data-testid={testID} className={tokenClassNames(styles, "footer")}>
      <Grid>
        <Column className={styles["footer-column"]}>
          {columnLinks && <FooterAccordion columnLinks={columnLinks} />}
          <div
            data-testid="footer-bottom"
            className={classNames(
              styles["footer-bottom"],
              styles["text-color"],
            )}
          >
            <div className={styles["footer-bottom-row"]}>
              <div className={styles["logo-container"]}>
                <Logos brand={brand} size="lg" variant="inverted" />
              </div>

              {socialLinks && (
                <div className={styles["social-links-container"]}>
                  {socialLinks.map((socialLink, index) => {
                    const { icon, ariaLabel, ...rest } = socialLink;
                    void ariaLabel;
                    return (
                      <div
                        key={`${socialLink}-${index}`}
                        className={styles["link-color-decoration"]}
                      >
                        <TextLink
                          {...rest}
                          size="sm"
                          aria-label={getAriaLabel(socialLink)}
                          inverted
                        >
                          {icon}
                        </TextLink>
                      </div>
                    );
                  })}
                </div>
              )}
              {storeLinks && (
                <div className={styles["store-links-container"]}>
                  {storeLinks.map((storeLink, index) => {
                    const { icon, href, onClick, ...rest } = storeLink;
                    return (
                      <div
                        key={`${index} ${storeLink.href}  `}
                        className={styles["link-color-decoration"]}
                      >
                        <BaseText
                          {...rest}
                          as={href ? "a" : "button"}
                          className={classNames({
                            [styles["footer-link-button"]]: onClick,
                          })}
                          href={href}
                          onClick={onClick}
                          type={onClick ? "button" : undefined}
                          aria-label={getAriaLabel(storeLink)}
                          target={href ? "_blank" : undefined}
                          rel="noopener noreferrer"
                        >
                          {icon}
                        </BaseText>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {assortedLinks || copyright ? (
              <div className={styles["footer-bottom-disclaimer"]}>
                {assortedLinks && (
                  <div className={styles["assorted-row"]}>
                    {assortedLinks.map((link, index) => (
                      <div
                        key={`${index} ${link}`}
                        data-testid="assorted-link"
                        className={classNames(
                          styles["assorted-link-item"],
                          styles["link-color-decoration"],
                        )}
                      >
                        <TextLink {...link} size={"xs"} inverted>
                          {link.title}
                        </TextLink>
                      </div>
                    ))}
                  </div>
                )}
                {copyright && (
                  <div
                    data-testid="copyright"
                    className={styles["copyright-row"]}
                  >
                    <Paragraph size="xs">{copyright}</Paragraph>
                  </div>
                )}
              </div>
            ) : null}
          </div>
        </Column>
      </Grid>
    </footer>
  );
};

const getAriaLabel = (link: FooterLink) => {
  if (link.ariaLabel) return link.ariaLabel;

  const icon = link.icon;

  if (!React.isValidElement(icon)) return "";

  if (icon.type === Icon) return icon.props.name ?? "";
  if (icon.type === StoreButton) return icon.props.brand ?? "";

  return "";
};
