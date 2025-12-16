import type { Meta, StoryObj } from "@storybook/react";
import { switchPaletteKeys } from "_theming/tokenLoader";
import { Paragraph, Strong } from "foundations/index";
import React from "react";

import { Accordion } from "./Accordion";
import { TextLink } from "../TextLink";

const meta: Meta<typeof Accordion> = {
  title: "DesignSystem/Components/Accordion",
  component: Accordion,
  argTypes: {
    children: {
      table: {
        disable: true,
      },
    },
    palette: {
      control: { type: "select" },
      options: [...switchPaletteKeys],
      description: "Set the colour palette of the dot color.",
    },
  },
  args: {
    inverted: false,
    children: [
      <Accordion.Step key={1} title="Title 1">
        <Paragraph>
          A palindrome is a word, number, phrase, or other sequence of symbols
          that reads the same <Strong>backwards as forwards</Strong>, such as
          the sentence: ‘A man, a plan, a canal –{" "}
          <TextLink href="#">Panama</TextLink>
          ’.
        </Paragraph>
      </Accordion.Step>,
      <Accordion.Step key={2} title="Title 2">
        <Paragraph>
          A palindrome is a word, number, phrase, or other sequence of symbols
          that reads the same <Strong>backwards as forwards</Strong>, such as
          the sentence: ‘A man, a plan, a canal –{" "}
          <TextLink href="#">Panama</TextLink>
          ’.
        </Paragraph>
      </Accordion.Step>,
      <Accordion.Step key={3} title="Title 3">
        <Paragraph>
          A palindrome is a word, number, phrase, or other sequence of symbols
          that reads the same <Strong>backwards as forwards</Strong>, such as
          the sentence: ‘A man, a plan, a canal –{" "}
          <TextLink href="#">Panama</TextLink>
          ’.
        </Paragraph>
      </Accordion.Step>,
      <Accordion.Step key={4} title="Title 4">
        <Paragraph>
          A palindrome is a word, number, phrase, or other sequence of symbols
          that reads the same <Strong>backwards as forwards</Strong>, such as
          the sentence: ‘A man, a plan, a canal –{" "}
          <TextLink href="#">Panama</TextLink>
          ’.
        </Paragraph>
      </Accordion.Step>,
      <Accordion.Step key={5} title="Title 5">
        <Paragraph>
          A palindrome is a word, number, phrase, or other sequence of symbols
          that reads the same <Strong>backwards as forwards</Strong>, such as
          the sentence: ‘A man, a plan, a canal –{" "}
          <TextLink href="#">Panama</TextLink>
          ’.
        </Paragraph>
      </Accordion.Step>,
    ],
  },
  decorators: [
    (Story, context) => {
      // Get the current brand from globals
      const currentBrand = context.globals.theme || "odido";

      // shadowPalette options based on the current brand.
      if (context.argTypes?.palette) {
        switch (currentBrand) {
          case "switch":
            context.argTypes.palette.options = [
              undefined,
              ...switchPaletteKeys,
            ];
            break;
          case "odido":
          default:
            context.argTypes.palette.options = [];
            break;
        }
      }
      return <Story />;
    },
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    inverted: false,
  },
};
