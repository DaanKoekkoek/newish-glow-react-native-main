import { PinProps } from "./Pin.types";
import styles from "./Pin.module.scss";
import classNames from "classnames";
import { OTPInput, REGEXP_ONLY_DIGITS } from "input-otp";
import { forwardRef } from "react";
import { PinContext } from "./PinContext";
import { PinMessage } from "./PinMessage";

export const PinCode = forwardRef<HTMLInputElement, PinProps>(
  function ForwardedPinCode(
    {
      children,
      code,
      errorMessage,
      loadingMessage,
      masked,
      maxLength = 4,
      onCompleted,
      pattern = REGEXP_ONLY_DIGITS,
      setCode,
      state,
      successMessage,
      testID,
      ...props
    },
    ref,
  ) {
    return (
      <PinContext.Provider value={{ masked, state }}>
        <div
          className={classNames(
            styles["token-input-gap"],
            styles["token-input-atoms-field"],
            styles["token-input-color"],
            styles["token-paragraph"],
            styles.pin,
          )}
          data-testid={testID}
        >
          <OTPInput
            disabled={state === "disabled" || state === "loading"}
            maxLength={maxLength}
            onChange={setCode ? (newValue) => setCode(newValue) : undefined}
            onComplete={onCompleted}
            pattern={pattern}
            ref={ref}
            value={code ? code : undefined}
            {...props}
          >
            <div className={styles["slots-wrapper"]}>{children}</div>
          </OTPInput>
          <div
            aria-live="polite"
            className={classNames(styles["pin-message"], {
              [styles["pincode-message--error"]]: state === "error",
              [styles["pincode-message--loading"]]: state === "loading",
              [styles["pincode-message--success"]]: state === "success",
            })}
          >
            <PinMessage
              errorMessage={errorMessage}
              loadingMessage={loadingMessage}
              state={state}
              successMessage={successMessage}
            />
          </div>
        </div>
      </PinContext.Provider>
    );
  },
);
