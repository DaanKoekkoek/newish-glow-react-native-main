import type { Meta, StoryObj } from "@storybook/react";
import { Paragraph, Strong } from "foundations/index";
import React from "react";

import { Callout } from "./Callout";
import { Button } from "../Button";
import { TextLink } from "../TextLink";

const meta: Meta<typeof Callout> = {
  title: "DesignSystem/Components/Notifications/Callout",
  component: Callout,
  argTypes: {
    triggers: {
      description:
        "Accepts an array of `Button` components. Automatically applies the `prominence` prop from the `Button`, based on the index.",
    },
    description: {
      description: "Is rendered when `content` is set to `default`.",
    },
    children: {
      control: "none",
      description:
        "Is rendered when `content` to `alternate`. Accepts a `React.ReactElement`.",
    },
    content: {
      options: ["default", "alternate"],
      control: {
        type: "select",
      },
      description:
        "Renders the value from the `description` prop when set to `default`. Otherwise, renders `children`.",
    },
    status: {
      options: ["default", "success", "warning", "error"],
      control: {
        type: "select",
      },
    },
    tipPosition: {
      options: ["default", "top"],
      control: {
        type: "select",
      },
    },
  },
  args: {
    title: "Test Callout",
    description: "A callout description",
    triggers: [
      <Button
        onPress={() => {
          console.log("callout primary button click");
        }}
      >
        Primary button
      </Button>,
      <Button
        onPress={() => {
          console.log("callout secondary button click");
        }}
      >
        Secondary button
      </Button>,
    ],
  },
  decorators: [(Story) => <Story />],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    status: "default",
    children: (
      <Paragraph>
        A palindrome is a word, number, phrase, or other sequence of symbols
        that reads the same <Strong>backwards as forwards</Strong>, such as the
        sentence: ‘A man, a plan, a canal – <TextLink href="#">Panama</TextLink>
        ’.
      </Paragraph>
    ),
  },
};

export const WithoutButtons: Story = {
  args: {
    triggers: [],
  },
};

export const OneButton: Story = {
  args: {
    triggers: [
      <Button
        onPress={() => {
          console.log("callout primary button click");
        }}
      >
        Primary button
      </Button>,
    ],
  },
};

export const Success: Story = {
  args: {
    status: "success",
  },
};

export const Warning: Story = {
  args: {
    status: "warning",
  },
};

export const Error: Story = {
  args: {
    status: "error",
  },
};
