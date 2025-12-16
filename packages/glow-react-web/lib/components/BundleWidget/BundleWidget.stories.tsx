import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { glyphmap as IconsMap } from "@odido-portals/glow-icon/fonts";
import {
  type ComplexOption,
  createComplexControl,
} from "@storybook/utils/complexOptions";
import { OdidoPalette } from "_internals/Color";

import type { BundleWidgetProps } from "./BundleWidget.types";
import { BundleWidget } from "./BundleWidget";
import { renderCartesianVariants } from "@storybook/utils/renderVariants";

const buttonOptions: ComplexOption<BundleWidgetProps["button"]>[] = [
  {
    label: "none",
    value: undefined,
  },
  {
    label: "button",
    value: {
      children: "Bijplussen",
      onClick: action("bundlewidget.button.onClick"),
    },
  },
];

const priceOptions: ComplexOption<BundleWidgetProps["price"]>[] = [
  {
    label: "none",
    value: undefined,
  },
  {
    label: "price",
    value: {
      value: "28,93",
    },
  },
  {
    label: "price (all bells and whistles)",
    value: {
      value: "28,93",
      showVAT: true,
      showFrequency: true,
    },
  },
];

const meta: Meta<typeof BundleWidget> = {
  title: "DesignSystem/Components/Widget/BundleWidget",
  component: BundleWidget,
  argTypes: {
    remaining: {
      description: "The amount remaining, e.g. data left or minutes left",
    },
    total: {
      description:
        "The total amount available. Is used in combination with remaining to calculate the amount left. Falls back to 1 in case nothing is set to prevent divided by 0.",
    },
    title: {
      description: "Optional title label displayed in the widget",
    },
    bundleType: {
      description: 'Unit of measurement (e.g. "MB" or "GB")',
      control: { type: "radio" },
      options: ["data", "minutes", "minutes+sms", "sms", "internet-speed"],
    },
    showIcon: {
      description: "Whether to show an icon next to the title",
      control: "boolean",
    },
    description: {
      description:
        "Displays a short description underneath the `title` and `icon`.",
    },
    icon: {
      options: Object.keys(IconsMap),
      control: { type: "select" },
      description: "Accepts `IconName`",
    },
    type: {
      description: "Visual layout type of the widget (`default` or `budget`)",
      control: { type: "radio" },
      options: ["default", "budget"],
    },
    variant: {
      description:
        "Only applicable when `bundleType` is set to `internet-speed`.",
      control: { type: "radio" },
      options: ["Mbit", "Gbit"],
    },
    price: {
      ...createComplexControl(priceOptions),
      description:
        "Accept `PriceProps`. Only visible when `type` is set to `budget`.",
    },
    button: {
      ...createComplexControl(buttonOptions),
      description: "Accepts `ButtonProps`.",
    },
    palette: {
      control: { type: "select" },
      options: [undefined, ...OdidoPalette],
      description:
        "Set the colour palette of the bundle widget background and graph.",
    },
  },
  args: {
    description: "50 GB",
    showIcon: true,
    remaining: 12.5,
    total: 50,
    title: "Title",
    bundleType: "data",
    variant: "Mbit",
    price: {
      value: "28,93",
    },
  },
  parameters: {
    status: {
      type: ["devReviewed"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Budget: Story = {
  args: {
    type: "budget",
  },
};

export const WithButton: Story = {
  args: {
    button: buttonOptions[1].value,
  },
};

export const _Variants: Story = {
  render: (props) => {
    return renderCartesianVariants(
      (props: BundleWidgetProps) => (
        <BundleWidget
          {...props}
          description={props.variant === "Gbit" ? "5Gb" : "1000Mb"}
        />
      ),
      {
        ...props,
        palette: [...OdidoPalette],
      },
      {
        groupBy: [(props) => `Palette: ${props.palette}`],
      },
    );
  },
};
