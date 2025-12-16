import { glyphmap as IconsMap } from "@odido-portals/glow-icon/fonts";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, useThemeProviderContext } from "components/index";
import React from "react";

import { gradientVariants } from "../GlowGradient/GlowGradient.constants";
import { GlowIcon, type GlowIconProps } from "../GlowIcon";
import { Grid } from "../Grid";
import { Main } from "../Main";
import { Paragraph } from "../Paragraph";
import { Section } from "../Section";
import { Stack } from "../Stack";
import type { IconNames } from "./Icon.types";

const meta: Meta<GlowIconProps> = {
  title: "DesignSystem/Foundations/Assets/Icon/GlowIcon",
  component: GlowIcon,
  args: {
    type: "Glow1",
    name: "add",
    solid: true,
    size: "xxl",
  },
  argTypes: {
    name: {
      options: Object.keys(IconsMap),
      control: { type: "select" },
    },
    size: {
      options: ["sm", "default", "md", "lg", "xl", "xxl"],
      control: { type: "select" },
      table: {
        defaultValue: "default",
      },
    },
    brightness: {
      control: { type: "select" },
    },
    type: {
      control: { type: "select" },
      options: gradientVariants,
    },
    renderAs: {
      control: { type: "select" },
    },
    solid: { control: { type: "boolean" } },
  },
  render: (props: GlowIconProps) => (
    <Box size="sm" prominence="color">
      <SingleGlowIcon {...props} />
    </Box>
  ),
};

export default meta;

type Story = StoryObj<typeof meta>;

const SingleGlowIcon = ({ ...props }: GlowIconProps) => {
  const { brand } = useThemeProviderContext();

  return <GlowIcon brand={brand !== "simpel" ? brand : undefined} {...props} />;
};

const GlowIconCollection = ({ ...props }: GlowIconProps) => {
  const { brand } = useThemeProviderContext();

  return (
    <Main>
      <Section>
        <Grid mobileSmall={6} laptop={3}>
          {Object.keys(IconsMap).map((iconName) => (
            <Grid.Column key={iconName}>
              <Box size="sm" prominence="color" key={iconName}>
                <Stack alignItems="center">
                  <GlowIcon
                    brand={brand !== "simpel" ? brand : undefined}
                    {...props}
                    name={iconName as IconNames}
                  />
                  <Paragraph alignment="center">{iconName}</Paragraph>
                </Stack>
              </Box>
            </Grid.Column>
          ))}
        </Grid>
      </Section>
    </Main>
  );
};

export const Basic: Story = {};

export const AllIconsWithGradient: Story = {
  argTypes: {
    name: {
      control: { type: null },
    },
  },
  render: (props: GlowIconProps) => <GlowIconCollection {...props} />,
};
