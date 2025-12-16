import { useRef, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Follower } from "./index";
import { FOLLOWER_PRESETS } from "../Animation.configuration";
import { Box } from "components/Box";
import { Stack } from "foundations/Stack";
import { Slider } from "components/Slider";
import { Paragraph } from "foundations/Paragraph";

const meta: Meta<typeof Follower> = {
  title: "DesignSystem/_internals/Animation/Follower",
  component: Follower,
  argTypes: {
    offsetX: {
      control: "number",
      description:
        "Horizontal padding to prevent the follower from touching edges",
    },
    offsetY: {
      control: "number",
      description: "Vertical offset applied to the follower container",
    },
    spring: {
      control: "boolean",
      description: "Whether movement should be spring-animated",
    },
    preset: {
      control: "select",
      options: Object.keys(FOLLOWER_PRESETS),
      description: "Spring preset applied when spring is enabled",
    },
    as: {
      control: "select",
      options: ["div", "span", "button"],
      description: "HTML tag to render as",
    },
    className: {
      control: "text",
      description: "Optional CSS class",
    },
    edgeDelay: {
      control: "number",
      description:
        "Optional delay used by some use cases (currently unused internally)",
    },
    useRAF: {
      description:
        "Continuously updates follower position via requestAnimationFrame (~60fps). Useful for ultra-smooth tracking when spring animation is disabled.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Follower>;

export const Default: Story = {
  args: {
    offsetX: 4,
    offsetY: -10,
    preset: "medium",
    as: "div",
  },
  render: (args) => {
    const horizontalThumbRef = useRef<HTMLButtonElement | null>(null);
    const horizontalContainerRef = useRef<HTMLDivElement>(null);

    const [hasInteracted, setHasInteracted] = useState(false);

    return (
      <Stack>
        <Paragraph>Follower tracks the Slider thumb.</Paragraph>
        <Stack gap={800}>
          <div
            style={{ display: "flex", width: "100%" }}
            ref={horizontalContainerRef}
          >
            <Slider
              minValue={0}
              maxValue={100}
              value={50}
              onValueChange={() => setHasInteracted(true)}
              ref={horizontalThumbRef}
            />
          </div>
          <Follower
            spring={hasInteracted}
            {...args}
            targetRef={horizontalThumbRef}
            containerRef={horizontalContainerRef}
          >
            <Box prominence="color" size="sm">
              <Paragraph>Follower</Paragraph>
            </Box>
          </Follower>
        </Stack>
      </Stack>
    );
  },
};

export const NoSpring: Story = {
  args: { offsetX: 4, offsetY: -10, spring: false, useRAF: true },
  render: Default.render,
};

export const WithOffset: Story = {
  args: { offsetX: 50, offsetY: -20, preset: "gentle" },
  render: Default.render,
};
