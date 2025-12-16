import {
  PasswordRequirementKey,
  StrengthLevels,
} from "./PasswordStrength.types";

type PasswordRequirement = (password: string) => boolean;

const minimumCharacters: PasswordRequirement = (password) =>
  password.length >= 8;
const lowerCaseLetters: PasswordRequirement = (password) =>
  !!password.match(/(?=.*[a-z])/g);
const upperCaseLetters: PasswordRequirement = (password) =>
  !!password.match(/(?=.*[A-Z])/g);
const numbers: PasswordRequirement = (password) =>
  !!password.match(/[0-9]{1,}/g);
const specialCharacters: PasswordRequirement = (password) =>
  !!password.match(/[\^!@$%&/()=?+*#\-_.:,;]{1,}/g);

const passwordRequirements: {
  name: PasswordRequirementKey;
  callback: PasswordRequirement;
}[] = [
  { name: "minimumCharacters", callback: minimumCharacters },
  { name: "lowerCaseLetters", callback: lowerCaseLetters },
  { name: "upperCaseLetters", callback: upperCaseLetters },
  { name: "numbers", callback: numbers },
  { name: "specialCharacters", callback: specialCharacters },
];

const calculateStrengthLevel = (strengthPoints: number): StrengthLevels => {
  if (strengthPoints === 0) return "default";
  if (strengthPoints < 3) return "bad";
  if (strengthPoints < 5) return "ok";
  return "good";
};

export const calculatePasswordStrength = (
  password: string,
): [Set<PasswordRequirementKey>, StrengthLevels] => {
  const requirementsMet = new Set<PasswordRequirementKey>(
    passwordRequirements
      .filter(({ callback }) => callback(password))
      .map(({ name }) => name),
  );

  return [requirementsMet, calculateStrengthLevel(requirementsMet.size)];
};
