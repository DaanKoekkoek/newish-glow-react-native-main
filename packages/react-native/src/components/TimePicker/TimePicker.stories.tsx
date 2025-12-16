import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { View } from "react-native";

import { TimePicker } from "./TimePicker";

const meta: Meta<typeof TimePicker> = {
  title: "DesignSystem/Components/Input/TimePicker",
  component: TimePicker,
  argTypes: {
    minutesStep: {
      options: [1, 5, 10],
      control: "select",
    },
    label: {
      description: "Label text",
    },
    validated: {
      description: "Changes the state of the component based on validation.",
    },
  },
  args: {
    hoursOptions: [
      {
        label: "12",
        value: "12",
      },
      {
        label: "13",
        value: "13",
      },
      {
        label: "14",
        value: "14",
      },
      {
        label: "15",
        value: "15",
      },
      {
        label: "16",
        value: "16",
      },
      {
        label: "17",
        value: "17",
      },
      {
        label: "18",
        value: "18",
      },
      {
        label: "19",
        value: "19",
      },
      {
        label: "20",
        value: "20",
      },
    ],
    label: {
      text: "Label",
      optional: false,
      info: "Info text",
    },
    placeholderHours: "Hours",
    placeholderMinutes: "Minutes",
    helperText: "Helper text",
    validated: undefined,
  },
  decorators: [
    (Story) => (
      <View style={{ gap: 8 }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof TimePicker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const Success: Story = {
  args: {
    validated: {
      success: true,
    },
  },
};

export const Error: Story = {
  args: {
    validated: {
      success: false,
      message: "Something went wrong!",
    },
  },
};
