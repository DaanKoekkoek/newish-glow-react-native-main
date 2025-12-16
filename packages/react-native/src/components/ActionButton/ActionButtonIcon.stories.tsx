import { glyphmap as IconsMap } from "@odido-portals/glow-icon/fonts";
import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

import { ActionButtonIcon } from "./ActionButtonIcon";

const meta: Meta<typeof ActionButtonIcon> = {
  title: "DesignSystem/Components/Button/ActionButton/Icon",
  component: ActionButtonIcon,
  argTypes: {
    onPress: {
      type: "function",
    },
    stretched: {
      table: {
        disable: true,
      },
    },
    size: {
      options: ["default", "sm"],
      control: {
        type: "select",
      },
    },
    prominence: {
      options: ["default", "emphasised"],
      control: {
        type: "select",
      },
    },
    state: {
      options: ["disabled", "loading"],
      control: {
        type: "select",
      },
    },
    icon: {
      options: Object.keys(IconsMap),
      control: {
        type: "select",
      },
    },
  },
  args: {
    size: "default",
    inverted: false,
    prominence: "default",
    icon: "add",
  },
  decorators: [(Story) => <Story />],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const Emphasised: Story = {
  args: {
    prominence: "emphasised",
  },
};
