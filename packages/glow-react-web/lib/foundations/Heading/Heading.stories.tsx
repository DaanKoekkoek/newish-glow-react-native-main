import type { Meta } from "@storybook/react";

import { Heading } from "./Heading";

const meta: Meta<typeof Heading> = {
  title: "DesignSystem/Foundations/Typography/Heading",
  component: Heading,
  args: {
    size: "xl",
    as: "h1",
    children: "Heading",
  },
  argTypes: {
    as: {
      description: "Generates a header tag",
      defaultValue: "h1",
      control: {
        type: "select",
        options: ["h1", "h2", "h3", "h4", "h5", "h6"],
      },
    },
    alignment: {
      control: {
        type: "select",
        options: ["left", "center"],
      },
    },
    color: {
      control: {
        type: "select",
        options: [undefined, "default", "inverted"],
      },
    },
    size: {
      control: {
        type: "select",
        options: ["xl", "lg", "md", "sm", "xs"],
      },
    },
    children: {
      description:
        "Accepts `React.ReactNode`. You can highlight text by wrapping it in square brackets (`[highlight]`) and insert line breaks using the pipe symbol (`|`).",
    },
  },
};

export default meta;

type Story = typeof meta;

export const Basic: Story = {};

export const WithHighlights: Story = {
  args: {
    children: "Heading with [highlight] | and a linebreak",
  },
};

export const Centered: Story = {
  render: function Render({ ...args }) {
    return (
      <Heading alignment="center" {...args}>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Soluta,
        possimus amet? Necessitatibus delectus ad vero laboriosam vel ab officia
        optio modi distinctio minus sed enim, numquam earum ratione commodi
        dolor!
      </Heading>
    );
  },
};
