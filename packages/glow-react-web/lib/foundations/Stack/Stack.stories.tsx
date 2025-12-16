import type { Meta, StoryObj } from "@storybook/react";

import { Stack } from "./Stack";
import type { StackProps } from "./Stack.types";
import { Box, InputField } from "components/index";
import { Heading, Paragraph } from "foundations/index";
import {
  type ComplexOption,
  createComplexControl,
} from "@storybook/utils/complexOptions";

const sizeOptions: ComplexOption<StackProps["size"]>[] = [
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

const columnSizeOptions: ComplexOption<StackProps["columnSize"]>[] = [
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

const meta: Meta<typeof Stack> = {
  title: "DesignSystem/Foundations/Layout/Stack",
  component: Stack,
  argTypes: {
    children: {
      description: "Accepts `React.ReactNode`.",
    },
    size: {
      ...createComplexControl(sizeOptions),
      description:
        "Applies a responsive, grid-like column structure directly on the Stack. The layout automatically accounts for `gap` sizing when calculating widths.",
    },
    columnSize: {
      ...createComplexControl(columnSizeOptions),
      description:
        "Applies a responsive, grid-like column structure to the Stack's children. The layout automatically accounts for `gap` sizing when calculating widths. Also sets `alignItems` to `stretch` by default to ensure consistent alignment across columns.",
    },
    gap: {
      options: [
        "default",
        "lg",
        "sm",
        0,
        50,
        100,
        150,
        200,
        300,
        400,
        500,
        600,
        800,
        1000,
        {
          mobileSmall: 50,
          tablet: 1000,
        },
      ],
      control: {
        type: "select",
      },
      description:
        "Picking `sm`, `default` or `lg` will have preconfigured values for each breakpoint. Numeric values can be used per breakpoint. Available options: \n\n `0 | 50 | 100 | 150 | 20` \n\n ` | 300 | 400 | 500 | 600 | 800 | 1000` \n\n `| sm | default | lg`.",
    },
    direction: {
      options: [
        "row",
        "row-reverse",
        "column",
        "column-reverse",
        { mobileSmall: "column", tablet: "row" },
      ],
      control: {
        type: "select",
      },
    },
    alignItems: {
      options: [
        "center",
        "flex-start",
        "flex-end",
        "stretch",
        "baseline",
        { mobileSmall: "center", tablet: "flex-start" },
      ],
      control: {
        type: "select",
      },
    },
    alignSelf: {
      options: [
        "center",
        "flex-start",
        "flex-end",
        "stretch",
        "baseline",
        { mobileSmall: "center", tablet: "flex-start" },
      ],
      control: {
        type: "select",
      },
    },
    justifyContent: {
      options: [
        "flex-start",
        "flex-end",
        "center",
        "space-between",
        "space-around",
        "stretch",
        { mobileSmall: "center", tablet: "flex-start" },
      ],
      control: {
        type: "select",
      },
    },
    shrink: {
      options: [true, false, { mobileSmall: false, tablet: true }],
      control: {
        type: "select",
      },
    },
    grow: {
      options: [true, false, { mobileSmall: false, tablet: true }],
      control: {
        type: "select",
      },
    },
    wrap: {
      options: [
        "wrap",
        "nowrap",
        "wrap-reverse",
        { mobileSmall: "wrap", tablet: "nowrap", desktop: "wrap-reverse" },
      ],
      control: {
        type: "select",
      },
    },
  },
  args: {
    size: sizeOptions[0].value,
    columnSize: columnSizeOptions[0].value,
    direction: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "default",
    children: [
      <Heading size="xl" as="h2" alignment="center" key="heading">
        Heading (center)
      </Heading>,
      <Paragraph alignment="center" key="paragraph">
        Paragraph text. A palindrome is a word, number, phrase, or other
        sequence of symbols
      </Paragraph>,
      <Box prominence={"color"} size="sm" key="box">
        <Paragraph>Box</Paragraph>
      </Box>,
    ],
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  decorators: [
    (Story, args) => {
      return (
        <div style={{ minHeight: 200, display: "flex" }}>
          <Story {...args} />
        </div>
      );
    },
  ],
};

export const CustomWidth: Story = {
  args: {
    alignItems: "stretch",
    columnSize: {
      mobileSmall: 12,
      tablet: 6,
    },
  },
  render: (args) => {
    const { columnSize, size, ...rest } = args;
    return (
      <Stack {...rest} columnSize={columnSize}>
        <Stack {...rest} size={size}>
          <InputField
            legend={{ label: "Label" }}
            id="controlled-width-input"
            placeholder="dynamic width input"
          />
        </Stack>
        <Stack
          {...rest}
          size={size}
          direction={{ mobileSmall: "column", tablet: "row" }}
          alignItems={{ mobileSmall: "stretch", tablet: "flex-end" }}
        >
          <InputField
            legend={{ label: "Label" }}
            id="fixed-width-input-1"
            placeholder="fixed width input"
          />
          <InputField
            id="fixed-width-input-2"
            placeholder="fixed width input"
          />
        </Stack>
      </Stack>
    );
  },
};
