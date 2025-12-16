import type { Meta, StoryObj } from "@storybook/react";
import { Box } from "components/index";
import { Paragraph } from "foundations/index";

import { StepperVertical, StepperVerticalStep } from "./Stepper.vertical";
import { OdidoPalette } from "_internals/Color/Palette";

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

const metaVertical: Meta<typeof StepperVertical> = {
  title: "DesignSystem/Components/ProgressIndicators/Stepper/Vertical",
  component: StepperVertical,
  argTypes: {
    size: {
      table: {
        disable: true,
      },
    },
    palette: {
      control: { type: "select" },
      options: [undefined, ...OdidoPalette],
      description: "Set the colour palette of the Box.",
    },
  },
  args: {
    activeStep: 3,
    palette: "default",
    collapsible: false,
    testID: "stepper",
    children: [
      <StepperVerticalStep
        key="step-1"
        title="Step 1 label"
        contentBody={<ExampleBodyComponent />}
        collapsed
      />,
      <StepperVerticalStep
        key="step-2"
        title="Step 2 label"
        contentBody={<ExampleBodyComponent />}
      />,
      <StepperVerticalStep
        key="step-3"
        title="Step 3 label"
        contentBody={<ExampleBodyComponent />}
        contentFooter={<ExampleFooterComponent />}
      />,
      <StepperVerticalStep
        key="step-4"
        title="Step 4 label"
        contentBody={<ExampleBodyComponent />}
      />,
    ],
  },
  decorators: [(Story, args) => <Story {...args} />],
} satisfies Meta<typeof StepperVertical>;

export default metaVertical;

type Story = StoryObj<typeof metaVertical>;

export const Vertical: Story = {};
