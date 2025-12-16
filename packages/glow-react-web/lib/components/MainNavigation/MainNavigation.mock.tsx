import { action } from "@storybook/addon-actions";
import IMAGES from "foundations/Image/Image.mock";
import type {
  MainNavigationTree,
  MainNavigationLink,
} from "./MainNavigation.types";
import glowVideo from "../../../__mocks__/videos/logo-glow.mp4";
import { OdidoPalette } from "_internals/Color";

type PromotionType = NonNullable<MainNavigationTree["promotions"]>[number];

const leafItem = (
  label: string,
  href?: string,
  onClick?: () => void,
): MainNavigationLink => ({
  label,
  href,
  onClick,
});

const nestedItem = (
  label: string,
  sublinks: MainNavigationLink[],
  href?: string,
): MainNavigationLink => ({
  label,
  sublinks,
  href,
});

const promotion = (
  title: string,
  children?: string,
  palette?: OdidoPalette,
): PromotionType => ({
  title,
  children: children,
  callToAction: {
    ["aria-label"]: title,
    onClick: action("promotion.callToAction.onClick"),
  },
  image: {
    src: IMAGES["illustration2"],
    alt: `${title} image`,
  },
  ...(palette ? { palette } : {}),
});

const branch = (
  id: number,
  label: string,
  links: MainNavigationLink[],
  promotions?: MainNavigationTree["promotions"],
  href?: string,
): MainNavigationTree => ({
  id,
  label,
  links,
  promotions,
  href,
});

const VIDEOS: {
  glow: string;
} = {
  glow: glowVideo,
};

export default {
  VIDEOS,
  leafItem,
  nestedItem,
  promotion,
  branch,
};
