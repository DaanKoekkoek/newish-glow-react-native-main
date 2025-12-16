import type { Meta, StoryObj } from "@storybook/react";

import { AFM } from "./Afm";
import type { AfmProps } from "./Afm.types";
import { Grid, Column } from "foundations/Grid";
import { Stack } from "foundations/Stack";

const meta: Meta<typeof AFM> = {
  title: "DesignSystem/Foundations/Assets/LogosAndVisuals/AFM Banner",
  component: AFM,
  argTypes: {
    ariaLabel: {
      control: {
        type: "text",
      },
      description: "Aria label added to the .svg file.",
    },
  },
  parameters: {
    status: {
      type: ["qaPassed", "devReviewed"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const CenteredExample: Story = {
  render: (props: AfmProps) => (
    <Grid>
      <Column>
        <Stack
          alignItems="center"
          justifyContent="center"
          style={{ backgroundColor: "#ffffff" }}
        >
          <AFM
            ariaLabel="Informatie over: Let op! Geld lenen kost geld."
            {...props}
          />
        </Stack>
      </Column>
    </Grid>
  ),
};
