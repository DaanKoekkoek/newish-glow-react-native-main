import { glyphmap as IconsMap } from "@odido-portals/glow-icon/fonts";
import type { Meta, StoryObj } from "@storybook/react";

import { ActionButtonIcon } from ".";
import { renderCartesianVariants } from "@storybook/utils/renderVariants";

const meta: Meta<typeof ActionButtonIcon> = {
  title: "DesignSystem/Components/Button/ActionButton/IconActionButton",
  component: ActionButtonIcon,
  argTypes: {
    onClick: {
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
      options: ["default", "emphasised", "secondary"],
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
    icon: {
      options: Object.keys(IconsMap),
      control: {
        type: "select",
      },
    },
  },
  args: {
    size: "default",
    prominence: "default",
    state: undefined,
    inverted: false,
    icon: "add",
    ariaLabel: "Action button icon",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const Loading: Story = {
  args: {
    state: "loading",
  },
};

export const _Variants: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () =>
    renderCartesianVariants(
      ActionButtonIcon as React.ComponentType<Record<string, unknown>>,
      {
        icon: "add",
        ariaLabel: "Action button",
        onClick: () => console.log("Button clicked"),
        prominence: ["default", "secondary", "emphasised"],
        state: [undefined, "inactive", "loading"],
        inverted: [false, true],
        size: ["default", "sm"],
      },
      {
        groupBy: [
          (props: Record<string, unknown>) =>
            `Prominence: ${props.prominence as string}`,
          (props: Record<string, unknown>) =>
            `State: ${props.state || "default"}`,
        ],
        gap: "default",
      },
    ),
};
