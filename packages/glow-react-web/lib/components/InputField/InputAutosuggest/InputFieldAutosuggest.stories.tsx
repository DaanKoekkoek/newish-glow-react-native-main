import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { InputFieldAutosuggest } from "./InputFieldAutosuggest";
import { InputAutosuggestionProps } from "../Input.types";

const meta: Meta<typeof InputFieldAutosuggest> = {
  title: "DesignSystem/Components/Input/InputField/Autosuggest",
  component: InputFieldAutosuggest,
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "search"],
    },
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
    autoSuggestClassName: {
      description: "Optional className for the autosuggest container.",
    },
    validated: {
      description:
        "Accepts an object containing `valid: boolean`. If `valid` is `false`, you can optionally pass a `message` to display an error message.",
    },
  },
  args: {
    variant: "search",
    legend: {
      label: "Label",
    },
    placeholder: "Search for 'suggestion'",
    showHelper: false,
    helperText: "Helper text",
    showClear: true,
    inactive: false,
    id: "input-id",
  },
  parameters: {
    controls: {
      exclude: [
        "onBlur",
        "onFocus",
        "onChange",
        "onPointerLeave",
        "onPointerEnter",
        "value",
        "testID",
        "disabled",
      ],
    },
  },
  render: function WrappedInputField(args) {
    const [v, setValue] = useState(args.value);

    return (
      <InputFieldAutosuggest
        {...args}
        value={v}
        onChange={(value) => setValue(value.target.value)}
        onSuggestionSelect={(item) => {
          setValue(item.text);
          args.onSuggestionSelect?.(item);
        }}
      />
    );
  },
};

export default meta;

type Story = StoryObj<InputAutosuggestionProps>;

export const SearchVariant: Story = {
  args: {
    category: {
      href: "/zoeken",
      children: "Zoek op",
    },
    autoSuggestions: [
      {
        text: "Suggestion 1.1",
        value: "suggestion-1.1",
      },
      {
        text: "Suggestion 1.2",
        value: "suggestion-1.2",
      },
      {
        text: "Suggestion 2.1",
        value: "suggestion-2.1",
      },
      {
        text: "Suggestion 2.2",
        value: "suggestion-2.2",
      },
    ],
  },
};

export const DefaultVariant: Story = {
  args: {
    variant: "default",
    category: {
      children: "Bedoel je",
    },
    autoSuggestions: [
      {
        text: "Suggestion 1.1",
        value: "suggestion-1.1",
      },
      {
        text: "Suggestion 1.2",
        value: "suggestion-1.2",
      },
      {
        text: "Suggestion 2.1",
        value: "suggestion-2.1",
      },
      {
        text: "Suggestion 2.2",
        value: "suggestion-2.2",
      },
    ],
  },
};

export const WithCategories: Story = {
  args: {
    variant: "search",
    category: {
      children: "Bedoel je",
    },
    legend: {
      label: "Search with categories",
      optionalText: "optional",
    },
    autoSuggestions: [
      {
        category: "Consument",
        text: "Suggestion 1.1",
        value: "suggestion-1.1",
      },
      {
        category: "Consument",
        text: "Suggestion 1.2",
        value: "suggestion-1.2",
      },
      {
        category: "Zakelijk",
        text: "Suggestion 2.1",
        value: "suggestion-2.1",
      },
      {
        category: "Zakelijk",
        text: "Suggestion 2.2",
        value: "suggestion-2.2",
      },
    ],
  },
};
