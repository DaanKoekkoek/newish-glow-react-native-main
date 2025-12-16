import type { Meta } from "@storybook/react";
import { odidoPaletteKeys } from "_theming/index";
import React from "react";

import { Toggle, Price, Button, BadgeStatus, List } from "../.";

const meta: Meta<typeof List> = {
  title: "DesignSystem/Components/Lists/List",
  component: List,
  args: {
    children: [
      <List.Item
        icon="comment"
        key="comment"
        title="This is the Title"
        clickIndicator="chevron-right"
        onPress={() => console.log("Default pressed")}
        clickable
      />,
      <List.Item
        icon="energy"
        key="energy"
        title="This is the Title"
        description1="Description"
        onPress={() => console.log("Button pressed")}
        action={
          <Button
            onPress={() => console.log("Button inside pressed")}
            size="sm"
          >
            Button
          </Button>
        }
      />,
      <List.Item
        icon="5g"
        key="5g"
        title="This is the Title"
        description1="Description"
        attention={{ text: "Attention text", variant: "success" }}
        clickIndicator="chevron-right"
        onPress={() => console.log("Price pressed")}
        action={
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
        }
      />,
      <List.Item
        icon="lock"
        key="lock-0"
        title="This is the Title"
        description1="Description"
        onPress={() => console.log("Toggle pressed")}
        action={
          <Toggle ariaLabel="toggle" onPress={() => console.log("test")} />
        }
      />,
      <List.Item
        icon="lock"
        key="lock-1"
        title="This is the Title"
        description1="Description"
        onPress={() => console.log("BadgeStatus pressed")}
        action={<BadgeStatus count={1} />}
        detail="Detail"
        clickable
      />,
      <List.Item
        icon="lock"
        key="lock-2"
        title="This is the Title"
        description1="Description"
        onPress={() => console.log("BadgeStatus pressed")}
        detail="Detail"
        clickable
      />,
      <List.Item
        icon="laptop"
        key="laptop"
        title="This is the Title"
        description1="Description 1"
        description2="Description 2"
        attention={{ text: "Attention text", variant: "success" }}
      />,
    ],
  },
  argTypes: {
    children: {
      description: "Accepts `React.ReactElement` \n\n `React.ReactElement[]`.",
    },
    background: {
      control: { type: "select" },
      options: ["default", "subtle", "none"],
      description: "Sets background color of the `List`.",
    },
    palette: {
      control: { type: "select" },
      options: [undefined, ...odidoPaletteKeys],
      description: "Set the colour palette of the List.",
    },
  },
  decorators: [(Story) => <Story />],
};

export default meta;

type Story = typeof meta;

export const Basic: Story = {
  args: {
    background: "default",
  },
};
