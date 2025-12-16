import type { Meta, StoryObj } from "@storybook/react";
import { OdidoPalette } from "_internals/Color";
import type { DefaultCardProps } from "./DefaultCard.types";
import { DefaultCard } from "./DefaultCard";
import { Button, DefaultList, TextLink, Tooltip } from "..";
import { Paragraph } from "foundations/Paragraph";
import { Icon } from "foundations/Icon";
import IMAGES from "foundations/Image/Image.mock";
import { renderCartesianVariants } from "@storybook/utils/renderVariants";
import {
  createComplexControl,
  type ComplexOption,
} from "@storybook/utils/complexOptions";

const callToActionOptions: ComplexOption<DefaultCardProps["callToAction"]>[] = [
  {
    label: "None",
    value: undefined,
  },
  {
    label: "1 Button",
    value: [
      <Button stretched key="button">
        Button
      </Button>,
    ],
  },
  {
    label: "1 Button and 1 TextLink",
    value: [
      <Button stretched key="button">
        Button
      </Button>,
      <TextLink href="#" ignoreStretched key="link">
        Link
      </TextLink>,
    ],
  },
  {
    label: "2 Buttons",
    value: [
      <Button stretched key="button-1">
        Button
      </Button>,
      <Button prominence="secondary" ignoreStretched key="button-2">
        Button
      </Button>,
    ],
  },
];

const priceOptions: ComplexOption<DefaultCardProps["price"]>[] = [
  { label: "None", value: undefined },
  {
    label: "Price",
    value: {
      value: "10,00",
      description: "description",
      disclaimer: "disclaimer",
      moreInfo: (
        <Tooltip description="Tooltip description">
          <Icon name="status-info" />
        </Tooltip>
      ),
    },
  },
  {
    label: "Price (without context)",
    value: {
      value: "10,00",
    },
  },
];

const meta: Meta<typeof DefaultCard> = {
  title: "DesignSystem/Components/Card/DefaultCard",
  component: DefaultCard,
  argTypes: {
    palette: {
      options: [...OdidoPalette],
      control: { type: "select" },
    },
    price: {
      ...createComplexControl(priceOptions),
    },
    type: {
      options: ["none", "illustration", "image", "icon", "mini"],
      description: "Types of DefaultCard.",
      control: false,
    },
    callToAction: {
      ...createComplexControl(callToActionOptions),
    },
    title: {
      description: "Accepts `HeadingProps`.",
    },
    highlightText: {
      description: "Renders a highlight label above the DefaultCard.",
      control: { type: "text" },
    },
    badgeText: {
      description: "Renders a Badge above the title.",
      control: { type: "text" },
    },
  },
  parameters: {
    controls: {
      exclude: ["image"],
    },
  },
  args: {
    title: {
      children: "Title",
      size: "lg",
    },
    highlightText: "Highlight",
    badgeText: "Badge",
    variant: "default",
    palette: "default",
    type: "none",
    icon: "laptop",
    image: {
      localSrc: IMAGES["stock-photo"],
      alt: "Alt text",
      resizeMode: "cover",
      ratio: "2/1",
    },
    children: [
      <Paragraph key="content">Content</Paragraph>,
      <DefaultList
        variant="icon"
        key="list"
        items={[
          {
            icon: "checkmark",
            text: "List item 1",
          },
          {
            icon: "checkmark",
            text: "List item 2",
          },
          {
            icon: "checkmark",
            text: "List item 2",
          },
        ]}
      />,
    ],
    callToAction: callToActionOptions[1].value,
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Emphasised: Story = {
  args: {
    type: "image",
    variant: "emphasised",
    palette: "blue",
    highlightText: "Highlight",
    badgeText: "Badge",
    image: {
      localSrc: IMAGES["family_tablet_snack"],
      alt: "Alt text",
      resizeMode: "cover",
      ratio: "2/1",
    },
  },
};

export const WithIllustration: Story = {
  args: {
    variant: "outline",
    palette: "purple",
    image: {
      localSrc: IMAGES["illustration"],
      alt: "Alt text",
      ratio: "2/1",
    },
    type: "illustration",
  },
};

export const WithImage: Story = {
  args: {
    variant: "alternate",
    palette: "green",
    type: "image",
    highlightText: "",
  },
};

export const WithIcon: Story = {
  args: {
    type: "icon",
    icon: "laptop",
    variant: "outline",
    highlightText: "",
    callToAction: callToActionOptions[1].value,
  },
};

export const WithButtonAndLink: Story = {
  args: {
    variant: "outline",
    palette: "orange",
    highlightText: "",
    callToAction: callToActionOptions[2].value,
  },
};

export const WithOutline: Story = {
  args: {
    type: "image",
    variant: "outline",
    palette: "orange",
    highlightText: "",
    badgeText: "Badge",
    title: {
      children: "Title",
      size: "lg",
    },
    image: {
      localSrc: IMAGES["family_tablet_snack"],
      alt: "Alt text",
      resizeMode: "cover",
      ratio: "16/9",
    },
    price: priceOptions[1].value,
    children: [
      <Paragraph key="content">Paragraph</Paragraph>,
      <DefaultList
        variant="icon"
        key="list"
        items={[
          {
            icon: "checkmark",
            text: "List item 1",
          },
          {
            icon: "checkmark",
            text: "List item 2",
          },
          {
            icon: "checkmark",
            text: "List item 3",
          },
        ]}
      />,
    ],
    callToAction: callToActionOptions[2].value,
  },
};

export const _Variants: Story = {
  render: (props) => {
    return renderCartesianVariants(
      (props: DefaultCardProps, idx: number) => {
        const wrapper = (children: React.ReactElement) => {
          return children;
        };

        return wrapper(
          <DefaultCard
            {...props}
            image={
              props.type === "illustration"
                ? { src: IMAGES["illustration"], alt: "illustration" }
                : { src: IMAGES["stock-photo"], alt: "image" }
            }
            title={{ children: `${props.title.children} ${idx + 1}` }}
          />,
        );
      },
      {
        ...props,
        type: ["none", "illustration", "image", "icon"],
        variant: ["default", "emphasised", "outline", "alternate"],
      },
      {
        groupBy: [
          (props) => `Type: ${props.type}`,
          (props) => `Variant: ${props.variant}`,
        ],
      },
    );
  },
};

export const Mini: Story = {
  args: {
    type: "mini",
    title: {
      children: "Mini Card",
      size: "xs",
    },
    image: {
      localSrc: IMAGES["stock-photo"],
      alt: "Alt text",
      resizeMode: "cover",
      ratio: "2/1",
    },
    price: priceOptions[2].value,
    highlightText: undefined,
    children: undefined,
    callToAction: undefined,
  },
};
