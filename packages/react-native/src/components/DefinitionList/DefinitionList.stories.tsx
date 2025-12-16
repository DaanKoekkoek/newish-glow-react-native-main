import type { Meta } from "@storybook/react";
import React from "react";

import { DefinitionList } from "./DefinitionList";

const meta: Meta<typeof DefinitionList> = {
  title: "DesignSystem/Components/Lists/DefinitionList",
  component: DefinitionList,
  argTypes: {
    children: {
      description:
        "Accepts `React.ReactElement<typeof DefinitionListItem>` \n\n `React.ReactElement<typeof DefinitionListItem>[]`.",
    },
    color: {
      options: ["default", "inverted"],
      control: {
        type: "select",
      },
      description: "Set the color of the definition list text.",
    },
  },
  args: {
    children: [
      <DefinitionList.Item
        key="item 1"
        title="Title 1"
        description="Description"
      />,
      <DefinitionList.Item
        key="item 2"
        title="Title 2"
        description="Description"
      />,
      <DefinitionList.Item
        key="item 3"
        title="Title 3"
        description="Description"
      />,
    ],
    color: "default",
  },
  decorators: [(Story) => <Story />],
};

export default meta;

type Story = typeof meta;

export const Basic: Story = {};
