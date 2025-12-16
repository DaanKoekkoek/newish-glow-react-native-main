import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

import { Snackbar } from "./Snackbar";
import { SnackbarPlayground } from "./Snackbar.mocks";
import type { SnackbarProps } from "./Snackbar.types";

const meta: Meta<typeof Snackbar> = {
  title: "DesignSystem/Components/Notifications/Snackbar",
  component: Snackbar,
  argTypes: {
    onSnackHide: { action: "onSnackHide" },
    onSnackPress: { action: "onLayout" },
    onSnackShow: { action: "onSnackShow" },
    context: {
      control: { type: "select", options: ["persists", "modal", "default"] },
    },
    topOffset: { type: "number" },
  },
  args: {},
  decorators: [(Story) => <Story />],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Bottom: Story = {
  args: {},
  argTypes: {
    topOffset: {
      table: {
        disable: true,
      },
    },
  },
  render: function Render(args: SnackbarProps) {
    return <SnackbarPlayground {...args} position="bottom" />;
  },
};

export const Top: Story = {
  render: function Render(args: SnackbarProps) {
    return <SnackbarPlayground {...args} position="top" />;
  },
};
