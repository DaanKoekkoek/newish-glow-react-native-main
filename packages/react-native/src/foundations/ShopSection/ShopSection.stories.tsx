import type { Meta, StoryObj } from "@storybook/react";
import { odidoPaletteKeys } from "_theming/tokenLoader";
import { Box } from "components/index";
import { glowGradientVariants } from "foundations/GlowGradient/GlowGradient.constants";
import { Paragraph } from "foundations/Paragraph";
import React from "react";

import { Main } from "../Main";
import { ShopSection } from "./ShopSection";
import type { ShopSectionProps } from "./ShopSection.types";
import IMAGES from "../../foundations/Image/Image.mock";

const meta: Meta<ShopSectionProps> = {
  title: "DesignSystem/Foundations/Layout/Section/ShopSection",
  component: ShopSection,
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
      control: "select",
      options: ["default", "large", "none"],
      description: "Padding top with values as `default`, `large`, `none`.",
    },
    paddingBottom: {
      control: "select",
      options: ["default", "large"],
      description: "Padding bottom with values as `default`, `large`.",
    },
    showSidepanel: {
      type: "boolean",
      description: "Shows or hides side panel of section.",
    },
    children: {
      control: false,
      description:
        "Accepts a `ShopSection.Main` as main component and `ShopSection.Side` as side component.",
    },
  },
  args: {
    children: [
      <ShopSection.Container key="container">
        <Box prominence="outline" size="sm">
          <Paragraph alignment="center">Example component</Paragraph>
        </Box>
        <Box prominence="outline" size="sm">
          <Paragraph alignment="center">Example component</Paragraph>
        </Box>
        <Box prominence="outline" size="sm">
          <Paragraph alignment="center">Example component</Paragraph>
        </Box>
        <Box prominence="outline" size="sm">
          <Paragraph alignment="center">Example component</Paragraph>
        </Box>
      </ShopSection.Container>,
      <ShopSection.Sidebar key="sidebar">
        <Box prominence="outline" size="sm">
          <Paragraph alignment="center">Cart component</Paragraph>
        </Box>
        <Box prominence="outline" size="sm">
          <Paragraph alignment="center">Example component</Paragraph>
        </Box>
      </ShopSection.Sidebar>,
    ],
    variant: "default",
    glow: "Glow1",
    paddingTop: "default",
    paddingBottom: "default",
    palette: "default",
    showSidepanel: true,
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
