import type { Meta } from "@storybook/react";
import React, { useCallback } from "react";
import { Checkbox } from "./Checkbox";
import { TextLink } from "../TextLink";
import { CheckboxState } from "./Checkbox.types";
import { Stack } from "foundations/Stack";
import { action } from "@storybook/addon-actions";
import { OdidoPalette } from "_internals/Color";

const meta: Meta<typeof Checkbox> = {
  title: "DesignSystem/Components/Input/Checkbox",
  component: Checkbox,
  argTypes: {
    checked: { type: "boolean" },
    errorMessage: { type: "string" },
    helperText: { type: "string" },
    id: { type: "string" },
    indeterminate: { type: "boolean" },
    label: { type: "string" },
    onChange: { type: "function" },
    state: { control: "select", options: ["default", "inactive", "error"] },
    palette: {
      control: { type: "select" },
      option: [undefined, ...OdidoPalette],
    },
  },
  args: {
    label: "Label text",
    state: "default",
    errorMessage: "",
    indeterminate: false,
    helperText: "Helper text here",
    id: "checkbox",
    legend: {
      label: "Legend label",
      optionalText: "Optional",
      info: () => {
        alert("Info legend got clicked");
      },
    },
    onChange: action("onChange"),
  },
  render: (args) => (
    <Stack alignItems="stretch">
      <Checkbox testID="checkbox_1" {...args} id="id-meta-checkbox-1" />
      <Checkbox testID="checkbox_2" {...args} id="id-meta-checkbox-2" />
    </Stack>
  ),
};

export default meta;

type Story = typeof meta;

export const Default: Story = {
  args: {
    id: "id-basic-story",
    label: "Label text",
    state: "default",
    legend: {
      label: "Legend label",
    },
  },
};

export const WithoutLegend: Story = {
  args: {
    legend: {
      label: undefined,
    },
  },
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
};

export const Error: Story = {
  render: ({ ...args }) => {
    const [checked, setChecked] = React.useState(false);
    const [state, setState] = React.useState<CheckboxState>("error");

    const onPressHandler = useCallback(() => {
      setChecked((prev) => !prev);
      setState("default");
    }, []);

    return (
      <Checkbox
        {...args}
        state={state}
        onChange={onPressHandler}
        checked={checked}
        errorMessage={state === "error" ? "Error message" : undefined}
      />
    );
  },
};

export const ReactElementLabel: Story = {
  render: () => (
    <Stack alignItems="stretch">
      <Checkbox
        id="id-react-element-label-explicit"
        testID="checkbox_react_element"
        label={
          <Stack gap={0}>
            <span>
              • First bullet point{" "}
              <TextLink href="#" size="sm">
                textlink
              </TextLink>
            </span>
            <span>• Second bullet point </span>
            <span>
              • Third bullet point{" "}
              <TextLink href="#" size="sm">
                textlink
              </TextLink>
            </span>
            <span>• Fourth bullet point </span>
            <span>
              • Fifth bullet point{" "}
              <TextLink href="#" size="sm">
                textlink
              </TextLink>
            </span>
          </Stack>
        }
        legend={{
          label: "Legend label",
          optionalText: "Optional",
          info: () => {
            alert("Info legend got clicked");
          },
        }}
      />
      <Checkbox
        id="id-react-element-label-explicit-2"
        testID="checkbox_react_element-2"
        label={
          <Stack gap={0}>
            <span>
              • First bullet point{" "}
              <TextLink href="#" size="sm">
                textlink
              </TextLink>
            </span>
            <span>• Second bullet point </span>
            <span>
              • Third bullet point{" "}
              <TextLink href="#" size="sm">
                textlink
              </TextLink>
            </span>
            <span>• Fourth bullet point </span>
            <span>
              • Fifth bullet point{" "}
              <TextLink href="#" size="sm">
                textlink
              </TextLink>
            </span>
          </Stack>
        }
        legend={{
          label: "Legend label",
          optionalText: "Optional",
          info: () => {
            alert("Info legend got clicked");
          },
        }}
      />
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Checkbox
  id="id-react-element-label"
  label={
    <Stack gap={0}>
      <span>• First bullet point <TextLink href="#" size="sm">textlink</TextLink></span>
      <span>• Second bullet point</span>
      <span>• Third bullet point <TextLink href="#" size="sm">textlink</TextLink></span>
      <span>• Fourth bullet point</span>
      <span>• Fifth bullet point <TextLink href="#" size="sm">textlink</TextLink></span>
    </Stack>
  }
  legend={{ label: "Legend label" }}
/>`,
      },
    },
  },
};
