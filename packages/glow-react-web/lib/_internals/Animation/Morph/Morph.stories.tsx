import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { MORPH_PRESETS } from "../Animation.configuration";
import { Morph, type SupportedMorphShapes } from "./index";
import { Stack } from "foundations/Stack";
import { Button } from "components/Button";
import { Slider } from "components/Slider";
import { Paragraph } from "foundations/Paragraph";

const meta: Meta<typeof Morph> = {
  title: "DesignSystem/_internals/Animation/Morph",
  component: Morph,
  argTypes: {
    size: {
      control: "number",
      description: "Size of the SVG container (width and height)",
      defaultValue: 120,
    },
    ratio: {
      control: { type: "range", min: 0, max: 1, step: 0.01 },
      description: "Position between start → middle → end morph",
    },
    edgeThreshold: {
      control: "number",
      description:
        "Threshold near edges at which to use start or end shapes instead of middle",
    },
    startShape: {
      control: "select",
      options: [
        "circle",
        "square",
        "triangle",
        "none",
      ] as SupportedMorphShapes[],
      description: "Shape used when ratio is at the start edge",
    },
    middleShape: {
      control: "select",
      options: [
        "circle",
        "square",
        "triangle",
        "none",
      ] as SupportedMorphShapes[],
      description: "Shape used for the middle of the ratio range",
    },
    endShape: {
      control: "select",
      options: [
        "circle",
        "square",
        "triangle",
        "none",
      ] as SupportedMorphShapes[],
      description: "Shape used when ratio is at the end edge",
    },
    preset: {
      control: "select",
      options: Object.keys(MORPH_PRESETS),
      description: "Animation spring preset",
    },
    className: {
      control: "text",
      description: "Optional class name applied to the SVG element",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Morph>;

export const Default: Story = {
  args: {
    size: 120,
    ratio: 0,
    startShape: "square",
    middleShape: "circle",
    endShape: "triangle",
    preset: "medium",
  },
  render: (args) => {
    const [ratio, setRatio] = useState(args.ratio);

    return (
      <Stack>
        <Paragraph>Move the slider to morph between shapes:</Paragraph>
        <Slider
          minValue={0}
          maxValue={100}
          value={ratio * 100}
          onValueChange={(v) => setRatio(v / 100)}
        />
        <Morph {...args} ratio={ratio} />
      </Stack>
    );
  },
};

export const NoneTransitions: Story = {
  args: {
    size: 120,
    ratio: 0,
    startShape: "none",
    middleShape: "circle",
    endShape: "none",
    preset: "gentle",
  },
  render: (args) => {
    const [ratio, setRatio] = useState(0);

    return (
      <Stack>
        <Paragraph>`none` → circle → `none` transition</Paragraph>
        <Slider
          minValue={0}
          maxValue={100}
          value={ratio * 100}
          onValueChange={(v) => setRatio(v / 100)}
        />
        <Morph {...args} ratio={ratio} />
      </Stack>
    );
  },
};

export const ToggleShapes: Story = {
  args: {
    size: 120,
    ratio: 0,
    startShape: "square",
    middleShape: "circle",
    endShape: "triangle",
    preset: "medium",
  },
  render: (args) => {
    const [ratio, setRatio] = useState(0);

    return (
      <Stack>
        <Button onClick={() => setRatio((p) => (p === 1 ? 0 : 1))}>
          Toggle Morph
        </Button>
        <Morph {...args} ratio={ratio} />
      </Stack>
    );
  },
};
