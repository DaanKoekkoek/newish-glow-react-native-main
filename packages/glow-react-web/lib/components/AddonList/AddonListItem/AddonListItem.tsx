import { Strong } from "foundations/index";
import { Button } from "components/Button";
import type { BaseButtonProminence } from "_internals/Button";
import styles from "./AddonListItem.module.scss";
import classNames from "classnames";
import { Visible } from "utilities/Visibility";
import { AddonListListItemProps } from "./AddonListItem.types";
import { BaseText } from "_internals/Typography";
import { tokenClassNames } from "_utility";

export const AddonListItem = ({
  attention,
  actionLabel,
  addOn,
  title,
  description,
  variant = "default",
  onClick,
}: AddonListListItemProps) => {
  const buttonProps = {
    stretched: true,
    onClick,
    prominence:
      variant === "default"
        ? "emphasised"
        : ("secondary" as BaseButtonProminence),
  };

  return (
    <li className={tokenClassNames(styles, "addon-list-item")}>
      {!!addOn && <div className={styles["add-on"]}>{addOn}</div>}
      <div className={styles.content}>
        <Strong className={styles.title}>{title}</Strong>
        <div className={styles["description-and-promo"]}>
          {!!description && (
            <BaseText as="p" className={styles.description}>
              {description}
            </BaseText>
          )}
          {!!attention && (
            <BaseText
              as="span"
              className={classNames(
                styles["list-item-attention"],
                styles[`attention-${attention.variant}`],
              )}
            >
              {attention.text}
            </BaseText>
          )}
        </div>
      </div>
      {!!actionLabel && (
        <div>
          <Visible below="laptop">
            <Button {...buttonProps} onClick={onClick} stretched size="sm">
              {actionLabel}
            </Button>
          </Visible>
          <Visible above="laptop">
            <Button {...buttonProps} onClick={onClick} stretched size="default">
              {actionLabel}
            </Button>
          </Visible>
        </div>
      )}
    </li>
  );
};
