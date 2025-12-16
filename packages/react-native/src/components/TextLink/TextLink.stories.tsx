import type { Meta, StoryObj } from "@storybook/react";
import { Icon } from "foundations/Icon";
import { Paragraph } from "foundations/Paragraph";
import React from "react";

import { TextLink } from "./TextLink";

const meta: Meta<typeof TextLink> = {
  title: "DesignSystem/Components/TextLink",
  component: TextLink,
  argTypes: {
    href: {
      description: "The URL that the link should navigate to.",
    },
    target: {
      description:
        "The target window or frame where the linked document will open.",
      option: ["blank", "self"],
      control: {
        type: "select",
      },
    },
    state: {
      description:
        "The state of the link, indicating whether it has been visited.",
      option: ["default", "visited"],
      control: {
        type: "select",
      },
    },
    size: {
      description: "The size of the link.",
      options: ["xs", "sm", "default", "lg"],
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
    onPress: {
      type: "function",
      description:
        "Overrides the default behavior of the text link (href). Applies an `onPress` callback to the link.",
    },
  },
  args: {
    href: "#",
    state: "default",
    target: "self",
    size: "default",
    inverted: false,
    children: [<TextLink.Icon name="24h" key="icon" />, "Text"],
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    onPress: undefined,
    size: "default",
  },
};

export const AsButton: Story = {
  args: {
    href: undefined,
    size: "default",
  },
};

export const IconOnly: Story = {
  args: {
    children: <Icon name="24h" size="default" />,
    onPress: undefined,
  },
};

export const IconLeft: Story = {
  args: {
    children: [<Icon name="3d" key="icon" />, "Its on the left"],
    onPress: undefined,
  },
};

export const IconRight: Story = {
  args: {
    children: ["Its on the right", <TextLink.Icon name="3d" key="icon" />],
    onPress: undefined,
  },
};

export const WithText: Story = {
  args: {
    children: "Within text",
    onPress: undefined,
    size: "default",
  },
  decorators: [
    (Story) => {
      return (
        <Paragraph>
          Text from above. {"\n"}
          Text from the left <Story /> and the right. {"\n"}
          And text from below.
        </Paragraph>
      );
    },
  ],
};
