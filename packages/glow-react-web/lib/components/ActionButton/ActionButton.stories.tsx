import { glyphmap as IconsMap } from "@odido-portals/glow-icon/fonts";
import type { Meta, StoryObj } from "@storybook/react";

import { ActionButton, ActionButtonProps } from "./ActionButton";
import { renderCartesianVariants } from "@storybook/utils/renderVariants";

const meta: Meta<typeof ActionButton> = {
  title: "DesignSystem/Components/Button/ActionButton/ActionButton",
  component: ActionButton,
  argTypes: {
    onClick: {
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
      options: [undefined, "inactive", "loading"],
      control: {
        type: "select",
      },
    },
  },
  args: {
    label: "label text",
    icon: "add",
    prominence: "default",
    inverted: false,
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const _Variants: Story = {
  render: (props) =>
    renderCartesianVariants(
      (props: ActionButtonProps, idx: number) => (
        <ActionButton {...props} label={`${props.label} ${idx + 1}`} />
      ),
      {
        ...props,
        state: ["default", "inactive", "loading"],
        prominence: ["default", "secondary", "emphasised"],
        inverted: [false, true],
      },
      {
        groupBy: (props) => `State: ${props.state}`,
      },
    ),
};
