import type { Meta, StoryObj } from "@storybook/react";

import { Avatar } from "./Avatar";
import { BaseText } from "_internals/Typography";

const meta: Meta<typeof Avatar> = {
  title: "DesignSystem/_internals/Navigation/Avatar",
  component: Avatar,
  argTypes: {
    children: {
      description:
        "The content inside the Avatar, typically user initials or an icon.",
    },
    className: {
      description:
        "Additional class name(s) applied to the Avatar container for custom styling.",
    },
    testID: {
      description:
        "Optional test ID for identifying the Avatar in testing environments.",
    },
  },
  args: {
    children: "DS",
  },
  parameters: {
    status: {
      type: ["devReviewed"],
    },
  },
  decorators: [
    (Story) => {
      return (
        <BaseText as="div">
          <Story />
        </BaseText>
      );
    },
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
