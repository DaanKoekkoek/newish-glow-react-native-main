import type { Meta } from "@storybook/react";
import { odidoPaletteKeys } from "_theming/tokenLoader";
import IMAGES from "foundations/Image/Image.mock";
import React from "react";

import { SubscriptionHero } from "./SubscriptionHero";

const meta: Meta<typeof SubscriptionHero> = {
  title: "DesignSystem/Components/Hero/SubscriptionHero",
  component: SubscriptionHero,
  args: {
    title: "Internet",
    titleSecondary: "TV + Bellen",
    list: [
      <SubscriptionHero.ListItem>list item 1</SubscriptionHero.ListItem>,
      <SubscriptionHero.ListItem>list item 2</SubscriptionHero.ListItem>,
      <SubscriptionHero.ListItem>list item 3</SubscriptionHero.ListItem>,
      <SubscriptionHero.ListItem>list item 4</SubscriptionHero.ListItem>,
      <SubscriptionHero.ListItem>list item 5</SubscriptionHero.ListItem>,
      <SubscriptionHero.ListItem>
        list item 6 (should not render)
      </SubscriptionHero.ListItem>,
    ],
    image: {
      src: "https://assets.odido.nl/900x750/b35a24c0c1/tophero_app_only_deals-010224.webp",
      localSrc: IMAGES["tophero-app-only-deal"],
      alt: "image alt text",
    },
    palette: "orange",
    actions: [
      <SubscriptionHero.Action onPress={() => {}} icon="24h">
        action 1
      </SubscriptionHero.Action>,
      <SubscriptionHero.Action onPress={() => {}} icon="3d">
        action 2
      </SubscriptionHero.Action>,
      <SubscriptionHero.Action onPress={() => {}} icon="4g-for-home">
        action 3
      </SubscriptionHero.Action>,
      <SubscriptionHero.Action onPress={() => {}} icon="5g">
        action 4 (should not render)
      </SubscriptionHero.Action>,
    ],
  },
  argTypes: {
    palette: {
      description: "Palette color of the `SubscriptionHero`.",
      options: [undefined, ...odidoPaletteKeys],
      control: "select",
    },
    image: {
      description:
        "Image shown inside the `SubscriptionHero`. Use an image that is 640px x 480px.",
    },
    actions: {
      description:
        "Accepts `<SubscriptionHero.Action />`. Can contain up to 3 actions; with 2 or 3.",
    },
    list: {
      description:
        "Accepts `<SubscriptionHero.ListItem />`. Can contain up to 5 list items with 2 or more list items preferred. Renders a checkmark as an icon by default.",
    },
  },
  decorators: [(Story) => <Story />],
};

export default meta;

type Story = typeof meta;

export const Basic: Story = {};

export const ShortList: Story = {
  args: {
    list: [
      <SubscriptionHero.ListItem>list item 1</SubscriptionHero.ListItem>,
      <SubscriptionHero.ListItem>list item 2</SubscriptionHero.ListItem>,
    ],
    actions: [
      <SubscriptionHero.Action onPress={() => {}} icon="24h">
        action
      </SubscriptionHero.Action>,
      <SubscriptionHero.Action onPress={() => {}} icon="24h">
        action2
      </SubscriptionHero.Action>,
    ],
  },
};
