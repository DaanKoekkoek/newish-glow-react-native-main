import type { Meta } from "@storybook/react";
import { useId, useState } from "react";
import { Selector } from "./Selector";
import type { SelectorProps } from "./Selector.types";
import { Icon } from "foundations/Icon";

import {
  createComplexControl,
  type ComplexOption,
} from "@storybook/utils/complexOptions";
import { OdidoPalette } from "_internals/Color";
import { Stack } from "foundations/Stack";

const priceOptions: ComplexOption<SelectorProps["price"]>[] = [
  { label: "none", value: undefined },
  { label: "Price", value: { value: "25" } },
];

const badgeOptions: ComplexOption<SelectorProps["badge"]>[] = [
  { label: "none", value: undefined },
  { label: "Badge", value: { text: "Badge" } },
];

const secondaryActionOptions: ComplexOption<
  SelectorProps["secondaryAction"]
>[] = [
  { label: "none", value: undefined },
  {
    label: "TextLink",
    value: {
      href: "#",
      children: [<Icon name="add" key="icon" />, "Text link"],
    },
  },
];

const listOptions: ComplexOption<SelectorProps["list"]>[] = [
  {
    label: "DefaultList",
    value: {
      variant: "icon",
      items: [
        { text: "List item", icon: "checkmark" },
        { text: "List item", icon: "close" },
        { text: "List item", icon: "close" },
        { text: "List item", icon: "checkmark" },
      ],
    },
  },
];

const checkedOptions: ComplexOption<SelectorProps["checked"]>[] = [
  { label: "uncontrolled", value: undefined },
  {
    label: "true",
    value: true,
  },
  {
    label: "false",
    value: false,
  },
];

const meta: Meta<typeof Selector> = {
  title: "DesignSystem/Components/Selector/Selector",
  component: Selector,
  argTypes: {
    id: {
      description: "Set id to the input of the selector. Should be unique.",
    },
    name: {
      description:
        "Set name to the input of the selector. Should be identical to sibling selectors in case its grouped. `string`",
    },
    type: {
      description: "Input type (`radio` or `checkbox`). Defaults to `radio`.",
    },
    state: {
      description:
        "Active, inactive, or error, to reflect availability and interaction states.",
    },
    checked: {
      ...createComplexControl(checkedOptions),
      description: "Enforce checked state to the input of the selector.",
    },
    variant: {
      description:
        "Default: Standard layout with optional price, badge, and description. Compact: Minimal layout without price, badge, or list. Extended: Rich layout with optional price, badge, title strikethrough, and a list.",
    },
    price: {
      ...createComplexControl(priceOptions),
      description:
        "Displays pricing information below the content. Should be a `<Price />` component.",
    },
    badge: {
      ...createComplexControl(badgeOptions),
      description:
        "Displays a badge element. Should be a `<Badge />` component.",
    },
    secondaryAction: {
      ...createComplexControl(secondaryActionOptions),
      description: "Adds a supporting action, like “Learn more”.",
    },
    list: {
      ...createComplexControl(listOptions),
      description: "Provide contextual details below the title.",
    },
    onChange: { description: "onChange callback." },
    title: {
      description:
        "Accepts a `string`. You can highlight text by wrapping it in square brackets (`[highlight]`) and insert line breaks using the pipe symbol (`|`).",
    },
    promotion: {
      description: "Provide contextual details below the title.",
    },
    description: {
      description: "Provide contextual details below the title.",
    },
    highlight: {
      description:
        "Displays a banner element (e.g. “Most popular”) rendered above the content.",
    },
    palette: {
      option: [undefined, ...OdidoPalette],
      description:
        "Picks a specific glow type (visible when checked) along with applying palette colors to the children.",
    },
  },
  args: {
    secondaryAction: secondaryActionOptions[1].value,
    name: "selector",
    title: "Title [highlight]",
    promotion: "Promotion",
    highlight: "Highlight",
  },
  render: (args) => (
    <Stack
      direction={{ mobileSmall: "column", tablet: "row" }}
      columnSize={{ tablet: 6 }}
    >
      <Selector {...args} id={useId()} />
      <Selector {...args} id={useId()} />
    </Stack>
  ),
};

export default meta;

type Story = typeof meta;

export const Default: Story = {
  args: {
    variant: "default",
    name: "default-selector",
    price: { value: "10,49", size: "lg" },
    type: "checkbox",
    state: "default",
    badge: { text: "Badge" },
    description: "Description",
  },
};

export const Compact: Story = {
  args: {
    variant: "compact",
    type: "checkbox",
  },
};

export const Extended: Story = {
  args: {
    variant: "extended",
    price: { value: "10,49", size: "lg" },
    type: "radio",
    state: "default",
    badge: { text: "Badge" },
    titleStrikethrough: "old",
    list: {
      variant: "icon",
      items: [
        { text: "List item", icon: "checkmark" },
        { text: "List item", icon: "checkmark" },
        { text: "List item", icon: "checkmark" },
      ],
    },
  },
};

export const ErrorState: Story = {
  render: () => {
    const [isChecked, setIsChecked] = useState(false);
    const [hasError, setHasError] = useState(true);

    const handleChange = (_id: string, checked?: boolean) => {
      setIsChecked(checked || false);
      if (checked) {
        setHasError(false);
      }
    };

    return (
      <Selector
        id={useId()}
        name="error-selector"
        variant="default"
        type="checkbox"
        state={hasError ? "error" : "default"}
        title="Select this option"
        description={
          hasError ? "This checkbox is in error state." : "Error cleared!"
        }
        checked={isChecked}
        onChange={handleChange}
        promotion=""
        secondaryAction={undefined}
        highlight={undefined}
        badge={undefined}
        price={undefined}
        list={undefined}
      />
    );
  },
};
