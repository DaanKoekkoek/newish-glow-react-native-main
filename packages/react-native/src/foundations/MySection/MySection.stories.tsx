import type { Meta, StoryObj } from "@storybook/react";
import { odidoPaletteKeys } from "_theming/tokenLoader";
import { Box } from "components/Box";
import React from "react";

import type { MySectionProps } from "./MySection.types";
import { Main, Paragraph } from "../index";
import { MySection } from "./MySection";
import { glowGradientVariants } from "../GlowGradient/GlowGradient.constants";
import IMAGES from "../Image/Image.mock";

const meta: Meta<MySectionProps> = {
  title: "DesignSystem/Foundations/Layout/Section/MySection",
  component: MySection,
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "subtle", "emphasised", "image"],
      description: "Background variant",
    },
    palette: {
      options: ["default", ...odidoPaletteKeys],
      control: "select",
      description: "Set the colour palette of the Section.",
    },
    glow: {
      control: "select",
      options: glowGradientVariants,
      description: "Glow background color.",
    },
    image: {
      description:
        "Apply a background image to the section. Sets the background with sizing property `cover`.",
    },
    paddingTop: {
      options: ["none", "default"],
      control: "select",
    },
    children: {
      control: false,
      description:
        "Accepts a `Grid` component. Renders the child at the bottom of the section.",
    },
  },
  args: {
    children: [
      <MySection.Container>
        <MySection.Title size="xl">XL title</MySection.Title>
        <MySection.Grid>
          <Box prominence="outline" size="sm">
            <Paragraph>Example component 1</Paragraph>
          </Box>
          <Box prominence="outline" size="sm">
            <Paragraph>Example component 2</Paragraph>
          </Box>
        </MySection.Grid>
      </MySection.Container>,
      <MySection.Container>
        <MySection.Title size="lg">LG title</MySection.Title>
        <MySection.Grid>
          <Box prominence="outline" size="sm">
            <Paragraph>Example component 3</Paragraph>
          </Box>
          <Box prominence="outline" size="sm">
            <Paragraph>Example component 4</Paragraph>
          </Box>
        </MySection.Grid>
      </MySection.Container>,
      <MySection.Container>
        <MySection.Title size="md">MD title</MySection.Title>
        <MySection.Grid>
          <Box prominence="outline" size="sm">
            <Paragraph>Example component 5</Paragraph>
          </Box>
          <Box prominence="outline" size="sm">
            <Paragraph>Example component 6</Paragraph>
          </Box>
        </MySection.Grid>
      </MySection.Container>,
    ],
    variant: "default",
    glow: "Glow1",
    paddingTop: "default",
    palette: "default",
  },
  decorators: [
    (Story, args) => (
      <Main>
        <Story {...args} />
      </Main>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Image: Story = {
  args: {
    variant: "image",
    image: {
      src: "https://assets.odido.nl/e66aa70743/mid-hero-2023_06_b2c_55_g1g3.WebP",
      alt: "Alt",
      localSrc: IMAGES["mid-hero"],
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
    palette: "default",
  },
};
