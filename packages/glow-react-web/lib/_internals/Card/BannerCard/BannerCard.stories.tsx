import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { BannerCard } from "./BannerCard";
import { OdidoPalette } from "_internals/Color";
import {
  ComplexOption,
  createComplexControl,
} from "@storybook/utils/complexOptions";
import type { BannerCardProps } from "./BannerCard.types";
import IMAGES from "foundations/Image/Image.mock";

const imageOptions: ComplexOption<BannerCardProps["image"]>[] = [
  {
    label: "Image (ratio - 2/1, resizeMode - contain)",
    value: {
      localSrc: IMAGES["stock-photo"],
      alt: "Alt text",
      ratio: "2/1",
      resizeMode: "contain",
    },
  },
  {
    label: "Illustration",
    value: {
      localSrc: IMAGES["illustration"],
      alt: "Alt text",
    },
  },
];

const directionOptions: ComplexOption<BannerCardProps["direction"]>[] = [
  {
    label: "Vertical",
    value: "vertical",
  },
  {
    label: "Horizontal",
    value: "horizontal",
  },
  {
    label: "Vertical (mobile-small), horizontal (tablet)",
    value: {
      mobileSmall: "vertical",
      tablet: "horizontal",
    },
  },
];

const callToActionOptions: ComplexOption<BannerCardProps["callToAction"]>[] = [
  {
    label: "Button",
    value: {
      onClick: action("bannerCard.button.onClick"),
      title: "button",
    },
  },
  {
    label: "None",
    value: undefined,
  },
];

const meta: Meta<typeof BannerCard> = {
  title: "DesignSystem/_internals/Card/BannerCard",
  component: BannerCard,
  argTypes: {
    animated: {
      control: { type: "boolean" },
    },
    palette: {
      options: [...OdidoPalette],
      control: { type: "select" },
    },
    variant: {
      options: ["default", "emphasised"],
      control: { type: "select" },
    },
    direction: {
      ...createComplexControl(directionOptions),
    },
    image: {
      ...createComplexControl(imageOptions),
      description: "Displays an illustration ",
    },
    callToAction: {
      ...createComplexControl(callToActionOptions),
      description: "Renders ReactElement. Should be a Button",
    },
  },
  args: {
    variant: "default",
    palette: "default",
    direction: directionOptions[0].value,
    title: "Title [highlight]",
    children: "Paragraph",
    image: imageOptions[1].value,
    callToAction: callToActionOptions[0].value,
  },
  parameters: {
    controls: {
      exclude: ["button", "children"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
