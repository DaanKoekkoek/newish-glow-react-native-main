import type { OdidoPalette } from "_theming/tokenLoader";
import type { IconNames } from "foundations/Icon";
import { type ImageProps, type Paragraph } from "foundations/index";
import type React from "react";

/**
 * Props interface for the SubscriptionHero component.
 * @interface SubscriptionHeroProps
 * @property {string} [title] - Title text.
 * @property {React.ReactElement | React.ReactElement[]} [actions] - Action button group.
 * @property {ImageProps} [image] - Image.
 * @property {string} [titlesecondary] - Secondary title text.
 * @property {React.ReactElement | React.ReactElement[]} [list] - List.
 * @property {Palette} [palette] - Color palette.
 */
export interface SubscriptionHeroProps {
  title: string;
  actions: React.ReactElement | React.ReactElement[];
  image?: ImageProps;
  titleSecondary?: string;
  list?: React.ReactElement | React.ReactElement[];
  palette?: OdidoPalette;
}

/**
 * Props interface for the SubscriptionHero's list item component.
 * @interface SubscriptionHeroProps
 * @property {React.ReactNode} [children] - The text content of the list item
 * @property {IconNames} [icon] - The icon placed before the text content.
 */
export interface HeroListItemProps {
  children:
    | string
    | React.ReactElement<typeof Text>
    | React.ReactElement<typeof Paragraph>;
  icon?: IconNames;
}

/**
 * Props interface for the SubscriptionHero's action button component.
 * @interface HeroActionProps
 * @property {() => void} [onPress] - onPress callback after clicking an action button.
 * @property {children} [children] - The label placed underneath the action button.
 * @property {IconNames} [icon] - The icon placed within the action button.
 */
export interface HeroActionProps {
  onPress: () => void;
  children?: string;
  icon: IconNames;
}

/**
 * Props for the subscription hero context provider
 * @interface SubscriptionHeroInfoType
 * @property {Palette} [colorPalette] - Current color palette, passed into the context provider.
 */
export type SubscriptionHeroInfoType = {
  colorPalette: OdidoPalette;
};
