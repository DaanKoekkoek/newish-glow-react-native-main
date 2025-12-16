import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { InputField } from "./InputField";
import { InputFieldProps } from "./Input.types";
import { InputFieldAutosuggest } from "./InputAutosuggest/InputFieldAutosuggest";
import { InputFieldDatePicker } from "./InputDatePicker/InputFieldDatePicker";
import { action } from "@storybook/addon-actions";
import { enGB } from "date-fns/locale";
import {
  createComplexControl,
  type ComplexOption,
} from "@storybook/utils/complexOptions";
import { Select } from "components/Select";

// Legend options for Storybook controls
const legendOptions: ComplexOption<InputFieldProps["legend"]>[] = [
  {
    label: "Clean",
    value: {},
  },
  {
    label: "Label only",
    value: { label: "Upload" },
  },
  {
    label: "Optional text",
    value: { label: "Upload", optionalText: "Optional" },
  },
  {
    label: "Tooltip",
    value: {
      label: "Upload",
      optionalText: "Mouse over",
      info: {
        description: "Upload your files here. You can select multiple files.",
        tipPosition: "right",
        closeButton: false,
        animated: true,
      },
    },
  },
  {
    label: "Tooltip with Close Button",
    value: {
      label: "Upload",
      optionalText: "On Click",
      info: {
        description: "This field is optional. More info here.",
        tipPosition: "right",
        closeButton: true,
        animated: true,
      },
    },
  },
  {
    label: "Info Icon with Click",
    value: {
      label: "Upload",
      info: () => alert("Info icon clicked!"),
    },
  },
];

// Define options for validated
const validatedOptions: ComplexOption<InputFieldProps["validated"]>[] = [
  {
    label: "Default",
    value: undefined,
  },
  {
    label: "Valid",
    value: { valid: true },
  },
  {
    label: "Error",
    value: { valid: false, message: "Error message" },
  },
];

const meta: Meta<typeof InputField> = {
  title: "DesignSystem/Components/Input/InputField",
  component: InputField,
  argTypes: {
    type: {
      description: "Changes the input type.",
      control: "select",
      options: ["text", "password", "file"],
    },
    legend: {
      description:
        "Renders a label that provide the input with additional context. You also have the option to set the input field as an optional field.",
    },
    helperText: {
      control: { type: "text" },
      summary: "string",
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
      ...createComplexControl(validatedOptions),
      description:
        "Accepts an object containing `valid: boolean`. If `valid` is `false`, you can optionally pass a `message` to display an error message.",
    },
  },
  args: {
    legend: {
      label: "Label",
    },
    placeholder: "Placeholder text",
    showHelper: false,
    helperText: "Helper text",
    showClear: true,
    inactive: false,
    validated: validatedOptions[0].value,
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
      <InputField
        {...args}
        value={v}
        onChange={(event) => setValue(event.target.value)}
      />
    );
  },
};

export default meta;

type Story = StoryObj<InputFieldProps>;

export const Basic: Story = {};

export const Valid: Story = {
  args: {
    validated: validatedOptions[1].value,
  },
};

export const Error: Story = {
  args: {
    showHelper: false,
    validated: validatedOptions[2].value,
  },
};

export const OptionalWithInfo: Story = {
  args: {
    id: "input-optional-with-info",
    type: "text",
    showHelper: true,
    helperText: "Helper text. This field is optional.",
    placeholder: "NL00 BANK 0000 0000 00",
    legend: {
      label: "Rekeningnr. (IBAN)",
      optionalText: "Optional text with tooltip",
      info: {
        description: "Enter your IBAN number. It should be 18 characters long.",
        tipPosition: "right",
        closeButton: true,
        animated: true,
      },
    },
  },
};

export const Password: Story = {
  args: {
    type: "password",
  },
  argTypes: {
    type: { table: { disable: true } },
  },
};

