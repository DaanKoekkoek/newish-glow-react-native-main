import { CheckboxGroupProps } from "./CheckboxGroup.types";
import { Legend, HelperMessage, ErrorMessage } from "_internals/Form";
import styles from "./CheckboxGroup.module.scss";

export const CheckboxGroup = ({
  children,
  errorMessage,
  helperText,
  legend,
  state = "default",
  testID = "checkbox-group",
}: CheckboxGroupProps) =>
  children ? (
    <div className={styles["checkbox-group"]} data-testid={testID}>
      <Legend {...legend} testID="checkbox-legend" />

      {children}
      {state !== "error" && <HelperMessage>{helperText}</HelperMessage>}
      {state === "error" && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </div>
  ) : null;
