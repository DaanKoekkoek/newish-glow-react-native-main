import type { AddonProps } from "foundations/Addon/Addon.types";
import type { IconProps } from "foundations/Icon";

import type { PriceProps } from "../Price";

export type AddOnCardButtonIcon = Pick<IconProps, "name" | "solid">;
export type AddOnCardButton = {
  text?: string;
  icon?: AddOnCardButtonIcon;
};

/**
 * Represents the props for the AddOnCard component.
 * @interface AddOnCardProps
 * @property {() => void} onPress - The function to call when the AddOnCard is pressed.
 * @property {string} title - The title of the AddOnCard.
 * @property {string} [description] - The description of the AddOnCard.
 * @property {string} [promotion] - The promotion text of the AddOnCard.
 * @property {string} [button] - The button of the AddOnCard, which can have a selected and a unselected variant. It has a default.
 * @property {string} [highlight] - The highlight text of the AddOnCard.
 * @property {boolean} [applyHighlightOffset] - Indicates whether to apply a highlight offset,
 * this is the case when one of the siblings in the same row of a grid has a highlight.
 * @property {AddonProps["name"]} [visualVariant] - The visual variant of the AddOnCard.
 * @property {typeof Price} [price] - The price props for rendering the price component.
 * @property {"vertical" | "horizontal"} [direction] - The direction of the AddOnCard layout.
 * @property {boolean} [selected] - Indicates whether the AddOnCard is selected.
 * @property {"default" | "inactive"} state - The state of the AddOnCard.
 */

export interface AddOnCardProps {
  id: string;
  onPress: (id: string) => void;
  title: string;
  description?: string;
  promotion?: string;
  button?: {
    selected?: AddOnCardButton;
    unselected?: AddOnCardButton;
  };
  highlight?: string;
  applyHighlightOffset?: boolean;
  addon: AddonProps["name"];
  price?: PriceProps;
  direction?: "vertical" | "horizontal";
  selected?: boolean;
  state: "default" | "inactive";
}
