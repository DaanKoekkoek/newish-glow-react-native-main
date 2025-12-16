import { glyphmap as IconsMap } from "@odido-portals/glow-icon/fonts";
import type { Meta } from "@storybook/react";
import { odidoPaletteKeys } from "_theming/tokenLoader";
import React from "react";

import { DefaultList } from "./DefaultList";

const meta: Meta<typeof DefaultList.Item> = {
  title: "DesignSystem/Components/Lists/DefaultList/Item",
  component: DefaultList.Item,
  argTypes: {
    icon: {
      options: Object.keys(IconsMap),
      control: { type: "select" },
      description: "Select an icon to display with the default list item.",
    },
    variant: {
      options: ["icon", "iconColored", "numbered", "bullet"],
      control: {
        type: "select",
      },
      description: "Set the prefix type of the default list text.",
    },
    size: {
      options: ["default", "sm"],
      control: {
        type: "select",
      },
      description: "Sets size of the text.",
    },
    color: {
      options: ["default", "inverted"],
      control: {
        type: "select",
      },
      // TODO - This description doesn't seem right...
      description: "Sets size of text and icon.",
    },
    inactive: {
      control: "boolean",
      description: "Set the list item to an inactive state.",
      inactive: false,
    },
    palette: {
      control: { type: "select" },
      options: [...odidoPaletteKeys],
      description: "Set the colour palette of the icon.",
    },
  },
  args: {
    inactive: false,
  },
  render: function Render({ ...args }) {
    return (
      <DefaultList
        variant={args.variant}
        size={args.size}
        color={args.color}
        inactive={args.inactive}
        palette={args.palette}
      >
        <DefaultList.Item icon={args.icon}>List item</DefaultList.Item>
      </DefaultList>
    );
  },
};

export default meta;

type Story = typeof meta;

export const Basic: Story = {};
