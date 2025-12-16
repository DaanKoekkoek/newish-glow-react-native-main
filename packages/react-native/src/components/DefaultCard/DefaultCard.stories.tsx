import type { Meta } from "@storybook/react";
import { odidoPaletteKeys } from "_theming/tokenLoader";
import { Icon } from "foundations/Icon";
import { Paragraph, Title } from "foundations/index";
import React from "react";

import { DefaultList, Button, TextLink } from "../index";
import { DefaultCard } from "./index";

const meta: Meta<typeof DefaultCard> = {
  title: "DesignSystem/Components/Card/DefaultCard",
  component: DefaultCard,
  args: {
    palette: "default",
    title: <Title text="Title" size="default" />,
    paragraph: <Paragraph size="default">Paragraph</Paragraph>,
    badgeText: "Badge",
    highlightText: "Highlight",
    price: {
      priceProps: { value: "10,00", size: "xl" },
      description: "Description",
      disclaimer: "Disclaimer",
      moreInfo: <Icon name="status-info" />,
    },
    icon: {
      name: "laptop",
    },
    image: {
      alt: "alt text",
      ratio: "16/9",
    },
    visual: "none",
    list: (
      <DefaultList variant="icon">
        <DefaultList.Item icon="checkmark">List item</DefaultList.Item>
        <DefaultList.Item icon="checkmark">List item</DefaultList.Item>
        <DefaultList.Item icon="checkmark">List item</DefaultList.Item>
      </DefaultList>
    ),
  },
  argTypes: {
    variant: {
      options: ["default", "outline", "alternate", "emphasized"],
      control: { type: "select" },
    },
    visual: {
      options: ["illustration", "image", "icon", "none"],
      control: { type: "select" },
      description:
        "Whether the card displays an illustration, image, icon or none of the aforementioned.",
    },
    palette: {
      control: { type: "select" },
      options: [undefined, ...odidoPaletteKeys],
      description: "Set the palette of the default card.",
    },
    image: {
      description: "Accepts `ImageProps`.",
    },
    badgeText: {
      control: { type: "text" },
      description: "The text to be displayed on the badge.",
    },
    highlightText: {
      control: { type: "text" },
    },
    title: {
      description: "The title displayed on the card.",
      control: { type: "select" },
      options: ["default", "extraSmall", "small", "large", "extraLarge"],
      mapping: {
        default: <Title text="Title" size="default" />,
        extraSmall: <Title text="Title" size="xs" />,
        small: <Title text="Title" size="sm" />,
        large: <Title text="Title" size="lg" />,
        extraLarge: <Title text="Title" size="xl" />,
      },
    },
    callToAction: {
      description:
        "Accepts a `<DefaultCard.Cta />`, which accepts props such as `primaryAction`, `secondaryAction` and/or `isHovered`.",
    },
    price: {
      description:
        "Accepts PriceProps, along with the option to add a disclaimer, description and additional info (`React.ReactElement`).",
    },
    paragraph: {
      description: "The paragraph displayed on the card.",
      control: { type: "select" },
      options: ["default", "small", "large"],
      mapping: {
        default: <Paragraph size="default">Paragraph</Paragraph>,
        small: <Paragraph size="sm">Paragraph</Paragraph>,
        large: <Paragraph size="lg">Paragraph</Paragraph>,
      },
    },
  },
  decorators: [(Story) => <Story />],
};

export default meta;

type Story = typeof meta;

export const WithoutCallToAction: Story = {
  args: {
    palette: "default",
    title: <Title text="Title" />,
    paragraph: <Paragraph>Paragraph</Paragraph>,
    badgeText: "Badge",
    highlightText: "Highlight",
    list: (
      <DefaultList variant="icon">
        <DefaultList.Item icon="checkmark">List item</DefaultList.Item>
        <DefaultList.Item icon="checkmark">List item</DefaultList.Item>
        <DefaultList.Item icon="checkmark">List item</DefaultList.Item>
      </DefaultList>
    ),
  },
};

export const WithImage: Story = {
  args: {
    visual: "image",
    image: {
      src: "https://assets.odido.nl/1600x900/a2c094c8eb/mid-hero-stocksy_txpfcee7f02fc0400_originaldelivery_4220176.WebP",
      alt: "Alt text",
      ratio: "2/1",
    },
    callToAction: (
      <DefaultCard.Cta
        primaryAction={
          <Button>
            <Button.Icon name="arrow-right" />
          </Button>
        }
      />
    ),
  },
};

export const WithIcon: Story = {
  args: {
    visual: "icon",
    icon: {
      name: "laptop",
    },
    callToAction: (
      <DefaultCard.Cta
        primaryAction={
          <Button
            onPress={() => {
              console.log("button!");
            }}
            fill
          >
            Button
          </Button>
        }
      />
    ),
  },
};

export const WithIllustration: Story = {
  args: {
    visual: "illustration",
    image: {
      src: "https://assets.odido.nl/625x625/fe3f521d30/illustrationpromotional-internet-midherocardmasonry-625x625.png",
      ratio: "16/9",
    },
    callToAction: (
      <DefaultCard.Cta
        primaryAction={
          <Button
            onPress={() => {
              console.log("button!");
            }}
            fill
          >
            Button
          </Button>
        }
        secondaryAction={<TextLink>Text Link</TextLink>}
      />
    ),
  },
};

export const WithTwoButtons: Story = {
  args: {
    callToAction: (
      <DefaultCard.Cta
        primaryAction={<Button fill>Button</Button>}
        secondaryAction={<Button fill>Button 2</Button>}
      />
    ),
  },
};

export const WithCtaAndButton: Story = {
  args: {
    callToAction: (
      <DefaultCard.Cta
        primaryAction={<Button fill>Button</Button>}
        secondaryAction={<TextLink href="#">Button 2</TextLink>}
      />
    ),
  },
};
