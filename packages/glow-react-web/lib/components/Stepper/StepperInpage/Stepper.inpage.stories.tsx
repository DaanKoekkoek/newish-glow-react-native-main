import type { Meta, StoryObj } from "@storybook/react";

import { StepperInpage, StepperInpageStep } from "./Stepper.inpage";
import { TextLink } from "components/TextLink";
import { Paragraph } from "foundations/Paragraph";
import { Icon } from "foundations/Icon";
import { Button } from "components/Button";
import { OdidoPalette } from "_internals/Color";
import { Badge } from "components/Badge";
import { Callout } from "components/Callout";

const meta: Meta<typeof StepperInpage> = {
  title: "DesignSystem/Components/ProgressIndicators/Stepper/InPage",
  component: StepperInpage,
  argTypes: {
    palette: {
      control: { type: "select" },
      options: [undefined, ...OdidoPalette],
      description: "Set the colour palette of the Box.",
    },
  },
  args: {
    palette: "default",
    children: [
      <StepperInpageStep
        key="step-1"
        title="Step 1 title default"
        badge={<Badge text="Klantvoordeel" palette="green" />}
        textLink={
          <TextLink href="#" size="sm">
            <Icon name="add" />
            Text link
          </TextLink>
        }
      >
        <Paragraph size="sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam hendrerit
          dolor in fermentum dictum. Aenean ac pulvinar sapien. Quisque nec elit
          placerat, eleifend nisi ac, venenatis velit. Ut et aliquet lorem.
          Pellentesque ac mollis ligula.
        </Paragraph>
      </StepperInpageStep>,
      <StepperInpageStep
        key="step-2"
        title="Step 2 title with extra long title that should wrap"
        state="active"
        button={
          <Button prominence="emphasised" fill>
            Button text
          </Button>
        }
      >
        <Paragraph size="sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam hendrerit
          dolor in fermentum dictum. Aenean ac pulvinar sapien. Quisque nec elit
          placerat, eleifend nisi ac, venenatis velit. Ut et aliquet lorem.
          Pellentesque ac mollis ligula.
        </Paragraph>
      </StepperInpageStep>,
      <StepperInpageStep
        badge={<Badge text="Klantvoordeel" palette="green" />}
        key="step-3"
        title="Step 3 title disabled"
        state="inactive"
        callout={
          <Callout status="warning" title="Title" description="description" />
        }
      >
        <Paragraph size="sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam hendrerit
          dolor in fermentum dictum. Aenean ac pulvinar sapien. Quisque nec elit
          placerat, eleifend nisi ac, venenatis velit. Ut et aliquet lorem.
          Pellentesque ac mollis ligula.
        </Paragraph>
      </StepperInpageStep>,
      <StepperInpageStep
        key="step-4"
        title="Step 4 title completed"
        state="completed"
        textLink={
          <TextLink href="#" size="sm">
            Text link
          </TextLink>
        }
      />,
    ],
  },
} satisfies Meta<typeof StepperInpage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Inpage: Story = {};
