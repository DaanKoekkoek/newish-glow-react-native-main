import type { Meta, StoryObj } from "@storybook/react";
import { Box } from "components/index";
import { Paragraph } from "foundations/index";
import { StepperVertical, StepperVerticalStep } from "./Stepper.vertical";

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
  component: StepperVerticalStep,
  argTypes: {
    size: {
      table: {
        disable: true,
      },
    },
    state: {
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
    state: "active",
    collapsible: false,
    collapsed: false,
    contentBody: <ExampleBodyComponent />,
    contentFooter: <ExampleFooterComponent />,
  },
} satisfies Meta<typeof StepperVerticalStep>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Item: Story = {
  render: function Render({ ...args }) {
    return (
      <StepperVertical collapsible={args.collapsible} palette={args.palette}>
        <StepperVerticalStep {...args} />
      </StepperVertical>
    );
  },
};
