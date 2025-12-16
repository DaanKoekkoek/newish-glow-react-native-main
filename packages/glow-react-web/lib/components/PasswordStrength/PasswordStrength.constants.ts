import {
  PasswordRequirementLabels,
  PasswordStrengthLabels,
} from "./PasswordStrength.types";

export const PASSWORD_STRENGTH_INDICATOR_LABEL = "Dit wachtwoord is";

export const PASSWORD_STRENGTH_REQUIREMENTS_LABELS: PasswordRequirementLabels =
  {
    minimumCharacters: "Minimaal 8 tekens",
    lowerCaseLetters: "Minimaal 1 kleine letter",
    upperCaseLetters: "Minimaal 1 grote letter",
    numbers: "Cijfers",
    specialCharacters: "Symbolen toegestaan (!@#$)",
  };

export const PASSWORD_STRENGTH_LABELS: PasswordStrengthLabels = {
  default: "",
  bad: "zwak",
  ok: "matig",
  good: "goed",
};

export const PASSWORD_STRENGTH_PROGRESS_INDICATOR_TESTID =
  "strength-progress-indicator";
