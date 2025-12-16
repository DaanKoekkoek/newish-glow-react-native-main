import { type AddonProps, type ImageProps } from "foundations/index";
import type React from "react";

import type { StatusProps } from "../Status";

/**
 * Represents the state of the summary list. Can be applied to both the <SummaryList.Item /> and the <SummaryList />
 * @type {"inactive" | "default"}
 */
export type SummaryListState = "inactive" | "default";

/**
 * Represents the SummaryListState context of the summary list.
 * @interface SummaryListContextProps
 */
export interface SummaryListContextProps {
  stateContext: SummaryListState;
}

/**
 * Represents the summary list image.
 * @interface SummaryListBaseImageProps
 * @extends ImageProps, Partial<Pick<ImageProps, "src" | "alt">>
 */
export interface SummaryListBaseImageProps
  extends Partial<Pick<ImageProps, "src" | "alt" | "localSrc">> {}

/**
 * Represents the summary list addon.
 * @interface SummaryListAddonProps
 * @extends AddonProps, Partial<Pick<AddonProps, "name">>
 */
export interface SummaryListAddonProps
  extends Partial<Pick<AddonProps, "name">> {}

/**
 * Represents the summary list addon and image props.
 * @interface SummaryListAddonProps
 * @extends SummaryListBaseImageProps, SummaryListAddonProps
 */
export interface SummaryListImageProps
  extends SummaryListBaseImageProps,
    SummaryListAddonProps {}

/**
 * Props for the Summary List.
 * @interface SummaryListProps
 * @property {React.ReactElement | React.ReactElement[]} [children] - Accepts <SummaryList.Item />
 * @property {SummaryListState} [state] - SummaryListState that is applied on every Summary List item.
 */
export interface SummaryListProps {
  children?: React.ReactElement | React.ReactElement[];
  state?: SummaryListState;
}

/**
 * Props for the Summary List item.
 * @interface SummaryListItemProps
 * @property {string} [heading] - Generates a heading
 * @property {SummaryListImageProps} [image] - Generates either an addon (when `name` is given) or an image (when `src` is given)
 * @property {string} [subheading] - Generates a subheading, rendered above the `heading`
 * @property {React.ReactElement} [price] - Accepts a `<SummaryList.Price />`, but overrules base styling tokens.
 * @property {SummaryListState} [state] -
 * @property {StatusProps} [status] - Accepts `StatusProps` values.
 * @property {React.ReactElement} [list] - Accepts a `<SummaryList.List />`, which then accepts `<SummaryList.List.Item />`, accepts `DefaultListProps` and `DefaultListItemProps`.
 * @property {string} [promotionText] - Generates a promotion text, rendered underneath the `heading`.
 * @property {string | React.ReactElement} [children] - Additional content, rendered at the bottom.
 * @property {React.ReactElement | React.ReactElement[]} [actions] - Accepts a `<SummaryList.NumberInput />`, `<SummaryList.ActionButton />` and/or `<SummaryList.Button>`, which then accepts `<SummaryList.Button.Icon />` Accepts all properties from the respective components, but overrules the base styling.
 */
export interface SummaryListItemProps {
  heading: string;
  image: SummaryListImageProps;
  subheading?: string;
  price?: React.ReactElement;
  state?: SummaryListState;
  status?: StatusProps;
  list?: React.ReactElement;
  promotionText?: string;
  children?: string | React.ReactElement;
  actions?: React.ReactElement | React.ReactElement[];
}
