import { Heading, Paragraph } from "foundations/index";
import { useMemo } from "react";
import styles from "./Counter.module.scss";
import classNames from "classnames";
import { useRemainingTime } from "./hooks";
import { getCounterUnits, isUnitPassed } from "./Counter.utils";
import type { CounterProps } from "./Counter.types";
import { useGenerateClassNames } from "_global-hooks";
import { BaseText } from "_internals/Typography";
import { tokenClassNames } from "_utility";

export const Counter = ({
  targetDate,
  variant = "default",
  prominence = "default",
  size = "default",
  palette = "default",
  digits = 4,
  digitDaysLabel = "Dagen",
  freeze = false,
  testID = "counter",
  onCompleted,
}: CounterProps & { onCompleted?: () => void }) => {
  const sizeClasses = useGenerateClassNames(styles, size, "size");
  const remainingTime = useRemainingTime(
    targetDate,
    digits,
    variant,
    freeze,
    onCompleted,
  );

  const units = useMemo(
    () => getCounterUnits(variant, digits, digitDaysLabel),
    [variant, digits, digitDaysLabel],
  );

  const unitPassedMap = useMemo(() => {
    const result: { [unit: string]: boolean } = {};
    units.forEach(({ unit }) => {
      result[unit] = isUnitPassed(unit, units, remainingTime);
    });
    return result;
  }, [units, remainingTime]);

  return (
    <div className={tokenClassNames(styles, "counter")} data-testid={testID}>
      <div className={classNames(styles["counter-digits-group"], sizeClasses)}>
        {!!units &&
          units?.map(({ unit, label }, index) => {
            const digits = remainingTime[unit]
              ?.toString()
              .padStart(2, "0")
              .split("");
            const isPassed = unitPassedMap[unit];

            return (
              <div
                key={index}
                className={classNames(styles["counter-digits-and-label"], {
                  [styles[`counter-subtle-${palette}`]]:
                    prominence === "subtle",
                  [styles["is-inactive"]]: isPassed,
                })}
                data-testid={`${testID}-unit-${unit}`}
                role="timer"
              >
                <div className={styles["counter-digits-and-divider"]}>
                  <div className={styles["counter-digits"]}>
                    {digits?.map((digit, index) => (
                      <div key={index} className={styles["counter-digit"]}>
                        <Heading
                          as="span"
                          className={styles["counter-digit-heading"]}
                          testID={`${testID}-digit`}
                        >
                          {digit}
                        </Heading>
                      </div>
                    ))}
                  </div>
                  {index < units.length - 1 && (
                    <BaseText className={styles["counter-divider"]}>:</BaseText>
                  )}
                </div>
                {variant === "default" && (
                  <Paragraph
                    as="span"
                    size="xs"
                    testID={`${testID}-label`}
                    className={styles["counter-label"]}
                  >
                    {label}
                  </Paragraph>
                )}
              </div>
            );
          })}
      </div>
      {variant === "hoursOnly" && (
        <Paragraph
          as="span"
          size="xs"
          testID={`${testID}-label-hoursonly`}
          className={classNames(
            styles["counter-label"],
            styles["counter-label-hoursonly"],
            {
              [styles["is-inactive"]]:
                remainingTime.hours === 0 && remainingTime.minutes === 0,
            },
          )}
        >
          Uur over
        </Paragraph>
      )}
    </div>
  );
};
