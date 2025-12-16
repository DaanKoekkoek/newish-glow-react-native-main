import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { View } from "react-native";

import type { InputFieldProps } from "./Input.types";
import { InputAffix } from "./InputAffix";
import { InputField } from "./InputField";
import { autoSuggestions } from "./mockedData";

const meta: Meta<typeof InputField> = {
  title: "DesignSystem/Components/Input/InputField",
  component: InputField,
  argTypes: {
    label: {
      description:
        "Renders a label that provide the input with additional context. You also have the option to set the input field as an optional field.",
    },
    id: {
      description:
        "Includes an id attribute to the label, along with an aria-labelledby attribute to the input field.",
    },
    value: {
      description: "The value to show for the text input.",
    },
    validated: {
      description: "Changes the state of the component based on validation.",
    },
    helperText: {
      description:
        "Helper text that is shown underneath the InputField. Is hidden when `state` is set to `error`.",
    },
    autoSuggestions: {
      description:
        "List of suggestions for dropdown while Input is type of `autoSuggest`",
    },
    autoSuggestCategory: {
      description:
        "Flag to show category property in dropdown while Input is type of `autoSuggest`",
    },
    suffix: {
      description: "Renders the suffix after the input field",
      type: "string",
    },
    onChangeText: {
      type: "function",
    },
    onChange: {
      type: "function",
    },
    onFocus: {
      type: "function",
    },
    type: {
      options: ["text", "password", "date", "autoSuggest"],
      control: {
        type: "select",
      },
    },
    onBlur: {
      type: "function",
    },
    showHint: { control: { type: "boolean" } },
  },
  args: {
    type: "text",
    label: {
      text: "Label",
      optional: false,
    },
    validated: undefined,
    id: "id-of-input",
    placeholder: "Placeholder text",
    helperText: "Helper text",
    autoComplete: "off",
  },
  render: function WrappedInputField(args) {
    const [v, setValue] = useState(args.value);
    return (
      <View style={{ padding: 16, height: 450 }}>
        <InputField
          {...args}
          value={v}
          onChangeText={(value) => setValue(value)}
        />
      </View>
    );
  },
  decorators: [(Story) => <Story />],
};

export default meta;

type Story = StoryObj<InputFieldProps>;

export const Basic: Story = {};

export const Password: Story = {
  args: {
    type: "password",
  },
};

export const Success: Story = {
  args: {
    validated: {
      success: true,
    },
  },
};

export const Error: Story = {
  args: {
    validated: {
      success: false,
      message: "Something went wrong!",
    },
  },
};

export const OptionalWithInfo: Story = {
  args: {
    label: {
      text: "Label",
      optional: true,
      info: "More Info",
    },
  },
};

export const WithCustomAffix: Story = {
  args: {
    validated: {
      success: true,
    },
    customAffix: <InputAffix icon="chevron-down" variant="default" />,
  },
};

export const Date: Story = {
  args: {
    label: {
      text: "Date input example",
    },
    type: "date",
    dateFormat: "DD/MM/YYYY",
    placeholder: "enter date",
    value: "25/12/2023",
  },
};

export const AutoSuggest: Story = {
  args: {
    label: {
      text: "Auto suggest example",
    },
    type: "autoSuggest",
    autoSuggestions,
    autoSuggestCategory: true,
  },
  parameters: {
    controls: {
      exclude: [
        "type",
        "autoComplete",
        "dateFormat",
        "minDate",
        "maxDate",
        "suffix",
        "customAffix",
      ],
    },
  },
};

export const Search: Story = {
  args: {
    label: {
      text: "Search example",
    },
    type: "search",
    autoSuggestions,
  },
};

export const WithSuffix: Story = {
  args: {
    label: {
      text: "Label",
    },
    suffix: "@odido.nl",
  },
  parameters: {
    controls: {
      exclude: ["type", "autoComplete", "dateFormat", "minDate", "maxDate"],
    },
  },
};
