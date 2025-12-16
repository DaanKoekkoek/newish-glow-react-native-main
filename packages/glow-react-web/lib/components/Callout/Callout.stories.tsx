import type { Meta, StoryObj } from "@storybook/react";
import { Callout } from "./Callout";
import { Button } from "../Button";
import { Paragraph } from "foundations/Paragraph";
import { renderCartesianVariants } from "@storybook/utils/renderVariants";
import { CalloutProps } from "./Callout.types";

const meta: Meta<typeof Callout> = {
  title: "DesignSystem/Components/Notifications/Callout",
  component: Callout,
  argTypes: {
    children: {
      control: "none",
      description:
        "Is rendered when `content` to `alternate`. Accepts a `React.ReactElement`.",
    },
    content: {
      options: ["default", "alternate"],
      control: {
        type: "select",
      },
      description:
        "Renders the value from the `description` prop when set to `default`. Otherwise, renders `children`.",
    },
    description: {
      description: "Is rendered when `content` is set to `default`.",
    },
    className: {
      description: "Additional class name to be added to the callout.",
      control: "text",
    },
    prominence: {
      defaultValue: "default",
      options: ["default", "subtle"],
      control: {
        type: "select",
      },
    },
    status: {
      options: ["default", "success", "warning", "error"],
      control: {
        type: "select",
      },
    },
    tipPosition: {
      options: ["default", "top"],
      control: {
        type: "select",
      },
    },
    buttonPrimary: {
      control: "none",
      description: "Accepts `Button` components with the specified props",
    },
    buttonSecondary: {
      control: "none",
      description: "Accepts `Button` components with the specified props",
    },
  },
  args: {
    title: "Test Callout",
    description: "A callout description",
    children: (
      <Paragraph>
        With content set to 'alternate' it will display the 'children' property.
      </Paragraph>
    ),
    buttonPrimary: <Button>Primary button</Button>,
    buttonSecondary: <Button prominence="secondary">Secondary button</Button>,
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const WithoutButtons: Story = {
  args: {
    buttonPrimary: undefined,
    buttonSecondary: undefined,
  },
};

export const WithChildren: Story = {
  args: {
    content: "alternate",
  },
};

export const OneButton: Story = {
  args: {
    buttonPrimary: <Button>Primary button</Button>,
    buttonSecondary: undefined,
  },
};

export const Success: Story = {
  args: {
    status: "success",
  },
};

export const Warning: Story = {
  args: {
    status: "warning",
  },
};

export const Error: Story = {
  args: {
    status: "error",
  },
};

export const _Variants: Story = {
  render: (props) => {
    return renderCartesianVariants(
      (props: CalloutProps) => <Callout {...props} />,
      {
        ...props,
        status: ["default", "success", "warning", "error"],
        prominence: ["default", "subtle"],
      },
      {
        groupBy: [(props) => `Status: ${props.status}`],
      },
    );
  },
};
