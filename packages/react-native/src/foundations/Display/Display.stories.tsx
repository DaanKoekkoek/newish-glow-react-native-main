import type { Meta } from "@storybook/react";
import React from "react";

import { Display } from "./Display";

const meta: Meta<typeof Display> = {
  title: "DesignSystem/Foundations/Typography/Display",
  component: Display,
  argTypes: {
    alignment: {
      control: {
        type: "select",
        options: ["left", "right", "center", "justify"],
      },
    },
    color: {
      control: {
        type: "select",
        options: ["default", "inverted"],
      },
    },
    size: {
      control: {
        type: "select",
        options: ["lg", "default", "sm", "xs", "xxs"],
      },
    },
  },
  decorators: [(Story) => <Story />],
};

export default meta;

type Story = typeof meta;

export const Basic: Story = {
  args: {
    size: "sm",
  },
  render: function Render({ ...args }) {
    return (
      <>
        <Display size="md" {...args}>
          A palindrome is a word, number, phrase, or other sequence of symbols
          that reads the same backwards as forwards, such as the sentence: ‘A
          man, a plan, a canal – Panama’.
        </Display>
        <Display size="md" {...args} style={{ textTransform: "uppercase" }}>
          Display with styleprop
        </Display>
      </>
    );
  },
};
