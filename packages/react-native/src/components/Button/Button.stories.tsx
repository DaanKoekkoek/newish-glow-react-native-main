import type { Meta, StoryObj } from "@storybook/react";
import { Paragraph, Stack } from "foundations/index";
import React from "react";

import { Button } from "./Button";
import type { ButtonProps } from "./Button.types";
import { ButtonForLink } from "./ButtonForLink";
import { Box } from "../Box";

const meta: Meta<typeof Button> = {
  title: "DesignSystem/Components/Button/Button",
  component: Button,
  argTypes: {
    pointerEvents: {
      options: ["box-none", "none", "box-only", "auto"],
      control: {
        type: "select",
      },
    },
    prominence: {
      options: ["default", "secondary", "emphasised"],
      control: {
        type: "select",
      },
    },
    size: {
      options: ["default", "sm", "lg"],
      control: {
        type: "select",
      },
    },
    onPress: {
      type: "function",
    },
    state: {
      options: ["default", "disabled", "loading", "hover", "pressed"],
      control: {
        type: "select",
      },
    },
    baseStyle: {
      table: {
        disable: true,
      },
    },
    pressableStyle: {
      table: {
        disable: true,
      },
    },
  },
  decorators: [(Story) => <Story />],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: (args: ButtonProps) => (
    <Button {...args}>
      <Button.Icon name="clock" />
      Default button
    </Button>
  ),
};

export const IconButtons: Story = {
  render: (args: ButtonProps) => (
    <Stack>
      <Stack direction="row">
        <Button {...args}>
          <Button.Icon name="clock" />
          Default button
        </Button>
        <Button {...args} prominence="secondary">
          <Button.Icon name="clock" />
          Default button
        </Button>
        <Button {...args} prominence="emphasised">
          <Button.Icon name="clock" />
          Default button
        </Button>
      </Stack>
      <Stack direction="row">
        <Button {...args} size="sm">
          <Button.Icon name="clock" />
          Default button
        </Button>
        <Button {...args} size="sm" prominence="secondary">
          <Button.Icon name="clock" />
          Default button
        </Button>
        <Button {...args} size="sm" prominence="emphasised">
          <Button.Icon name="clock" />
          Default button
        </Button>
      </Stack>
      <Stack direction="row">
        <Button {...args} size="lg">
          <Button.Icon name="clock" />
          Default button
        </Button>
        <Button {...args} size="lg" prominence="secondary">
          <Button.Icon name="clock" />
          Default button
        </Button>
        <Button {...args} size="lg" prominence="emphasised">
          <Button.Icon name="clock" />
          Default button
        </Button>
      </Stack>
      <Stack direction="row">
        <Button {...args}>
          Default button
          <Button.Icon name="clock" />
        </Button>
        <Button {...args} prominence="secondary">
          Default button
          <Button.Icon name="clock" />
        </Button>
        <Button {...args} prominence="emphasised">
          Default button
          <Button.Icon name="clock" />
        </Button>
      </Stack>
      <Stack direction="row">
        <Button {...args} size="sm">
          Default button
          <Button.Icon name="clock" />
        </Button>
        <Button {...args} size="sm" prominence="secondary">
          Default button
          <Button.Icon name="clock" />
        </Button>
        <Button {...args} size="sm" prominence="emphasised">
          Default button
          <Button.Icon name="clock" />
        </Button>
      </Stack>
      <Stack direction="row">
        <Button {...args} size="lg">
          Default button
          <Button.Icon name="clock" />
        </Button>
        <Button {...args} size="lg" prominence="secondary">
          Default button
          <Button.Icon name="clock" />
        </Button>
        <Button {...args} size="lg" prominence="emphasised">
          Default button
          <Button.Icon name="clock" />
        </Button>
      </Stack>
    </Stack>
  ),
};

export const IconOnly: Story = {
  render: (args: ButtonProps) => (
    <Stack>
      <Stack direction="row">
        <Button {...args}>
          <Button.Icon name="clock" />
        </Button>
        <Button {...args} prominence="secondary">
          <Button.Icon name="clock" />
        </Button>
        <Button {...args} prominence="emphasised">
          <Button.Icon name="clock" />
        </Button>
      </Stack>
      <Stack direction="row">
        <Button {...args} size="sm">
          <Button.Icon name="clock" />
        </Button>
        <Button {...args} size="sm" prominence="secondary">
          <Button.Icon name="clock" />
        </Button>
        <Button {...args} size="sm" prominence="emphasised">
          <Button.Icon name="clock" />
        </Button>
      </Stack>
      <Stack direction="row">
        <Button {...args} size="lg">
          <Button.Icon name="clock" />
        </Button>
        <Button {...args} size="lg" prominence="secondary">
          <Button.Icon name="clock" />
        </Button>
        <Button {...args} size="lg" prominence="emphasised">
          <Button.Icon name="clock" />
        </Button>
      </Stack>
    </Stack>
  ),
};

