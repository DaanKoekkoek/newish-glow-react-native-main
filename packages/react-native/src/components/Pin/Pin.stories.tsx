import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { View } from "react-native";

import { Pin } from "./Pin";
import { InputLabel } from "../InputField/InputLabel";

const meta = {
  title: "DesignSystem/Components/Input/Pin",
  component: Pin,
  argTypes: {
    state: {
      options: ["default", "disabled", "success", "error", "loading"],
      control: "select",
    },
    errorMessage: {
      description: "Error text that is shown when `state` is set to `error`.",
    },
    loadingMessage: {
      description:
        "Helper text that is shown underneath the InputField. Is hidden when `state` is set to `error`.",
    },
    successMessage: {
      description:
        "Helper text that is shown underneath the InputField. Is hidden when `state` is set to `error`.",
    },
    onCompleted: {
      action: "onCompleted",
      type: "function",
      description:
        "Callback function that is called when the Pin has been input.",
    },
    masked: { control: { type: "boolean" } },
  },
  args: {
    length: 4,
    code: ["1", "2", "3", "4"],
    state: "default",
    masked: false,
    loadingMessage: "Loading message",
    errorMessage: "Error message",
    successMessage: "Success message",
  },
  decorators: [
    (Story) => (
      <View style={{ gap: 8 }}>
        <InputLabel text="Label" />
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof Pin>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};
