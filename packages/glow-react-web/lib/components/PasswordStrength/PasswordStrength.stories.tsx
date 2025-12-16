import type { Meta, StoryObj } from "@storybook/react";
import { PasswordStrength } from "./PasswordStrength";

const meta = {
  title: "DesignSystem/Components/Input/PasswordStrength",
  component: PasswordStrength,
  args: {
    showRequirements: true,
  },
  argTypes: {
    showRequirements: { control: { type: "boolean" } },
  },
} satisfies Meta<typeof PasswordStrength>;

export default meta;

// Default story
export const Basic: StoryObj<typeof PasswordStrength> = {
  args: {
    showRequirements: true,
  },
};

// Localized story
export const Localized: StoryObj<typeof PasswordStrength> = {
  args: {
    showRequirements: true,
    strengthIndicatorLabel: "This password is",
    strengthLabels: {
      default: "",
      bad: "weak",
      ok: "moderate",
      good: "strong",
    },
    requirementsSummary: "Your password must contain:",
    requirementsLabels: {
      minimumCharacters: "Minimum 8 characters",
      lowerCaseLetters: "Minimum 1 lower case letter",
      upperCaseLetters: "Minimum 1 upper case letter",
      numbers: "Numbers",
      specialCharacters: "Special characters",
    },
  },
};