export const Mixed: Story = {
  render: (args: ButtonProps) => (
    <Stack>
      <Stack direction="row">
        <Button {...args}>Default button</Button>
        <Button {...args} prominence="secondary">
          Default button
        </Button>
      </Stack>
      <Stack direction="row">
        <Button {...args} size="sm">
          Default button
        </Button>
        <Button {...args} size="sm" prominence="secondary">
          Default button
        </Button>
      </Stack>
      <Stack direction="row">
        <Button {...args} size="lg">
          Default button
        </Button>
        <Button {...args} size="lg" prominence="secondary">
          Default button
        </Button>
      </Stack>
    </Stack>
  ),
};

export const Default: Story = {
  render: (args: ButtonProps) => (
    <Stack>
      <Button {...args} fill>
        Label
      </Button>
      <Stack direction="row">
        <Button {...args} size="sm">
          Label
        </Button>
        <Button {...args}>Label</Button>
        <Button {...args} size="lg">
          Label
        </Button>
      </Stack>
      <Stack direction="row">
        <Button {...args} size="sm" inverted>
          Label inverted
        </Button>
        <Button {...args} inverted>
          Label inverted
        </Button>
        <Button {...args} size="lg" inverted>
          Label inverted
        </Button>
      </Stack>
      <Stack direction="row">
        <Button {...args} size="sm" state="disabled">
          Label disabled
        </Button>
        <Button {...args} state="disabled">
          Label disabled
        </Button>
        <Button {...args} size="lg" state="disabled">
          Label disabled
        </Button>
      </Stack>
    </Stack>
  ),
};

export const Secondary: Story = {
  args: {
    prominence: "secondary",
  },

  render: (args: ButtonProps) => (
    <Stack>
      <Button {...args} fill>
        Label
      </Button>
      <Stack direction="row">
        <Button {...args} size="sm">
          Label
        </Button>
        <Button {...args}>Label</Button>
        <Button {...args} size="lg">
          Label
        </Button>
      </Stack>
      <Stack direction="row" style={{ backgroundColor: "black" }}>
        <Button {...args} size="sm" inverted>
          Label inverted
        </Button>
        <Button {...args} inverted>
          Label inverted
        </Button>
        <Button {...args} size="lg" inverted>
          Label inverted
        </Button>
      </Stack>
      <Stack direction="row">
        <Button {...args} size="sm" state="disabled">
          Label disabled
        </Button>
        <Button {...args} state="disabled">
          Label disabled
        </Button>
        <Button {...args} size="lg" state="disabled">
          Label disabled
        </Button>
      </Stack>
    </Stack>
  ),
};

export const Emphasised: Story = {
  args: {
    prominence: "emphasised",
  },
  render: (args: ButtonProps) => (
    <Stack>
      <Stack direction="row">
        <Button {...args} fill>
          Label
        </Button>
        <Button {...args} size="sm">
          Label
        </Button>
        <Button {...args}>Label</Button>
        <Button {...args} size="lg">
          Label
        </Button>
      </Stack>
      <Stack direction="row">
        <Button {...args} size="sm" inverted>
          Label inverted
        </Button>
        <Button {...args} inverted>
          Label inverted
        </Button>
        <Button {...args} size="lg" inverted>
          Label inverted
        </Button>
      </Stack>
      <Stack direction="row">
        <Button {...args} size="sm" state="disabled">
          Label disabled
        </Button>
        <Button {...args} state="disabled">
          Label disabled
        </Button>
        <Button {...args} size="lg" state="disabled">
          Label disabled
        </Button>
      </Stack>
    </Stack>
  ),
};

export const Stretched: Story = {
  render: (args: ButtonProps) => (
    <Box prominence="color">
      <Stack>
        <Paragraph>Hover over me</Paragraph>
        <Button {...args} stretched>
          Label
        </Button>
      </Stack>
    </Box>
  ),
};

export const ButtonAsText: Story = {
  render: ({ onPress, ...args }: ButtonProps) => (
    <Stack>
      <ButtonForLink {...args}>Label</ButtonForLink>
      <ButtonForLink {...args}>
        <Button.Icon name="24h" />
        Label
      </ButtonForLink>
    </Stack>
  ),
};
