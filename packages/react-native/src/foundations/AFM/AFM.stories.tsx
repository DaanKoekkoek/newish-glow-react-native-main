import type { Meta } from "@storybook/react";
import React from "react";
import { View } from "react-native";

import { AFM } from "./AFM";

const meta: Meta<typeof AFM> = {
  title: "DesignSystem/Foundations/Assets/LogosAndVisuals/AFM",
  component: AFM,
  decorators: [
    (Story) => (
      <View style={{ padding: 16 }}>
        <Story />
      </View>
    ),
  ],
};
export default meta;

type Story = typeof meta;

export const Basic: Story = {};
