import type { Meta } from "@storybook/react";
import React from "react";

import { DefinitionList } from "./DefinitionList";

const meta: Meta<typeof DefinitionList.Item> = {
  title: "DesignSystem/Components/Lists/DefinitionList/Item",
  component: DefinitionList.Item,
  parameters: {
    controls: {
      exclude: ["color"],
    },
  },
  argTypes: {
    title: {
      control: "text",
      name: "Title *",
    },
    description: {
      control: "text",
      name: "Description *",
      description: "Renders a description underneath the `title`.",
    },
  },
  decorators: [(Story) => <Story />],
};

export default meta;

type Story = typeof meta;

export const Basic: Story = {
  args: {
    title: "Title for the Defintion List Item",
    description: "Some description",
  },
  render: function Render({ ...args }) {
    return (
      <DefinitionList>
        <DefinitionList.Item {...args} />
      </DefinitionList>
    );
  },
};
