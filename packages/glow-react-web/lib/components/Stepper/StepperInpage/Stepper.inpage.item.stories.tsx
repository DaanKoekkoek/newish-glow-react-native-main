import type { Meta, StoryObj } from "@storybook/react";

import { StepperInpage, StepperInpageStep } from "./Stepper.inpage";
import type { StepperInpageStepProps } from "../Stepper.types";
import { Paragraph } from "foundations/Paragraph";
import { Button } from "components/Button";
import { TextLink } from "components/TextLink";
import { Badge } from "components/Badge";
import {
  type ComplexOption,
  createComplexControl,
} from "@storybook/utils/complexOptions";
import { Stack } from "foundations/Stack";
import { InputField } from "components/InputField";
import { RadioButtonGroup } from "components/RadioButtonGroup";
import { cloneChildrenWithProps } from "_utility";
import { Icon } from "foundations/Icon";
import { DefinitionList } from "components/DefinitionList";
import { Callout } from "components/Callout";

const childrenOptions: ComplexOption<StepperInpageStepProps["children"]>[] = [
  {
    label: "Paragraph component",
    value: (
      <Paragraph size="sm">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam hendrerit
        dolor in fermentum dictum. Aenean ac pulvinar sapien. Quisque nec elit
        placerat, eleifend nisi ac, venenatis velit. Ut et aliquet lorem.
        Pellentesque ac mollis ligula.
      </Paragraph>
    ),
  },
  {
    label: "string text",
    value:
      'String content. Automatically wrapped with a <Paragraph size="sm"></Paragraph>',
  },
  {
    label: "input field and stack",
    value: (
      <Stack>
        <RadioButtonGroup
          direction="row"
          name="radio-group"
          options={[
            {
              checked: true,
              id: "option-1",
              value: "radio-option-1",
              label: "Option 1",
            },
            {
              id: "option-2",
              value: "radio-option-2",
              label: "Option 2",
            },
          ]}
        ></RadioButtonGroup>
        <Stack
          direction={{ mobileSmall: "column", tablet: "row" }}
          alignItems={{ mobileSmall: "stretch", tablet: "flex-end" }}
        >
          <InputField
            id="input-2"
            placeholder="Input placeholder"
            legend={{ label: "Label" }}
          />
          <InputField id="input-3" placeholder="Input placeholder" />
        </Stack>
        <Stack columnSize={{ tablet: 6 }} alignItems="flex-end">
          <InputField
            id="input-4"
            placeholder="Input placeholder"
            legend={{ label: "Label" }}
          />
        </Stack>
      </Stack>
    ),
  },
];

const summaryOptions: ComplexOption<StepperInpageStepProps["summary"]>[] = [
  {
    label: "Definiton list",
    value: (
      <Stack
        direction={{ mobileSmall: "column", tablet: "row" }}
        alignItems={{ mobileSmall: "stretch" }}
      >
        <DefinitionList title="Definition list title">
          Definition list content
        </DefinitionList>
        <DefinitionList title="Definition list title">
          Definition list content
        </DefinitionList>
      </Stack>
    ),
  },
  {
    label: "Other content",
    value: <Paragraph>Content</Paragraph>,
  },
];

const meta = {
  title: "DesignSystem/Components/ProgressIndicators/Stepper/InPage/Item",
  component: StepperInpageStep,
  argTypes: {
    children: {
      ...createComplexControl(childrenOptions),
      description: "Displays content beneath the `title` and `badge`.",
    },
    summary: {
      ...createComplexControl(summaryOptions),
      description:
        "Intended to display a summary of the content based on the completed form of the previous step. Only visible when `state` is set to `completed`.",
    },
    state: {
      control: "select",
      options: ["default", "active", "completed", "inactive"],
      defaultValue: "default",
    },
    palette: {
      description:
        "Set the colour palette of the marker (numbered indicator). Only shown when `state` is set to `default` or `inactive`.",
      control: { type: "select" },
    },
    button: {
      description:
        "Must be a `Button` component. Is only displayed when `state` is set to `active`.",
      control: { disable: true },
    },
    textLink: {
      description:
        "Must be a `TextLink` component. Is only displayed when `state` is set to `default`, `completed` or `inactive`.",
      control: { disable: true },
    },
    badge: {
      description: "Must be a `Badge` component",
      control: { disable: true },
    },
    callout: {
      description: "Must be a `Callout` component",
      control: { disable: true },
    },
  },
  args: {
    title: "Title",
    badge: <Badge text="Badge" palette="green" />,
    textLink: (
      <TextLink href="#" size="sm">
        Text link
        <Icon name="add" />
      </TextLink>
    ),
    summary: summaryOptions[0].value,
    button: (
      <Button prominence="emphasised" fill>
        Button
      </Button>
    ),
    children: childrenOptions[0].value,
    callout: (
      <Callout status="warning" title="Title" description="Description" />
    ),
  },
  render: (args) => {
    const { palette, children, state, callout, ...rest } = args;
    const modifiedChildren =
      state === "inactive"
        ? cloneChildrenWithProps(children, { disabled: true })
        : children;

    return (
      <StepperInpage palette={palette}>
        <StepperInpageStep
          {...rest}
          state={state}
          children={modifiedChildren}
          callout={state === "inactive" ? callout : undefined}
        />
      </StepperInpage>
    );
  },
} satisfies Meta<typeof StepperInpageStep>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Item: Story = {};
