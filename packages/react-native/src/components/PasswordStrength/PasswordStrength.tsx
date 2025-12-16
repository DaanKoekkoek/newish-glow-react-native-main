import { mergeTestIds } from "_utility";
import { useThemeProviderContext } from "components/index";
import { Icon } from "foundations/Icon";
import { Paragraph, Strong } from "foundations/index";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

import { calculatePasswordStrength } from "./PasswordStrength.calculator";
import type {
  PasswordRequirementKey,
  PasswordRequirementLabels,
  PasswordStrengthLabels,
  PasswordStrengthProps,
  StrengthLevels,
} from "./PasswordStrength.types";
import { PasswordStrengthIndicatorBar } from "./PasswordStrengthIndicatorBar";

export const PASSWORD_STRENGTH_INDICATOR_LABEL = "Dit wachtwoord is";

export const PASSWORD_STRENGTH_REQUIREMENTS_LABELS: PasswordRequirementLabels =
  {
    minimumCharacters: "Minimaal 8 tekens",
    lowerCaseLetters: "Minimaal 1 kleine letter",
    upperCaseLetters: "Minimaal 1 grote letter",
    numbers: "Cijfers",
    specialCharacters: "Symbolen toegestaan (!@#$)",
  };

const PASSWORD_STRENGTH_LABELS: PasswordStrengthLabels = {
  default: "",
  bad: "zwak",
  ok: "matig",
  good: "goed",
};

interface Strength {
  requirementsMet: Set<PasswordRequirementKey>;
  strengthLevel: StrengthLevels;
}

export const PasswordStrength = ({
  password,
  showRequirements = true,
  strengthIndicatorLabel = PASSWORD_STRENGTH_INDICATOR_LABEL,
  strengthLabels = PASSWORD_STRENGTH_LABELS,
  requirementsSummary,
  requirementsLabels = PASSWORD_STRENGTH_REQUIREMENTS_LABELS,
  onChange,
  testID,
}: PasswordStrengthProps) => {
  const requirements: PasswordRequirementKey[] = Object.keys(
    requirementsLabels,
  ) as PasswordRequirementKey[];

  const { styles } = useStyles(stylesheet);
  const { brand } = useThemeProviderContext();

  const [strength, setStrength] = useState<Strength>({
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

  const passwordStrengthTestID = mergeTestIds(testID, "password-strength");

  return (
    <View
      testID={passwordStrengthTestID}
      style={styles.passwordStrengthWrapper}
    >
      <View style={styles.passwordStrengthIndicator}>
        <Paragraph size="sm">
          {strengthIndicatorLabel}{" "}
          <Strong size="sm">{strengthLabels[strength.strengthLevel]}</Strong>
        </Paragraph>
        <View style={styles.strengthProgressBars}>
          {requirements.map((requirement, i) => (
            <PasswordStrengthIndicatorBar
              key={`bar-${requirement}`}
              strengthLevel={
                i < strength.requirementsMet.size
                  ? strength.strengthLevel
                  : "default"
              }
            />
          ))}
        </View>
      </View>
      {showRequirements && (
        <View style={styles.passwordRequirementList}>
          {requirementsSummary && (
            <Paragraph size="sm">{requirementsSummary}</Paragraph>
          )}
          {requirements.map((requirement) => (
            <View
              style={styles.passwordRequirement}
              key={`requirement-${requirement}`}
            >
              {strength.requirementsMet.has(requirement) ? (
                <Text style={styles.iconSuccess}>
                  <Icon
                    brand={brand !== "simpel" ? brand : undefined}
                    name="status-success"
                    size="default"
                  />
                </Text>
              ) : (
                <Text style={styles.iconRequired}>
                  <Icon
                    brand={brand !== "simpel" ? brand : undefined}
                    name="min"
                    size="default"
                  />
                </Text>
              )}
              <Paragraph size="sm">{requirementsLabels[requirement]}</Paragraph>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const stylesheet = createStyleSheet(
  ({
    themes: {
      components: { input },
    },
  }) => ({
    iconSuccess: {
      color: input.color.icon.success,
      display: "flex",
    },
    iconRequired: {
      color: input.color.icon.optional,
      display: "flex",
    },
    passwordStrengthWrapper: {
      marginTop: input.gap.vertical.default,
      gap: input.gap.vertical.xl,
    },
    passwordStrengthIndicator: {
      gap: input.gap.vertical.default,
    },
    strengthProgressBars: {
      display: "flex",
      flexDirection: "row",
      gap: input.gap.horizontal.sm,
      maxWidth: input.atoms.passwordIndicator.size.maxWidth,
    },
    passwordRequirementList: {
      gap: input.atoms.dropdown.gap.vertical,
    },
    passwordRequirement: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: input.gap.horizontal.default,
    },
  }),
);
