import type { Meta, StoryObj } from "@storybook/react";

import { useId } from "react";
import { Pill } from "./Pill";
import { Stack } from "foundations/Stack";

const meta: Meta<typeof Pill> = {
  title: "DesignSystem/Components/Selector/Pill",
  component: Pill,
  argTypes: {
    title: {
      control: "text",
      description: "Text to be displayed in the pill.",
    },
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
      description: "The brand name to be displayed in the pill.",
    },
    variant: {
      control: "radio",
      options: ["default", "logo"],
      description: "Select `logo` in combination with a `Phonebrand`.",
    },
    state: {
      control: "radio",
      options: ["default", "inactive"],
    },
    name: {
      control: "text",
      description: "The input `name` of the pill.",
    },
    value: {
      control: "text",
      description: "The input `value` to be passed in the onChange function.",
    },
    checked: {
      option: [undefined, true, false],
      description: "Controlled checked state of the pill.",
    },
    onChange: {
      type: "function",
      description:
        "The function to call when the pill is selected or unselected.",
    },
  },
  parameters: {
    status: {
      type: ["devReviewed", "SSR", "v1"],
    },
  },
  args: {
    title: "Title",
    name: "selected-brand",
    variant: "default",
    brand: undefined,
    state: "default",
  },
  render: (args) => (
    <Pill id={useId()} value={args.brand ?? args.title} {...args} />
  ),
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Multiple: Story = {
  render: () => (
    <Stack direction="row" wrap="wrap">
      <Pill
        title="Title 1"
        id={useId()}
        variant="default"
        state="default"
        name="nr1"
        value="pill1-value"
        testID="pill1"
      />
      <Pill
        title="Title 2"
        id={useId()}
        variant="default"
        state="default"
        name="nr2"
        value="pill2-value"
        testID="pill2"
      />
      <Pill
        brand="Apple"
        id={useId()}
        variant="logo"
        state="default"
        name="nr3"
        value="pill3-value"
        testID="pill3"
      />
      <Pill
        brand="Google"
        id={useId()}
        variant="logo"
        state="inactive"
        name="nr4"
        value="pill4-value"
        testID="pill4"
      />
    </Stack>
  ),
};
