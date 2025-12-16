import { glyphmap as IconsMap } from "@odido-portals/glow-icon/fonts";
import type { Meta, StoryObj } from "@storybook/react";

import { AttentionText } from "./AttentionText";

const meta: Meta<typeof AttentionText> = {
  title: "DesignSystem/Foundations/Typography/AttentionText",
  component: AttentionText,
  argTypes: {
    icon: {
      options: Object.keys(IconsMap),
      control: { type: "select" },
    },
    variant: {
      options: ["success", "error"],
      control: {
        type: "select",
      },
    },
    size: {
      options: ["sm", "default"],
      control: {
        type: "select",
      },
    },
  },
  args: {
    children: "This is a default message.",
    variant: "success",
    size: "default",
  },
  parameters: {
    status: {
      type: ["qaPassed", "devReviewed"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: function Render({ ...args }) {
    return <AttentionText icon="status-info" {...args} />;
  },
};

export const WithoutIcon: Story = {
  args: {
    children: "Just a message without icon.",
  },
  render: function Render({ ...args }) {
    return <AttentionText {...args} />;
  },
};

export const Error: Story = {
  args: {
    children: "This is a small error message.",
    icon: "status-warning",
    variant: "error",
    size: "sm",
  },
};
