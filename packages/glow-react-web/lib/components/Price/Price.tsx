import { useMemo } from "react";
import type { PriceProps } from "./Price.types";
import styles from "./Price.module.scss";
import classNames from "classnames";
import { tokenClassNames } from "_utility";
import { parsePrice, normalizeDecimals } from "_utility";

export const Price = ({
  value,
  fromValue = "",
  beforeText,
  size = "default",
  state = "default",
  inverted = false,
  showCurrency = true,
  showVAT = false,
  showFrequency = false,
  showAsterisk = false,
  showMinus = false,
  colorClassName,
  className,
  testID,
}: PriceProps) => {
  const afterPrice = parsePrice(value ?? "");
  const fromPrice = parsePrice(fromValue);

  const decimals = useMemo(() => {
    const raw = afterPrice.decimal || "00";

    if (size === "sm") {
      return normalizeDecimals(raw, false);
    }

    return normalizeDecimals(raw, true);
  }, [afterPrice.decimal, size]);

  return (
    <div
      data-testid={testID}
      className={tokenClassNames(styles, "price", className, {
        [styles["price-size-xl"]]: size === "xl",
      })}
    >
      {(beforeText || fromPrice.whole) && (
        <div>
          <div
            className={classNames(
              styles["before-text"],
              styles["before-text-wrapper"],
              styles["before-text-display"],
              styles[`before-text-size-${size}`],
              {
                [styles["inactive"]]: state === "inactive",
                [styles["inverted"]]: inverted,
              },
              colorClassName,
            )}
            data-testid="before"
          >
            {beforeText}
            {fromPrice.whole && (
              <span className={styles["from-value"]}>
                {fromPrice.currency ? fromPrice.currency : showCurrency && "€"}
                {fromPrice.currency || showCurrency ? <>&nbsp;</> : null}
                {fromPrice.whole}
                {fromPrice.decimal &&
                  `,${fromPrice.decimal.length === 1 ? `${fromPrice.decimal}0` : fromPrice.decimal}`}
              </span>
            )}
          </div>
        </div>
      )}
      <div aria-hidden className={styles["price-wrapper"]}>
        {afterPrice.whole && (
          <>
            <div className={styles.price}>
              {showMinus && !fromValue && !beforeText && (
                <div
                  className={classNames(
                    styles["price-text"],
                    styles[size],
                    styles["currency"],
                    {
                      [styles["inactive"]]: state === "inactive",
                      [styles["inverted"]]: inverted,
                    },
                    colorClassName,
                  )}
                  data-testid="negative"
                >
                  -
                </div>
              )}
              {showCurrency && (
                <div
                  className={classNames(
                    styles["price-text"],
                    styles[size],
                    styles.currency,
                    {
                      [styles["inactive"]]: state === "inactive",
                      [styles["inverted"]]: inverted,
                    },
                    colorClassName,
                  )}
                  data-testid="currency"
                >
                  {afterPrice.currency
                    ? afterPrice.currency
                    : showCurrency && "€"}
                </div>
              )}
              <div className={styles["price-value-wrapper"]}>
                <div
                  className={classNames(
                    styles["price-text"],
                    styles[size],
                    {
                      [styles[`inactive`]]: state === "inactive",
                      [styles[`inverted`]]: inverted,
                    },
                    colorClassName,
                  )}
                  data-testid="whole"
                >
                  {afterPrice.whole}
                </div>
                <div className={styles["decimal-wrapper"]}>
                  <div
                    className={classNames(
                      styles["comma-text"],
                      styles["price-text"],
                      styles[size],
                      {
                        [styles[`comma-text-position`]]: size !== "sm",
                        [styles[`inactive`]]: state === "inactive",
                        [styles[`inverted`]]: inverted,
                      },
                      colorClassName,
                    )}
                  >
                    ,
                  </div>
                  <div
                    data-testid="decimals"
                    className={classNames(
                      styles["price-text"],
                      styles[size],
                      {
                        [styles[`inactive`]]: state === "inactive",
                        [styles[`inverted`]]: inverted,
                      },
                      colorClassName,
                    )}
                  >
                    {decimals ? decimals : "00"}
                  </div>
                </div>
              </div>
            </div>
            {(showFrequency || showAsterisk) && (
              <div className={classNames(styles.frequency, styles[size])}>
                <div
                  className={classNames(
                    styles["price-text"],
                    styles[size],
                    {
                      [styles[`inactive`]]: state === "inactive",
                      [styles[`inverted`]]: inverted,
                    },
                    colorClassName,
                  )}
                  data-testid="frequency"
                >
                  {showAsterisk ? "\uE701" : "\uE700"}
                </div>
              </div>
            )}
          </>
        )}
      </div>
      {showVAT && (
        <div
          className={classNames(
            styles["tax-text"],
            styles[size],
            {
              [styles[`inactive`]]: state === "inactive",
              [styles[`inverted`]]: inverted,
            },
            colorClassName,
          )}
          data-testid="after"
        >
          excl. btw
        </div>
      )}
      <div className={styles["price-sr-only"]}>
        {!!fromValue && <span data-from-value>Van: {fromValue}</span>}
        <span data-value>Voor: {value}</span>
      </div>
    </div>
  );
};
