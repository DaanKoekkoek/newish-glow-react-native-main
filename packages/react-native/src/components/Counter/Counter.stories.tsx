import type { Meta, StoryObj } from "@storybook/react";
import { odidoPaletteKeys } from "_theming/tokenLoader";
import { Stack } from "foundations/Stack";
import React from "react";

import { Counter } from "./Counter";
import type { CounterProps } from "./Counter.types";

const futureDate: Date = new Date();
futureDate.setDate(futureDate.getDate());

const targetDate: Date = new Date(futureDate);
targetDate.setDate(targetDate.getDate() + 2);
targetDate.setHours(targetDate.getHours() + 12);

const targetDateHours: Date = new Date(futureDate);
targetDateHours.setDate(targetDateHours.getDate() + 1);

const isPastDate: Date = new Date(futureDate);
isPastDate.setDate(targetDateHours.getDate() - 1);

const isMinutes: Date = new Date(futureDate);
isMinutes.setMinutes(futureDate.getMinutes() + 60);

const meta: Meta<typeof Counter> = {
  title: "DesignSystem/Components/Counter",
  component: Counter,
  argTypes: {
    prominence: {
      options: ["default", "subtle"],
      control: {
        type: "select",
      },
    },
    digits: {
      control: { type: "select" },
      options: [1, 2, 3, 4],
    },
    palette: {
      control: { type: "select" },
      options: [...odidoPaletteKeys],
      description: "Set the colour palette of the background requires subtle.",
    },

    size: {
      options: ["default", "large"],
      control: {
        type: "select",
      },
    },
  },
  args: {
    targetDate: targetDate.toISOString(),
    prominence: "default",
    size: "default",
    variant: "default",
    digits: 4,
    freeze: false,
  },

  decorators: [(Story) => <Story />],
} satisfies Meta<typeof Counter>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const Subtle: Story = {
  args: {
    prominence: "subtle",
  },
};
export const SizeVariants: Story = {
  render: (args: CounterProps) => (
    <Stack>
      <Counter {...args} variant="default" prominence="default" />
      <Counter {...args} variant="default" prominence="default" size="large" />
    </Stack>
  ),
};
export const HoursOnly: Story = {
  args: {
    variant: "hoursOnly",
  },
};
export const InactiveCounter: Story = {
  args: {
    targetDate: isPastDate.toISOString(),
  },
};
export const AvailableDigits: Story = {
  render: (args: CounterProps) => (
    <Stack>
      <Counter
        {...args}
        variant="default"
        digits={1}
        prominence="subtle"
        targetDate={targetDate.toISOString()}
        digitDaysLabel="Dagen"
      />
      <Counter
        {...args}
        variant="default"
        digits={2}
        prominence="subtle"
        targetDate={isMinutes.toISOString()}
      />
      <Counter
        {...args}
        variant="default"
        digits={3}
        prominence="subtle"
        targetDate={targetDate.toISOString()}
      />
      <Counter
        {...args}
        variant="default"
        digits={4}
        prominence="subtle"
        targetDate={targetDate.toISOString()}
      />
    </Stack>
  ),
};
