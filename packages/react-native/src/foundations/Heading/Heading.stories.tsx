import type { Meta } from "@storybook/react";
import React from "react";

import { Heading } from "./Heading";

const meta: Meta<typeof Heading> = {
  title: "DesignSystem/Foundations/Typography/Heading",
  component: Heading,
  args: {
    size: "xl",
  },
  argTypes: {
    as: {
      description:
        "Generates a native tag based on the platform (e.g. H1 for web, UILabel for iOS and TextView for Android)",
    },
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
        options: ["xl", "lg", "default", "sm", "xs"],
      },
    },
  },
  decorators: [(Story) => <Story />],
};

export default meta;

type Story = typeof meta;

export const Basic: Story = {
  render: function Render({ ...args }) {
    return (
      <>
        <Heading {...args}>
          A palindrome is a word, number, phrase, or other sequence of symbols
          that reads the same backwards as forwards, such as the sentence: ‘A
          man, a plan, a canal – Panama’.
        </Heading>
        <Heading {...args} style={{ textTransform: "uppercase" }}>
          Heading with styleprop
        </Heading>
      </>
    );
  },
};

export const Centered: Story = {
  render: function Render({ ...args }) {
    return (
      <Heading alignment="center" {...args}>
        A palindrome is a word, number, phrase, or other sequence of symbols
        that reads the same backwards as forwards, such as the sentence: ‘A man,
        a plan, a canal – Panama’.
      </Heading>
    );
  },
};
