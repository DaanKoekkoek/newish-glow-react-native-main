import type { Meta, StoryObj } from "@storybook/react";

import { UserNavigation } from "./UserNavigation";
import { Icon } from "foundations/Icon";

const meta: Meta<typeof UserNavigation> = {
  title: "DesignSystem/Components/Navigation/UserNavigation",
  component: UserNavigation,
  argTypes: {
    myAccountLink: {
      description:
        "Props for the 'My Account' link, including the user initials and link text.",
    },
    logoutLink: {
      description:
        "Props for the logout link, typically rendered as a simple text link.",
    },
    testID: {
      description:
        "Optional test ID applied to the UserNavigation container for testing purposes.",
    },
  },
  args: {
    myAccountLink: {
      href: "#",
      children: "Content",
      initials: "WL",
    },
    logoutLink: {
      href: "#",
      children: [<Icon name="logout" key="icon" />, "Uitloggen"],
    },
  },
  parameters: {
    status: {
      type: ["devReviewed"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
