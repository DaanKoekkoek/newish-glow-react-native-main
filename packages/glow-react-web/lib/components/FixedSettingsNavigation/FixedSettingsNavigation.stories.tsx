import type { Meta, StoryObj } from "@storybook/react";

import { FixedSettingsNavigation } from "./index";

const meta: Meta<typeof FixedSettingsNavigation> = {
  title: "DesignSystem/Components/Navigation/FixedSettingsNavigation",
  component: FixedSettingsNavigation,
  argTypes: {
    initials: {
      description: "User initials to display in the avatar circle",
      control: { type: "text" },
    },
    backToMainHref: {
      description: "URL for the back to main link",
      control: { type: "text" },
    },
    backToMainLabel: {
      description: "Label for the back to main link",
      control: { type: "text" },
    },
    serviceHref: {
      description: "URL for the service link",
      control: { type: "text" },
    },
    serviceLabel: {
      description: "Label for the service link",
      control: { type: "text" },
    },
    userLabel: {
      description: "Label for the user account section",
      control: { type: "text" },
    },
    userProfileHref: {
      description: "URL for the user account section",
      control: { type: "text" },
    },
    productLabel: {
      description: "Label for the product/service name",
      control: { type: "text" },
    },
    productIcon: {
      description: "Icon name for the product",
      control: { type: "text" },
    },
    style: {
      description: "Additional styling for the root element",
      control: false,
    },
    testID: {
      description: "testID for testing",
      control: { type: "text" },
    },
  },
  args: {
    initials: "AD",
    backToMainHref: "/",
    backToMainLabel: "Terug naar Odido.nl",
    serviceHref: "/service",
    serviceLabel: "Naar service",
    userLabel: "Mijn account",
    userProfileHref: "/my",
    productLabel: "Internet + TV + Vast bellen",
    productIcon: "internet",
  },
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Default desktop view of the FixedSettingsNavigation component.
 * Shows the navigation with user initials and full width layout.
 */
export const Default: Story = {};

/**
 * Example with custom labels and URLs.
 * Demonstrates how to customize all the text labels and navigation URLs.
 */
export const CustomLabelsAndUrls: Story = {
  args: {
    initials: "JD",
    backToMainLabel: "Home",
    backToMainHref: "/home",
    serviceLabel: "Support",
    serviceHref: "/support",
    userLabel: "My Profile",
    userProfileHref: "/my",
    productLabel: "Services",
    productIcon: "add",
  },
};
