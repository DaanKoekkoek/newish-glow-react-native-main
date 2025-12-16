import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { DropdownPanel } from "./DropdownPanel";
import type { DropdownPanelProps } from "./DropdownPanel.types";
import { Placeholder } from "components/Modal/Placeholder";
import {
  createComplexControl,
  type ComplexOption,
} from "@storybook/utils/complexOptions";
import React from "react";

const footerChildrenOptions: ComplexOption<
  DropdownPanelProps["footerChildren"]
>[] = [
  {
    label: "Empty",
    value: undefined,
  },
  {
    label: "Placeholder",
    value: <Placeholder />,
  },
];

const childrenOptions: ComplexOption<DropdownPanelProps["children"]>[] = [
  {
    label: "Single placeholder",
    value: <Placeholder />,
  },
  {
    label: "Multiple placeholders",
    value: (
      <>
        <Placeholder />
        <Placeholder />
      </>
    ),
  },
];

const callToActionOptions: ComplexOption<DropdownPanelProps["callToAction"]>[] =
  [
    {
      label: "Default",
      value: {
        children: "Button text",
        onClick: (e: React.MouseEvent<HTMLButtonElement>) =>
          action("callToAction.onClick")(e),
      },
    },
    {
      label: "Empty",
      value: undefined,
    },
  ];

const meta: Meta<typeof DropdownPanel> = {
  title: "DesignSystem/_internals/Navigation/DropdownPanel",
  component: DropdownPanel,
  argTypes: {
    testID: {
      description: "Test identifier for unit/integration testing.",
    },
    cornerPosition: {
      control: "radio",
      options: ["left", "right"],
      description:
        "Determines which top corner of the panel is squared off (used to align with dropdown anchors).",
    },
    animated: {
      type: "boolean",
      description: "",
    },
    footerChildren: {
      ...createComplexControl(footerChildrenOptions),
      description: "Optional footer content. Placed above the `callToAction`.",
    },
    callToAction: {
      ...createComplexControl(callToActionOptions),
      description: "Optional call to action. Placed below `footerChildren`.",
    },
    children: {
      ...createComplexControl(childrenOptions),
      description: "The main panel content or body.",
    },
  },
  args: {
    testID: "dropdown-panel",
    cornerPosition: "right",
    children: childrenOptions[0].value,
    footerChildren: footerChildrenOptions[0].value,
    callToAction: {
      children: "Button text",
      onClick: action("callToAction.onClick"),
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
