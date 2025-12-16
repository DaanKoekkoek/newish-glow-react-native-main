import classNames from "classnames";
import type { SelectProps } from "./Select.types";
import styles from "./Select.module.scss";
import { Icon } from "foundations/Icon";
import { InputContainer } from "_internals/Form";
import { tokenClassNames } from "_utility";

export const Select = ({
  id,
  options,
  value,
  helperText,
  placeholder,
  legend,
  onChange,
  inactive,
  validated,
  testID = "select",
}: SelectProps) => {
  // Get groups from options
  const uniqueGroups = [
    ...new Set(
      options
        .filter((option) => option.group !== undefined)
        .map((option) => option.group),
    ),
  ];

  return (
    <InputContainer
      helperText={helperText}
      showHelper={true}
      validated={validated}
      id={id}
      legend={legend}
      className={tokenClassNames(styles, "select")}
    >
      <select
        id={id}
        value={value}
        data-testid={testID}
        aria-invalid={validated?.valid === false}
        disabled={inactive}
        aria-describedby={helperText && `${id}-helper`}
        onChange={(event) => onChange?.(event.target.value)}
        className={classNames(styles["select-input"], {
          [styles.valid]: validated?.valid === true,
          [styles.error]: validated?.valid === false,
          [styles["placeholder-active"]]: value === "" && !!placeholder,
        })}
      >
        <option value="" disabled hidden>
          {placeholder}
        </option>
        {uniqueGroups.length > 0
          ? (() => {
              return (
                <>
                  {/* Render options that don't have groups */}
                  {options
                    .filter((option) => option.group === undefined)
                    .map((option, index) => (
                      <option
                        className={styles["select-item"]}
                        key={`${option.value}-${index}`}
                        value={option.value}
                        data-testid={`${testID}-${option.value}`}
                      >
                        {option.name}
                      </option>
                    ))}

                  {/* Render optgroups */}
                  {uniqueGroups.map((group) => {
                    return (
                      <optgroup
                        key={group}
                        label={group}
                        className={styles["select-group"]}
                      >
                        {options
                          .filter((option) => option.group === group)
                          .map((option, index) => (
                            <option
                              className={styles["select-item"]}
                              key={`${option.value}-${index}`}
                              value={option.value}
                              data-testid={`${testID}-${option.value}`}
                            >
                              {option.name}
                            </option>
                          ))}
                      </optgroup>
                    );
                  })}
                </>
              );
            })()
          : options.map((option, index) => (
              <option
                className={styles["select-item"]}
                key={`${option.value}-${index}`}
                value={option.value}
                data-testid={`${testID}-${option.value}`}
              >
                {option.name}
              </option>
            ))}
      </select>
      <span
        className={styles["select-suffix-icon-container"]}
        aria-hidden="true"
      >
        {validated?.valid === true && !inactive && (
          <Icon
            name="oval-checkmark"
            size="sm"
            testID={`${testID}-icon-valid`}
            className={classNames(
              styles["select-suffix-icon"],
              styles["input-icon-valid"],
            )}
          />
        )}
        <Icon
          name="chevron-down"
          className={classNames(
            styles["select-suffix-chevron-icon"],
            styles["select-suffix-icon"],
            {
              [styles["suffix-inactive"]]: inactive,
            },
          )}
          size="default"
        />
      </span>
    </InputContainer>
  );
};
