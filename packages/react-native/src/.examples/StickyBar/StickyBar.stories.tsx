import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

import { StickyBarScreen } from "./StickyBar";
import { StickyBar, type StickyBarProps } from "components/StickyBar";

const meta: Meta<StickyBarProps> = {
  title: "Examples/StickyBar",
  component: StickyBar,
};

export default meta;
type Story = StoryObj<typeof StickyBarScreen>;

export const Top: Story = {
  render: () => {
    return <StickyBarScreen position="top" layout="default" />;
  },
};

export const Bottom: Story = {
  render: () => {
    return <StickyBarScreen position="bottom" layout="default" />;
  },
};

export const TopStacked: Story = {
  render: () => {
    return <StickyBarScreen position="top" layout="stacked" />;
  },
};

export const BottomStacked: Story = {
  render: () => {
    return <StickyBarScreen position="bottom" layout="stacked" />;
  },
};
