import type { Meta, StoryObj } from "@storybook/react";

import { Grid, Column } from "./Grid.tsx";

import type { BreakpointValues } from "_utility";
import type { GridProps, ColumnSizeOptions } from "./Grid.types.ts";
import { Box } from "components/Box/Box.tsx";
import { Paragraph } from "foundations/Paragraph";
import { Section } from "foundations/Section";
import {
  type ComplexOption,
  createComplexControl,
} from "@storybook/utils/complexOptions";

const columnSizeOptions: ComplexOption<GridProps["columnSize"]>[] = [
  {
    label: "none",
    value: undefined,
  },
  {
    label: "mobileSmall: 12, tablet: 6",
    value: { mobileSmall: 12, tablet: 6 },
  },
  {
    label: "mobileSmall: 12, tablet: 8",
    value: { mobileSmall: 12, tablet: 8 },
  },
  {
    label: "6 (applied on all breakpoints)",
    value: 6,
  },
];

const Columns = (
  amount: number,
  currentGrid: number,
  prefix?: string,
  size?: Partial<BreakpointValues<ColumnSizeOptions>>,
) => {
  return Array.from({ length: amount }, (_, index) => (
    <Column key={index} size={size}>
      <Box size="sm">
        <Paragraph alignment="center">
          {prefix} {currentGrid > 0 ? currentGrid : index + 1}
        </Paragraph>
      </Box>
    </Column>
  ));
};

const meta: Meta<typeof Grid> = {
  title: "DesignSystem/Foundations/Layout/Grid",
  component: Grid,
  argTypes: {
    gridClassName: {
      description: "Apply additional classNames to the grid component.",
      control: false,
      table: {
        disable: true,
      },
    },
    noGutters: {
      description: "Removes gutter spacing on the left and right.",
      control: "radio",
      options: [true, false],
    },
    containerClassName: {
      description:
        "Apply additional classNames to the parent container of the grid (container).",
      control: false,
      table: {
        disable: true,
      },
    },
    children: {
      description: "Accepts `Column` as children",
      control: false,
      table: {
        disable: true,
      },
    },
    direction: {
      description: "The direction order for the `Column` items.",
      options: [
        "row",
        "row-reverse",
        { mobileSmall: "row", tablet: "row-reverse" },
      ],
      control: {
        type: "select",
      },
    },
    columnSize: {
      ...createComplexControl(columnSizeOptions),
      description: "The size of the `Column` items.",
    },
  },
  args: {
    children: [...Columns(2, 0, "Column")],
  },
  decorators: [
    (Story) => (
      <Section variant="subtle">
        <Story />
      </Section>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const ColumnsWithSizes: Story = {
  args: {
    columnSize: { mobileSmall: 6, desktop: 6 },
  },
};

export const WidthOnColumn: Story = {
  args: {
    children: [
      <>
        <Column size={{ mobileSmall: 6, desktop: 2 }} key={1}>
          <Box size="sm">
            <Paragraph alignment="center">Column 1</Paragraph>
          </Box>
        </Column>
        <Column size={{ mobileSmall: 6, desktop: 4 }} key={2}>
          <Box size="sm">
            <Paragraph alignment="center">Column 2</Paragraph>
          </Box>
        </Column>
        <Column size={{ mobileSmall: 12, desktop: 6 }} key={3}>
          <Box size="sm">
            <Paragraph alignment="center">Column 3</Paragraph>
          </Box>
        </Column>
      </>,
    ],
  },
};

export const NarrowSize: Story = {
  args: {
    width: "narrow",
    children: [
      <>
        <Column size={{ mobileSmall: 12, desktop: 6 }} key={1}>
          <Box size="sm">
            <Paragraph alignment="center">Column 1</Paragraph>
          </Box>
        </Column>
        <Column size={{ mobileSmall: 12, desktop: 6 }} key={2}>
          <Box size="sm">
            <Paragraph alignment="center">Column 2</Paragraph>
          </Box>
        </Column>
        <Column size={{ mobileSmall: 12, desktop: 6 }} key={3}>
          <Box size="sm">
            <Paragraph alignment="center">Column 3</Paragraph>
          </Box>
        </Column>
      </>,
    ],
  },
};

export const BoxSize: Story = {
  args: {
    width: "narrow",
    children: [
      <>
        <Column size={{ mobileSmall: 12, desktop: 6 }} key={1}>
          <Box size="sm">
            <Paragraph alignment="center">Column 1</Paragraph>
          </Box>
        </Column>
        <Column size={{ mobileSmall: 12, desktop: 6 }} key={2}>
          <Box size="sm">
            <Paragraph alignment="center">Column 2</Paragraph>
          </Box>
        </Column>
        <Column size={{ mobileSmall: 12, desktop: 6 }} key={3}>
          <Box size="sm">
            <Paragraph alignment="center">Column 3</Paragraph>
          </Box>
        </Column>
      </>,
    ],
  },
};

export const BreakpointAndLayout: Story = {
  args: {
    children: [
      <>
        {Columns(2, 2, undefined, { mobileSmall: 6 })}
        {Columns(3, 3, undefined, { mobileSmall: 4 })}
        {Columns(4, 4, undefined, { mobileSmall: 3 })}
        {Columns(6, 5, undefined, { mobileSmall: 2 })}
        {Columns(12, 6, undefined, { mobileSmall: 1 })}
      </>,
    ],
  },
};
