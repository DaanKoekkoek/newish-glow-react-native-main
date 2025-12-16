import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { View } from "react-native";

import { Pill } from "./Pill";
import type { PillProps } from "./Pill.types";
import { PillGroup } from "./PillGroup";

const meta: Meta<typeof Pill> = {
  title: "DesignSystem/Components/Selector/Pill",
  component: Pill,
  args: {
    title: "Title",
    disabled: false,
    value: "some value",
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
  render: (args) => (
    <View style={{ padding: 16 }}>
      <Pill {...args} />
    </View>
  ),
};

type GroupControls = {
  titleOneDisabled: boolean;
  titleTwoDisabled: boolean;
  appleDisabled: boolean;
  androidDisabled: boolean;
  disabled: boolean;
};

export const Group: StoryObj<PillProps & GroupControls> = {
  args: {
    titleOneDisabled: false,
    titleTwoDisabled: false,
    appleDisabled: false,
    androidDisabled: true,
    disabled: false,
  },
  parameters: {
    controls: {
      exclude: ["title", "variant", "brand", "onChange", "value"],
    },
  },
  render: ({
    disabled,
    titleOneDisabled,
    titleTwoDisabled,
    appleDisabled,
    androidDisabled,
  }: GroupControls) => (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 16,
        width: 300,
        padding: 16,
      }}
    >
      <PillGroup disabled={disabled}>
        <Pill title="Title One" value="default" disabled={titleOneDisabled} />
        <Pill title="Title Two" value="default" disabled={titleTwoDisabled} />
        <Pill
          variant="logo"
          value="logo"
          brand="Apple"
          disabled={appleDisabled}
        />
        <Pill
          variant="logo"
          value="logo"
          brand="Android"
          disabled={androidDisabled}
        />
      </PillGroup>
    </View>
  ),
};
