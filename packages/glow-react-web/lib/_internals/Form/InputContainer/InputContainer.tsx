import React from "react";
import { type PropsWithChildren } from "react";

import styles from "./InputContainer.module.scss";
import { Legend, HelperMessage, ErrorMessage } from "_internals/Form";
import { InputFieldProps } from "components/InputField";
import { tokenClassNames } from "_utility";

type Props = Pick<
  InputFieldProps,
  "testID" | "legend" | "helperText" | "validated" | "id" | "className"
> & {
  showHelper?: boolean;
};

/**
 * Input container
 *
 * @internal
 */
export const InputContainer = React.forwardRef<
  HTMLDivElement,
  PropsWithChildren<Props>
>(
  (
    {
      id,
      testID = "input",
      legend,
      validated,
      helperText,
      children,
      showHelper,
      className,
    },
    ref,
  ) => (
    <div className={tokenClassNames(styles, "input-container", className)}>
      {!!legend && (
        <Legend
          as="label"
          id={id}
          label={legend.label}
          optionalText={legend.optionalText}
          info={legend.info}
          className={styles["input-container-label"]}
        />
      )}
      <div className={styles["group-container"]} data-input-container ref={ref}>
        <div className={styles["group"]} data-testid={`${testID}-container`}>
          {children}
        </div>
      </div>
      {validated?.valid === false ? (
        <ErrorMessage testID="error-text">{validated.message}</ErrorMessage>
      ) : showHelper ? (
        <HelperMessage id={`${id}-helper`}>{helperText}</HelperMessage>
      ) : null}
    </div>
  ),
);
