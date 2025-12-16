import type { Meta, StoryObj } from "@storybook/react";
import {
  createComplexControl,
  type ComplexOption,
} from "@storybook/utils/complexOptions";

import { Image } from "./Image";
import type { ImageProps } from "./Image.types";
import { ratios } from "./Image.constants";
import IMAGES from "./Image.mock";
import { Badge } from "components/Badge";
import { Paragraph, Stack } from "foundations/index";

const srcOptions: ComplexOption<ImageProps["localSrc"]>[] = [
  {
    label: "illustration",
    value: IMAGES["illustration"],
  },
  {
    label: "phone",
    value: IMAGES["phone"],
  },
  {
    label: "background",
    value: IMAGES["mid-hero"],
  },
];

const ratioOptions: ComplexOption<ImageProps["ratio"]>[] = [
  ...ratios.map((v) => ({
    label: v,
    value: v,
  })),
  {
    label: "ratio 1/1 (mobile-small), ratio 3/1 (tablet)",
    value: {
      mobileSmall: "1/1",
      tablet: "3/1",
    },
  },
];

const meta: Meta<typeof Image> = {
  title: "DesignSystem/Foundations/Assets/Image",
  component: Image,
  argTypes: {
    localSrc: {
      ...createComplexControl(srcOptions, "radio"),
      description:
        "Pass a locally imported image (e.g. `import img from './file.jpg'`).",
    },
    src: {
      description:
        "Pass a remote image URL (e.g. `'https://example.com/image.jpg'`).",
    },
    renderType: {
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
    children: {
      description:
        "Optional React nodes to render on top of the image (only applies in `'background'` mode).",
      table: {
        disable: true,
      },
    },
    ratio: {
      ...createComplexControl(ratioOptions),
      description:
        "Aspect ratio of the image container, applied via CSS classes (e.g. `'16/9'`, `'4/3'`, `'1/1'`). Default is `'16/9'`. Can be set per breakpoint.",
    },
    sources: {
      description:
        "An array of objects, each defining an image source and its associated breakpoint. The browser will choose the most appropriate image based on the screen size or resolution. Each object in the array should include a `src` (image URL) and a `breakpoint` (key from the `breakpoints` object). This only applies in `type='foreground'` mode.",
    },
  },
  args: {
    localSrc: IMAGES["stock-photo"],
    children: (
      <div style={{ padding: 16 }}>
        <Badge text="Badge text" />
      </div>
    ),
    alt: "Alt text",
  },
  render: (args) => {
    return (
      <div
        data-demo="div"
        style={{
          width: "min(600px, 90%)",
          height: "min-content",
          border: "1px solid #000",
        }}
      >
        <Image {...args} />
      </div>
    );
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const Foreground: Story = {
  args: {
    renderType: "foreground",
  },
};

export const WithSources: Story = {
  args: {
    renderType: "foreground",
    localSrc: undefined,
    sources: [
      { src: IMAGES["illustration"], breakpoint: "mobile" },
      { src: IMAGES["responsive-w640"], breakpoint: "laptop" },
      { src: IMAGES["responsive-w1200"] },
    ],
  },
};

export const WithLazyLoading: Story = {
  args: {
    loading: { type: "lazy" },
  },
  render: (args) => {
    return (
      <div style={{ minHeight: "200vh" }}>
        <Stack gap="lg">
          <Paragraph>Open network tab and scroll down</Paragraph>
          <Image
            {...args}
            src="https://placehold.co/600x400"
            localSrc={undefined}
          />
          <Image
            {...args}
            src="https://placehold.co/600x400"
            localSrc={undefined}
          />
          <Image
            {...args}
            src="https://placehold.co/600x400"
            localSrc={undefined}
          />
          <Image {...args} localSrc={IMAGES["illustration"]} />
          <Image
            {...args}
            src="https://placehold.co/600x400"
            localSrc={undefined}
          />
          <Image
            {...args}
            src="https://placehold.co/600x400"
            localSrc={undefined}
          />
          <Image
            {...args}
            src="https://placehold.co/600x400"
            localSrc={undefined}
          />
          <Image {...args} localSrc={IMAGES["responsive-w640"]} />
          <Image
            {...args}
            src="https://placehold.co/600x400"
            localSrc={undefined}
          />
          <Image
            {...args}
            src="https://placehold.co/600x400"
            localSrc={undefined}
          />
          <Image
            {...args}
            src="https://placehold.co/600x400"
            localSrc={undefined}
          />
          <Image {...args} localSrc={IMAGES["responsive-w1200"]} />
        </Stack>
      </div>
    );
  },
};

export const WithIllustration: Story = {
  args: {
    localSrc: IMAGES.illustration,
    renderType: "background",
    position: "center",
    resizeMode: "contain",
    ratio: "16/9",
    children: (
      <div style={{ padding: 16 }}>
        <Badge text="Badge text" />
      </div>
    ),
    alt: "Alt text",
  },
  render: (args) => {
    return (
      <div
        style={{
          border: "1px solid #000",
        }}
      >
        <Image {...args} />
      </div>
    );
  },
};
