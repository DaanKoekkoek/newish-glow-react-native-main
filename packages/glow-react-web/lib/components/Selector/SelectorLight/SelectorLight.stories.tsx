import type { Meta, StoryObj } from "@storybook/react";
import { useId } from "react";
import { SelectorLight } from "./SelectorLight";
import type { SelectorLightProps } from "./SelectorLight.types";
import IMAGES from "foundations/Image/Image.mock";
import { Section } from "foundations/Section";
import { Column, Grid } from "foundations/Grid";
import { Main } from "foundations/Main";

import {
  createComplexControl,
  type ComplexOption,
} from "@storybook/utils/complexOptions";

const iconOptions: ComplexOption<SelectorLightProps["icon"]>[] = [
  { label: "mobile phone icon", value: { name: "mobile-phone" } },
  { label: "home icon", value: { name: "home" } },
];

const imageOptions: ComplexOption<SelectorLightProps["image"]>[] = [
  { label: "none", value: undefined },
  {
    label: "Image (aspect ratio - mobileSmall: 1/1, tablet: 2/1)",
    value: {
      src: IMAGES["family_tablet_snack"],
      ratio: { mobileSmall: "1/1", tablet: "2/1" },
    },
  },
];

const checkedOptions: ComplexOption<SelectorLightProps["checked"]>[] = [
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

const directionOptions: ComplexOption<SelectorLightProps["direction"]>[] = [
  {
    label: "vertical",
    value: "vertical",
  },
  {
    label: "horizontal",
    value: "horizontal",
  },
  {
    label: "mobileSmall: vertical, tablet: horizontal",
    value: {
      mobileSmall: "vertical",
      tablet: "horizontal",
    },
  },
];

const meta: Meta<typeof SelectorLight> = {
  title: "DesignSystem/Components/Selector/SelectorLight",
  component: SelectorLight,
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
        "Active or inactive, to reflect availability and interaction states.",
    },
    checked: {
      ...createComplexControl(checkedOptions),
      description: "Enforce checked state to the input of the selector.",
    },
    direction: {
      ...createComplexControl(directionOptions),
      description:
        "Horizontal or vertical layout. Can also be set per breakpoint.",
    },
    icon: {
      ...createComplexControl(iconOptions),
      description:
        "Displays an icon as the primary visual, optionally enhanced with glow effects.",
    },
    image: {
      ...createComplexControl(imageOptions),
      description:
        "Displays an image thumbnail with a fixed aspect ratio for more visual options. Takes presedence over `icon`.",
    },
    highlight: {
      description:
        "Displays a banner element (e.g. “Most popular”) rendered above the content.",
    },
  },
  args: {
    name: "selector-light",
    icon: {
      name: "mobile-phone",
    },
    highlight: "highlight",
    title: "Title of [SelectorLight]",
  },
  decorators: [
    (Story, args) => (
      <Main>
        <Section>
          <Story {...args} />
        </Section>
      </Main>
    ),
  ],
  render: (args) => (
    <Grid columnSize={{ mobileSmall: 12, tablet: 6 }}>
      <Column>
        <SelectorLight {...args} id={useId()} />
      </Column>
      <Column>
        <SelectorLight {...args} id={useId()} />
      </Column>
    </Grid>
  ),
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
