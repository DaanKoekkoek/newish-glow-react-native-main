import type { Meta } from "@storybook/react";
import { Paragraph } from "foundations/Paragraph";
import React from "react";
import { View } from "react-native";

import { Tooltip } from "./Tooltip";

const meta: Meta<typeof Tooltip> = {
  title: "DesignSystem/Components/Overlay/Tooltip",
  component: Tooltip,
  argTypes: {
    children: {
      table: {
        disable: true,
      },
    },
    posHorizontal: {
      control: {
        type: "select",
      },
      options: ["Left", "Right"],
    },
  },
  args: {
    description: "Description",
    animated: true,
    closeIcon: false,
    posHorizontal: "Left",
    children: <Tooltip.Icon name="status-info" />,
  },
};

export default meta;

type Story = typeof meta;

export const Basic: Story = {
  parameters: {
    flexDirection: "column",
  },
  decorators: [
    (Story, args) => (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 5,
          paddingVertical: 150,
          position: "relative",
        }}
      >
        <Paragraph>Tooltip me</Paragraph>
        <Story {...args} />
      </View>
    ),
  ],
};
