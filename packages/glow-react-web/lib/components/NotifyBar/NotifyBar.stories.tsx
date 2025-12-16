import { glyphmap as IconsMap } from "@odido-portals/glow-icon/fonts";
import type { Meta, StoryObj } from "@storybook/react";

import { NotifyBar } from "./NotifyBar";

const meta: Meta<typeof NotifyBar> = {
  title: "DesignSystem/Components/Notifications/NotifyBar",
  component: NotifyBar,
  tags: ["no-grid"],
  argTypes: {
    icon: {
      options: Object.keys(IconsMap),
      control: { type: "select" },
      description: "Select an icon to display within the notify bar.",
    },
    state: {
      control: { type: "select" },
    },
    onClose: { action: "onClose", type: "function" },
    onActionPress: { action: "onActionPress", type: "function" },
  },
  args: {
    closeText: "Close",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    actionText: "Call to action",
    children: "This is a default notification.",
  },
};

export const Success: Story = {
  args: {
    children: "This is a success notification.",
    state: "success",
  },
};

export const Error: Story = {
  args: {
    children: "This is an error notification.",
    state: "error",
    icon: "status-warning",
  },
};

export const WithAction: Story = {
  args: {
    children: "This is a notification with an action button.",
    actionText: "Refresh",
  },
};

export const WithClose: Story = {
  args: {
    children: "This is a notification with a custom icon.",
    icon: "4g-for-home",
  },
};

export const FullExample: Story = {
  args: {
    children:
      "This is a notification with both an action and a close button and an icon.",
    actionText: "Refresh",
    state: "default",
    icon: "status-info",
  },
};
