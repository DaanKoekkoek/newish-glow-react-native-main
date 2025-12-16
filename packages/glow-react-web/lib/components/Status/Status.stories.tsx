import type { Meta, StoryObj } from "@storybook/react";

import { Status } from "./Status";

const meta: Meta<typeof Status> = {
  title: "DesignSystem/Components/Status",
  component: Status,
  argTypes: {
    type: {
      options: ["success", "warning", "error"],
      control: {
        type: "select",
      },
    },
  },
  args: {
    statusText: "Status",
    type: "success",
  },
  parameters: {
    status: {
      type: ["qaPassed", "devReviewed"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const InStock: Story = {
  args: {
    statusText: "Direct leverbaar, laten bezorgen of ophalen in de Odido Shop.",
  },
};

export const Limited: Story = {
  args: {
    statusText: "Leverbaar vanaf 18 maart",
    type: "warning",
  },
};

export const OutOfStock: Story = {
  args: {
    statusText: "Niet op voorraad, binnenkort weer beschikbaar",
    type: "error",
  },
};
