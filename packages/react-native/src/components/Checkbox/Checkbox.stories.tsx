import type { Meta } from "@storybook/react";
import React, { useCallback } from "react";
import { View } from "react-native";

import { Checkbox } from "./Checkbox";
import { TextLink } from "../TextLink";

const meta: Meta<typeof Checkbox> = {
  title: "DesignSystem/Components/Input/Checkbox",
  component: Checkbox,
  argTypes: {
    accessibilityLabelledBy: { type: "string" },
    checked: { type: "boolean" },
    errorMessage: { type: "string" },
    helperText: { type: "string" },
    id: { type: "string" },
    indeterminate: { type: "boolean" },
    label: { type: "string" },
    onPress: { action: "onChange" },
    state: { control: "select", options: ["default", "inactive", "error"] },
  },
  args: {
    label: "Label text",
    onPress: () => {},
    checked: false,
    errorMessage: "",
    id: "id-here",
    indeterminate: false,
    helperText: "Helper text here",
    legend: {
      text: "Legend",
      optional: true,
      info: () => {
        alert("Info legend got clicked");
      },
    },
    state: "default",
  },
  decorators: [(Story) => <Story />],
  render: function Render({ ...args }) {
    const [checked, setChecked] = React.useState(false);

    const onPressHandler = useCallback(() => {
      setChecked((prev) => !prev);
    }, [setChecked]);

    return (
      <View style={{ display: "flex", flexDirection: "column", gap: 40 }}>
        <Checkbox {...args} onPress={onPressHandler} checked={checked} />
        <Checkbox {...args} onPress={onPressHandler} checked={!checked} />
      </View>
    );
  },
};

export default meta;

type Story = typeof meta;

export const Basic: Story = {};

export const WithoutLegend: Story = {
  args: { legend: undefined },
};

export const Inactive: Story = {
  args: {
    state: "inactive",
  },
};

export const Indeterminate: Story = {
  args: {
    indeterminate: true,
  },
  render: ({ ...args }) => (
    <View style={{ display: "flex", flexDirection: "column", gap: 40 }}>
      <Checkbox {...args} state="inactive" checked={args.checked} />
      <Checkbox {...args} checked={!args.checked} />
    </View>
  ),
};

export const Error: Story = {
  args: {
    state: "error",
    errorMessage: "Error message",
  },
  render: function Render({ ...args }) {
    return <Checkbox {...args} checked={false} />;
  },
};

export const ReactElementLabel: Story = {
  args: {
    label: (
      <>
        • First bullet point <TextLink size="sm">textlink</TextLink>
        {"\n"}• Second bullet point
      </>
    ),
  },
};
