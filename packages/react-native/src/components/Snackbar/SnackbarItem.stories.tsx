import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { useWindowDimensions } from "react-native";

import { SnackbarItem } from "./Snackbar";
import { mockSnack } from "./Snackbar.mocks";

const meta: Meta<typeof SnackbarItem> = {
  title: "DesignSystem/Components/Notifications/Snackbar/SnackbarItem",
  component: SnackbarItem,
  argTypes: {
    windowWidth: { type: "number" },
    dismissSnack: { action: "dismissSnack" },
    onLayout: { action: "onLayout" },
  },
  args: {
    snack: mockSnack({ position: "bottom", type: "loading" }),
  },
  decorators: [(Story) => <Story />],
  render: function SnackbarItemPlayground(args) {
    const { width } = useWindowDimensions();
    return <SnackbarItem {...args} windowWidth={width} />;
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    snack: mockSnack({
      message: "Your message goes here..",
      type: "default",
      icon: {
        name: "chat",
        solid: true,
      },
    }),
  },
};

export const Error: Story = {
  args: {
    snack: mockSnack({
      message: "Payment error occurred",
      type: "error",
    }),
  },
};

export const Success: Story = {
  args: {
    snack: mockSnack({
      message: "Your profile changes are saved!",
      type: "success",
    }),
  },
};

export const Loading: Story = {
  args: {
    snack: mockSnack({
      position: "bottom",
      type: "loading",
      cancelButtonText: "Cancel",
    }),
  },
};
