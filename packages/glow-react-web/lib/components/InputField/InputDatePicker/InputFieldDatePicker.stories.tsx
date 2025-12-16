import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { action } from "@storybook/addon-actions";

import {
  createComplexControl,
  type ComplexOption,
} from "@storybook/utils/complexOptions";

import { InputFieldDatePicker } from "./InputFieldDatePicker";
import type { InputDatePickerProps } from "../Input.types";
import { enGB, nl } from "date-fns/locale";
import { registerLocale } from "react-datepicker";
import { OdidoPalette } from "_internals/Color";

import "dayjs/locale/nl";
import "dayjs/locale/en";
registerLocale("nl", nl);
registerLocale("en-gb", enGB);

const localeOptions: ComplexOption<InputDatePickerProps["locale"]>[] = [
  {
    label: "nl locale",
    value: {
      code: "nl",
      object: nl,
    },
  },
  {
    label: "en locale",
    value: {
      code: "en-gb",
      object: enGB,
    },
  },
];

const meta: Meta<typeof InputFieldDatePicker> = {
  title: "DesignSystem/Components/Input/InputField/Datepicker",
  component: InputFieldDatePicker,
  argTypes: {
    legend: {
      description:
        "Renders a label that provide the input with additional context. You also have the option to set the input field as an optional field.",
    },
    helperText: {
      description:
        "Helper text that is shown underneath the InputField. Is hidden when `state` is set to `error`.",
    },
    showHelper: { control: { type: "boolean" } },
    showClear: {
      description:
        "Displays a clear (reset) button when the input has a value, is enabled, and doesn't have passed validation.",
      control: { type: "boolean" },
    },
    suffix: {
      description:
        "Changes the suffix icon style. Only applicable when `showClear` is set to `true`.",
    },
    inactive: { control: { type: "boolean" } },
    validated: {
      description:
        "Accepts an object containing `valid: boolean`. If `valid` is `false`, you can optionally pass a `message` to display an error message.",
    },
    excludeDaysOfWeek: {
      description:
        "The `excludeDaysOfWeek` prop expects an array of numbers representing the days of the week that should be inactive.",
    },
    format: {
      description:
        "Defines the string format used by React Datepicker for parsing and formatting dates in the input field. This format is passed to React Datepicker's `DatePicker` component to control how the date is displayed and parsed. Note that Day.js uses a fixed format of 'DD-MM-YYYY' for internal date parsing, which is independent of the format specified here for React Datepicker.",
    },
    locale: {
      description:
        "The locale code (e.g., 'en', 'nl') and `Locale` object used to localize the calendar month and day labels. A corresponding locale must be registered with both react-datepicker and Day.js. Is `nl` by default.",
      ...createComplexControl(localeOptions),
    },
    palette: {
      control: { type: "select" },
      options: [...OdidoPalette],
      description:
        "Set the colour palette of the selected date. Only applicable for the Odido brand.",
    },
  },
  args: {
    legend: {
      label: "Label",
    },
    format: "dd-MM-YYYY",
    placeholder: "Pick a date",
    helperText: "Helper text",
    showHelper: true,
    inactive: false,
    onChange: action("onChange"),
    locale: localeOptions[0].value,
    id: "input-id",
  },
  parameters: {
    controls: {
      exclude: [
        "showClear",
        "disabled",
        "onBlur",
        "onFocus",
        "onChange",
        "onPointerLeave",
        "onPointerEnter",
        "value",
        "testID",
      ],
    },
  },
  render: (args) => {
    const [v, setValue] = useState<
      string | ((string & readonly string[]) | undefined)
    >(args.value);

    const handleChange = (date: string) => {
      setValue(date);
      args.onChange?.(date);
    };

    return (
      <InputFieldDatePicker
        {...args}
        value={v}
        onChange={(date) => handleChange(date)}
      />
    );
  },
};

export default meta;

type Story = StoryObj<InputDatePickerProps>;

export const Basic: Story = {};

export const MinDate: Story = {
  args: {
    legend: {
      label: `Cant select before ${new Date().getFullYear() + 1}`,
    },
    min: new Date(new Date().getFullYear() + 1, 0, 1).toISOString(),
  },
};

export const MaxDate: Story = {
  args: {
    legend: {
      label: `Can't select after ${new Date().getFullYear() - 1}`,
    },
    max: new Date(
      new Date().getFullYear() - 1,
      11,
      25,
      23,
      59,
      59,
      999,
    ).toISOString(),
  },
};

export const ExcludeDays: Story = {
  args: {
    legend: {
      label: "Excluded weekends",
    },
    excludeDaysOfWeek: [0, 6],
  },
};
