import type { Meta, StoryObj } from "@storybook/react";
import { SkeletonLoader } from "./SkeletonLoader";

const meta: Meta<typeof SkeletonLoader> = {
  title: "DesignSystem/Components/ProgressIndicators/SkeletonLoader",
  component: SkeletonLoader,
  argTypes: {
    size: {
      control: "select",
      options: ["default", "sm", "lg"],
    },
  },
  args: {
    size: "default",
  },
};

export default meta;
type Story = StoryObj<typeof SkeletonLoader>;

export const Default: Story = {};

export const Small: Story = {
  args: {
    size: "sm",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
  },
};
