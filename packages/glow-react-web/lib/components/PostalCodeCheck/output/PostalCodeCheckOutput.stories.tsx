import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import { PostalCodeCheckOutput } from "./index";
import type { PostalCodeOutputProps } from "../PostalCodeCheck.types";
import { Button, TextLink } from "components/index";
import { Paragraph } from "foundations/Paragraph";
import {
  createComplexControl,
  type ComplexOption,
} from "@storybook/utils/complexOptions";

const watchTVOptions: ComplexOption<PostalCodeOutputProps["watchTv"]>[] = [
  {
    label: "N/A",
    value: undefined,
  },
  {
    label: "Ja",
    value: { title: "Wil je TV kijken?", text: "Ja" },
  },
  {
    label: "Nee",
    value: { title: "Wil je TV kijken?", text: "Nee" },
  },
];

const addressOptions: ComplexOption<PostalCodeOutputProps["address"]>[] = [
  {
    label: "With onClick",
    value: {
      title: "Je adres",
      text: "Voorbeeldstraat 12 B, Stad",
      editable: { text: "Wijzig", onClick: action("address.editable.onClick") },
    },
  },
  {
    label: "Without onClick",
    value: { title: "Je adres", text: "Voorbeeldstraat 12 B, Stad" },
  },
];

const callToActionOptions: ComplexOption<
  PostalCodeOutputProps["callToAction"]
>[] = [
  {
    label: "Text link",
    value: <TextLink href="#">Text link</TextLink>,
  },
  {
    label: "Button",
    value: (
      <Button size="sm" onClick={action("button.onClick")}>
        Button
      </Button>
    ),
  },
  {
    label: "Two buttons",
    value: (
      <>
        <Button size="sm" onClick={action("button.onClick")}>
          Button text
        </Button>
        <Button
          size="sm"
          onClick={action("button.onClick")}
          prominence="secondary"
        >
          Button text
        </Button>
      </>
    ),
  },
];

const meta: Meta<typeof PostalCodeCheckOutput> = {
  title: "DesignSystem/Components/PostalCodeCheck/Output",
  component: PostalCodeCheckOutput,
  argTypes: {
    watchTv: {
      ...createComplexControl(watchTVOptions),
      description: "Optionally display if the user wants to watch TV",
    },
    address: {
      ...createComplexControl(addressOptions),
      description: "Displays an address and optionally an editable link",
    },
    callToAction: {
      ...createComplexControl(callToActionOptions),
      description: "CTA area, usually buttons or links",
    },
    state: {
      options: ["success", "information"],
      description: "Visual indicator for the state of the technology badge",
    },
    technology: {
      options: ["DSL", "Internet + TV", "Klik & Klaar", "Fiber"],
      description: "Type of technology to display",
    },
    title: {
      description: "The heading shown next to the technology icon",
    },
    description: {
      description: "Optional descriptive content",
    },
    children: {
      description: "Promotional content, position depends on `promo`",
    },
    promo: {
      control: { type: "radio" },
      options: ["none", "default", "inside"],
      description:
        "Whether to show promo content: none (hidden), default (below), or inside the main layout",
    },
  },
  args: {
    state: "information",
    title: "Title",
    description: "Description",
    promo: "default",
    technology: "DSL",
    address: {
      title: "Je adres",
      text: "Voorbeeldstraat 12 B, Stad",
      editable: {
        text: "Wijzig",
        onClick: action("address.editable.onClick"),
      },
    },
    watchTv: {
      title: "Wil je TV Kijken?",
      text: "Ja",
    },
    callToAction: (
      <>
        <Button size="sm" onClick={action("button.onClick")}>
          Button text
        </Button>
        <Button
          size="sm"
          onClick={action("button.onClick")}
          prominence="secondary"
        >
          Button text
        </Button>
      </>
    ),
    children: <Paragraph>Promotional content</Paragraph>,
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Example: Story = {
  args: {
    state: "information",
    title: "Internet beschikbaar.",
    technology: "Klik & Klaar",
    description:
      "Dit is beschikbaar op je adres: Klik&Klaar Internet via ons 5G-netwerk. De maximale snelheid kan per adres anders zijn. Check onze dekkingskaart voor de verwachte snelheid op je adres.",
    promo: "inside",
    address: {
      title: "Je adres",
      text: "Voorbeeldstraat 12 B, Stad",
      editable: {
        text: "Wijzig",
        onClick: action("address.editable.onClick"),
      },
    },
    watchTv: {
      title: "Wil je TV Kijken?",
      text: "Ja",
    },
    callToAction: (
      <>
        <Button size="sm" onClick={action("button.onClick")}>
          Internet bestellen
        </Button>
        <Button
          size="sm"
          onClick={action("button.onClick")}
          prominence="secondary"
        >
          Alles bekijken
        </Button>
      </>
    ),
  },
};

export const SuccessState: Story = {
  args: {
    state: "success",
  },
};
