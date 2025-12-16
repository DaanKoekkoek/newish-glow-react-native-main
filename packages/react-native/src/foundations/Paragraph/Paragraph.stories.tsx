import type { Meta } from "@storybook/react";
import { TextLink } from "components/TextLink";
import React from "react";

import { Paragraph } from "./Paragraph";
import { Strong } from "../Strong";

const meta: Meta<typeof Paragraph> = {
  title: "DesignSystem/Foundations/Typography/Paragraph",
  component: Paragraph,
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
        <Paragraph size="lg" {...args}>
          A palindrome is a word, number, phrase, or other sequence of symbols
          that reads the same <Strong>backwards as forwards</Strong>, such as
          the sentence: ‘A man, a plan, a canal –{" "}
          <TextLink size="lg" href="#">
            Panama
          </TextLink>
          ’.
        </Paragraph>
        <Paragraph {...args} style={{ textTransform: "uppercase" }}>
          Paragraph with styleprop
        </Paragraph>
      </>
    );
  },
};
