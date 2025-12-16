import type { Meta } from "@storybook/react";
import { Addon } from "foundations/Addon";
import React from "react";
import type { GestureResponderEvent } from "react-native";

import { AddOnList } from "./AddOnList";

const meta: Meta<typeof AddOnList> = {
  title: "DesignSystem/Components/Lists/AddOnList",
  component: AddOnList,
  args: {
    children: [
      <AddOnList.Item
        key="addon-list-item-1"
        title="Item 1"
        variant="added"
        attention={{ text: "Free for 3 months", variant: "success" }}
        description="Enjoy The Lord of the Rings trilogy and more. Testing testing very long title to see what happens. Testing testing very long title to see what happens. Testing testing very long title to see what happens."
        actionLabel="Button"
        addOn={<Addon name="HBO Max" size="sm" />}
        onPress={(e: number | GestureResponderEvent) => {
          if (typeof e === "number") {
            console.log("Handling number:", e);
          } else {
            console.log("Handling GestureResponderEvent:", e);
          }
        }}
      />,
      <AddOnList.Item
        key="addon-list-item-2"
        title="Item 2"
        variant="added"
        actionLabel="Button"
        addOn={<Addon name="Netflix" size="sm" />}
        onPress={(e: number | GestureResponderEvent) => {
          if (typeof e === "number") {
            console.log("Handling number:", e);
          } else {
            console.log("Handling GestureResponderEvent:", e);
          }
        }}
      />,
      <AddOnList.Item
        key="addon-list-item-3"
        title="Item 3"
        variant="added"
        actionLabel="Button"
        addOn={<Addon name="Amazon Prime" size="sm" />}
        onPress={(e: number | GestureResponderEvent) => {
          if (typeof e === "number") {
            console.log("Handling number:", e);
          } else {
            console.log("Handling GestureResponderEvent:", e);
          }
        }}
      />,
      <AddOnList.Item
        key="addon-list-item-4"
        title="Item 4"
        variant="default"
        actionLabel="Button"
        addOn={<Addon name="Apple One" size="sm" />}
        onPress={(e: number | GestureResponderEvent) => {
          if (typeof e === "number") {
            console.log("Handling number:", e);
          } else {
            console.log("Handling GestureResponderEvent:", e);
          }
        }}
      />,
      <AddOnList.Item
        key="addon-list-item-5"
        title="Item 5"
        variant="default"
        actionLabel="Button"
        addOn={<Addon name="Deezer" size="sm" />}
        onPress={(e: number | GestureResponderEvent) => {
          if (typeof e === "number") {
            console.log("Handling number:", e);
          } else {
            console.log("Handling GestureResponderEvent:", e);
          }
        }}
      />,
    ],
  },
  argTypes: {
    headerText: {
      description: "Text to display in the header",
      control: "text",
    },
    headerImage: {
      description: "Path to image to be used in the header",
    },
    children: {
      description: "An array of AddOnListItems",
      control: "array",
    },
  },

  decorators: [(Story) => <Story />],
};

export default meta;

type Story = typeof meta;

export const Basic: Story = {
  args: {},
};

export const WithImage: Story = {
  args: {
    headerImage: {
      src: "https://assets.odido.nl/1600x900/a2c094c8eb/mid-hero-stocksy_txpfcee7f02fc0400_originaldelivery_4220176.WebP",
    },
  },
};

export const WithImageAndText: Story = {
  args: {
    headerText: "Add on list title",
    headerImage: {
      src: "https://assets.odido.nl/1600x900/a2c094c8eb/mid-hero-stocksy_txpfcee7f02fc0400_originaldelivery_4220176.WebP",
    },
  },
};

export const Gradient: Story = {
  args: { headerText: "Add on list title" },
};
