import type { Meta, StoryObj } from "@storybook/react";

import { Strong } from "./Strong";

const meta: Meta<typeof Strong> = {
  title: "DesignSystem/Foundations/Typography/Strong",
  component: Strong,
  args: {
    children:
      "A palindrome is a word, number, phrase, or other sequence of symbols that reads the same backwards as forwards, such as the sentence: ‘Aman, a plan, a canal – Panama’.",
    size: "default",
    alignment: "left",
    className: "",
    testID: "strong",
  },
  argTypes: {
    children: {
      control: "text",
      description: "The text content inside the <Strong> component",
    },
    size: {
      control: "select",
      options: ["xxs", "xs", "sm", "default", "lg"],
      description: "Size for strong",
      defaultValue: "default",
    },
    alignment: {
      control: "select",
      options: ["left", "center", "right"],
      description: "Text alignment inside the <Strong> component",
    },
    className: {
      control: "text",
      description: "Additional CSS class to apply",
    },
    testID: {
      control: "text",
      description: "Test ID for testing",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Strong>;

export const Basic: Story = {};
