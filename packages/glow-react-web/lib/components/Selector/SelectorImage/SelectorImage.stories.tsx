import { useId } from "react";
import type { Meta } from "@storybook/react";

import { SelectorImage } from "./SelectorImage";
import type { SelectorImageProps } from "./SelectorImage.types";
import { Icon } from "foundations/Icon";
import { Section } from "foundations/Section";
import { Grid, Column } from "foundations/Grid";
import { Main } from "foundations/Main";

import {
  createComplexControl,
  type ComplexOption,
} from "@storybook/utils/complexOptions";
import { OdidoPalette } from "_internals/Color";

const priceOptions: ComplexOption<SelectorImageProps["price"]>[] = [
  { label: "none", value: undefined },
  { label: "Price", value: { value: "25" } },
];

const badgeOptions: ComplexOption<SelectorImageProps["badge"]>[] = [
  { label: "none", value: undefined },
  { label: "Badge", value: { text: "Badge" } },
];

const secondaryActionOptions: ComplexOption<
  SelectorImageProps["secondaryAction"]
>[] = [
  { label: "none", value: undefined },
  {
    label: "TextLink",
    value: {
      children: [<Icon name="add" key="icon" />, "Text link"],
    },
  },
];

const imageOptions: ComplexOption<SelectorImageProps["image"]>[] = [
  {
    label: "Image (aspect ratio - 1/1)",
    value: {
      src: "https://assets.odido.nl/1600x900/a2c094c8eb/mid-hero-stocksy_txpfcee7f02fc0400_originaldelivery_4220176.WebP",
      alt: "Alt text",
      ratio: "1/1",
    },
  },
  {
    label: "Image (aspect ratio - mobileSmall: 1/1, tablet: 2/1)",
    value: {
      src: "https://assets.odido.nl/1600x900/a2c094c8eb/mid-hero-stocksy_txpfcee7f02fc0400_originaldelivery_4220176.WebP",
      alt: "Alt text",
      ratio: { mobileSmall: "1/1", tablet: "2/1" },
    },
  },
];

const listOptions: ComplexOption<SelectorImageProps["list"]>[] = [
  {
    label: "DefaultList",
    value: {
      items: [
        { text: "List item", icon: "checkmark" },
        { text: "List item", icon: "checkmark" },
        { text: "List item", icon: "checkmark" },
      ],
    },
  },
];

const checkedOptions: ComplexOption<SelectorImageProps["checked"]>[] = [
  { label: "uncontrolled", value: undefined },
  {
    label: "true",
    value: true,
  },
  {
    label: "false",
    value: false,
  },
];

const meta: Meta<typeof SelectorImage> = {
  title: "DesignSystem/Components/Selector/SelectorImage",
  component: SelectorImage,
  argTypes: {
    id: {
      description: "Set id to the input of the selector. Should be unique.",
    },
    name: {
      description:
        "Set name to the input of the selector. Should be identical to sibling selectors in case its grouped. `string`",
    },
    type: {
      description: "Input type (`radio` or `checkbox`). Defaults to `radio`.",
    },
    state: {
      description:
        "Active or inactive, to reflect availability and interaction states.",
    },
    checked: {
      ...createComplexControl(checkedOptions),
      description: "Enforce checked state to the input of the selector.",
    },
    variant: {
      description: "Horizontal or vertical layout.",
    },
    price: {
      ...createComplexControl(priceOptions),
      description:
        "Displays pricing information below the content. Should be a `<Price />` component.",
    },
    badge: {
      ...createComplexControl(badgeOptions),
      description:
        "Displays a badge element, especially in the horizontal variant. Should be a `<Badge />` component.",
    },
    secondaryAction: {
      ...createComplexControl(secondaryActionOptions),
      description: "Adds a supporting action, like “Learn more”.",
    },
    image: {
      ...createComplexControl(imageOptions),
      description: "Displays an image ",
    },
    list: {
      ...createComplexControl(listOptions),
      description: "Provide contextual details below the title.",
    },
    onChange: { description: "onChange callback." },
    promotion: {
      description: "Provide contextual details below the title.",
    },
    description: {
      description: "Provide contextual details below the title.",
    },
    highlight: {
      description:
        "Displays a banner element (e.g. “Most popular”) rendered above the content.",
    },
    palette: {
      option: [undefined, ...OdidoPalette],
      description:
        "Picks a specific glow type (visible when checked) along with applying palette colors to the children.",
    },
  },
  args: {
    name: "selector-image",
    title: "Title [highlight]",
    description: "Description",
  },
  decorators: [
    (Story, args) => (
      <Main>
        <Section>
          <Story {...args} />
        </Section>
      </Main>
    ),
  ],
  render: (args) => (
    <Grid columnSize={{ mobileSmall: 12, tablet: 6 }}>
      <Column>
        <SelectorImage {...args} id={useId()} />
      </Column>
      <Column>
        <SelectorImage {...args} id={useId()} />
      </Column>
    </Grid>
  ),
};

export default meta;

type Story = typeof meta;

export const Vertical: Story = {
  args: {
    variant: "vertical",
    price: { value: "10,49" },
    type: "checkbox",
    state: "default",
    badge: { text: "Badge" },
    promotion: "Promotion",
    image: {
      src: "https://assets.odido.nl/1600x900/a2c094c8eb/mid-hero-stocksy_txpfcee7f02fc0400_originaldelivery_4220176.WebP",
      alt: "Alt text",
    },
    secondaryAction: {
      children: [<Icon name="add" key="icon" />, "Text link"],
    },
    list: {
      items: [
        { text: "List item", icon: "checkmark" },
        { text: "List item", icon: "checkmark" },
        { text: "List item", icon: "checkmark" },
      ],
    },
    highlight: "Highlight",
  },
};

export const Horizontal: Story = {
  args: {
    variant: "horizontal",
    price: { value: "10,49" },
    type: "checkbox",
    state: "default",
    badge: { text: "Badge" },
    promotion: "Promotion",
    image: {
      src: "https://assets.odido.nl/1600x900/a2c094c8eb/mid-hero-stocksy_txpfcee7f02fc0400_originaldelivery_4220176.WebP",
      alt: "Alt text",
    },
    secondaryAction: {
      children: [<Icon name="add" key="icon" />, "Text link"],
    },
    list: {
      items: [
        { text: "List item", icon: "checkmark" },
        { text: "List item", icon: "checkmark" },
        { text: "List item", icon: "checkmark" },
      ],
    },
    highlight: "Highlight",
  },
};
