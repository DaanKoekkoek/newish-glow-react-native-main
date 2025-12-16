import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

import { StepperInpage } from "./Stepper.inpage";
import { Paragraph } from "../../foundations/Paragraph";
import { Button } from "../Button";
import { TextLink } from "../TextLink";

const meta = {
  title: "DesignSystem/Components/ProgressIndicators/Stepper/InPage/Item",
  component: StepperInpage.Step,
  parameters: {
    controls: {
      exclude: ["activeStep", "collapsable"],
    },
  },
  argTypes: {
    size: {
      table: {
        disable: true,
      },
    },
    status: {
      name: "Status",
      control: "select",
      options: ["default", "active", "completed", "inactive"],
      defaultValue: "default",
    },
    palette: {
      description: "Set the colour palette of the inactive circle.",
      control: { type: "select" },
    },
    button: {
      description:
        "Must be a Button Component, Button to be displayed in the active step.",
      control: { disable: true },
    },
    textLink: {
      description: "Must be a TextLink Component",
      control: { disable: true },
    },
    content: {
      description: "Must be a React Component",
      control: { disable: true },
    },
  },
  args: {
    title: "Title 1",
    status: "default",
    palette: "default",
    badgeText: "Klantvoordeel",
  },
} satisfies Meta<typeof StepperInpage.Step>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Item: Story = {
  render: function Render({ ...args }) {
    return (
      <StepperInpage palette={args.palette}>
        <StepperInpage.Step
          title={args.title}
          status={args.status}
          content={<ExampleBodyComponent />}
          textLink={
            <TextLink href="#" size="sm">
              Text link
            </TextLink>
          }
          button={
            <Button prominence="emphasised" fill>
              Button text
            </Button>
          }
          badgeText={args.badgeText}
        />
      </StepperInpage>
    );
  },
};

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
