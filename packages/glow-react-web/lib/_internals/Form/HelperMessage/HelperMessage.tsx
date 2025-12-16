import styles from "./HelperMessage.module.scss";
import { ErrorMessage, BaseText } from "_internals/index";
import { tokenClassNames } from "_utility";

type HelperMessageProps = {
  children?: string;
  errorMessage?: string;
  id?: string;
};

export const HelperMessage = ({
  children,
  errorMessage,
  id,
}: HelperMessageProps) => {
  return errorMessage ? (
    <ErrorMessage id={id}>{errorMessage}</ErrorMessage>
  ) : children ? (
    <BaseText
      id={id}
      as="small"
      className={tokenClassNames(styles, "helper-message")}
      data-testid="helper-message"
      aria-live="polite"
    >
      {children}
    </BaseText>
  ) : null;
};
