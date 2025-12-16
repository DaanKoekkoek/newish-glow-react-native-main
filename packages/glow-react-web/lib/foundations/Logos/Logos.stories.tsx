import type { Meta, StoryObj } from "@storybook/react";
import { Logos } from "./Logos";

const meta: Meta<typeof Logos> = {
  title: "DesignSystem/Foundations/Assets/LogosAndVisuals/Logos",
  component: Logos,
  argTypes: {
    size: {
      options: [
        "default",
        "lg",
        "xl",
        { mobileSmall: "default", tablet: "lg", desktop: "xl" },
      ],
      control: { type: "select" },
      description:
        "Whether the component is rendered as the default size, Lg or Xl. Can be applied per breakpoint.",
    },
    brand: {
      description: "Renders logo of a specific brand.",
    },
    variant: {
      options: ["default", "inverted"],
      control: { type: "select" },
      description:
        "Defines the fill style of the logo. Use `<Logos />` on a dark background if set to `inverted`",
    },
  },
  args: {
    brand: "odido",
    variant: "default",
    size: "lg",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Inverted: Story = {
  args: {
    variant: "inverted",
  },
  decorators: [
    (Story, args) => (
      <div
        style={{
          backgroundColor: "#000",
          padding: 16,
          display: "inline-block",
        }}
      >
        <Story {...args} />
      </div>
    ),
  ],
};
