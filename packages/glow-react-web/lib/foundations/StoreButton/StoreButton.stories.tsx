import type { Meta, StoryFn, StoryObj } from "@storybook/react";

import { StoreButton } from "./StoreButton";

const withDifferentBackground = (Story: StoryFn) => (
  <div
    style={{
      backgroundColor:
        "var(--semantics-color-background-strong-palette-default)",
      padding: "20px",
    }}
  >
    <Story />
  </div>
);

const meta: Meta<typeof StoreButton> = {
  title: "DesignSystem/Foundations/Assets/LogosAndVisuals/StoreButton",
  component: StoreButton,
  argTypes: {
    brand: {
      options: ["Apple", "Google"],
      control: {
        type: "select",
      },
    },
    prominence: {
      options: ["default", "secondary"],
      control: {
        type: "select",
      },
    },
    variant: {
      options: ["default", "inverted"],
      control: {
        type: "select",
      },
    },
    inverted: {
      control: {
        type: "boolean",
      },
      description: "Makes the button always inverted.",
    },
  },
  args: {
    brand: "Apple",
  },
  parameters: {
    status: {
      type: ["qaPassed", "devReviewed"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SecondaryApple: Story = {
  args: {
    brand: "Apple",
    prominence: "secondary",
  },
};

export const InvertedApple: Story = {
  args: {
    brand: "Apple",
    variant: "inverted",
  },
  decorators: [withDifferentBackground],
};

export const DefaultGoogle: Story = {
  args: {
    brand: "Google",
  },
};

export const SecondaryGoogle: Story = {
  args: {
    brand: "Google",
    prominence: "secondary",
  },
};

export const InvertedGoogle: Story = {
  args: {
    brand: "Google",
    inverted: true,
  },
  decorators: [withDifferentBackground],
};
