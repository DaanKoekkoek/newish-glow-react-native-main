import { TextLink } from "components/TextLink";
import { Heading } from "foundations/Heading";
import { ColumnLink } from "./Footer.types";
import { Accordion, AccordionPanel } from "components/Accordion";
import styles from "./Footer.module.scss";
import classNames from "classnames";
import { Visible } from "utilities/Visibility";

interface FooterAccordionProps {
  columnLinks: ColumnLink[];
}

export const FooterAccordion = ({ columnLinks }: FooterAccordionProps) => {
  return (
    <div
      data-testid="footer-top"
      className={classNames(styles["footer-accordion"])}
    >
      <Visible
        as="div"
        above="laptop"
        className={classNames(styles["footer-accordion-above-tablet"])}
      >
        {columnLinks.map((columnLink, index) => (
          <div
            key={`${index} ${columnLink}`}
            className={classNames(
              styles["footer-accordion-above-tablet-item"],
              styles[
                `footer-accordion-above-tablet-item-col-${columnLinks.length}`
              ],
              styles["text-color"],
            )}
          >
            <Heading size="md" as="h3" color="inverted">
              {columnLink.title}
            </Heading>

            <div
              className={styles["footer-accordion-above-tablet-item-col-links"]}
            >
              {columnLink.links.map((link, index) => (
                <div
                  data-testid="footer-column-link"
                  key={`${index} ${link}`}
                  className={styles["link-color-decoration"]}
                >
                  <TextLink {...link} size={"sm"} inverted>
                    {link.title}
                  </TextLink>
                </div>
              ))}
            </div>
          </div>
        ))}
      </Visible>
      <Visible
        as="div"
        below="laptop"
        className={styles["footer-accordion-below-tablet"]}
      >
        <Accordion
          className={classNames(styles.accordion, styles["text-color"])}
        >
          {columnLinks.map((columnLink, index) => (
            <AccordionPanel
              key={`${index} ${columnLink}`}
              title={columnLink.title}
            >
              {columnLink.links.map((link, index) => (
                <div
                  key={`${index} ${link}`}
                  className={styles["link-color-decoration"]}
                >
                  <TextLink inverted {...link} size={"sm"}>
                    {link.title}
                  </TextLink>
                </div>
              ))}
            </AccordionPanel>
          ))}
        </Accordion>
      </Visible>
    </div>
  );
};