export const File: Story = {
  argTypes: {
    legend: {
      ...createComplexControl(legendOptions),
      description:
        "Renders a label for the input. Can include optional text and info tooltip for additional context.",
    },
    // Hide props that are not relevant for the File type
    type: { table: { disable: true } },
    placeholder: { table: { disable: true } },

    // Keep and customize file-specific props
    accept: {
      control: { type: "text" },
      description: "MIME types or file extensions allowed for upload",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "*" },
      },
    },
    multiple: {
      control: { type: "boolean" },
      description: "Allow multiple file selection",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
  },
  args: {
    id: "input-file",
    legend: legendOptions[3].value,
    type: "file",
    placeholder: "",
    showHelper: true,
    multiple: true,
    showClear: false,
    helperText: "Allowed file types: .jpg, .png or .pdf",
    accept: "image/png, image/jpeg, application/pdf",
  },

  render: (args) => {
    const [files, setFiles] = useState<string | undefined>(undefined);

    const handleFiles = (fileList: FileList | null) => {
      if (fileList) {
        const fileDetails = Array.from(fileList).map((file) => ({
          name: file.name,
          size: file.size,
          type: file.type,
        }));
        setFiles(fileDetails.map((file) => file.name).join(", ")); // Combine file names into a single string
        action("onChange")(fileDetails); // Log detailed file information
      } else {
        setFiles(undefined); // Reset to undefined if no files are selected
      }
    };

    return (
      <InputField
        {...args}
        value={files}
        onChange={(event) => handleFiles(event.target.files)}
      />
    );
  },
};

export const Search: Story = {
  argTypes: {
    type: { table: { disable: true } },
  },
  render: (args) => {
    const [v, setValue] = useState<string>();
    return (
      <InputFieldAutosuggest
        {...args}
        value={v}
        onChange={(v) => setValue(v.target.value)}
        onSuggestionSelect={(v) => setValue(v.text)}
        placeholder="Search for 'suggestion'"
        id="input-search"
        variant="search"
        autoSuggestions={[
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
        ]}
      />
    );
  },
};

