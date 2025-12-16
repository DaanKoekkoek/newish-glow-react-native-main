import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Grow } from "_internals/Animation/Grow";
import { Button } from "components/Button";
import { Box } from "components/Box";
import { Paragraph } from "foundations/Paragraph";
import { Stack } from "foundations/Stack";
import { Stagger } from "../Stagger";
import {
  GROW_PRESETS,
  SUPPORTED_MOTION_TAGS,
} from "../Animation.configuration";

const meta: Meta<typeof Grow> = {
  title: "DesignSystem/_internals/Animation/Grow",
  component: Grow,
  argTypes: {
    open: {
      control: "boolean",
      description:
        "Controls whether the Grow component is expanded (true) or collapsed (false).",
    },
    animation: {
      control: "select",
      options: Object.keys(GROW_PRESETS),
      description:
        "Selects a preset animation speed/duration from GROW_PRESETS.",
    },
    animateOpacity: {
      control: "boolean",
      description:
        "Whether to animate the opacity alongside height/width. Useful for fading in/out while expanding.",
    },
    reverseOnClose: {
      control: "boolean",
      description:
        "If true, the closing animation respects the preset duration and delay instead of instantly collapsing.",
    },
    duration: {
      control: "number",
      description:
        "Custom duration in seconds for the grow animation; overrides the preset animation duration.",
    },
    delay: {
      control: "number",
      description:
        "Optional delay in seconds before the grow animation starts.",
    },
    offset: {
      control: "object",
      description:
        "Optional offsets for top, bottom, left, and right. Useful for full-height or full-width expansions with spacing from viewport edges.",
    },
    className: {
      control: "text",
      description: "Optional CSS class applied to the animation container.",
    },
    as: {
      control: "select",
      options: SUPPORTED_MOTION_TAGS,
      description:
        "The HTML tag or React element type to render the animation container as.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Grow>;

export const Default: Story = {
  args: {
    open: true,
    animation: "medium",
    animateOpacity: false,
  },
  render: (args) => {
    const [open, setOpen] = useState(args.open);

    return (
      <Stack style={{ minWidth: "320px" }}>
        <Button onClick={() => setOpen((prev) => !prev)}>
          {open ? "Collapse" : "Expand"}
        </Button>
        <Grow {...args} open={open}>
          <Box prominence="color">
            <Paragraph>
              This panel smoothly expands and collapses by animating its height.
            </Paragraph>
          </Box>
        </Grow>
      </Stack>
    );
  },
};

export const WithOpacity: Story = {
  args: {
    open: true,
    animation: "medium",
    animateOpacity: true,
  },
  render: (args) => {
    const [open, setOpen] = useState(args.open);

    return (
      <Stack style={{ minWidth: "320px" }}>
        <Button onClick={() => setOpen((p) => !p)}>Toggle Fade & Grow</Button>
        <Grow {...args} open={open}>
          <Box prominence="color">
            <Paragraph>
              This example uses <code>animateOpacity</code> to fade in/out.
            </Paragraph>
          </Box>
        </Grow>
      </Stack>
    );
  },
};

export const FullHeightWithOffset: Story = {
  args: {
    open: true,
    animation: "medium",
    animateOpacity: true,
    offset: { top: 100, bottom: 100 },
  },
  render: (args) => {
    const [open, setOpen] = useState(args.open);

    return (
      <Stack>
        <Button onClick={() => setOpen((p) => !p)}>
          Toggle Full Height Grow
        </Button>
        <style>
          {`
              .grow-story > div {
                height: 100%;
              }
            `}
        </style>
        <Grow {...args} open={open} className="grow-story">
          <Box prominence="color" grow>
            <Paragraph>
              This grows relative to viewport height with top/bottom offsets.
            </Paragraph>
          </Box>
        </Grow>
      </Stack>
    );
  },
};

export const SpringComparison: Story = {
  args: {
    open: true,
    animation: "fast",
    animateOpacity: false,
  },
  render: (args) => {
    const [open, setOpen] = useState(args.open);

    return (
      <Stack style={{ minWidth: "320px" }}>
        <Button onClick={() => setOpen((p) => !p)}>Toggle Grow (Fast)</Button>
        <Grow {...args} open={open} style={{ position: "absolute" }}>
          <Box prominence="color" grow>
            <Paragraph>
              Compare spring presets for natural motion tuning.
            </Paragraph>
          </Box>
        </Grow>
      </Stack>
    );
  },
};

export const WithGrowDelay: Story = {
  args: {
    open: true,
    animation: "medium",
    duration: 0.5,
  },
  render: (args) => {
    const [open, setOpen] = useState(args.open);

    return (
      <Stack>
        <Button onClick={() => setOpen((prev) => !prev)}>
          {open ? "Collapse" : "Expand"}
        </Button>
        <Grow {...args} open={open} style={{ position: "absolute" }}>
          {(growDelay) => (
            <Box prominence="color">
              <Stagger open delay={growDelay}>
                <Paragraph>Delayed item 1</Paragraph>
                <Paragraph>Delayed item 2</Paragraph>
                <Paragraph>Delayed item 3</Paragraph>
              </Stagger>
            </Box>
          )}
        </Grow>
      </Stack>
    );
  },
};
