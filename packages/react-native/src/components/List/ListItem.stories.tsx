import { glyphmap as IconsMap } from "@odido-portals/glow-icon/fonts";
import type { Meta } from "@storybook/react";
import React from "react";
import { View, Text } from "react-native";

import { List } from "./List";
import { Button } from "../Button";
import { Price } from "../Price";
import { Toggle } from "../Toggle";

const meta: Meta<typeof List.Item> = {
  title: "DesignSystem/Components/Lists/List/Item",
  component: List.Item,
  parameters: {
    controls: {
      exclude: ["background, palette"],
    },
  },
  argTypes: {
    clickable: {
      control: { type: "boolean" },
      description: "`Function` that shows the cevron icon.",
    },
    onPress: {
      control: { type: "boolean" },
      description: "`Function` that handles callbacks `onPress`.",
    },
    clickIndicator: {
      control: "select",
      options: Object.keys(IconsMap),
      description:
        "Select an icon to display the indicator with the list item.",
      if: { arg: "clickable", truthy: true },
    },
    attention: {
      description:
        "Requires `text`. The `variant` property is optional and defaults to `success`. The `variant` property accepts `success`, `information`, `warning` or `danger`.",
    },
    description1: {
      description: "Description text shown underneath the `title`.",
    },
    description2: {
      description:
        "Description text shown underneath the `description1` or `title`.",
    },
    detail: {
      description: "Detail text shown next to the `clickIndicator`.",
    },
    notification: {
      description: "The notification count shown next to the `clickIndicator`.",
    },
    icon: {
      options: Object.keys(IconsMap),
      control: { type: "select" },
      description: "Select an icon to display with the list item.",
    },
    action: { table: { disable: true } },
  },
  args: {
    title: "This is the Title",
    clickable: false,
    onPress: () => console.log("Default list onPress"),
    clickIndicator: "chevron-right",
    description1: "Description 1",
    description2: "Description 2",
    attention: { text: "Attention text", variant: "success" },
  },
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

export const Default: Story = {
  args: {
    title: "This is the Title",
    onPress: () => console.log("Default list onPress"),
    detail: "Detail",
    notification: 1,
    clickable: true,
  },
  decorators: [
    (Story) => (
      <List background="default">
        <Story />
      </List>
    ),
  ],
  render: function Render({ ...args }) {
    return (
      <List background="default">
        <List.Item {...args} />
      </List>
    );
  },
};

export const VariantButton: Story = {
  parameters: {
    controls: {
      exclude: ["onPress", "background", "deail", "notification"],
    },
  },
  args: {
    title: "This is the Title",
    action: (
      <Button
        size="sm"
        onPress={() => console.log("Button list onPress")}
        pointerEvents="none"
      >
        Button text
      </Button>
    ),
  },
  render: function Render({ ...args }) {
    return (
      <List>
        <List.Item {...args} />
      </List>
    );
  },
};

export const VariantPrice: Story = {
  parameters: {
    controls: {
      exclude: ["background", "deail", "notification"],
    },
  },
  args: {
    onPress: () => console.log("Price list onPress"),
    action: (
      <Price
        beforeText="Van"
        fromValue="€ 100,59"
        showAsterisk
        showCurrency
        showDecimal
        showFrequency
        showVAT
        size="default"
        state="default"
        value="€ 100,59"
      />
    ),
  },
  render: function Render({ ...args }) {
    return (
      <List>
        <List.Item {...args} />
      </List>
    );
  },
};

export const VariantToggle: Story = {
  parameters: {
    controls: {
      exclude: [
        "onPress",
        "background",
        "deail",
        "notification",
        "clickIndicator",
      ],
    },
  },
  args: {
    onPress: () => console.log("Toggle list onPress"),
    action: <Toggle ariaLabel="toggle" onPress={() => console.log("test")} />,
  },
  render: function Render({ ...args }) {
    return (
      <List>
        <List.Item {...args} />
      </List>
    );
  },
};

export const VariantWrapper: Story = {
  parameters: {
    controls: {
      exclude: [
        "onPress",
        "background",
        "deail",
        "notification",
        "clickIndicator",
      ],
    },
  },
  args: {
    clickable: true,
    Wrapper: Text,
    wrapperProps: { style: { backgroundColor: "red" } },
  },
  render: function Render({ ...args }) {
    return (
      <List>
        <List.Item {...args} />
      </List>
    );
  },
};
