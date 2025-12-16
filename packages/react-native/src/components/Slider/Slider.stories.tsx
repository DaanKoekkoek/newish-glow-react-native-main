import type { Meta } from "@storybook/react";
import React from "react";

import { Slider } from "./Slider";
import { odidoPaletteKeys } from "../../_theming/tokenLoader";
import { Grid } from "../../foundations/Grid";

const meta: Meta<typeof Slider> = {
  title: "DesignSystem/Components/Input/Slider",
  component: Slider,
  args: {
    minValue: 0,
    maxValue: 100,
  },
  argTypes: {
    palette: {
      control: "select",
      options: [...odidoPaletteKeys],
      description: "Set the palette of the slider",
    },
    minValue: {
      description: "The minimum value of the slider",
    },
    maxValue: {
      description: "The maximum value of the slider",
    },
    step: {
      description: "The increment by which the slider increases or decreases",
    },
    onValueChange: {
      type: "function",
    },
  },
  decorators: [(Story) => <Story />],
};

export default meta;

export const Default = (args) => (
  <Grid>
    <Grid.Column>
      <Slider {...args} />
    </Grid.Column>
  </Grid>
);
