import { Meta, StoryObj } from "@storybook/react";
import { Section } from "./Section";
import { Box } from "components/Box";
import { Column, Grid } from "foundations/Grid";
import { Paragraph } from "foundations/Paragraph";
import { DefaultCard } from "components/DefaultCard";
import { Button } from "components/Button";

const meta: Meta<typeof Section> = {
  title: "DesignSystem/Foundations/Layout/Section/Section",
  component: Section,
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "subtle", "emphasised", "image"],
      description: "Background variant",
    },
    palette: {
      options: [
        "default",
        "blue",
        "green",
        "orange",
        "pink",
        "purple",
        "red",
        "yellow",
      ],
      control: "select",
      description: "Set the colour palette of the Section.",
    },
    image: {
      description:
        "Apply a background image to the section. Sets the background with sizing property `cover`.",
    },
    paddingTop: {
      description:
        "Sets the top padding of `Section`. Can also be applied across breakpoints.",
      options: ["default", "none"],
      control: "select",
    },
    children: {
      control: false,
      description:
        "Accepts a `Grid` component. Renders the child at the bottom of the section.",
    },
    className: {
      description: "Apply additional classNames to the section component.",
    },
    type: {
      table: {
        disable: true,
      },
    },
  },
  args: {
    children: [
      <Grid key="child-1">
        <Column>
          <Box prominence="color" size="sm">
            <Paragraph>Grid (variant: default), Column 12</Paragraph>
          </Box>
        </Column>
      </Grid>,
    ],
    variant: "default",
    palette: "blue",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Image: Story = {
  args: {
    variant: "image",
    image: {
      src: "https://assets.odido.nl/e66aa70743/mid-hero-2023_06_b2c_55_g1g3.WebP",
      alt: "Alt",
    },
  },
};

export const Emphasised: Story = {
  args: {
    variant: "emphasised",
  },
};

export const Subtle: Story = {
  args: {
    variant: "subtle",
    palette: "purple",
    children: (
      <Grid>
        <Column>
          <Box prominence="outline" size="sm">
            <Paragraph>Grid (variant: default), Column 12</Paragraph>
          </Box>
        </Column>
      </Grid>
    ),
  },
};

export const With4to8ColumnSplit: Story = {
  args: {
    variant: "default",
    palette: "blue",
    children: (
      <Grid>
        <Column size={{ mobileSmall: 12, tablet: 4 }}>
          <DefaultCard
            variant="outline"
            palette="orange"
            type="icon"
            icon="tablet"
            title={{ children: "Side Content", size: "lg" }}
            callToAction={[
              <Button stretched key="button">
                Learn More
              </Button>,
            ]}
          >
            <Paragraph>
              This card is in a 4-column layout on larger screens.
            </Paragraph>
          </DefaultCard>
        </Column>
        <Column size={{ mobileSmall: 12, tablet: 8 }}>
          <DefaultCard
            variant="outline"
            palette="purple"
            type="icon"
            icon="laptop"
            title={{ children: "Primary Content", size: "lg" }}
            callToAction={[
              <Button stretched key="button">
                Get Started
              </Button>,
            ]}
          >
            <Paragraph>
              This card occupies 8 columns on tablet and larger screens,
              creating a 4-8 grid ratio layout.
            </Paragraph>
          </DefaultCard>
        </Column>
      </Grid>
    ),
  },
};

export const With5to7ColumnSplit: Story = {
  args: {
    variant: "default",
    palette: "blue",
    children: (
      <Grid>
        <Column size={{ mobileSmall: 12, tablet: 5 }}>
          <DefaultCard
            variant="outline"
            palette="orange"
            type="icon"
            icon="tablet"
            title={{ children: "Side Content", size: "lg" }}
            callToAction={[
              <Button stretched key="button">
                Learn More
              </Button>,
            ]}
          >
            <Paragraph>
              This card is in a 5-column layout on tablet and larger screens.
            </Paragraph>
          </DefaultCard>
        </Column>
        <Column size={{ mobileSmall: 12, tablet: 7 }}>
          <DefaultCard
            variant="outline"
            palette="purple"
            type="icon"
            icon="laptop"
            title={{ children: "Primary Content", size: "lg" }}
            callToAction={[
              <Button stretched key="button">
                Get Started
              </Button>,
            ]}
          >
            <Paragraph>
              This card occupies 7 columns on tablet and larger screens,
              creating a 5-7 grid ratio layout.
            </Paragraph>
          </DefaultCard>
        </Column>
      </Grid>
    ),
  },
};
