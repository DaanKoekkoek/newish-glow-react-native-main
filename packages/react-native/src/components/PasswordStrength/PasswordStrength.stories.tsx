import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import type {
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from "react-native";

import { PasswordStrength } from "./PasswordStrength";
import type { PasswordStrengthProps } from "./PasswordStrength.types";
import { InputField } from "../InputField";

const meta = {
  title: "DesignSystem/Components/Input/PasswordStrength",
  component: PasswordStrength,
  args: {
    showRequirements: true,
  },
  argTypes: {
    showRequirements: { control: { type: "boolean" } },
  },
  decorators: [(Story) => <Story />],
} satisfies Meta<typeof PasswordStrength>;

export default meta;

const Template = (args: Omit<PasswordStrengthProps, "password">) => {
  const onChangeHandler = (
    evt: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    setPassword(evt.nativeEvent.text);
  };

  const [password, setPassword] = useState("");

  return (
    <>
      <InputField
        label={{ text: "Wachtwoord" }}
        onChange={onChangeHandler}
        type="password"
      />
      <PasswordStrength password={password} {...args} />
    </>
  );
};

// Default story
export const Basic: StoryObj<typeof PasswordStrength> = {
  render: (args) => <Template {...args} />,
  args: {
    showRequirements: true,
  },
};

// Localized story
export const Localized: StoryObj<typeof PasswordStrength> = {
  render: (args) => <Template {...args} />,
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
