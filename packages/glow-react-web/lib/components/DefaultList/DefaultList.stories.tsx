import type { Meta } from "@storybook/react";
import { OdidoPalette } from "_internals/Color";

import { DefaultList } from "./DefaultList";
import { TextLink } from "components/TextLink";
import {
  type ComplexOption,
  createComplexControl,
  createDuplicatedComplexControl,
} from "@storybook/utils/complexOptions";
import { DefaultListProps } from ".";
import { renderCartesianVariants } from "@storybook/utils/renderVariants";

const { options: itemsOptions, control: itemsControl } =
  createDuplicatedComplexControl(
    5,
    (optionIndex) => optionIndex + 1,
    () => {
      return {
        text: "Link item",
        icon: "checkmark" as const,
      };
    },
    "select",
  );

const variantOptions: ComplexOption<DefaultListProps["variant"]>[] = [
  {
    label: "icon",
    value: "icon",
  },
  {
    label: "icon (colored)",
    value: "iconColored",
  },
  {
    label: "numbered",
    value: "numbered",
  },
  {
    label: "bullet",
    value: "bullet",
  },
  {
    label: "media",
    value: "media",
  },
];

const meta: Meta<typeof DefaultList> = {
  title: "DesignSystem/Components/Lists/DefaultList",
  component: DefaultList,
  args: {
    variant: "bullet",
    size: "default",
    inverted: false,
    state: "default",
    items: itemsOptions[0].value,
  },
  argTypes: {
    items: {
      ...itemsControl,
      description:
        "Accepts an array of objects with a `text` for the list item content and an optional `icon` for the list item prefix. If variant is set to `icon`, and there is no icon provided in items props, the default icon will be `checkmark`. For the `media` variant, it accepts a `media` object with either an `icon` or an `image` property.",
    },
    variant: {
      ...createComplexControl(variantOptions, "select"),
      description:
        "Set the prefix type of the default list text. The default value will be `bullet`.",
    },
    size: {
      control: "select",
      options: ["default", "sm"],
      description:
        "Set the size of the default list text and icon. The default value will be `default`.",
    },
    inverted: {
      control: "boolean",
      description:
        "Set the color of the list text and icon to an inverted color.",
    },
    state: {
      control: "select",
      options: ["default", "inactive"],
      description: "Defines the state of the DefaultList",
    },
    palette: {
      control: { type: "select" },
      options: [...OdidoPalette],
      description:
        "Set the colour palette of the icon. The default value will be `default`.",
    },
  },
};

export default meta;

type Story = typeof meta;

export const Basic: Story = {
  args: {
    variant: "bullet",
    size: "default",
  },
};

export const OneItem: Story = {
  args: {
    items: [{ text: "List item" }],
  },
};

export const WithIcon: Story = {
  args: {
    variant: "icon",
    size: "default",
  },
};

export const WithIconColored: Story = {
  args: {
    variant: "iconColored",
  },
};

export const Media: Story = {
  args: {
    variant: "media",
    items: [
      {
        text: "List item with media image",
        media: {
          image: {
            alt: "placeholder",
            src: "https://media.odido.nl/static/images/acc/balance-bike.png",
          },
        },
      },
      {
        text: "List item with media image",
        media: {
          image: {
            alt: "placeholder",
            src: "https://media.odido.nl/static/images/acc/balance-bike.png",
          },
        },
      },
      {
        text: "List item with media image",
        media: {
          image: {
            alt: "placeholder",
            src: "https://media.odido.nl/static/images/acc/balance-bike.png",
          },
        },
      },
      {
        text: "List item with media image",
        media: {
          image: {
            alt: "placeholder",
            src: "https://media.odido.nl/static/images/acc/balance-bike.png",
          },
        },
      },
      {
        text: "List item with media image",
        media: {
          image: {
            alt: "placeholder",
            src: "https://media.odido.nl/static/images/acc/balance-bike.png",
          },
        },
      },
    ],
  },
};

export const WithCustomIcon: Story = {
  args: {
    variant: "icon",
    items: [
      { text: "List item", icon: "checkmark" },
      { text: "List item", icon: "close" },
      { text: "List item", icon: "close" },
      { text: "List item", icon: "checkmark" },
    ],
  },
};

export const WithCustomIconColored: Story = {
  args: {
    variant: "iconColored",
    items: [
      { text: "List item", icon: "checkmark", palette: "blue" },
      { text: "List item", icon: "close", palette: "red" },
      { text: "List item", icon: "close", palette: "green" },
      { text: "List item", icon: "checkmark", palette: "blue" },
    ],
  },
};

export const WithTextLink: Story = {
  args: { inverted: false },
  render: (args) => (
    <DefaultList
      {...args}
      items={[
        {
          text: [
            "List item ",
            <TextLink href="#" key="text-link-1" inverted={args.inverted}>
              TextLink
            </TextLink>,
          ],
        },
        {
          text: [
            "List item ",
            <TextLink href="#" key="text-link-2" inverted={args.inverted}>
              TextLink
            </TextLink>,
          ],
        },
        {
          text: [
            "List item ",
            <TextLink href="#" key="text-link-3" inverted={args.inverted}>
              TextLink
            </TextLink>,
          ],
        },
      ]}
    />
  ),
};

export const _Variants: Story = {
  args: {
    items: itemsOptions[2].value,
  },
  render: (props) => {
    return renderCartesianVariants(
      (variantProps: DefaultListProps) => (
        <DefaultList {...props} {...variantProps} />
      ),
      {
        variant: ["icon", "iconColored", "numbered", "bullet"],
        palette: [...OdidoPalette],
        state: ["default", "inactive"],
        inverted: [true, false],
      },
      {
        groupBy: [
          (props) => `Variant: ${props.variant}`,
          (props) => `State: ${props.state}`,
          (props) => `Inverted: ${props.inverted}`,
        ],
      },
    );
  },
};
