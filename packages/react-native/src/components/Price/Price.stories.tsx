import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

import { Price } from "./Price";

const meta: Meta = {
  title: "DesignSystem/Components/Price",
  component: Price,
  argTypes: {
    value: {
      description:
        "Allows the following formats: `5.000`, `500`, `€ 5.000,50`, `€ 500`, `€ 50,50`",
    },
    beforeText: {
      description: "Renders text above the price",
    },
    fromValue: {
      description:
        "Renders as suffix to `beforeText`, but can be used separately. Allows the following formats: `5.000`, `500`, `€ 5.000,50`, `€ 500`, `€ 50,50`",
    },
    inverted: {
      description:
        "Specifies if the price should be displayed with inverted colors.",
    },
    state: {
      options: ["default", "disabled"],
      control: {
        type: "select",
      },
    },
    size: {
      options: ["sm", "default", "lg", "xl"],
      control: {
        type: "select",
      },
    },
  },
  args: {
    value: "€ 100,59",
    beforeText: "",
    fromValue: "€ 100,59",
    state: "default",
    size: "default",
    inverted: false,
    showCurrency: true,
    showVAT: false,
    showDecimal: true,
    showFrequency: false,
    showAsterisk: false,
  },
  decorators: [(Story) => <Story />],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const WithAllEnabled: Story = {
  args: {
    beforeText: "Van",
    fromValue: "€ 100,59",
    showVAT: true,
    showFrequency: true,
    showAsterisk: true,
  },
};

export const WithVAT: Story = {
  args: {
    showVAT: true,
  },
};

export const WithFrequency: Story = {
  args: {
    showFrequency: true,
  },
};

export const WithFrequencyAsterix: Story = {
  args: {
    showFrequency: true,
    showAsterisk: true,
  },
};

export const WithBeforeValue: Story = {
  args: {
    beforeText: "Van",
    fromValue: "€ 100,59",
  },
};

export const WithoutCurrency: Story = {
  args: {
    value: "100,99",
    showCurrency: true,
  },
};
