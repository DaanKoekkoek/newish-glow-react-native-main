import type { Meta, StoryObj } from "@storybook/react";
import { useRef, useState } from "react";
import { AnchoredScale } from "./AnchoredScale";
import { Stack } from "foundations/Stack";
import { Button } from "components/Button";
import { Box } from "components/Box";
import { DefaultList } from "components/DefaultList";
import { Paragraph } from "foundations/Paragraph";
import {
  SCALE_PRESETS,
  SUPPORTED_MOTION_TAGS,
} from "../Animation.configuration";

const meta: Meta<typeof AnchoredScale> = {
  title: "DesignSystem/_internals/Animation/Scale/AnchoredScale",
  component: AnchoredScale,
  argTypes: {
    placement: {
      control: "select",
      options: [
        "top-start",
        "top-end",
        "bottom-start",
        "bottom-end",
        "right-start",
        "right-end",
        "left-start",
        "left-end",
        "auto",
      ],
      description:
        "The position of the floating element relative to the source element, using floating-ui placement syntax. Can also be set to `auto`, which will either place the anchored scale above or below the element it anchors to.",
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
        "The origin point for the scale animation. Determines which corner or edge the element scales from.",
    },
    animation: {
      control: "select",
      options: Object.keys(SCALE_PRESETS),
      description:
        "Predefined animation preset controlling speed and easing of the scale animation.",
    },
    sourceRef: {
      control: false,
      description:
        "Ref to the source element the floating element is anchored to. Required for positioning.",
    },
    open: {
      control: "boolean",
      description:
        "Controls whether the floating element is visible (true) or hidden (false).",
    },
    offsetY: {
      control: "number",
      description:
        "Optional vertical offset in pixels applied to the floating element from its anchored position.",
    },
    className: {
      control: "text",
      description: "Optional CSS class applied to the animated container.",
    },
    as: {
      control: "select",
      options: SUPPORTED_MOTION_TAGS,
      description:
        "The HTML tag or React element type to render the animation container as.",
    },
  },
  args: {
    open: false,
  },
};

export default meta;
type Story = StoryObj<typeof AnchoredScale>;

/**
 * Demonstrates how the AnchoredScale component attaches to a trigger button
 * and scales into view.
 */
export const Default: Story = {
  args: {
    placement: "bottom-start",
    direction: "top-left",
    animation: "gentle",
    offsetY: 8,
  },
  render: (args) => {
    const [open, setOpen] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);

    return (
      <Stack style={{ position: "relative" }}>
        <Button ref={buttonRef} onClick={() => setOpen((prev) => !prev)}>
          Toggle AnchoredScale
        </Button>

        <AnchoredScale {...args} sourceRef={buttonRef} open={open}>
          {() => (
            <Box prominence="color" style={{ width: 240 }}>
              <Stack>
                <Paragraph>Anchored to button</Paragraph>
                <DefaultList
                  items={[
                    {
                      text: "Option 1",
                    },
                    {
                      text: "Option 2",
                    },
                    {
                      text: "Option 3",
                    },
                  ]}
                />
              </Stack>
            </Box>
          )}
        </AnchoredScale>
      </Stack>
    );
  },
};
