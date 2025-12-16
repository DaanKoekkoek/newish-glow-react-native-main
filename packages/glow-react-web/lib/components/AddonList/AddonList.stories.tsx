import type { Meta } from "@storybook/react";
import { Addon } from "foundations/Addon";

import { AddonList } from "./AddonList";

const meta: Meta<typeof AddonList> = {
  title: "DesignSystem/Components/Lists/AddonList",
  component: AddonList,
  argTypes: {
    headerText: {
      description: "Text to display in the header",
      control: "text",
    },
    headerImage: {
      description: "Path to image to be used in the header",
    },
    items: {
      description: "An array of AddnListItems objects",
      control: "array",
    },
  },
  args: {
    items: [
      {
        title: "Item 1",
        variant: "added",
        attention: { text: "Free for 3 months", variant: "success" },
        description:
          "Enjoy The Lord of the Rings trilogy and many tales from Middle-earth. Journey with Frodo and the Fellowship as they set forth from the quiet hills of the Shire into lands of shadow and fire. From the mines of Moria to the golden woods of Lothlórien, their path is filled with peril and wonder. The courage of hobbits, the wisdom of wizards, and the valor of men stand against the rising darkness of Mordor. Yet even the smallest hand can shape the fate of the world, as hope endures beyond despair. Ancient songs, lost kings, and the turning of the age weave together in a story of friendship, sacrifice, and the long road home.",
        actionLabel: "Button",
        addOn: <Addon name="HBO Max" size="sm" />,
      },
      {
        title: "Item 2",
        variant: "added",
        attention: { text: "Free for 3 months", variant: "success" },
        actionLabel: "Button",
        addOn: <Addon name="Netflix" size="sm" />,
      },
      {
        title: "Item 3",
        variant: "added",
        attention: { text: "Free for 3 months", variant: "success" },
        actionLabel: "Button",
        addOn: <Addon name="Amazon Prime" size="sm" />,
      },
      {
        title: "Item 4",
        variant: "default",
        attention: { text: "Free for 3 months", variant: "success" },
        actionLabel: "Button",
        addOn: <Addon name="Apple One" size="sm" />,
      },
      {
        title: "Item 5",
        variant: "default",
        attention: { text: "Free for 3 months", variant: "success" },
        actionLabel: "Button",
        addOn: <Addon name="Deezer" size="sm" />,
      },
    ],
  },
};

export default meta;

type Story = typeof meta;

export const Basic: Story = {
  args: {},
};

export const WithImage: Story = {
  args: {
    headerImage: {
      src: "https://assets.odido.nl/1600x900/a2c094c8eb/mid-hero-stocksy_txpfcee7f02fc0400_originaldelivery_4220176.WebP",
      alt: "headerImage",
    },
  },
};

export const WithImageAndText: Story = {
  args: {
    headerText: "Add on list title",
    headerImage: {
      src: "https://assets.odido.nl/1600x900/a2c094c8eb/mid-hero-stocksy_txpfcee7f02fc0400_originaldelivery_4220176.WebP",
      alt: "headerImage",
    },
  },
};

export const Gradient: Story = {
  args: { headerText: "Add on list title" },
};
