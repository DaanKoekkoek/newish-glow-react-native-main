import type { Meta, StoryObj } from "@storybook/react";
import { PostalCodeCheckInput, PostalCodeCheckInputFields } from ".";
import { InputField } from "components/InputField";
import { ButtonOptionArray } from "components/SegmentedTab";
import { action } from "@storybook/addon-actions";
import { OdidoPalette } from "_internals/Color";
import { Stack } from "foundations/Stack";
import { useState } from "react";
import { PostalCodeCheckInputProps } from "../PostalCodeCheck.types";
import { Button } from "components/Button";

const TV_SECTION_OPTIONS: ButtonOptionArray = [
  { id: 0, tab: { label: "Ja" } },
  { id: 1, tab: { label: "Nee" } },
];

type StoryArgs = PostalCodeCheckInputProps & {
  showTvSection: boolean;
};

const meta: Meta<StoryArgs> = {
  title: "DesignSystem/Components/PostalCodeCheck/Input",
  component: PostalCodeCheckInput,
  argTypes: {
    palette: {
      control: { type: "select" },
      options: [...OdidoPalette],
      defaultValue: "default",
      description: "Set the colour palette of the background requires subtle.",
    },
    showTvSection: {
      control: { type: "boolean" },
      description: "Show or hide the TV section",
      table: {
        category: "TV Section",
      },
    },
  },
  args: {
    title: "Postcodecheck",
    description:
      "We hebben je postcode en huisnummer nodig om te zien wat er beschikbaar is.",
    marker: 1,
    palette: "default",
    children: undefined,
    showTvSection: true,
    callToActionButton: (
      <Button onClick={action("button.onClick")}>Doe de check</Button>
    ),
  },
  render: (args: StoryArgs) => {
    const [postcode, setPostcode] = useState("");
    const [huisnummer, setHuisnummer] = useState("");
    const [toevoeging, setToevoeging] = useState("");

    const tvSectionProps = args.showTvSection
      ? {
          title: "Wil je TV van Odido?",
          description:
            "Met Odido TV ontvang je standaard 65 tv-zenders, waarvan 60 in HD. Kijk televisie zoals jij dat wilt: dus ook via je smartphone, computer of tablet.",
          onTabChange: action("tvSectionProps.onTabChange"),
          options: TV_SECTION_OPTIONS,
        }
      : undefined;

    return (
      <PostalCodeCheckInput {...args} tvSectionProps={tvSectionProps}>
        <PostalCodeCheckInputFields>
          <Stack direction="row" wrap="wrap">
            <InputField
              placeholder="Postcode"
              value={postcode}
              onChange={(e) => {
                action("inputfield.onChange")("Postcode", e.target.value);
                setPostcode(e.target.value);
              }}
              id="input-1"
            />
            <InputField
              placeholder="Huisnummer"
              value={huisnummer}
              onChange={(e) => {
                action("inputfield.onChange")("Huisnummer", e.target.value);
                setHuisnummer(e.target.value);
              }}
              id="input-2"
            />
            <InputField
              placeholder="Toevoeging"
              value={toevoeging}
              onChange={(e) => {
                action("inputfield.onChange")("Toevoeging", e.target.value);
                setToevoeging(e.target.value);
              }}
              id="input-3"
            />
          </Stack>
        </PostalCodeCheckInputFields>
      </PostalCodeCheckInput>
    );
  },
};

export default meta;
type Story = StoryObj<StoryArgs>;

const excludeParams = {
  controls: {
    exclude: ["state", "calloutProps", "tvSectionProps", "onClick", "children"],
  },
};

export const Default: Story = {
  args: {
    state: "none",
    variant: "default",
    showTvSection: true,
  },
  parameters: excludeParams,
};

export const Overlay: Story = {
  args: {
    state: "none",
    variant: "overlay",
    showTvSection: true,
  },
  parameters: excludeParams,
};

