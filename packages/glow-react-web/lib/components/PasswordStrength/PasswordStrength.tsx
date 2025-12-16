import { useEffect, useState } from "react";

import type {
  PasswordRequirementKey,
  PasswordStrengthProps,
  StrengthLevels,
} from "./PasswordStrength.types";
import {
  PASSWORD_STRENGTH_INDICATOR_LABEL,
  PASSWORD_STRENGTH_LABELS,
  PASSWORD_STRENGTH_PROGRESS_INDICATOR_TESTID,
  PASSWORD_STRENGTH_REQUIREMENTS_LABELS,
} from "./PasswordStrength.constants";
import { calculatePasswordStrength } from "./PasswordStrength.calculator";
import styles from "./PasswordStrength.module.scss";
import classNames from "classnames";
import { Paragraph } from "foundations/Paragraph";
import { Strong } from "foundations/Strong";
import { Icon } from "foundations/Icon";
import { tokenClassNames } from "_utility";

export const PasswordStrength = ({
  password = "",
  showRequirements = true,
  strengthIndicatorLabel = PASSWORD_STRENGTH_INDICATOR_LABEL,
  strengthLabels = PASSWORD_STRENGTH_LABELS,
  requirementsSummary,
  requirementsLabels = PASSWORD_STRENGTH_REQUIREMENTS_LABELS,
  onChange,
  testID,
}: PasswordStrengthProps) => {
  const requirements = Object.keys(
    requirementsLabels,
  ) as PasswordRequirementKey[];

  const [strength, setStrength] = useState<{
    requirementsMet: Set<PasswordRequirementKey>;
    strengthLevel: StrengthLevels;
  }>({
    requirementsMet: new Set(),
    strengthLevel: "default",
  });

  useEffect(() => {
    const [requirementsMet, currentStrength] =
      calculatePasswordStrength(password);
    setStrength({
      requirementsMet,
      strengthLevel: currentStrength,
    });

    onChange?.(password, currentStrength);
  }, [onChange, password]);

  return (
    <div
      data-testid={testID}
      className={tokenClassNames(styles, "password-strength")}
    >
      <div className={styles.strength}>
        <Paragraph size="sm">
          {strengthIndicatorLabel}{" "}
          <Strong size="sm">{strengthLabels[strength.strengthLevel]}</Strong>
        </Paragraph>
        <div className={styles.requirement}>
          {requirements.map((requirement, i) => (
            <div
              key={`bar-${requirement}`}
              className={classNames(
                styles.indicator,
                styles[
                  i < strength.requirementsMet.size
                    ? strength.strengthLevel
                    : "default"
                ],
              )}
              data-testid={PASSWORD_STRENGTH_PROGRESS_INDICATOR_TESTID}
            />
          ))}
        </div>
      </div>
      {showRequirements && (
        <div className={styles.requirements}>
          {requirementsSummary && (
            <Paragraph size="sm">{requirementsSummary}</Paragraph>
          )}
          {requirements.map((requirement) => (
            <div
              key={`requirement-${requirement}`}
              className={styles["password-requirement"]}
            >
              {strength.requirementsMet.has(requirement) ? (
                <Icon
                  name="status-success"
                  size="default"
                  className={styles["icon-success"]}
                />
              ) : (
                <Icon
                  name="min"
                  size="default"
                  className={styles["icon-optional"]}
                />
              )}
              <Paragraph size="sm">{requirementsLabels[requirement]}</Paragraph>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
