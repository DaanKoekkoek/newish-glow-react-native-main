import type { Meta, StoryObj } from "@storybook/react";
import {
  createComplexControl,
  type ComplexOption,
} from "@storybook/utils/complexOptions";

import { Hero } from "./Hero";
import IMAGES from "foundations/Image/Image.mock";
import { Stack } from "foundations/Stack";
import { Button, DefaultList, Price } from "components/index";
import { HeroProps } from "./Hero.types";
import { Paragraph } from "foundations/Paragraph";
import { OdidoPalette } from "_internals/Color";

const multipleHeroMock = (args: HeroProps) => {
  return (
    <Stack>
      {[...Array(5)].map((_, i) => (
        <Hero key={i} {...args} order={i % 2 === 0 ? "default" : "inverted"} />
      ))}
    </Stack>
  );
};

const headingOptions: ComplexOption<HeroProps["heading"]>[] = [
  {
    label: "default size",
    value: {
      title: "Title [highlighted]",
      subTitle: "Subtitle [highlighted]",
      size: "default",
    },
  },
  {
    label: "small size",
    value: {
      title: "Title [highlighted]",
      subTitle: "Subtitle [highlighted]",
      size: "sm",
    },
  },
];

const visualOptions: ComplexOption<HeroProps["visual"]>[] = [
  {
    label: "phone",
    value: {
      resizeMode: "contain",
      localSrc: IMAGES["phone"],
    },
  },
  {
    label: "illustration",
    value: {
      localSrc: IMAGES["hero-cat"],
    },
  },
  {
    label: "background image",
    value: {
      resizeMode: "cover",
      localSrc: IMAGES["mid-hero"],
    },
  },
];

const stickerOptions: ComplexOption<HeroProps["sticker"]>[] = [
  {
    label: "default type",
    value: {
      type: "default",
      description: "Describe your promotion",
      price: <Price value="10" beforeText="Vanaf" />,
    },
  },
  {
    label: "usp type",
    value: {
      type: "usp",
      list: (
        <DefaultList
          inverted
          items={[
            {
              icon: "3d",
              text: "List item 1",
            },
            {
              icon: "5g",
              text: "List item 2",
            },
          ]}
        />
      ),
    },
  },
];

const callToActionOptions: ComplexOption<HeroProps["callToAction"]>[] = [
  {
    label: "multiple ctas",
    value: [
      <Button key="btn-1">Button</Button>,
      <Button prominence="secondary" key="btn-2">
        Button
      </Button>,
    ],
  },
  {
    label: "single cta",
    value: [<Button key="btn-1">Button</Button>],
  },
];

const childrenOptions: ComplexOption<HeroProps["children"]>[] = [
  {
    label: "description",
    value: ["Description"],
  },
  {
    label: "description + list",
    value: [
      <Paragraph key="description">Description</Paragraph>,
      <DefaultList
        key="list"
        variant="icon"
        items={[
          {
            icon: "checkmark",
            text: "item 1",
          },
          {
            icon: "checkmark",
            text: "item 2",
          },
          {
            icon: "checkmark",
            text: "item 3",
          },
        ]}
      />,
    ],
  },
];

const meta: Meta<typeof Hero> = {
  title: "DesignSystem/Components/Hero/Hero",
  component: Hero,
  argTypes: {
    heading: {
      description:
        "Allows you to pass in the title, subtitle and size. You also have the option to pass in additional formatting by wrapping text with brackets `[]` for adding palette colors, and/or `|` for line breaks.",
      ...createComplexControl(headingOptions),
    },
    visual: {
      description: "Renders a visual. You can pass in `ImageProps`.",
      ...createComplexControl(visualOptions),
    },
    sticker: {
      description: "Accepts `LargeStickerProps`.",
      ...createComplexControl(stickerOptions),
    },
    callToAction: {
      description: "Accepts `<Button />` component.",
      ...createComplexControl(callToActionOptions),
    },
    children: {
      description:
        "Pass in additional content underneath the `title` and/or `subTitle`.",
      ...createComplexControl(childrenOptions),
    },
    order: {
      description: "Sets the render order of the image and content columns.",
      options: ["default", "inverted"],
      control: {
        type: "radio",
      },
    },
    size: {
      description: "Sets the size of hero component",
      options: ["default", "compact"],
      control: {
        type: "radio",
      },
    },
    variant: {
      description:
        "If set to `solid`, combines the image and content into 1 container (with the exception of the sticker).",
      options: ["default", "solid"],
      control: {
        type: "radio",
      },
    },
    palette: {
      description:
        "Sets the palette color for the Hero. Only applicable for the Odido brand.",
      options: [...OdidoPalette],
      control: {
        type: "radio",
      },
    },
    layout: {
      description:
        "Controls the offset and/or width within the container rendered by `visual`.",
      options: ["default", "no-padding", "uneven"],
      control: {
        type: "radio",
      },
    },
  },
  args: {
    order: "inverted",
    heading: headingOptions[0].value,
    children: childrenOptions[0].value,
    footnote: "Footnote",
    callToAction: callToActionOptions[0].value,
    sticker: stickerOptions[0].value,
    size: "default",
    visual: {
      loading: { type: "eager" },
      localSrc: IMAGES["hero-cat"],
      renderType: "background",
      alt: "Alt text",
      ratio: "4/3",
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Multiple: Story = {
  render: (args) => multipleHeroMock(args),
};
