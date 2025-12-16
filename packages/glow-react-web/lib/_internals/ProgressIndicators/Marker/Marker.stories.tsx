import type { Meta } from "@storybook/react";

import { Marker } from "./Marker";
import { OdidoPalette } from "_internals/Color";

const meta: Meta<typeof Marker> = {
  title: "DesignSystem/_Internals/List/Marker",
  component: Marker,
  args: {
    state: "default",
    index: 1,
  },
  argTypes: {
    variant: {
      control: {
        type: "select",
        options: ["horizontal", "vertical", "inpage"],
        defaultValue: "horizontal",
      },
    },
    state: {
      control: {
        type: "select",
        options: ["default", "active", "completed", "inactive"],
        defaultValue: "default",
      },
    },
    palette: {
      control: { type: "select" },
      options: [...OdidoPalette],
      description: "Set the colour palette of the marker.",
      defaultValue: "default",
    },
  },
};

export default meta;

type Story = typeof meta;

export const Basic: Story = {
  render: function Render({ ...args }) {
    return <Marker {...args} />;
  },
};
