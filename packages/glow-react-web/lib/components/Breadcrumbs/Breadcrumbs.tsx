import { Icon } from "foundations/Icon";
import styles from "./Breadcrumbs.module.scss";
import { Paragraph } from "foundations/Paragraph";
import { Strong } from "foundations/Strong";
import classNames from "classnames";
import { BreadcrumbItemProps, BreadcrumbsProps } from "./Breadcrumbs.types";
import { Visible } from "utilities/Visibility";
import { TextLink } from "components/TextLink";
import { tokenClassNames } from "_utility";

export const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
  if (items.length === 0) return null;

  const baseStyles = tokenClassNames(styles, "breadcrumbs");

  // Single item shortcut
  if (items.length === 1) {
    return (
      <div className={classNames(baseStyles, styles["gap-default"])}>
        <Icon className={styles.icon} name="chevron-left" size="sm" />
        <Paragraph size="sm" className={styles.label}>
          <BreadcrumbItem {...items[0]} />
        </Paragraph>
      </div>
    );
  }

  // Shared helper to render a trail
  const renderTrail = (list: InternalBreadcrumbItemProps[]) =>
    list.map((item, index) => (
      <div key={index} className={styles["gap-default"]}>
        <BreadcrumbItem {...item} disabled={index === list.length - 1} />
        {index < list.length - 1 && (
          <Icon className={styles.icon} name="chevron-right" size="sm" />
        )}
      </div>
    ));

  return (
    <>
      {/* Mobile: collapsed trail */}
      <Visible below="tablet">
        <div className={classNames(baseStyles, styles["gap-horizontal"])}>
          <div className={styles["gap-default"]}>
            <BreadcrumbItem {...items[0]} />
            <Icon className={styles.icon} name="chevron-right" size="sm" />
          </div>
          {items.length > 2 && (
            <>
              <input
                type="checkbox"
                id="breadcrumbs-expand"
                className={styles["breadcrumb-toggle"]}
              />
              <label
                htmlFor="breadcrumbs-expand"
                className={classNames(
                  styles["gap-default"],
                  styles["middle-dots"],
                )}
              >
                <Strong size="sm" className={styles.label}>
                  ...
                </Strong>
                <Icon className={styles.icon} name="chevron-right" size="sm" />
              </label>
              {items.slice(1, -1).map((item, index) => (
                <div key={index} className={styles["middle-item"]}>
                  <BreadcrumbItem {...item} />
                  <Icon
                    className={styles.icon}
                    name="chevron-right"
                    size="sm"
                  />
                </div>
              ))}
            </>
          )}
          <div className={styles["gap-default"]}>
            <BreadcrumbItem {...items[items.length - 1]} disabled />
          </div>
        </div>
      </Visible>

      {/* Desktop: full trail */}
      <Visible above="tablet">
        <div className={classNames(baseStyles, styles["gap-horizontal"])}>
          {renderTrail(items)}
        </div>
      </Visible>
    </>
  );
};

type InternalBreadcrumbItemProps = BreadcrumbItemProps & {
  disabled?: boolean;
};

const BreadcrumbItem = ({
  name,
  disabled,
  onClick,
  testID,
  href,
}: InternalBreadcrumbItemProps) => (
  <TextLink
    size="sm"
    testID={testID}
    onClick={onClick}
    href={href}
    textClassName={classNames(
      styles["breadcrumb-link"],
      styles["text-link-text"],
    )}
    className={classNames(styles["breadcrumb-link"], styles["text-link"], {
      [styles["disabled"]]: disabled,
    })}
  >
    {name}
  </TextLink>
);
