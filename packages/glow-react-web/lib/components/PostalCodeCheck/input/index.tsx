import styles from "./PostalCodeCheckInput.module.scss";
import classNames from "classnames";
import { Heading } from "foundations/Heading";
import { Paragraph } from "foundations/Paragraph";
import { Marker } from "_internals/ProgressIndicators/Marker";
import { Callout } from "components/Callout";
import { SegmentedTabButtons } from "components/SegmentedTab";
import {
  PostalCodeCheckInputProps,
  PostalCodeCheckInputState,
} from "../PostalCodeCheck.types";
import { Visible } from "utilities/Visibility";
import React from "react";
import { tokenClassNames } from "_utility";

export const PostalCodeCheckInput = ({
  title,
  state = "none",
  description,
  palette = "default",
  marker,
  variant = "default",
  children,
  tvSectionProps,
  calloutProps,
  callToActionButton,
}: PostalCodeCheckInputProps) => {
  const markerColor = (state: PostalCodeCheckInputState) => {
    if (state === "error") {
      return "red";
    }

    if (state === "warning") {
      return "orange";
    }

    return palette;
  };

  return (
    <div
      className={tokenClassNames(
        styles,
        "postal-code-check-input",
        styles[`palette-${palette}`],
        styles[`state-${state}`],
        { [styles["overlay"]]: variant === "overlay" },
      )}
    >
      <div className={styles.header}>
        {(variant === "default" || variant === "overlay") &&
          (() => {
            const titleContent = (
              <div className={styles.title}>
                <Marker
                  state="default"
                  index={marker}
                  palette={markerColor(state)}
                />
                <Heading as="h4" size="md">
                  {title}
                </Heading>
              </div>
            );
            return variant === "overlay" ? (
              <Visible above="laptop">{titleContent}</Visible>
            ) : (
              titleContent
            );
          })()}
        <Paragraph size="default">{description}</Paragraph>
        {children}
      </div>
      {(state === "warning" || state === "error") && calloutProps && (
        <div
          className={classNames(styles["postal-code-check-callout-container"])}
        >
          <Callout
            {...calloutProps}
            prominence="subtle"
            tipPosition="top"
            status={state}
            className={classNames(
              styles["postal-code-check-callout"],
              styles["prominence-subtle"],
              {
                [styles[`status-${state}`]]: variant === "overlay",
              },
            )}
          />
        </div>
      )}
      {tvSectionProps && (
        <div
          data-testid="tv-section"
          className={classNames(styles["tv-section"], {
            [styles[`palette-${palette}`]]: variant === "overlay",
          })}
        >
          <Visible above="laptop">
            <img
              className={classNames(styles.icon)}
              alt="icon-tv-internet"
              src="icons/tv-internet.svg"
            />
          </Visible>
          <div className={styles.header}>
            <Heading as="h3" size="sm">
              {tvSectionProps.title}
            </Heading>
            <Paragraph size="default">{tvSectionProps.description}</Paragraph>
          </div>
          <div className={styles["segmented-tab-wrapper"]}>
            <SegmentedTabButtons
              onTabChange={tvSectionProps.onTabChange}
              uuid={"uuid"}
              variant="subtle"
              backgroundPalette={palette}
              options={tvSectionProps.options}
            />
          </div>
        </div>
      )}
      {callToActionButton &&
        React.createElement(callToActionButton.type, {
          ...callToActionButton.props,
          prominence: "emphasised",
          className: styles["postal-code-input-button"],
        })}
    </div>
  );
};

export const PostalCodeCheckInputFields = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <div className={styles["input-fields"]}>{children}</div>;
};
