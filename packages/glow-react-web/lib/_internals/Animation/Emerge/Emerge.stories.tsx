import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Emerge } from "_internals/Animation/Emerge";
import { Button } from "components/Button";
import { Stack } from "foundations/Stack";
import { AnimatedLogo } from "foundations/Logos/AnimatedLogo/AnimatedLogo";
import glowVideo from "../../../../__mocks__/videos/logo-glow.mp4";
import {
  EMERGE_PRESETS,
  SUPPORTED_MOTION_TAGS,
} from "../Animation.configuration";
import { Paragraph } from "foundations/Paragraph";
import { Box } from "components/Box";

const meta: Meta<typeof Emerge> = {
  title: "DesignSystem/_internals/Animation/Emerge",
  component: Emerge,
  argTypes: {
    as: {
      control: "select",
      options: SUPPORTED_MOTION_TAGS,
      description:
        "Specifies the HTML or SVG tag to render the component as. Options include standard HTML elements like 'div', 'ul', or SVG elements like 'clipPath'.",
    },
    animation: {
      control: "select",
      options: Object.keys(EMERGE_PRESETS),
      description:
        "Defines the animation preset to use for the staggered emergence. 'fast' results in quicker animations, 'medium' offers a balanced speed, and 'gentle' provides a slower, more subtle effect.",
    },
    open: {
      control: "boolean",
      description:
        "Controls whether the items are 'open' or 'closed'. When true, the children animate into view, and when false, they animate out of view.",
    },
    centerIndex: {
      control: "number",
      description:
        "Specifies the index of the item that should appear in the center during the animation. Other items animate relative to this central item. Default is 0 (first item).",
    },
    onExitComplete: {
      description:
        "A callback function that is triggered when the exit animation has completed. This is useful for triggering actions or state changes after the elements have finished animating out of view.",
    },
    onEnterComplete: {
      description:
        "A callback function that is triggered when the enter animation has completed. This is useful for triggering actions or state changes after the elements have fully animated into view.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Emerge>;

export const Default: Story = {
  args: {
    open: true,
    centerIndex: 2,
  },
  render: (args) => {
    const [open, setOpen] = useState(args.open);

    return (
      <Stack>
        <Button onClick={() => setOpen((prev) => !prev)}>
          {open ? "Collapse" : "Emerge"}
        </Button>
        <Emerge {...args} open={open} style={{ display: "flex" }}>
          {["A", "B", "C", "D", "E"].map((label, i) => (
            <Box prominence="color" key={i}>
              <Paragraph>{label}</Paragraph>
            </Box>
          ))}
        </Emerge>
        <AnimatedLogo
          size="default"
          videoSrc={glowVideo}
          autoplay={true}
          loop={true}
          open={open}
        />
      </Stack>
    );
  },
};
