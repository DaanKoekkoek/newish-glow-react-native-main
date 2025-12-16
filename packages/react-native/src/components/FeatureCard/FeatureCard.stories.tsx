import type { Meta } from "@storybook/react";
import { odidoPaletteKeys } from "_theming/tokenLoader";
import { gradientVariants } from "foundations/GlowGradient/GlowGradient.constants";
import { Grid, Main, Section } from "foundations/index";
import React from "react";

import { FeatureCard } from "./FeatureCard";
import type { FeatureCardProps } from "./FeatureCard.types";

const meta: Meta<FeatureCardProps> = {
  title: "DesignSystem/Components/Card/FeatureCard",
  component: FeatureCard,
  args: {
    type: "text",
    title: "Title",
    style: "default",
    variant: "default",
    description: "description",
  },
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["visual", "backgroundImage", "text"],
      description: "Set the rendering type of the `<FeatureCard />`.",
    },
    style: {
      control: { type: "select" },
      options: ["default", "alternate"],
      description: "Set background color of the `<FeatureCard />`.",
    },
    gradient: {
      control: "select",
      options: gradientVariants,
      description:
        "Changes the glow gradient color of the `<FeatureCard />`. Only applicable when `type` is set to `text`, and the theme brand is set to `Odido`.",
    },
    variant: {
      control: { type: "select" },
      options: ["default", "compact"],
      description: "Set the content alignment of the `<FeatureCard />`.",
    },
    palette: {
      control: { type: "select" },
      options: [undefined, ...odidoPaletteKeys],
      description: "Set the content alignment of the `<FeatureCard />`.",
    },
    onPress: { type: "function" },
    title: { control: { type: "text" } },
    description: { control: { type: "text" } },
    image: {
      description:
        "Image shown inside the `<FeatureCard />`. Is rendered differently based on the `type`.",
    },
  },
  decorators: [(Story) => <Story />],
};

export default meta;

type Story = typeof meta;

export const Basic: Story = {
  args: {
    type: "text",
  },
};

export const Multiple: Story = {
  args: {
    style: "alternate",
    image: {
      src: "https://assets.odido.nl/1600x900/a2c094c8eb/mid-hero-stocksy_txpfcee7f02fc0400_originaldelivery_4220176.WebP",
      alt: "image",
    },
  },
  render: (args) => (
    <Main>
      <Section>
        <Grid laptop={6}>
          <Grid.Column>
            <FeatureCard {...args} description="Description" />
          </Grid.Column>
          <Grid.Column>
            <FeatureCard
              {...args}
              description="Extra long description that might break into a new line"
            />
          </Grid.Column>
        </Grid>
      </Section>
    </Main>
  ),
};

export const Visual: Story = {
  args: {
    type: "visual",
    style: "alternate",
    image: {
      src: "https://assets.odido.nl/305x450/671d6313b9/dvi-back-front_apple_iphone_15promax_kleur2_305x450_v1.webp",
      alt: "alt",
    },
  },
};

export const Background: Story = {
  args: {
    type: "backgroundImage",
    image: {
      src: "https://assets.odido.nl/1600x900/a2c094c8eb/mid-hero-stocksy_txpfcee7f02fc0400_originaldelivery_4220176.WebP",
      alt: "",
    },
  },
};
