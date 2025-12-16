import type { Meta, StoryObj } from "@storybook/react";
import { Box } from "components/index";
import { Paragraph } from "foundations/index";
import React from "react";

import { StepperVertical } from "../";

const ExampleBodyComponent = () => {
  return (
    <Paragraph size="sm">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam hendrerit
      dolor in fermentum dictum. Aenean ac pulvinar sapien. Quisque nec elit
      placerat, eleifend nisi ac, venenatis velit. Ut et aliquet lorem.
      Pellentesque ac mollis ligula.
    </Paragraph>
  );
};
const ExampleFooterComponent = () => {
  return (
    <Box prominence="color" size="sm">
      <Paragraph alignment="center">Example component</Paragraph>
    </Box>
  );
};

const meta = {
  title: "DesignSystem/Components/ProgressIndicators/Stepper/Vertical/Step",
  component: StepperVertical.Step,
  argTypes: {
    size: {
      table: {
        disable: true,
      },
    },
    status: {
      name: "Status",
      control: "select",
      options: ["active", "completed", "inactive"],
      defaultValue: "default",
    },
    contentBody: {
      description:
        "Must be a React Element to be rendered in the body of the step.",
      control: {
        disable: true,
      },
    },
    contentFooter: {
      description:
        "Must be a React Element to be rendered in the body of the step.",
      control: {
        disable: true,
      },
    },
    palette: {
      description: "Set the colour palette of the inactive circle.",
      control: { type: "select" },
    },
  },
  args: {
    title: "Title 1",
    status: "active",
    collapsable: false,
    collapsed: false,
    contentBody: <ExampleBodyComponent />,
    contentFooter: <ExampleFooterComponent />,
  },
} satisfies Meta<typeof StepperVertical.Step>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Item: Story = {
  render: function Render({ ...args }) {
    return (
      <StepperVertical collapsable={args.collapsable} palette={args.palette}>
        <StepperVertical.Step {...args} />
      </StepperVertical>
    );
  },
};
