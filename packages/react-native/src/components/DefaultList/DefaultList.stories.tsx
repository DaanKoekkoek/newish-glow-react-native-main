import type { Meta } from "@storybook/react";
import { odidoPaletteKeys } from "_theming/tokenLoader";
import React from "react";

import { DefaultList } from "./DefaultList";

const meta: Meta<typeof DefaultList> = {
  title: "DesignSystem/Components/Lists/DefaultList",
  component: DefaultList,
  args: {
    variant: "bullet",
    size: "default",
    color: "default",
    children: [0, 1, 2, 3].map((num) => (
      <DefaultList.Item key={`defaultListItem-${num}`} icon="checkmark">
        List item
      </DefaultList.Item>
    )),
    inactive: false,
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["icon", "iconColored", "numbered", "bullet"],
      description: "Set the prefix type of the default list text.",
    },
    size: {
      control: "select",
      options: ["default", "sm"],
      description: "Set the size of the default list text and icon.",
    },
    color: {
      control: "select",
      options: ["default", "inverted"],
      description: "Set the color of the list text and icon.",
    },
    children: {
      description:
        "Accepts `React.ReactElement<DefaultListItemProps>` \n\n `| React.ReactElement<DefaultListItemProps>[]`",
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
  decorators: [(Story) => <Story />],
};

export default meta;

type Story = typeof meta;

export const Basic: Story = {
  args: {
    variant: "icon",
    size: "default",
  },
};
