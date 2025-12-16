import { Grid } from "foundations/Grid";
import React from "react";

import { SkeletonLoader } from ".";

export default {
  title: "DesignSystem/Components/ProgressIndicators/SkeletonLoader",
  component: SkeletonLoader,
  argTypes: {
    size: {
      control: "select",
      options: ["default", "sm", "lg"],
      description: "Size of the skeleton loader",
    },
  },
  args: {
    size: "default",
  },
};

export const Default = (args) => (
  <Grid>
    <Grid.Column>
      <SkeletonLoader {...args} />
    </Grid.Column>
  </Grid>
);
