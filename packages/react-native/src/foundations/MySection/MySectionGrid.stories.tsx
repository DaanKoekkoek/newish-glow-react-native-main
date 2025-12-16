import type { Meta, StoryObj } from "@storybook/react";
import { Box } from "components/Box";
import React from "react";

import type { MySectionGridProps } from "./MySection.types";
import { Main, Paragraph } from "../index";
import { MySection } from "./MySection";

const gridDivision = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const meta: Meta<MySectionGridProps> = {
  title: "DesignSystem/Foundations/Layout/Section/MySection/Grid",
  component: MySection.Grid,
  argTypes: {
    children: {
      description: "Accepts `React.ReactElement` or `React.ReactElement[]`.",
      table: {
        disable: true,
      },
    },
    desktop: {
      name: "Column size desktop",
      control: "select",
      options: gridDivision,
      description: "Breakpoint desktop: >= 1440",
      table: {
        defaultValue: { summary: 12 },
      },
    },
    laptop: {
      name: "Column size laptop",
      control: "select",
      options: gridDivision,
      description: "Breakpoint laptop: >= 960",
      table: {
        defaultValue: { summary: 12 },
      },
    },
    tablet: {
      name: "Column size tablet",
      control: "select",
      options: gridDivision,
      description: "Breakpoint tablet: >= 530",
      table: {
        defaultValue: { summary: 12 },
      },
    },
    mobile: {
      name: "Column size mobile",
      control: "select",
      options: gridDivision,
      description: "Breakpoint mobile: >= 360",
      table: {
        defaultValue: { summary: 12 },
      },
    },
    mobileSmall: {
      name: "Column size mobileSmall",
      control: "select",
      options: gridDivision,
      description: "Breakpoint mobileSmall: > 0px",
      table: {
        defaultValue: { summary: 12 },
      },
    },
  },
  args: {
    children: (
      <Box prominence="outline" size="sm">
        <Paragraph>Example component 1</Paragraph>
      </Box>
    ),
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args: MySectionGridProps) => (
    <Main>
      <MySection variant="subtle">
        <MySection.Container>
          <MySection.Grid {...args}>
            <Box prominence="outline" size="sm">
              <Paragraph>Component example 1</Paragraph>
            </Box>
          </MySection.Grid>
        </MySection.Container>
      </MySection>
    </Main>
  ),
};

export const TwoColumns: Story = {
  args: {
    tablet: 6,
    children: [
      <Box prominence="outline" size="sm">
        <Paragraph>Example component 1</Paragraph>
      </Box>,
      <Box prominence="outline" size="sm">
        <Paragraph>Example component 2</Paragraph>
      </Box>,
    ],
  },
  render: (args: MySectionGridProps) => (
    <Main>
      <MySection variant="subtle">
        <MySection.Container>
          <MySection.Grid {...args}>
            <Box prominence="outline" size="sm">
              <Paragraph>Component example 1</Paragraph>
            </Box>
            <Box prominence="outline" size="sm">
              <Paragraph>Component example 2</Paragraph>
            </Box>
          </MySection.Grid>
        </MySection.Container>
      </MySection>
    </Main>
  ),
};
