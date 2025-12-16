import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

import { ActionButtonGroup } from "./ActionButtonGroup";

const meta: Meta<typeof ActionButtonGroup> = {
  title: "DesignSystem/Components/Button/ActionButton/Group",
  component: ActionButtonGroup,
  argTypes: {},
  args: {
    children: [
      <ActionButtonGroup.Button
        onPress={() => {}}
        icon="4g-for-home"
        key="4g-for-home"
        label="label text"
      />,
      <ActionButtonGroup.Button
        onPress={() => {}}
        icon="3d"
        key="3d"
        label="label text"
      />,
      <ActionButtonGroup.Button
        onPress={() => {}}
        icon="add-device"
        key="add-device"
        label="label text"
      />,
    ],
  },
  decorators: [(Story) => <Story />],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const Emphasised: Story = {
  args: {
    children: [
      <ActionButtonGroup.Button
        onPress={() => {}}
        icon="4g-for-home"
        key="4g-for-home"
        label="label text"
        prominence="emphasised"
      />,
      <ActionButtonGroup.Button
        onPress={() => {}}
        icon="3d"
        key="3d"
        label="label text"
        prominence="emphasised"
      />,
      <ActionButtonGroup.Button
        onPress={() => {}}
        icon="add-device"
        key="add-device"
        label="label text"
        prominence="emphasised"
      />,
    ],
  },
};
