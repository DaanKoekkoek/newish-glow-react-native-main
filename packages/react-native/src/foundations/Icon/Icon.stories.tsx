import { glyphmap as IconsMap } from "@odido-portals/glow-icon/fonts";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, useThemeProviderContext } from "components/index";
import { Icon, type IconProps, type IconNames } from "foundations/Icon";
import React from "react";

import { Grid } from "../Grid";
import { Main } from "../Main";
import { Paragraph } from "../Paragraph";
import { Section } from "../Section";
import { Stack } from "../Stack";

const meta: Meta<IconProps> = {
  title: "DesignSystem/Foundations/Assets/Icon/Icon",
  component: Icon,
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
    solid: { control: { type: "boolean" } },
  },
  args: {
    name: "add",
  },
  render: (props: IconProps) => (
    <Box size="sm" prominence="color">
      <SingleIcon {...props} />
    </Box>
  ),
};

export default meta;

type Story = StoryObj<typeof meta>;

const SingleIcon = ({ ...props }: IconProps) => {
  const { theme, brand } = useThemeProviderContext();

  return (
    <Icon
      brand={brand !== "simpel" ? brand : undefined}
      {...props}
      style={theme === "dark" && { color: "#ffffff" }}
    />
  );
};

const IconCollection = ({ ...props }) => {
  const { theme, brand } = useThemeProviderContext();

  return (
    <Main>
      <Section>
        <Grid mobileSmall={6} laptop={3}>
          {Object.keys(IconsMap).map((iconName) => (
            <Grid.Column key={iconName}>
              <Box size="sm" prominence="color" key={iconName}>
                <Stack alignItems="center">
                  <Icon
                    {...props}
                    brand={brand !== "simpel" ? brand : undefined}
                    name={iconName as IconNames}
                    style={theme === "dark" && { color: "#ffffff" }}
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

export const AllIcons: Story = {
  tags: ["no-grid"],
  argTypes: {
    name: {
      control: { type: null },
    },
  },
  render: (props: IconProps) => <IconCollection {...props} />,
};
