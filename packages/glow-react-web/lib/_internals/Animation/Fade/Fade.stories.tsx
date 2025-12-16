import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Fade } from "_internals/Animation/Fade";
import { Box } from "components/Box";
import { Paragraph } from "foundations/Paragraph";
import { Button } from "components/Button";
import { Stack } from "foundations/Stack";
import { Icon } from "foundations/Icon";
import { FADE_PRESETS } from "../Animation.configuration";

const meta: Meta<typeof Fade> = {
  title: "DesignSystem/_internals/Animation/Fade",
  component: Fade,
  argTypes: {
    open: {
      control: "boolean",
      description: "Controls whether the fade element is visible",
    },
    animation: {
      control: "select",
      options: Object.keys(FADE_PRESETS),
      description: "Selects the preset fade animation speed/duration",
    },
    duration: {
      control: "number",
      description: "Custom duration in seconds; overrides the preset",
    },
    reverseOnExit: {
      control: "boolean",
      description: "Whether the exit fade should respect the preset delay",
    },
    position: {
      control: "select",
      options: ["relative", "absolute", "fixed"],
      description: "CSS position property for the fade container",
    },
    zIndex: {
      control: "number",
      description: "CSS z-index for the fade container",
    },
    testID: {
      control: "text",
      description: "Optional test ID for querying in tests",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Fade>;

export const Default: Story = {
  args: {
    open: true,
    animation: "medium",
  },
  render: (args) => {
    const [open, setOpen] = useState(args.open);

    return (
      <Stack>
        <Button onClick={() => setOpen((prev) => !prev)}>
          {open ? "Fade Out" : "Fade In"}
        </Button>

        <Fade {...args} open={open}>
          <Box prominence="color">
            <Paragraph>Hello, I fade smoothly!</Paragraph>
          </Box>
        </Fade>
      </Stack>
    );
  },
};

export const CustomDuration: Story = {
  args: {
    open: true,
    animation: "medium",
    duration: 1.2,
    reverseOnExit: true,
  },
  render: (args) => {
    const [open, setOpen] = useState(args.open);

    return (
      <Stack>
        <Button onClick={() => setOpen((prev) => !prev)}>
          {open ? "Hide" : "Show"}
        </Button>
        <Fade {...args} open={open}>
          <Box prominence="color">
            <Paragraph>Custom duration with reverse delay on exit.</Paragraph>
          </Box>
        </Fade>
      </Stack>
    );
  },
};

export const WithFadeCompletion: Story = {
  args: {
    open: true,
    animation: "gentle",
  },
  render: (args) => {
    const [open, setOpen] = useState(args.open);

    return (
      <Stack>
        <Button onClick={() => setOpen((prev) => !prev)}>
          {open ? "Fade Out" : "Fade In"}
        </Button>
        <Fade {...args} open={open}>
          {({ fadeCompleted }) => (
            <Box prominence="color">
              <Paragraph
                style={{ display: "flex", alignItems: "center", gap: 8 }}
              >
                {fadeCompleted ? "Fade completed" : "Animating... please wait"}
                {fadeCompleted && <Icon name="checkmark" />}
              </Paragraph>
            </Box>
          )}
        </Fade>
      </Stack>
    );
  },
};
