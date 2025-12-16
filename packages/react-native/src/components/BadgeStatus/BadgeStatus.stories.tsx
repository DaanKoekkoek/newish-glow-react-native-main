import type { Meta, StoryFn } from "@storybook/react";
import React from "react";
import { View } from "react-native";

import type { BadgeStatusProps } from "./";
import { BadgeStatus } from "./";

const meta: Meta<typeof BadgeStatus> = {
  title: "DesignSystem/Components/Badge/BadgeStatus",
  component: BadgeStatus,
  argTypes: {
    size: {
      options: ["default", "sm"],
      control: {
        type: "select",
      },
    },
    variant: {
      options: ["default", "success", "error"],
      control: {
        type: "select",
      },
    },
  },
  decorators: [
    (Story) => (
      <View
        style={{
          width: 300,
          padding: 16,
          alignItems: "flex-start",
          borderStyle: "dotted",
          borderColor: "#ccc",
          borderWidth: 1,
        }}
      >
        <Story />
      </View>
    ),
  ],
};

export default meta;

// Define the template for stories
const Template: StoryFn<BadgeStatusProps> = (args) => <BadgeStatus {...args} />;

// Basic text example
export const Basic: StoryFn<BadgeStatusProps> = Template.bind({});
Basic.args = {
  count: 1,
  size: "default",
};
// Basic icon example
export const IconStory: StoryFn<BadgeStatusProps> = Template.bind({});
IconStory.args = {
  variant: "success",
  size: "default",
};
