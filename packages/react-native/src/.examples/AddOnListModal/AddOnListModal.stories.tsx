import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

import { AddOnListModal } from "./AddOnListModal";
import type { AddOnListProps } from "components/AddOnList";

const meta: Meta<AddOnListProps> = {
  title: "Examples/AddOnListModal",
  component: AddOnListModal,
};

export default meta;

type Story = StoryObj<typeof AddOnListModal>;

export const Top: Story = {
  render: () => {
    return <AddOnListModal />;
  },
};
