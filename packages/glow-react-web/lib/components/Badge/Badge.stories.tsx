import type { Meta, StoryObj } from "@storybook/react";

import { Badge } from "./Badge";
import type { BadgeProps } from "./Badge.types";
import { OdidoPalette } from "_internals/Color";
import { renderCartesianVariants } from "@storybook/utils/renderVariants";

const meta: Meta<typeof Badge> = {
  title: "DesignSystem/Components/Badge",
  component: Badge,
  argTypes: {
    prominence: {
      options: ["default", "subtle", "outline"],
      control: {
        type: "select",
      },
    },
    state: {
      options: ["default", "inactive"],
      control: {
        type: "select",
      },
    },
    palette: {
      control: { type: "select" },
      options: [undefined, ...OdidoPalette],
      description: "Set the colour palette of the segmented tab's background.",
    },
  },
  args: {
    text: "Badge",
    prominence: "default",
    state: "default",
    palette: "default",
  },
  parameters: {
    controls: {
      exclude: ["testID"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const _Variants: Story = {
  render: (props) => {
    return renderCartesianVariants(
      (props: BadgeProps, idx: number) => (
        <Badge {...props} text={`${props.text} ${idx + 1}`} />
      ),
      {
        ...props,
        state: ["default", "inactive"],
        prominence: ["default", "subtle", "outline"],
        palette: [...OdidoPalette],
      },
      {
        groupBy: [
          (props) => `Prominence: ${props.prominence}`,
          (props) => `State: ${props.state}`,
        ],
      },
    );
  },
};
