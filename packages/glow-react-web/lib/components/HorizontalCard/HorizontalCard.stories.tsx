import { glyphmap as IconsMap } from "@odido-portals/glow-icon/fonts";
import type { Meta, StoryObj } from "@storybook/react";

import { HorizontalCard } from "./HorizontalCard";
import { OdidoPalette } from "_internals/Color";
import { Icon } from "foundations/Icon";
import { DefaultList } from "components/DefaultList";

const meta: Meta<typeof HorizontalCard> = {
  title: "DesignSystem/Components/Card/HorizontalCard",
  component: HorizontalCard,
  argTypes: {
    title: {
      control: "text",
      description: "The title of the horizontal card",
    },
    children: {
      control: "text",
      description:
        "Content of the card. Can be a `string` or a `DefaultList` React node.",
    },
    variant: {
      control: "radio",
      options: ["default", "subtle", "outline", "color"],
      description:
        "The variant of the promotional card. Set to `color or outline` for palette selection.",
    },
    type: {
      control: "radio",
      options: ["default", "icon"],
      description: "The type of the horizontal card.",
    },
    icon: {
      options: Object.keys(IconsMap),
      control: { type: "select" },
    },
    iconPosition: {
      control: "radio",
      options: ["default", "right"],
      description: "The icon position",
    },
    palette: {
      control: { type: "select" },
      options: [...OdidoPalette],
      description: "Set the colour palette of the Card",
    },
    textLink: {
      table: {
        type: { summary: "TextLink" },
      },
      description: "A React node for the text link component",
    },
  },
  args: {
    title: "Title",
    children: "Paragraph",
  },
  decorators: [
    (Story) => {
      return (
        <div
          style={{
            padding: 40,
          }}
        >
          <Story />
        </div>
      );
    },
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    variant: "default",
    palette: "default",
    type: "icon",
    icon: "helpdesk",
    textLink: {
      href: "#",
      size: "sm",
      onClick: () => {},
      children: ["Text link", <Icon name="add" />],
    },
  },
};

export const Color: Story = {
  args: {
    variant: "color",
    palette: "blue",
    type: "icon",
    icon: "5g",
    textLink: {
      href: "#",
      size: "sm",
      onClick: () => {},
      children: ["Text link", <Icon name="add" />],
    },
  },
};

export const WithoutIcon: Story = {
  args: {
    title: "Welke internetsnelheid heb ik nodig?",
    children: "Ontdek in een paar kliks welke snelheid bij je past.",
    variant: "color",
    palette: "purple",
    type: "default",
    icon: "5g",
    textLink: {
      href: "#",
      size: "sm",
      onClick: () => {},
      children: ["Help me kiezen", <Icon name="chevron-right" />],
    },
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    palette: "orange",
    type: "icon",
    icon: "delivery",
    iconPosition: "right",
    textLink: {
      href: "#",
      size: "sm",
      onClick: () => {},
      children: ["Text link", <Icon name="add" />],
    },
    children: (
      <DefaultList
        items={[
          {
            icon: "checkmark",
            text: "Link item",
          },
          {
            icon: "checkmark",
            text: "Link item",
          },
          {
            icon: "checkmark",
            text: "Link item",
          },
        ]}
        size="default"
        state="default"
        variant="icon"
      />
    ),
  },
  parameters: {
    controls: { exclude: ["children"] }, // Hide children control for this story
  },
};

export const WithOneline: Story = {
  args: {
    variant: "outline",
    palette: "default",
    type: "icon",
    icon: "helpdesk",
    title: "Hello! How can we help.",
    children: "",
  },
};

export const WithMultiline: Story = {
  args: {
    variant: "default",
    palette: "default",
    type: "icon",
    icon: "internet-of-things",
    title: "The 'Unified Field Theory' of UI",
    children:
      "We're not saying our design system is the unified field theory of user interfaces, but... it kinda is! We've basically bottled up all the good vibes and smart ideas to make sure everything you touch here is not just pretty, but genuinely helpful. Less head-scratching, more aha! moments.",
  },
};
