import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import { RangeSlider } from "./RangeSlider";
import { OdidoPalette } from "_internals/Color";
import { useTheme } from "components/ThemeProvider";

const meta: Meta<typeof RangeSlider> = {
  title: "DesignSystem/Components/Input/RangeSlider",
  component: RangeSlider,
  argTypes: {
    value: {
      description:
        "The current slider value. When controlled, updates the thumb position and tooltip.",
      control: "number",
    },
    minValue: {
      description:
        "The minimum selectable value of the slider. Determines the left-most position of the thumb.",
      control: "number",
    },
    maxValue: {
      description:
        "The maximum selectable value of the slider. Determines the right-most position of the thumb.",
      control: "number",
    },
    step: {
      description:
        "The increment in which the slider value moves when dragged or when using keyboard arrows.",
      control: "number",
    },
    buttons: {
      description:
        "If enabled, shows plus/minus action buttons to increment or decrement the slider value.",
      control: "boolean",
    },
    palette: {
      description:
        "Determines the color palette used for the slider track and filled progress segment.",
      control: "select",
      options: [undefined, ...OdidoPalette],
    },
    prices: {
      description:
        "An array of price objects shown inside the tooltip above the thumb. Each item may contain `beforeText`, a numeric `value`, and a `showCurrency` flag.\n\nExample: `{ beforeText: 'From', value: '12,5', showCurrency: true }`",
      control: "object",
    },
    priceRange: {
      description:
        "An array representing the min/max price range labels displayed below the slider. Same structure as `prices` but only the first and last values are shown.",
      control: "object",
    },
    ariaLabel: {
      description:
        "Accessible labels used for the increment/decrement buttons. Structure: `{ add: string, subtract: string }`.",
      control: "object",
    },
    onValueChange: {
      description:
        "Callback fired when the slider value changes. Debounced by 100ms when `RangeSlider` uses it.",
      action: "changed",
    },
  },
  args: {
    onValueChange: (e) => action("onValueChange")(e),
    minValue: 0,
    maxValue: 10,
    step: 0.1,
    buttons: true,
    priceRange: [
      {
        beforeText: "Min.",
        value: "0,00",
      },
      {
        beforeText: "Max.",
        value: "10,00",
      },
    ],
    ariaLabel: {
      add: "Meer",
      subtract: "Minder",
    },
    id: "range-slider",
    prices: [
      {
        beforeText: "Eenmalig",
        value: "10,00",
      },
      {
        beforeText: "Per maand",
        value: "10,00",
      },
    ],
  },
  render: (args) => {
    const { brand } = useTheme();
    return <RangeSlider {...args} brand={brand} />;
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
