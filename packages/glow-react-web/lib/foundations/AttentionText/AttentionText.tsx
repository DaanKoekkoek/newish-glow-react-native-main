import styles from "./AttentionText.module.scss";
import type { AttentionTextProps } from "./AttentionText.types";
import { Icon } from "foundations/Icon";
import { Paragraph } from "../Paragraph";
import { tokenClassNames } from "_utility";

export const AttentionText = ({
  children,
  size = "default",
  icon,
  variant = "success",
  testID,
}: AttentionTextProps) => {
  return (
    <div
      className={tokenClassNames(
        styles,
        "attention-text",
        styles[`attention-text-size-${size}`],
      )}
      data-testid={testID}
      role="status"
    >
      {icon && (
        <Icon
          className={styles[`icon-variant-${variant}`]}
          name={icon}
          size={size}
        />
      )}
      <Paragraph size={size} className={styles[`message-variant-${variant}`]}>
        {children}
      </Paragraph>
    </div>
  );
};
