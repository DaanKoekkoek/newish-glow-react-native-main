import type { Meta } from "@storybook/react";
import { Visible } from "./Visible";
import { Divider, Callout, Button } from "components/index";
import { Paragraph, Icon, Stack } from "foundations/index";
import { breakpointsArray } from "_theming/breakpoints";

const meta: Meta<typeof Visible> = {
  title: "DesignSystem/Utilities/Visible",
  component: Visible,
  argTypes: {
    children: {
      table: {
        disable: true,
      },
    },
    above: {
      control: { type: "select", options: breakpointsArray },
      description: "Show content on and above the given breakpoint",
    },
    below: {
      control: { type: "select", options: breakpointsArray },
      description: "Show content on and below the given breakpoint",
    },
    only: {
      control: { type: "select", options: breakpointsArray },
      description: "Show content only on the given breakpoint",
    },
  },
  decorators: [
    (Story, args) => (
      <Stack>
        <Stack direction="row" alignItems="center">
          <Icon name="status-info" size="sm" />
          <Paragraph>
            Resize screen to make things hide or appear below
          </Paragraph>
        </Stack>
        <Divider />
        <Story {...args} />
      </Stack>
    ),
  ],
};

export default meta;

type Story = typeof meta;

export const ShowAbove: Story = {
  args: {
    children: (
      <Callout
        title="Shown callout"
        description="content"
        buttonPrimary={<Button>Call to action</Button>}
      />
    ),
    above: "desktop",
  },
};

export const ShowBelow: Story = {
  args: {
    children: (
      <Callout
        title="Shown callout"
        description="content"
        buttonPrimary={<Button>Call to action</Button>}
      />
    ),
    below: "mobile",
  },
};

export const ShowOnly: Story = {
  args: {
    children: (
      <Callout
        title="Shown callout"
        description="content"
        buttonPrimary={<Button>Call to action</Button>}
      />
    ),
    only: "tablet",
  },
};
