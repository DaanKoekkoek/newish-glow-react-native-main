import type { Meta, StoryObj } from "@storybook/react";

import { Tooltip } from "./Tooltip";
import { Icon } from "foundations/Icon";
import { Paragraph } from "foundations/Paragraph";
import { Stack } from "foundations/Stack";

const meta: Meta<typeof Tooltip> = {
  title: "DesignSystem/Components/Overlay/Tooltip",
  component: Tooltip,
  argTypes: {},
  args: {
    description: "This is a tooltip",
    animated: false,
    tipPosition: "left",
    closeButton: false,
  },
  parameters: {
    status: {
      type: ["devReviewed"],
    },
  },
  render: (args) => (
    <Stack direction="row" alignItems="center" gap={50}>
      <Paragraph size="sm">Hover over me</Paragraph>
      <Tooltip {...args}>
        <Icon name="status-info" size="sm" />
      </Tooltip>
    </Stack>
  ),
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Animated: Story = {
  args: {
    animated: true,
  },
};

export const LongDescription: Story = {
  args: {
    closeButton: true,
    description:
      "This is a tooltip with a long description that should wrap to multiple lines. It should be able to handle long text gracefully without breaking the layout.",
  },
};