export const _Variants: Story = {
  render: () => {
    const [textValue, setTextValue] = useState("");
    const [files, setFiles] = useState<string | undefined>(undefined);
    const [dateValue, setDateValue] = useState<string | undefined>(undefined);
    const [searchValue1, setSearchValue1] = useState<string>();
    const [searchValue2, setSearchValue2] = useState<string>();
    const [selectValue1, setSelectValue1] = useState("");
    const [selectValue2, setSelectValue2] = useState("");
    const [selectValue3, setSelectValue3] = useState("");

    const handleFiles = (fileList: FileList | null) => {
      if (fileList) {
        const fileNames = Array.from(fileList).map((file) => file.name);
        setFiles(fileNames.join(", "));
      } else {
        setFiles(undefined);
      }
    };

    return (
      <>
        <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
          <div style={{ flex: 1 }}>
            <InputField
              id="comparison-text"
              legend={{
                label: "Text Input",
                optionalText: "Click info",
                info: {
                  description:
                    "Click Tooltip, providing more details about this input field.",
                  tipPosition: "left",
                  closeButton: true,
                  animated: true,
                },
              }}
              placeholder="Enter some text"
              value={textValue}
              onChange={(event) => setTextValue(event.target.value)}
              helperText="Basic text input field"
              showHelper={true}
              showClear={true}
            />
          </div>
          <div style={{ flex: 1 }}>
            <InputField
              id="comparison-file"
              legend={{
                label: "File Input",
                info: {
                  description:
                    "Upload your files here. You can select multiple files.",
                  tipPosition: "right",
                  closeButton: false,
                  animated: true,
                },
              }}
              type="file"
              value={files}
              onChange={(event) => handleFiles(event.target.files)}
              helperText="File upload input field"
              showHelper={true}
              multiple={true}
              accept="image/png, image/jpeg, application/pdf"
            />
          </div>
          <div style={{ flex: 1 }}>
            <InputFieldDatePicker
              id="comparison-date"
              legend={{
                label: "Date Input",
                info: {
                  description:
                    "No time for animation, Quick! Select a date using the date picker.",
                  tipPosition: "right",
                  closeButton: false,
                  animated: false,
                },
              }}
              helperText="Date picker input field"
              showHelper={true}
              value={dateValue}
              onChange={setDateValue}
              locale={{
                code: "en-gb",
                object: enGB,
              }}
              placeholder="Select a date"
            />
          </div>
          <div style={{ flex: 1 }}>
            <InputFieldAutosuggest
              category={{
                children: "Zoek op",
                href: "/zoeken",
              }}
              helperText="Helper text"
              legend={{
                label: "Label",
                info: {
                  description:
                    "This is an autosuggest input field. Start typing to see suggestions.",
                  tipPosition: "right",
                  animated: true,
                },
              }}
              showClear
              type="search"
              value={searchValue1}
              onChange={(v) => setSearchValue1(v.target.value)}
              onSuggestionSelect={(v) => setSearchValue1(v.text)}
              placeholder="Search"
              id="input-search1"
              variant="search"
              autoSuggestions={[
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
              ]}
            />
          </div>
          <div style={{ flex: 1 }}>
            <Select
              helperText="Helper message"
              id="default-select-1"
              legend={{
                info: {
                  description: "Select an option from the dropdown menu.",
                  tipPosition: "right",
                },
                label: "Label",
                optionalText: "Extra text",
              }}
              onChange={setSelectValue1}
              options={[
                {
                  name: "Tomato",
                  value: "tomato",
                },
                {
                  name: "Orange",
                  value: "orange",
                },
                {
                  name: "Grapefruit",
                  value: "grapefruit",
                },
                {
                  name: "Strawberry",
                  value: "strawberry",
                },
                {
                  name: "Banana",
                  value: "banana",
                },
                {
                  name: "Apple",
                  value: "apple",
                },
                {
                  name: "Pear",
                  value: "pear",
                },
              ]}
              placeholder="Select message"
              value={selectValue1}
            />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            paddingTop: 50,
            gap: "16px",
            alignItems: "flex-start",
          }}
        >
          <div style={{ flex: 1 }}>
            <InputField
              id="comparison-text-02"
              legend={{ label: "Text Input" }}
              placeholder="Enter some text"
              value={textValue}
              onChange={(event) => setTextValue(event.target.value)}
              helperText="Basic text input field"
              showHelper={true}
              showClear={true}
              validated={{ valid: true }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <InputField
              id="comparison-file-02"
              legend={{ label: "File Input" }}
              type="file"
              value={files}
              onChange={(event) => handleFiles(event.target.files)}
              helperText="File upload input field"
              showHelper={true}
              multiple={true}
              accept="image/png, image/jpeg, application/pdf"
              validated={{ valid: true }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <InputFieldDatePicker
              id="comparison-date-02"
              legend={{ label: "Date Input" }}
              helperText="Date picker input field"
              showHelper={true}
              value={dateValue}
              onChange={setDateValue}
              locale={{
                code: "en-gb",
                object: enGB,
              }}
              placeholder="Select a date"
              validated={{ valid: true }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <InputFieldAutosuggest
              category={{
                children: "Zoek op",
                href: "/zoeken",
              }}
              helperText="Helper text"
              legend={{
                label: "Label",
              }}
              showClear
              type="search"
              value={searchValue2}
              onChange={(v) => setSearchValue2(v.target.value)}
              onSuggestionSelect={(v) => setSearchValue2(v.text)}
              placeholder="Search"
              id="input-search2"
              variant="search"
              validated={{ valid: true }}
              autoSuggestions={[
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
              ]}
            />
          </div>
          <div style={{ flex: 1 }}>
            <Select
              legend={{
                label: "Select",
              }}
              helperText="Helper message"
              validated={{ valid: true }}
              id="default-select-2"
              onChange={setSelectValue2}
              options={[
                {
                  name: "Tomato",
                  value: "tomato",
                },
                {
                  name: "Orange",
                  value: "orange",
                },
                {
                  name: "Grapefruit",
                  value: "grapefruit",
                },
                {
                  name: "Strawberry",
                  value: "strawberry",
                },
                {
                  name: "Banana",
                  value: "banana",
                },
                {
                  name: "Apple",
                  value: "apple",
                },
                {
                  name: "Pear",
                  value: "pear",
                },
              ]}
              placeholder="Select message"
              value={selectValue2}
            />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            paddingTop: 50,
            gap: "16px",
            alignItems: "flex-start",
          }}
        >
          <div style={{ flex: 1 }}>
            <InputField
              id="comparison-text-03"
              legend={{ label: "Text Input" }}
              placeholder="Enter some text"
              value={textValue}
              inactive={true}
              onChange={(event) => setTextValue(event.target.value)}
              helperText="Basic text input field"
              showHelper={true}
              showClear={true}
            />
          </div>
          <div style={{ flex: 1 }}>
            <InputField
              id="comparison-file-03"
              legend={{ label: "File Input" }}
              type="file"
              value={files}
              inactive={true}
              onChange={(event) => handleFiles(event.target.files)}
              helperText="File upload input field"
              showHelper={true}
              multiple={true}
              accept="image/png, image/jpeg, application/pdf"
            />
          </div>
          <div style={{ flex: 1 }}>
            <InputFieldDatePicker
              id="comparison-date-03"
              legend={{ label: "Date Input" }}
              helperText="Date picker input field"
              showHelper={true}
              inactive={true}
              value={dateValue}
              onChange={setDateValue}
              locale={{
                code: "en-gb",
                object: enGB,
              }}
              placeholder="Select a date"
            />
          </div>
          <div style={{ flex: 1 }}>
            <InputFieldAutosuggest
              category={{
                children: "Zoek op",
                href: "/zoeken",
              }}
              helperText="Helper text"
              legend={{
                label: "Label",
              }}
              showClear
              type="search"
              value={searchValue1}
              onChange={(v) => setSearchValue1(v.target.value)}
              onSuggestionSelect={(v) => setSearchValue1(v.text)}
              placeholder="Search"
              id="input-search3"
              variant="search"
              inactive={true}
              autoSuggestions={[
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
              ]}
            />
          </div>
          <div style={{ flex: 1 }}>
            <Select
              helperText="Helper message"
              id="default-select-3"
              legend={{
                label: "Select",
              }}
              inactive={true}
              onChange={setSelectValue3}
              options={[
                {
                  name: "Tomato",
                  value: "tomato",
                },
                {
                  name: "Orange",
                  value: "orange",
                },
                {
                  name: "Grapefruit",
                  value: "grapefruit",
                },
                {
                  name: "Strawberry",
                  value: "strawberry",
                },
                {
                  name: "Banana",
                  value: "banana",
                },
                {
                  name: "Apple",
                  value: "apple",
                },
                {
                  name: "Pear",
                  value: "pear",
                },
              ]}
              placeholder="Select message"
              value={selectValue3}
            />
          </div>
        </div>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Side-by-side comparison of basic text input and file input to test sizing and alignment.",
      },
    },
  },
  argTypes: {
    // Disable all props from InputFieldProps
    legend: { table: { disable: true } },
    helperText: { table: { disable: true } },
    placeholder: { table: { disable: true } },
    showHelper: { table: { disable: true } },
    showClear: { table: { disable: true } },
    inactive: { table: { disable: true } },
    validated: { table: { disable: true } },
    id: { table: { disable: true } },
    type: { table: { disable: true } },

    // Additional props that need to be disabled
    testID: { table: { disable: true } },
    disabled: { table: { disable: true } },
    value: { table: { disable: true } },
    onBlur: { table: { disable: true } },
    onFocus: { table: { disable: true } },
    onPointerLeave: { table: { disable: true } },
    onPointerEnter: { table: { disable: true } },
    onChange: { table: { disable: true } },
  },
};
