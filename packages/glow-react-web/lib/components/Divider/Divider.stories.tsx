import type { Meta, StoryObj } from "@storybook/react";

import { Divider } from "./Divider";
import { renderCartesianVariants } from "@storybook/utils/renderVariants";
import { DividerProps } from "./Divider.types";
import { Box } from "components/Box";

const meta: Meta<typeof Divider> = {
  title: "DesignSystem/Components/Divider",
  component: Divider,
  argTypes: {
    prominence: {
      options: ["default", "subtle"],
      control: {
        type: "select",
      },
    },
    variant: {
      options: ["default", "strong"],
      control: {
        type: "select",
      },
    },
    inverted: {
      type: "boolean",
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    variant: "default",
  },
};

export const Subtle: Story = {
  args: {
    prominence: "subtle",
  },
};

export const Inverted: Story = {
  args: {
    inverted: true,
  },
};

export const _Variants: Story = {
  render: (props) => {
    return renderCartesianVariants(
      (variantProps: DividerProps) => (
        <Box
          style={{
            background: variantProps.inverted
              ? "var(--semantics-color-text-default)"
              : undefined,
          }}
          grow
        >
          <Divider {...variantProps} />
        </Box>
      ),
      {
        ...props,
        variant: ["default", "strong"],
        inverted: [true, false],
      },
      {
        groupBy: [(props) => `Color: ${props.variant}`],
      },
    );
  },
};
