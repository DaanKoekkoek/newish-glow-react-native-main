export type PasswordRequirementKey =
  | "minimumCharacters"
  | "lowerCaseLetters"
  | "upperCaseLetters"
  | "numbers"
  | "specialCharacters";

export type PasswordRequirementLabels = {
  [K in PasswordRequirementKey]: string;
};

export type StrengthLevels = "default" | "bad" | "ok" | "good";

export type PasswordStrengthLabels = Record<StrengthLevels, string>;

export interface PasswordStrengthIndicatorBarProps {
  strengthLevel: StrengthLevels;
}

export interface PasswordStrengthProps {
  password: string;
  showRequirements?: boolean;
  strengthIndicatorLabel?: string;
  strengthLabels?: PasswordStrengthLabels;
  requirementsSummary?: string;
  requirementsLabels?: PasswordRequirementLabels;
  onChange?: (password: string, currentStrength: StrengthLevels) => void;
  testID?: string | undefined;
}
