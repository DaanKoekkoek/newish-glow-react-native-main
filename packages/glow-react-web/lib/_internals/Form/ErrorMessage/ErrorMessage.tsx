import { Icon } from "foundations/Icon";
import styles from "./ErrorMessage.module.scss";
import { BaseText } from "_internals/Typography";
import { tokenClassNames } from "_utility";

type ErrorMessageProps = {
  children?: React.ReactNode;
  className?: string;
  id?: string;
  testID?: string;
};

export const ErrorMessage = ({
  children,
  className,
  id,
  testID = "error-message-container",
}: ErrorMessageProps) => {
  return children ? (
    <BaseText
      id={id}
      as="small"
      className={tokenClassNames(styles, "error-message", className)}
      data-testid={testID}
      role="alert"
      aria-live="polite"
    >
      <Icon
        className={styles["error-text"]}
        name="status-alert"
        size="sm"
        testID="status-alert"
      />
      {children}
    </BaseText>
  ) : null;
};
