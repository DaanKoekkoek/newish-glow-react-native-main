import type { Meta, StoryObj } from "@storybook/react";

import { Visual } from "./Visual";
import type { VisualFill } from "./Visual.types";
import IMAGES from "foundations/Image/Image.mock";
import { ratios } from "foundations/Image/Image.constants";
import { PhoneBrand } from "foundations/PhoneBrand";
import {
  createComplexControl,
  type ComplexOption,
} from "@storybook/utils/complexOptions";

const paletteOptions = [
  {
    label: "Default",
    value: { palette: "default" },
  },
  {
    label: "Red",
    value: { palette: "red" },
  },
];

const fillOptions: ComplexOption<VisualFill>[] = [
  { label: "No fill", value: [] },
  { label: "Fill height", value: ["height"] },
  { label: "Fill width", value: ["width"] },
  { label: "Fill width and height", value: ["width", "height"] },
];

const meta: Meta<typeof Visual> = {
  title: "DesignSystem/_Internals/Assets/Visual",
  component: Visual,
  argTypes: {
    localSrc: {
      description:
        "Pass a locally imported image (e.g. `import img from './file.jpg'`).",
    },
    src: {
      description:
        "Pass a remote image URL (e.g. `'https://example.com/image.jpg'`).",
    },
    type: {
      description:
        "Determines the image rendering mode: `'background'` renders the image as a CSS background (default), while any other value renders a standard `<img>` tag.",
    },
    resizeMode: {
      description:
        "Specifies how the image should be resized when using background mode. Maps to CSS `background-size` (e.g. `'cover'`, `'contain'`). Default is `'cover'`.",
    },
    className: {
      description:
        "Optional class name(s) to apply to the outer container for custom styling.",
    },
    visualRatio: {
      description:
        "Defines the size of the content by removing the `padding-inline` if set to `fixed`.",
    },
    ratio: {
      options: [...ratios],
      control: { type: "select" },
      description:
        "Aspect ratio of the image container, applied via CSS classes (e.g. `'16/9'`, `'4/3'`, `'1/1'`). Default is `'16/9'`. Can be set per breakpoint.",
    },
    sources: {
      description:
        "An array of objects, each defining an image source and its associated breakpoint. The browser will choose the most appropriate image based on the screen size or resolution. Each object in the array should include a `src` (image URL) and a `breakpoint` (key from the `breakpoints` object). This only applies in `type='foreground'` mode.",
    },
    noPadding: {
      options: [undefined, "all", "top", "right", "bottom", "left"],
    },
    fill: createComplexControl(fillOptions),
    palette: createComplexControl(paletteOptions),
  },
  args: {
    localSrc: IMAGES["stock-photo"],
    alt: "Alt text",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

const imageProps = ["localSrc", "src", "alt", "loading", "ratio", "resizeMode"];

export const Basic: Story = {
  parameters: {
    controls: {
      include: [...imageProps, "fill", "visualRatio", "noPadding"],
    },
  },
};

export const Illustration: Story = {
  parameters: {
    controls: {
      include: [
        ...imageProps,
        "fill",
        "visualRatio",
        "noPadding",
        "glow",
        "background",
        "palette",
      ],
    },
  },
};

export const Content: Story = {
  parameters: {
    controls: {
      include: [
        "children",
        "noPadding",
        "fill",
        "glow",
        "background",
        "palette",
      ],
    },
  },
  args: {
    type: "content",
    children: <PhoneBrand brand="Alcatel" key="phone-brand" />,
  },
  decorators: [
    (Story, args) => {
      return (
        <div style={{ minHeight: 500 }}>
          <Story {...args} />
        </div>
      );
    },
  ],
};
