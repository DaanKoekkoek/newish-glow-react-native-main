import { IconNames, type AddonProps, type ImageProps } from "foundations/index";
import type React from "react";

import type {
  DefaultListProps,
  PriceProps,
  StatusProps,
} from "components/index";
import { NumberInputProps } from "components/NumberInput";

/**
 * Represents the state of the summary list and summary list item.
 * @type {"inactive" | "default"}
 */
export type SummaryListState = "inactive" | "default";

/**
 * Represents the summary list image.
 * @interface SummaryListBaseImageProps
 * @extends {ImageProps, Partial<Pick<ImageProps, "src" | "alt">>}
 */
export interface SummaryListBaseImageProps
  extends Partial<Pick<ImageProps, "src" | "alt" | "localSrc">> {}

/**
 * Represents the summary list addon.
 * @interface SummaryListAddonProps
 * @extends {AddonProps, Partial<Pick<AddonProps, "name">>}
 */
export interface SummaryListAddonProps
  extends Partial<Pick<AddonProps, "name">> {}

/**
 * Represents the summary list addon and image props.
 * @interface SummaryListAddonProps
 * @extends {SummaryListBaseImageProps, SummaryListAddonProps}
 */
export interface SummaryListImageProps
  extends SummaryListBaseImageProps,
    SummaryListAddonProps {}

/**
 * Props for the Summary List.
 * @interface SummaryListProps
 * @property {string} [testID="summary-list"] - Adds a testID to the ul of the summarylist.
 * @property {React.ReactElement | React.ReactElement[]} [children] - Accepts <SummaryListItem />.
 * @property {SummaryListState} [state='default'] - `SummaryListState` that is applied on every summary list item.
 */
export interface SummaryListProps {
  testID?: string;
  children?: React.ReactElement | React.ReactElement[];
  state?: SummaryListState;
  endsWithDivider?: boolean;
}

/**
 * Props for the Summary List item.
 * @type {SummaryListItemProps}
 * @property {string} [heading] - Generates a heading
 * @property {SummaryListImageProps} [image] - Generates either an addon (when `name` is given) or an image (when `src` is given)
 * @property {string} [subheading] - Generates a subheading, rendered above the `heading`.
 * @property {React.ReactElement} [price] - Accepts a `PriceProps` values.
 * @property {SummaryListState} [state] - Set the state of a single summary list item.
 * @property {StatusProps} [status] - Accepts `StatusProps` values.
 * @property {React.ReactElement} [list] - Accepts `DefaultListProps` values.
 * @property {string} [promotionText] - Generates a promotion text, rendered underneath the `heading`.
 * @property {string | React.ReactElement} [children] - Additional content, rendered at the bottom.
 * @property {React.ReactElement | React.ReactElement[]} [actions] - Accepts a `<SummaryListAction />` component.
 * @property {string} [testID='summary-list-content'] - Adds a testID to the content container.
 * @property {string} [className] - Apply additional classNames into the content container.
 */
export type SummaryListItemProps = {
  heading: string;
  image: SummaryListImageProps;
  subheading?: string;
  price?: Omit<PriceProps, "size">;
  state?: SummaryListState;
  status?: StatusProps;
  list?: Omit<DefaultListProps, "size">;
  promotionText?: string;
  children?: string | React.ReactElement;
  actions?: React.ReactElement | React.ReactElement[];
  testID?: string;
  className?: string;
  supportText?: string;
};

/**
 * Props for the Summary List Action.
 * @type SummaryListActionProps
 * @property {React.MouseEventHandler<HTMLButtonElement>}[onClick=() => {}] - onClick callback. Only applicable for the `<Button />` and `<ActionButtonIcon />` variants.
 * @property {(amount?: number) => void} [onChange] - onClick callback. Only applicable for the `<NumberInput />` variant.
 * @property {IconNames} [icon] - Adds an icon to the action. Only applicable for the `<Button />` and `<ActionButtonIcon />` variants.
 * @property {React.ReactNode} [children] - Optional children text rendered within the action.
 */
export type SummaryListActionProps = {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  numberInput?: NumberInputProps;
  icon?: IconNames;
  children?: React.ReactNode;
};
