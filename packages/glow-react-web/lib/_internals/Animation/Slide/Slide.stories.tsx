import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Slide } from "_internals/Animation/Slide";
import { Box } from "components/Box";
import { Paragraph } from "foundations/Paragraph";
import { Stack } from "foundations/Stack";
import { Button } from "components/Button";
import {
  SLIDE_PRESETS,
  SUPPORTED_MOTION_TAGS,
} from "../Animation.configuration";

const meta: Meta<typeof Slide> = {
  title: "DesignSystem/_internals/Animation/Slide",
  component: Slide,
  argTypes: {
    direction: {
      control: "select",
      options: ["left", "right", "top", "bottom"],
      description: "Direction the slide animation will come from or exit to.",
    },
    animation: {
      control: "select",
      options: Object.keys(SLIDE_PRESETS),
      description: "Predefined animation preset controlling speed and easing.",
    },
    reverseOnExit: {
      control: "boolean",
      description:
        "Whether the slide exits in the opposite direction when leaving.",
    },
    shouldAnimate: {
      control: "boolean",
      description: "Enable or disable animations entirely.",
    },
    offsetX: {
      control: "number",
      description: "Optional X offset applied to the slide position.",
    },
    offsetY: {
      control: "number",
      description: "Optional Y offset applied to the slide position.",
    },
    index: {
      control: "number",
      description:
        "Index of the currently visible child; allows switching between multiple children.",
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
type Story = StoryObj<typeof Slide>;

export const Default: Story = {
  args: {
    direction: "right",
    animation: "gentle",
    reverseOnExit: false,
    shouldAnimate: true,
  },
  render: (args) => {
    const [index, setIndex] = useState(0);

    const children = [
      <Box prominence="color" key={0} grow>
        <Paragraph>Slide 1</Paragraph>
      </Box>,
      <Box prominence="outline" key={1} grow>
        <Paragraph>Slide 2</Paragraph>
      </Box>,
      <Box prominence="emphasised" key={2} grow>
        <Paragraph>Slide 3</Paragraph>
      </Box>,
    ];

    return (
      <Stack>
        <style>
          {`
            .slide-story {
              left: 0;
              right: 0;
              display: grid;
              grid-template-columns: auto;
              grid-template-rows: auto;
              position: absolute;
            }

            .slide-story > * {
                grid-column: 1;
                grid-row: 1;
            }
          `}
        </style>
        <Stack direction="row">
          <Button
            onClick={() => setIndex((prev) => (prev + 1) % children.length)}
          >
            Next Slide
          </Button>
          <Button
            prominence="secondary"
            onClick={() =>
              setIndex((prev) => (prev === 0 ? children.length - 1 : prev - 1))
            }
          >
            Previous Slide
          </Button>
        </Stack>
        <div
          style={{
            position: "relative",
            width: "100%",
            height: 160,
            overflow: "hidden",
          }}
        >
          <Slide {...args} index={index} className="slide-story">
            {children}
          </Slide>
        </div>
      </Stack>
    );
  },
};
