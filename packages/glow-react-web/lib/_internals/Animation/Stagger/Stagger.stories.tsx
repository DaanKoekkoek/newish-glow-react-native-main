import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Stagger } from "_internals/Animation/Stagger";
import { Box } from "components/Box";
import { Paragraph } from "foundations/Paragraph";
import { Button } from "components/Button";
import { Stack } from "foundations/Stack";
import {
  SCALE_PRESETS,
  SUPPORTED_MOTION_TAGS,
} from "../Animation.configuration";

const meta: Meta<typeof Stagger> = {
  title: "DesignSystem/_internals/Animation/Stagger",
  component: Stagger,
  argTypes: {
    open: {
      control: "boolean",
      description:
        "Whether the stagger animation is visible (open) or hidden (closed).",
    },
    animation: {
      control: "select",
      options: Object.keys(SCALE_PRESETS),
      description:
        "Predefined animation preset controlling speed and staggering behavior.",
    },
    reverseOnClose: {
      control: "boolean",
      description: "Reverse the stagger order when closing the animation.",
    },
    delay: {
      control: "number",
      description:
        "Optional delay before starting the stagger animation (overrides preset).",
    },
    onEnterComplete: {
      action: "enterComplete",
      description: "Callback fired when the full open animation completes.",
    },
    onExitComplete: {
      action: "exitComplete",
      description: "Callback fired when the full close animation completes.",
    },
    className: { control: "text" },
    as: {
      control: "select",
      options: SUPPORTED_MOTION_TAGS,
      description: "HTML tag used for the container element (default: div).",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Stagger>;

export const Default: Story = {
  args: {
    open: true,
    animation: "medium",
    reverseOnClose: true,
  },
  render: (args) => {
    const [open, setOpen] = useState(true);
    const items = ["Item 1", "Item 2", "Item 3", "Item 4"];

    return (
      <div style={{ textAlign: "center", marginTop: 40 }}>
        <style>
          {`.stagger-container { display: flex; flex-direction: column; gap: 8px;}`}
        </style>
        <Stack alignItems="stretch">
          <Button onClick={() => setOpen((prev) => !prev)}>
            {open ? "Close" : "Open"} stagger
          </Button>

          <Stagger {...args} open={open} className="stagger-container">
            {items.map((item) => (
              <Box prominence="color" grow>
                <Paragraph>{item}</Paragraph>
              </Box>
            ))}
          </Stagger>
        </Stack>
      </div>
    );
  },
};
