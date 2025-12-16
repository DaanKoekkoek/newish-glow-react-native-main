import type { Meta } from "@storybook/react";

import { Display } from "./Display";

const meta: Meta<typeof Display> = {
  title: "DesignSystem/Foundations/Typography/Display",
  component: Display,
  argTypes: {
    alignment: {
      control: {
        type: "select",
        options: ["left", "center"],
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
        options: ["sm", "md"],
      },
    },
    children: {
      description:
        "Accepts `React.ReactNode`. You can highlight text by wrapping it in square brackets (`[highlight]`) and insert line breaks using the pipe symbol (`|`).",
    },
  },
  args: {
    children:
      "A palindrome is a word, number, phrase, or other sequence of symbols that reads the same backwards as forwards, such as the sentence: 'A man, a plan, a canal - Panama'.",
  },
};

export default meta;

type Story = typeof meta;

export const Basic: Story = {
  args: {
    alignment: "left",
    color: "default",
    size: "sm",
  },
  render: function Render({ ...args }) {
    return <Display {...args} />;
  },
  parameters: {
    controls: {
      exclude: ["className", "testID"],
    },
  },
};

export const WithHighlights: Story = {
  args: {
    children: "Display with [highlight] | and a linebreak",
  },
};
