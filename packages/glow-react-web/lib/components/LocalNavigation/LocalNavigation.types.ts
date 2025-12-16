import { OdidoPalette } from "_internals/Color";
import { IconNames } from "foundations/Icon";

export type ActionPosition = "right" | "left";

/**
 * @interface ActionProps
 * @property {string} title - Title of action.
 * @property {IconNames} icon - Icon of action.
 * @property {() => void} [onClick] - onClick callback for action.
 * @property {string} [href] - Href link only vailable for prominence 'default' or 'sublte'.
 */
export interface Action {
  title: string;
  icon: IconNames;
  href?: string;
  onClick?: () => void;
}

/**
 * @interface LocalNavigationProps
 * @property {Prominence} [prominence='default'] - Sets a color on the LocalNavigation.
 * @property {Variant} [variant='default'] - Sets a layout variation for the LocalNavigation.
 * @property {Action} [rightAction] - Right action of the LocalNavigation.
 * @property {Action} [leftAction] - Left action of the LocalNavigation.
 * @property {OdidoPalette} [palette='default'] - Set a palette color or gradient color depending on the configured prominence.
 */
export interface BaseLocalNavigationProps {
  title?: string;
  leftAction?: Action;
  prominence?: "default" | "subtle" | "emphasised";
  rightAction?: Action;
  titleSize?: "default" | "lg" | "sm";
  variant?: string;
  palette?: OdidoPalette;
}

export interface CompactLocalNavigationProps extends BaseLocalNavigationProps {
  variant: "default";
  paragraph?: string;
  paragraphClassName?: string;
}

export interface DefaultLocalNavigationProps extends BaseLocalNavigationProps {
  variant: "compact";
}

export type LocalNavigationProps =
  | CompactLocalNavigationProps
  | DefaultLocalNavigationProps;
