import { Icon, Paragraph } from "foundations/index";
import { BaseText } from "_internals/Typography";
import { isValidElement, ReactElement } from "react";
import { LegendProps, TooltipInfo } from "./Legend.types";
import styles from "./Legend.module.scss";
import { Tooltip } from "components/Tooltip/Tooltip";
import { tokenClassNames } from "_utility";

export const Legend = ({
  id,
  as: Tag = "div",
  label,
  optionalText,
  info,
  testID,
  className,
}: LegendProps) =>
  !!optionalText || !!label || !!info ? (
    <Tag
      className={tokenClassNames(styles, "legend", className)}
      data-testid={testID}
      htmlFor={id}
    >
      {!!label && (
        <BaseText className={styles["legend-label"]}>{label}</BaseText>
      )}
      <span className={styles["info-container"]}>
        {optionalText && (
          <Paragraph size="sm" className={styles["optional-text"]}>
            {optionalText}
          </Paragraph>
        )}
        <InfoContainer info={info} ariaLabel={optionalText}>
          <Icon
            name="status-info"
            testID="info-icon"
            className={styles["info-icon"]}
          />
        </InfoContainer>
      </span>
    </Tag>
  ) : null;

const InfoContainer = ({
  info,
  children,
  ariaLabel,
}: {
  info: LegendProps["info"];
  children: ReactElement;
  ariaLabel?: string;
}) => {
  if (typeof info === "string") {
    return <BaseText className={styles["info-text"]}>{info}</BaseText>;
  }

  if (typeof info === "function") {
    return (
      <button
        type="button"
        onClick={info}
        aria-label={ariaLabel}
        className={styles["info-button"]}
      >
        {children}
      </button>
    );
  }

  if (isValidElement(info)) {
    return info;
  }

  if (info && typeof info === "object" && "description" in info) {
    const {
      description,
      tipPosition = "left",
      closeButton,
      animated,
    } = info as TooltipInfo;
    return (
      <Tooltip
        description={description}
        tipPosition={tipPosition}
        closeButton={closeButton}
        animated={animated}
      >
        {children}
      </Tooltip>
    );
  }

  return null;
};
