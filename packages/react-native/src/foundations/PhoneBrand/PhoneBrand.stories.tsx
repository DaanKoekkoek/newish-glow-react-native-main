import type { Meta } from "@storybook/react";
import React from "react";
import { View } from "react-native";

import { PhoneBrand } from "./PhoneBrand";

const meta: Meta<typeof PhoneBrand> = {
  title: "DesignSystem/Foundations/Assets/LogosAndVisuals/PhoneBrand",
  component: PhoneBrand,
  args: {
    brand: "Alcatel",
    state: "default",
  },
  argTypes: {
    brand: {
      control: "select",
      options: [
        "Alcatel",
        "Android",
        "Apple",
        "Emporia",
        "Fairphone",
        "Google",
        "Motorola",
        "Oppo",
        "Samsung",
        "Xiaomi",
      ],
    },
  },
  decorators: [(Story) => <Story />],
};
export default meta;

type Story = typeof meta;

export const Basic: Story = {
  render: function Render({ ...args }) {
    return (
      <View style={{ padding: 16 }}>
        <PhoneBrand {...args} />
      </View>
    );
  },
};
