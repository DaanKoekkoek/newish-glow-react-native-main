import { BundleWidgetProps } from "./BundleWidget.types";
import styles from "./BundleWidget.module.scss";
import { Display } from "foundations/Display";
import { Price } from "components/Price";
import { Icon } from "foundations/Icon";
import { getUnitForBundleType } from "./BundleWidget.utils.ts";
import { Button } from "..";
import { tokenClassNames } from "_utility";

export const BundleWidget = ({
  remaining = 0,
  total = 1,
  variant = "Mbit",
  bundleType,
  icon = "unlimited",
  title,
  description,
  showIcon = false,
  type = "default",
  price,
  button,
  testID = "bundle-widget",
  palette = "default",
}: BundleWidgetProps) => {
  const percentageUsed = Math.min((remaining / total) * 100, 100);

  return (
    <div
      className={tokenClassNames(
        styles,
        "bundle-widget",
        styles[`bundle-widget-palette-${palette}`],
        {
          [styles["is-below-10-percent"]]: percentageUsed <= 10,
        },
      )}
      data-testid={testID}
    >
      <div
        className={styles["bundle-widget-graph"]}
        style={{
          ["--used-scale" as string]: percentageUsed / 100,
        }}
      >
        <div className={styles["bundle-widget-bar"]}>
          <div className={styles["bundle-widget-fill"]} />
          <div className={styles["bundle-widget-content-left"]}>
            {type === "default" ? (
              <>
                <Display
                  size="sm"
                  className={styles["bundle-widget-remaining-value"]}
                >
                  {bundleType === "data" && remaining < 1
                    ? Math.round(remaining * 1000)
                    : Number.isInteger(remaining)
                      ? remaining
                      : remaining.toString().replace(".", ",")}
                </Display>
                <span className={styles["bundle-widget-unit"]}>
                  {bundleType === "data" && remaining < 1
                    ? "MB"
                    : getUnitForBundleType(bundleType, variant)}
                </span>
              </>
            ) : (
              <Price {...price} size="xl" />
            )}
          </div>
          <div className={styles["bundle-widget-content-right"]}>
            <div className={styles["bundle-widget-content-title"]}>
              {type === "default" && showIcon && (
                <Icon
                  name={icon}
                  className={styles["bundle-widget-content-icon"]}
                  size="sm"
                />
              )}
              {title}
            </div>
            {!!description && (
              <div className={styles["bundle-widget-content-total"]}>
                {description}
              </div>
            )}
          </div>
        </div>
      </div>
      {!!button && <BundleWidgetButton {...button} />}
    </div>
  );
};

const BundleWidgetButton = ({ ...props }: BundleWidgetProps["button"]) => {
  const { children, icon, ...rest } = props;
  return (
    <Button {...rest} className={styles["bundle-widget-button"]}>
      <Icon name={icon?.name ?? "plus"} />
      <span className={styles["bundle-widget-button-label"]}>{children}</span>
    </Button>
  );
};
