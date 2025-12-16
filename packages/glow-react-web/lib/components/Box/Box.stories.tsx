import type { Meta, StoryObj } from "@storybook/react";

import { Box } from "./Box";
import { Paragraph, Stack } from "foundations/index";
import { OdidoPalette } from "_internals/Color";
import { renderCartesianVariants } from "@storybook/utils/renderVariants";
import { BoxProps } from "./Box.types";

const meta: Meta<typeof Box> = {
  title: "DesignSystem/Components/Box",
  component: Box,
  argTypes: {
    prominence: {
      options: ["default", "outline", "emphasised", "color"],
      control: {
        type: "select",
      },
    },
    size: {
      description: "Changes the border radius and padding of the `Box`.",
      options: ["default", "sm"],
      control: {
        type: "select",
      },
    },
    children: {
      description: "Accepts `React.ReactElement` or `React.ReactElement[]`",
      control: false,
    },
    grow: {
      description:
        "Applies `flexGrow: 1` to the Box. Allows it to scale up to its parents' boundaries.",
    },
    style: {
      description:
        "Accepts `ViewStyle`. Applies additional styling to the Box. The `prominence` property will have priority over the styling from this property.",
      control: false,
    },
    palette: {
      control: { type: "select" },
      options: [undefined, ...OdidoPalette],
      description: "Set the colour palette of the Box.",
    },
  },
  args: {
    prominence: "default",
    children: <Paragraph>Box content</Paragraph>,
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const GrowEnabled: Story = {
  args: {
    grow: true,
    prominence: "outline",
  },
  decorators: [
    (Story) => (
      <Stack
        direction={{ mobileSmall: "column", tablet: "row" }}
        alignItems="stretch"
      >
        <Stack size={{ mobileSmall: 12, tablet: 6 }}>
          <Story />
        </Stack>
        <Paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pharetra
          augue a purus dictum, consectetur suscipit nibh imperdiet. Etiam
          volutpat in tellus at commodo. Suspendisse ornare tortor congue justo
          consequat, vitae vulputate tellus lobortis. Duis tempor felis non
          semper suscipit. Praesent quis nisl quis nulla ultrices pharetra nec
          ac nibh. Vivamus sodales magna ligula, a gravida ligula porta nec.
          Nulla et rhoncus dolor, eget accumsan nunc. Sed a nunc euismod,
          ultrices orci a, volutpat lacus. Ut interdum tempus est, in faucibus
          nunc pretium vitae. Morbi blandit diam lacus, vel facilisis est
          hendrerit quis. Suspendisse egestas ultricies est.
        </Paragraph>
      </Stack>
    ),
  ],
};

export const _Variants: Story = {
  render: (props) => {
    return renderCartesianVariants(
      (props: BoxProps) => <Box {...props} />,
      {
        ...props,
        prominence: ["default", "color", "outline", "emphasised"],
        palette: [...OdidoPalette],
      },
      {
        groupBy: [(props) => `Prominence: ${props.prominence}`],
      },
    );
  },
};
