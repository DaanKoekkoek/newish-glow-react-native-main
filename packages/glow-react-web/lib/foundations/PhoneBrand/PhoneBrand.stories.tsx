import type { Meta, StoryFn, StoryObj } from "@storybook/react";

import { PhoneBrand } from "./PhoneBrand";

const withDifferentBackground = (Story: StoryFn) => (
  <div
    style={{
      backgroundColor: "var(--primitives-color-purple-700)",
      padding: "20px 20px 14px 20px",
      borderRadius: "8px",
    }}
  >
    <Story />
  </div>
);

const meta: Meta<typeof PhoneBrand> = {
  title: "DesignSystem/Foundations/Assets/LogosAndVisuals/PhoneBrand",
  component: PhoneBrand,
  argTypes: {
    brand: {
      control: "select",
      options: [
        "Alcatel",
        "Android",
        "Apple",
        "Emporia",
        "Fairphone",
        "Google",
        "Motorola",
        "Oppo",
        "Samsung",
        "Xiaomi",
      ],
    },
    variant: {
      options: ["default", "inverted"],
      control: { type: "select" },
      description:
        "Defines the fill style on a dark background if set to **inverted**",
    },
    ariaLabel: {
      control: "text",
      description:
        "Format string for accessibility label (use {brand} as placeholder)",
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

export const Basic: Story = {
  args: {
    brand: "Apple",
    state: "default",
    variant: "default",
    testID: "phone-brand-basic",
    ariaLabel: "Logo van het telefoonmerk {brand}",
  },
};

export const Inverted: Story = {
  args: {
    brand: "Android",
    state: "default",
    variant: "inverted",
    testID: "phone-brand-inverted",
    ariaLabel: "{brand} phone brand logo",
  },
  decorators: [withDifferentBackground],
};
