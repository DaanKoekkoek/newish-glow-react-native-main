import type { Meta } from "@storybook/react";
import React from "react";

import {
  Grid,
  Section,
  Heading,
  Main,
  Paragraph,
  Stack,
  Addon,
} from "../index";
import type { AddonProps } from "./Addon.types";

const meta: Meta<AddonProps> = {
  title: "DesignSystem/Foundations/Assets/LogosAndVisuals/Addon",
  component: Addon,
  args: {
    name: "Amazon Prime",
    size: "default",
    state: "default",
  },
  argTypes: {
    name: {
      control: "select",
      options: [
        "Amazon Prime",
        "HBO Max",
        "Wifi Plus",
        "Visual Voicemail",
        "Videoland",
        "Viaplay",
        "SkyShowtime",
        "Podimo",
        "Netflix",
        "Apple One",
        "Deezer",
        "Extra Veilig Online",
        "Multi-sim",
        "30DaysBasic",
        "30DaysFast",
        "30DaysFastest",
        "24hFastest",
      ],
    },
    size: {
      control: { type: "select" },
      options: [
        "xs",
        "sm",
        "default",
        { mobileSmall: "sm", tablet: "default" },
      ],
      description:
        "Whether the component is rendered as the default size, small or extra small. Can also be set per breakpoint.",
    },
    state: {
      control: { type: "select" },
      options: ["default", "inactive"],
    },
  },
  decorators: [(Story) => <Story />],
};

export default meta;

type Story = typeof meta;

export const Basic: Story = {
  decorators: [(Story) => <Story />],
};

export const AddonWithGrid: Story = {
  tags: ["no-grid"],
  args: {
    size: {
      mobileSmall: "sm",
      laptop: "default",
    },
  },
  render: ({ ...args }) => (
    <Main>
      <Section>
        <Grid laptop={4}>
          <Grid.Column>
            <Stack
              direction={{ mobileSmall: "row", laptop: "column" }}
              gap="sm"
            >
              <Addon {...args} key="addon" />
              <Stack gap={0} key="content">
                <Heading as="h3" size="md">
                  Title
                </Heading>
                <Paragraph>Copy text</Paragraph>
              </Stack>
            </Stack>
          </Grid.Column>
          <Grid.Column>
            <Stack
              direction={{ mobileSmall: "row", laptop: "column" }}
              gap="sm"
            >
              <Addon {...args} key="addon" />
              <Stack gap={0} key="content">
                <Heading as="h3" size="md">
                  Title
                </Heading>
                <Paragraph>
                  Copy text with extra text that should {"\n"}break into a new
                  line.
                </Paragraph>
              </Stack>
            </Stack>
          </Grid.Column>
          <Grid.Column>
            <Stack
              direction={{ mobileSmall: "row", laptop: "column" }}
              gap="sm"
            >
              <Addon {...args} key="addon" />
              <Stack gap={0} key="content">
                <Heading as="h3" size="md">
                  Title
                </Heading>
                <Paragraph>Copy text</Paragraph>
              </Stack>
            </Stack>
          </Grid.Column>
        </Grid>
      </Section>
    </Main>
  ),
};
