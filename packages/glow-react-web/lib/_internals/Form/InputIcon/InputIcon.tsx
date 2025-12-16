import type { InputIconProps, InputType } from "./InputIcon.types";
import styles from "./InputIcon.module.scss";
import classNames from "classnames";
import { Icon } from "foundations/Icon";
import type { InputVariant } from "components/InputField";
import { SuffixIconAction } from "components/InputField/InputField.reducer";
import { Button } from "components/Button";
import { tokenClassNames } from "_utility";

const TOGGLE_PASSWORD_ACTION = { type: "toggle-password-visibility" } as const;
const TOGGLE_DATE_PICKER = { type: "toggle-date-picker" } as const;

export const InputIcon = (props: InputIconProps) => {
  const { position, className } = props;

  const inputIconClass = tokenClassNames(styles);

  if (position === "prefix") {
    return (
      <div
        className={classNames(
          styles["input-color"],
          styles["prefix-container"],
          inputIconClass,
          className,
        )}
      >
        <PrefixIcon {...props} />
      </div>
    );
  }

  return (
    <div
      className={classNames(
        styles["input-color"],
        styles["suffix-container"],
        inputIconClass,
        className,
        {
          [styles["suffix-container-file-only"]]:
            props.type === "file" &&
            !(
              props.fileInputRef?.current?.files &&
              props.fileInputRef.current.files.length > 0 &&
              props.showClear
            ),
        },
      )}
    >
      <IconGroup onClick={props.onClick} {...props} />
    </div>
  );
};

const PrefixIcon = ({
  type,
  variant,
  testID = "search-icon",
}: {
  type: InputType;
  variant?: InputVariant;
  testID?: string;
}) => {
  if (type === "search") {
    return (
      <Icon
        name="search"
        testID={testID}
        className={classNames(styles.prefix, styles["input-icon"], {
          [styles["input-icon-inactive"]]: variant === "inactive",
        })}
        size="default"
      />
    );
  }
  return null;
};

const ClearIcon = ({
  onClick,
  variant,
  testID = "input-clear-button",
  solid = true,
}: {
  onClick?: () => void;
  variant?: InputVariant;
  testID?: string;
  solid?: boolean;
}) => {
  if (variant === "inactive") return null;

  return (
    <button
      type="button"
      onClick={onClick}
      data-testid={testID}
      className={classNames(
        styles["suffix-toggle"],
        styles["suffix-clear-input"],
      )}
      aria-label="Clear input"
    >
      <Icon testID="icon-clear-search" name="clear" solid={solid} />
    </button>
  );
};

const IconGroup = ({
  onClick,
  state,
  dispatch,
  variant,
  type,
  fileInputRef,
  solid,
}: {
  state?: {
    isPasswordHidden: boolean;
    isDatePickerVisible: boolean;
  };
  dispatch?: React.Dispatch<SuffixIconAction>;
  onClick?: () => void;
  variant?: InputVariant;
  type?: "text" | "password" | "date" | "search" | "file";
  fileInputRef?: React.RefObject<HTMLInputElement>;
  solid?: boolean;
}) => {
  const togglePassword = () => dispatch?.(TOGGLE_PASSWORD_ACTION);
  const toggleDatePicker = () => dispatch?.(TOGGLE_DATE_PICKER);
  const toggleFilePicker = () => {
    if (fileInputRef?.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className={styles["suffix-group"]}>
      <SuccessIcon variant={variant} />
      {!!state && (
        <>
          {type === "file" && (
            <Button
              aria-label="Upload file"
              icon={{
                name: "arrow-right",
              }}
              onClick={toggleFilePicker}
              size="sm"
              state={variant || "default"}
              data-input-file-upload-button
            />
          )}
          {type === "password" && (
            <button
              type="button"
              data-testid="input-field-affix-password-toggle"
              className={styles["suffix-toggle"]}
              onClick={togglePassword}
              disabled={variant === "inactive"}
            >
              <Icon
                testID="icon-show-password"
                className={classNames(styles.suffix, styles["input-icon"], {
                  [styles["input-icon-inactive"]]: variant === "inactive",
                })}
                name={state?.isPasswordHidden ? "visible" : "invisible"}
                size="default"
                solid={false}
              />
            </button>
          )}
          {type === "date" && (
            <button
              data-testid="input-field-affix-datepicker-toggle"
              className={styles["suffix-toggle"]}
              onClick={toggleDatePicker}
              disabled={variant === "inactive"}
              type="button"
            >
              <Icon
                name="calendar"
                size="default"
                className={classNames(styles.suffix, styles["input-icon"], {
                  [styles["input-icon-inactive"]]: variant === "inactive",
                })}
              />
            </button>
          )}
        </>
      )}
      {!!onClick && (
        <ClearIcon onClick={onClick} variant={variant} solid={solid} />
      )}
    </div>
  );
};

const SuccessIcon = ({ variant }: { variant?: InputVariant }) => {
  if (variant !== "valid") return null;

  return (
    <Icon
      testID="icon-valid"
      className={classNames(styles.suffix, styles["input-icon-valid"])}
      name="status-success"
      size="sm"
    />
  );
};
