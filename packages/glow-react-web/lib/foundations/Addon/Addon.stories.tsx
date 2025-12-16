import type { Meta, StoryObj } from "@storybook/react";

import { Addon } from "./Addon";
import { addonNames } from "./Addon.config";
import { Visible } from "utilities/Visibility";
import { AddonProps } from "./Addon.types";

const meta: Meta<typeof Addon> = {
  title: "DesignSystem/Foundations/Assets/LogosAndVisuals/Addon",
  component: Addon,
  argTypes: {
    name: {
      options: addonNames,
      control: { type: "select" },
    },
    size: {
      options: ["xs", "sm", "default"],
      control: { type: "select" },
    },
    state: {
      options: ["inactive", "default"],
      control: { type: "select" },
    },
  },
  args: {
    name: "Amazon Prime",
    size: "default",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AddonPerBreakpoint: Story = {
  render: (args: AddonProps) => {
    return (
      <>
        <Visible below="tablet">
          <Addon {...args} size="sm" /> {/* enfore `sm` size here */}
        </Visible>
        <Visible above="tablet">
          <Addon {...args} />
        </Visible>
      </>
    );
  },
};