export const Warning: Story = {
  args: {
    state: "warning",
    variant: "default",
    showTvSection: true,
    calloutProps: { title: "Title", description: "Description" },
  },
  render: (args: StoryArgs) => {
    const [postcode, setPostcode] = useState("");
    const [huisnummer, setHuisnummer] = useState("");
    const [toevoeging, setToevoeging] = useState("");

    const tvSectionProps = args.showTvSection
      ? {
          title: "Wil je TV van Odido?",
          description:
            "Met het Interactieve TV abonnement van Odido kies je het helemaal zelf.",
          onTabChange: action("tvSectionProps.onTabChange"),
          options: TV_SECTION_OPTIONS,
        }
      : undefined;

    return (
      <PostalCodeCheckInput {...args} tvSectionProps={tvSectionProps}>
        <PostalCodeCheckInputFields>
          <Stack direction="row" wrap="wrap">
            <InputField
              placeholder="Postcode"
              validated={{ success: false, message: "" }}
              value={postcode}
              onChange={(e) => {
                action("inputfield.onChange")("Postcode", e.target.value);
                setPostcode(e.target.value);
              }}
              id="input-1"
            />
            <InputField
              placeholder="Huisnummer"
              validated={{ success: false, message: "" }}
              value={huisnummer}
              onChange={(e) => {
                action("inputfield.onChange")("Huisnummer", e.target.value);
                setHuisnummer(e.target.value);
              }}
              id="input-2"
            />
            <InputField
              placeholder="Toevoeging"
              validated={{ success: false, message: "" }}
              value={toevoeging}
              onChange={(e) => {
                action("inputfield.onChange")("Toevoeging", e.target.value);
                setToevoeging(e.target.value);
              }}
              id="input-3"
            />
          </Stack>
        </PostalCodeCheckInputFields>
      </PostalCodeCheckInput>
    );
  },
  parameters: excludeParams,
};

export const Error: Story = {
  args: {
    state: "error",
    variant: "default",
    showTvSection: true,
    calloutProps: { title: "Title", description: "Description" },
  },
  render: (args: StoryArgs) => {
    const [postcode, setPostcode] = useState("");
    const [huisnummer, setHuisnummer] = useState("");
    const [toevoeging, setToevoeging] = useState("");

    const tvSectionProps = args.showTvSection
      ? {
          title: "Wil je TV van Odido?",
          description:
            "Met het Interactieve TV abonnement van Odido kies je het helemaal zelf.",
          onTabChange: action("tvSectionProps.onTabChange"),
          options: TV_SECTION_OPTIONS,
        }
      : undefined;

    return (
      <PostalCodeCheckInput {...args} tvSectionProps={tvSectionProps}>
        <PostalCodeCheckInputFields>
          <Stack direction="row" wrap="wrap">
            <InputField
              placeholder="Postcode"
              validated={{ success: false, message: "" }}
              value={postcode}
              onChange={(e) => {
                action("inputfield.onChange")("Postcode", e.target.value);
                setPostcode(e.target.value);
              }}
              id="input-1"
            />
            <InputField
              placeholder="Huisnummer"
              validated={{ success: false, message: "" }}
              value={huisnummer}
              onChange={(e) => {
                action("inputfield.onChange")("Huisnummer", e.target.value);
                setHuisnummer(e.target.value);
              }}
              id="input-2"
            />
            <InputField
              placeholder="Toevoeging"
              validated={{ success: false, message: "" }}
              value={toevoeging}
              onChange={(e) => {
                action("inputfield.onChange")("Toevoeging", e.target.value);
                setToevoeging(e.target.value);
              }}
              id="input-3"
            />
          </Stack>
        </PostalCodeCheckInputFields>
      </PostalCodeCheckInput>
    );
  },
  parameters: excludeParams,
};

export const WithoutTV: Story = {
  args: {
    state: "none",
    variant: "default",
    showTvSection: false,
    calloutProps: { title: "Title", description: "Description" },
  },
  parameters: excludeParams,
};
