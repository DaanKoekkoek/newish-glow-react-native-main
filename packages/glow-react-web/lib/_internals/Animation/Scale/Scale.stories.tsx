import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Scale } from "./Scale";
import { Button } from "components/Button";
import { Box } from "components/Box";
import { Paragraph } from "foundations/Paragraph";
import { Stack } from "foundations/Stack";
import {
  SCALE_PRESETS,
  SUPPORTED_MOTION_TAGS,
} from "../Animation.configuration";

const meta: Meta<typeof Scale> = {
  title: "DesignSystem/_internals/Animation/Scale",
  component: Scale,
  argTypes: {
    animation: {
      control: "select",
      options: Object.keys(SCALE_PRESETS),
      description:
        "Predefined animation preset controlling the speed and easing of the scale transition.",
    },
    direction: {
      control: "select",
      options: [
        "center",
        "top",
        "bottom",
        "left",
        "right",
        "top-left",
        "top-right",
        "bottom-left",
        "bottom-right",
      ],
      description:
        "The origin point from which the element scales. Determines the corner or edge the element expands from.",
    },
    open: {
      control: "boolean",
      description:
        "Controls whether the element is visible and should animate in (true) or out (false).",
    },
    as: {
      control: "select",
      options: SUPPORTED_MOTION_TAGS,
      description:
        "The HTML tag or React element type to render the animated container as.",
    },
    className: {
      control: "text",
      description: "Optional CSS class applied to the animated container.",
    },
    style: {
      control: "object",
      description: "Optional inline styles applied to the container element.",
    },
    children: {
      control: false,
      description:
        "Render prop function that receives callbacks for enter and exit animation completion.",
    },
    onEnterComplete: {
      control: false,
      description: "Callback invoked when the scale-in animation completes.",
    },
    onExitComplete: {
      control: false,
      description: "Callback invoked when the scale-out animation completes.",
    },
  },
  args: {
    open: false,
  },
};

export default meta;
type Story = StoryObj<typeof Scale>;

/**
 * Basic open/close example showing scale transitions.
 */
export const Default: Story = {
  args: {
    open: true,
    animation: "gentle",
    direction: "center",
  },
  render: (args) => {
    const [open, setOpen] = useState(args.open);

    return (
      <Stack style={{ position: "static" }}>
        <Button onClick={() => setOpen((prev) => !prev)}>Toggle Scale</Button>

        <Scale
          {...args}
          open={open}
          style={{
            position: "absolute",
            right: "calc(50% - 76px)",
            top: "76px",
          }}
        >
          {() => (
            <Box prominence="color">
              <Paragraph>Scaling box</Paragraph>
            </Box>
          )}
        </Scale>
      </Stack>
    );
  },
};
