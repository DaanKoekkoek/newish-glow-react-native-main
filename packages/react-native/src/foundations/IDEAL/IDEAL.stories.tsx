import type { Meta } from "@storybook/react";
import React from "react";
import { View } from "react-native";

import { IDEAL } from "./IDEAL";

const meta: Meta<typeof IDEAL> = {
  title: "DesignSystem/Foundations/Assets/LogosAndVisuals/IDEAL",
  component: IDEAL,
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
