import type { Meta, StoryObj } from "@storybook/react";
import { Spinner } from "./Spinner";

const meta: Meta<typeof Spinner> = {
  title: "DesignSystem/Components/ProgressIndicators/Spinner",
  component: Spinner,
  argTypes: {
    size: {
      description: "Size of the spinner icon",
    },
    color: {
      description:
        "Predefined colors of spinner. Also corresponds with light- and darkmode",
    },
    style: {
      description:
        "Additional styling that overrules the default style of the spinner icon.",
    },
    className: {
      description:
        "Additional className that overrules the default style of the spinner icon.",
    },
  },
  args: {
    size: "default",
    color: "default",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const Inverted: Story = {
  args: {
    color: "inverted",
  },
  decorators: [
    (Story, args) => (
      <div style={{ backgroundColor: "#000" }}>
        <Story {...args} />
      </div>
    ),
  ],
};
