import type { Meta, StoryObj } from "@storybook/react";
import { odidoPaletteKeys } from "_theming/tokenLoader";
import { Button } from "components/index";
import { Section, Grid, Main, Paragraph } from "foundations/index";
import React from "react";

import { StepperInpage } from "./Stepper.inpage";
import { TextLink } from "../TextLink";

const metaInpage: Meta<typeof StepperInpage> = {
  title: "DesignSystem/Components/ProgressIndicators/Stepper/InPage",
  component: StepperInpage,
  argTypes: {
    palette: {
      control: { type: "select" },
      options: [...odidoPaletteKeys],
      description: "Set the colour palette of the Box.",
    },
  },
  args: {
    palette: "default",
    children: [
      <StepperInpage.Step
        key="step-1"
        title="Step 1 title default"
        badgeText="Klantvoordeel"
        content={
          <Paragraph size="sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
            hendrerit dolor in fermentum dictum. Aenean ac pulvinar sapien.
            Quisque nec elit placerat, eleifend nisi ac, venenatis velit. Ut et
            aliquet lorem. Pellentesque ac mollis ligula.
          </Paragraph>
        }
        textLink={
          <TextLink href="#" size="sm">
            <TextLink.Icon name="add" />
            Text link
          </TextLink>
        }
      />,
      <StepperInpage.Step
        key="step-2"
        title="Step 2 title with extra long title that should wrap"
        status="active"
        content={
          <Paragraph size="sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
            hendrerit dolor in fermentum dictum. Aenean ac pulvinar sapien.
            Quisque nec elit placerat, eleifend nisi ac, venenatis velit. Ut et
            aliquet lorem. Pellentesque ac mollis ligula.
          </Paragraph>
        }
        button={
          <Button prominence="emphasised" fill>
            Button text
          </Button>
        }
      />,
      <StepperInpage.Step
        key="step-3"
        title="Step 3 title disabled"
        status="inactive"
        content={
          <Paragraph size="sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
            hendrerit dolor in fermentum dictum. Aenean ac pulvinar sapien.
            Quisque nec elit placerat, eleifend nisi ac, venenatis velit. Ut et
            aliquet lorem. Pellentesque ac mollis ligula.
          </Paragraph>
        }
      />,
      <StepperInpage.Step
        key="step-4"
        title="Step 4 title completed"
        status="completed"
        textLink={
          <TextLink href="#" size="sm">
            Text link
          </TextLink>
        }
      />,
    ],
  },
  decorators: [
    (Story, args) => (
      <Main>
        <Section>
          <Grid>
            <Grid.Column>
              <Story {...args} />
            </Grid.Column>
          </Grid>
        </Section>
      </Main>
    ),
  ],
} satisfies Meta<typeof StepperInpage>;

export default metaInpage;

type Story = StoryObj<typeof metaInpage>;

export const Inpage: Story = {};
