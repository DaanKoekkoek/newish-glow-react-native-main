import React from "react";
import classNames from "classnames";
import { PostalCodeOutputProps } from "../PostalCodeCheck.types";
import styles from "./PostalCodeCheckOutput.module.scss";
import { DefinitionList, Divider, TextLink } from "components/index";
import { Paragraph } from "foundations/Paragraph";
import { Technology } from "foundations/Technology";
import { Heading } from "foundations/Heading";
import { Visible } from "utilities/Visibility";
import { tokenClassNames } from "_utility";

export const PostalCodeCheckOutput = ({
  state,
  address,
  children,
  promo = "none",
  title,
  technology,
  watchTv,
  callToAction,
  description,
}: PostalCodeOutputProps) => {
  return (
    <div className={tokenClassNames(styles, "postal-code-output")}>
      <div
        className={classNames(
          styles["postal-code-output-container"],
          styles[`postal-code-output-state-${state}`],
        )}
      >
        <div className={styles["postal-code-output-content"]}>
          <div className={styles["postal-code-output-title"]}>
            <Technology state={state} type={technology} />
            {title && (
              <Heading size="md" as="h3">
                {title}
              </Heading>
            )}
          </div>
          {(!!description || !!callToAction) && (
            <div className={styles["postal-code-output-description"]}>
              {!!description &&
                (React.isValidElement(description) ? (
                  description
                ) : (
                  <Paragraph>{description}</Paragraph>
                ))}
              {!!callToAction && (
                <div className={styles["postal-code-output-cta"]}>
                  {callToAction}
                </div>
              )}
            </div>
          )}
          {promo === "inside" && children}
        </div>
        <Divider inverted variant="strong" />
        {(!!address || !!watchTv) && (
          <div className={styles["postal-code-output-definition-lists"]}>
            {!!address && (
              <DefinitionList
                testID={"definition-list-address"}
                className={styles["postal-code-output-address"]}
                title={
                  <span
                    className={styles["postal-code-output-address-wrapper"]}
                  >
                    {address.title}
                    {!!address.editable && (
                      <Visible below="tablet">
                        <TextLink onClick={address.editable.onClick}>
                          {address.editable.text}
                        </TextLink>
                      </Visible>
                    )}
                  </span>
                }
              >
                {address.text}
              </DefinitionList>
            )}
            {!!watchTv && (
              <DefinitionList
                testID={"definition-list-tv"}
                title={watchTv.title}
              >
                {watchTv.text}
              </DefinitionList>
            )}
            {!!address && !!address.editable && (
              <Visible above="tablet">
                <TextLink onClick={address.editable.onClick}>
                  {address.editable.text}
                </TextLink>
              </Visible>
            )}
          </div>
        )}
      </div>
      {promo === "default" && children}
    </div>
  );
};
