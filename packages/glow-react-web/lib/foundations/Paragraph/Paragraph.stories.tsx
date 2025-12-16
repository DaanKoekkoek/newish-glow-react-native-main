import type { Meta } from "@storybook/react";

import { Paragraph } from "./Paragraph";
import { Strong } from "../Strong";
import { TextLink } from "../../components/TextLink/TextLink";

const meta: Meta<typeof Paragraph> = {
  title: "DesignSystem/Foundations/Typography/Paragraph",
  component: Paragraph,
  argTypes: {
    size: {
      control: "select",
      options: ["xxs", "xs", "sm", "default", "lg"],
    },
    alignment: {
      control: "select",
      options: ["left", "center", "right"],
    },
    className: { control: "text" },
    style: { control: "object" },
    children: { control: false },
    id: { control: "text" },
    testID: { control: "text" },
    dataAttributes: { control: false },
  },
};

export default meta;

type Story = typeof meta;

export const Basic: Story = {
  render: function Render({ ...args }) {
    return (
      <>
        <Paragraph {...args}>
          A palindrome is a word, number, phrase, or other sequence of symbols
          that reads the same <Strong>backwards as forwards</Strong>, such as
          the sentence: ‘A man, a plan, a canal –{" "}
          <TextLink href="#">Panama</TextLink>
          ’.
        </Paragraph>
        <Paragraph {...args} style={{ textTransform: "uppercase" }}>
          Paragraph with style prop
        </Paragraph>
      </>
    );
  },
};

export const StrongParagraph: Story = {
  render: function Render({ ...args }) {
    return (
      <>
        <Paragraph {...args}>
          <Strong>
            A palindrome is a word, number, phrase, or other sequence of symbols
            that reads the same backwards as forwards, such as the sentence: ‘A
            man, a plan, a canal – <TextLink href="#">Panama</TextLink> ’.
          </Strong>
        </Paragraph>
      </>
    );
  },
};
