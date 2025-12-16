import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import { TextLink } from "./TextLink";
import { Paragraph, Icon } from "foundations/index";

const meta: Meta<typeof TextLink> = {
  title: "DesignSystem/Components/TextLink",
  component: TextLink,
  argTypes: {
    as: {
      defaultValue: "a",
      description:
        "Set the tag type of the TextLink. Default is `<a />`. Use this when you nest it inside a component that already has the `<a />` tag as its wrapper.",
    },
    type: {
      defaultValue: "button",
      description:
        "When TextLink is rendered as a `<button>`, the `type` prop (if provided) will be applied. If no type is specified, it will default to `button`.",
    },
    stretched: {
      description: "Stretches the link relative to its parent container",
    },
    size: {
      description: "The size of the link.",
      option: ["xs", "sm", "default", "lg"],
      control: {
        type: "select",
      },
    },
    inverted: {
      description:
        "Specifies if the link should be displayed with inverted colors.",
    },
    children: {
      description:
        "The content of the link, which can be either `string` and `Icon`, or only `string`.",
    },
  },
  args: {
    href: "javascript:void(0);",
    onClick: action("onClick"),
    children: [<Icon name="24h" key="icon" />, "Text"],
  },
  decorators: [(Story) => <Story />],
};

export default meta;

type Story = StoryObj<typeof TextLink>;

export const Basic: Story = {
  args: {
    as: "a",
    children: ["Text Link"],
  },
};

export const IconLeft: Story = {
  args: {
    as: "a",
    children: [<Icon name="3d" key="icon" />, "Its on the left"],
  },
};

export const IconRight: Story = {
  args: {
    as: "a",
    children: ["Its on the right", <Icon name="3d" key="icon" />],
  },
};

export const Inactive: Story = {
  args: {
    as: "button",
    type: "button",
    children: ["Its on the right", <Icon name="3d" key="icon" />],
    inactive: true,
  },
};

export const WithText: Story = {
  args: {
    as: "a",
    children: "Within text",
  },
  decorators: [
    (Story) => {
      return (
        <Paragraph>
          Text from above. <br />
          Text from the left <Story /> and the right. <br />
          And text from below.
        </Paragraph>
      );
    },
  ],
};

export const WithTextAndIcon: Story = {
  args: {
    as: "a",
    children: [<Icon name="pdf" />, "Within text"],
  },
  decorators: [
    (Story) => {
      return (
        <Paragraph>
          Text from above. <br />
          Text from the left <Story /> and the right. <br />
          And text from below.
        </Paragraph>
      );
    },
  ],
};
