import type { Meta } from "@storybook/react";
import { odidoPaletteKeys, switchPaletteKeys } from "_theming/tokenLoader";
import { Addon } from "foundations/Addon";
import React from "react";

import { AddOnList } from "./AddOnList";
import { AddOnListItem } from "./AddOnListItem";

const meta: Meta<typeof AddOnListItem> = {
  title: "DesignSystem/Components/Lists/AddOnList/Item",
  component: AddOnList.Item,
  args: {
    title: "Item 1",
    description:
      "Enjoy The Lord of the Rings trilogy and more. Testing testing very long title to see what happens. Testing testing very long title to see what happens. Testing testing very long title to see what happens.",
    attention: { text: "Free for 3 months", variant: "success" },
    actionLabel: "label",
    addOn: <Addon name="Amazon Prime" size="sm" />,
  },

  argTypes: {
    attention: {
      description:
        "Renders attention text underneath `description`. Requires `text`. The `variant` property is optional and defaults to `success`. The `variant` property accepts `success`, `information`, `warning` or `danger`.",
    },
    title: {
      description: "Title for the AddOnListItem",
      control: "text",
    },
    description: {
      description: "Description to display on the AddOnListItem",
      control: "text",
    },
    onPress: {
      type: "function",
    },
    actionLabel: {
      description: "Label to display on the AddOnListItem Button",
    },
    addOn: {
      description: "AddOn component to display on the AddOnListItem",
    },

    variant: {
      control: { type: "select" },
      options: ["default", "added"],
      description: "Whether the AddOnListItem is default or added",
    },
    palette: {
      control: { type: "select" },
      options: [...odidoPaletteKeys, ...switchPaletteKeys],
    },
  },

  decorators: [(Story) => <Story />],
};

export default meta;

type Story = typeof meta;

export const Basic: Story = {
  render: function Render({ ...args }) {
    return <AddOnListItem {...args} />;
  },
};
