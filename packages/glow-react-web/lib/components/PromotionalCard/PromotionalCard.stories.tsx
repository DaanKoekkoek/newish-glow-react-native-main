import type { Meta, StoryObj } from "@storybook/react";

import { PromotionalCard } from "./PromotionalCard";
import { OdidoPalette } from "_internals/Color";
import { Icon } from "foundations/Icon";
import { Image } from "foundations/Image";
import { Counter } from "components/Counter";

const meta: Meta<typeof PromotionalCard> = {
  title: "DesignSystem/Components/Card/PromotionalCard",
  component: PromotionalCard,
  argTypes: {
    title: {
      control: "text",
      description: "The title of the promotional card",
    },
    description: {
      control: "text",
      description: "The description of the promotional card",
    },
    content: {
      control: "radio",
      options: ["default", "countdown", "image"],
      description: "The content of the promotional card",
    },
    variant: {
      control: "radio",
      options: ["default", "emphasised", "black-friday"],
      description: "The variant of the promotional card",
    },
    palette: {
      control: { type: "radio" },
      options: [...OdidoPalette],
      description: "Set the colour palette of the Card.",
    },
    textLink: {
      table: {
        type: { summary: "TextLink" },
      },
      description: "A React node for the text link component",
    },
    image: {
      table: {
        type: { summary: "Image" },
      },
      description: "A React node for the image component",
    },
    countdown: {
      table: {
        type: { summary: "Counter" },
      },
      description: "A React node for the countdown component",
    },
  },
  args: {
    title: "Promotion",
    description: "Description",
  },
  parameters: {
    status: {
      type: ["devReviewed", "SSR"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    content: "default",
    variant: "default",
    palette: "default",
    textLink: {
      href: "#",
      size: "sm",
      onClick: () => {},
      children: ["Text link", <Icon name="add" />],
    },
  },
};

export const BlackFriday: Story = {
  args: {
    title: "Black Friday Deals",
    content: "countdown",
    variant: "black-friday",
    palette: "default",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    countdown: (
      <Counter
        digits={4}
        prominence="default"
        size="default"
        freeze={true}
        targetDate={new Date(
          Date.now() + 2 * 24 * 60 * 60 * 1000 + 12 * 60 * 60 * 1000,
        ).toISOString()} // Always 2 days and 12 hours in the future
        variant="default"
      />
    ),
    textLink: {
      href: "#",
      size: "sm",
      onClick: () => {},
      children: [
        "Meer over onze Black Friday Deals",
        <Icon name="arrow-right" />,
      ],
    },
  },
  parameters: {
    controls: {
      exclude: ["palette", "image"],
    },
  },
};

export const ContentOptions: Story = {
  args: {
    title: "Promotion",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    content: "image",
    variant: "emphasised",
    palette: "green",
    textLink: {
      href: "#",
      size: "sm",
      onClick: () => {},
      children: ["Text link", <Icon name="add" />],
    },
    image: (
      <Image
        src="https://assets.odido.nl/1600x900/a2c094c8eb/mid-hero-stocksy_txpfcee7f02fc0400_originaldelivery_4220176.WebP"
        alt="Image"
        resizeMode="cover"
        ratio="1/1"
      />
    ),
    countdown: (
      <Counter
        digits={4}
        prominence="default"
        size="default"
        targetDate={new Date(
          Date.now() + 2 * 24 * 60 * 60 * 1000 + 12 * 60 * 60 * 1000,
        ).toISOString()} // 2 days and 12 hours in the future for demo purposes
        variant="default"
      />
    ),
  },
};
