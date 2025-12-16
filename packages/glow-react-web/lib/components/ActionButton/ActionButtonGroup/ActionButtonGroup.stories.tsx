import type { Meta, StoryObj } from "@storybook/react";

import { ActionButtonGroup } from ".";
import { ActionButton } from "../ActionButton";
import type { ActionButtonGroupProps } from ".";

// Define custom story args that extend the component props
type ActionButtonGroupStoryArgs = ActionButtonGroupProps & {
  numberOfButtons: 1 | 2 | 3;
  button1Prominence: "default" | "secondary" | "emphasised";
  button2Prominence: "default" | "secondary" | "emphasised";
  button3Prominence: "default" | "secondary" | "emphasised";
};

const meta: Meta<ActionButtonGroupStoryArgs> = {
  title: "DesignSystem/Components/Button/ActionButtonGroup/Group",
  component: ActionButtonGroup,
  argTypes: {
    // Control for number of buttons
    numberOfButtons: {
      control: { type: "select" },
      options: [1, 2, 3],
      description: "Number of buttons to display in the group",
      table: { category: "Layout" },
    },
    // Controls for individual button prominence
    button1Prominence: {
      control: { type: "select" },
      options: ["default", "secondary", "emphasised"],
      description: "Prominence styling for the first button",
      table: { category: "Button Styling" },
    },
    button2Prominence: {
      control: { type: "select" },
      options: ["default", "secondary", "emphasised"],
      description: "Prominence styling for the second button",
      table: { category: "Button Styling" },
      if: { arg: "numberOfButtons", neq: 1 },
    },
    button3Prominence: {
      control: { type: "select" },
      options: ["default", "secondary", "emphasised"],
      description: "Prominence styling for the third button",
      table: { category: "Button Styling" },
      if: { arg: "numberOfButtons", eq: 3 },
    },
  },
  args: {
    numberOfButtons: 3,
    button1Prominence: "default",
    button2Prominence: "default",
    button3Prominence: "emphasised",
  },
  render: (args) => {
    // Define all possible buttons
    const allButtons = [
      <ActionButton
        onClick={() => {}}
        icon="4g-for-home"
        key="4g-for-home"
        label="Home 4G"
        prominence={args.button1Prominence}
      />,
      <ActionButton
        onClick={() => {}}
        icon="3d"
        key="3d"
        label="3D woah!"
        prominence={args.button2Prominence}
      />,
      <ActionButton
        onClick={() => {}}
        icon="add-device"
        key="add-device"
        label="New device"
        prominence={args.button3Prominence}
      />,
    ];

    // Return only the requested number of buttons
    const buttonsToShow = allButtons.slice(0, args.numberOfButtons);

    return <ActionButtonGroup>{buttonsToShow}</ActionButtonGroup>;
  },
};

export default meta;

type Story = StoryObj<ActionButtonGroupStoryArgs>;

export const Basic: Story = {};
