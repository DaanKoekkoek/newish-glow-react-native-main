import { glyphmap as IconsMap } from "@odido-portals/glow-icon/fonts";
import type { Meta, StoryObj } from "@storybook/react";

import { ActionButton } from "./ActionButton";

const meta: Meta<typeof ActionButton> = {
  title: "DesignSystem/Components/Button/ActionButton/Default",
  component: ActionButton,
  argTypes: {
    onPress: {
      type: "function",
    },
    icon: {
      options: Object.keys(IconsMap),
      control: { type: "select" },
      description: "Select an icon to display with the action button.",
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
  },
  args: {
    label: "label text",
    icon: "plus",
    prominence: "default",
    inverted: false,
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const Emphasised: Story = {
  args: {
    prominence: "emphasised",
  },
};
