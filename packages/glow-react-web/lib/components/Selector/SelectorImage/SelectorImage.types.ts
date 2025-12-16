import { ImageProps } from "foundations/Image";
import { SelectorPropsBase } from "components/Selector";
import { DefaultListProps } from "components/DefaultList";
import { PriceProps } from "components/Price";
import { BadgeProps } from "components/Badge";
import { TextLinkAsButton } from "components/TextLink";

/**
 * Props for the SelectorImage component.
 * @typedef {SelectorImageProps}
 * @extends {SelectorPropsBase}
 * @property {ImageProps} image - Image component props
 * @property {DefaultListProps} [list] - Should be a DefaultList props.
 * @property {PriceProps} [price] - Should be a Price props.
 * @property {BadgeProps} [badge] - Should be a Badge props.
 */
export type SelectorImageProps = SelectorPropsBase & {
  variant: "horizontal" | "vertical";
  description?: string;
  image: ImageProps;
  list?: DefaultListProps;
  price?: PriceProps;
  badge?: BadgeProps;
  secondaryAction?: TextLinkAsButton;
};
