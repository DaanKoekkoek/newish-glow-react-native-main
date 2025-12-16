import type { AttentionProps } from "_internals/Attention";
import type { OdidoPalette } from "_theming/index";
import type { IconNames } from "foundations/Icon";
import type { Paragraph } from "foundations/Paragraph";
import type { GestureResponderEvent } from "react-native";

import type { Button } from "../Button";
import type { Price } from "../Price";
import type { Toggle } from "../Toggle";

/**
 * Represents the background color of the List.
 * @type {"default" | "subtle" | "none"}
 */
export type ListBackground = "default" | "subtle" | "none";

/**
 * Props for the list context provider.
 * @interface ListContextProps
 * @property {ListBackground} [background] - Background color style of the list
 */
export interface ListContextProps {
  background: ListBackground;
}

/**
 * List component that acts as a container for List.Item components. It supports a configurable background.
 * @interface ListProps
 * @property {ListBackground} [background='default'] - Specifies the background styling of the list.
 * @property {React.ReactElement | React.ReactElement[]} [children] - List.Item components to be rendered within the list.
 * @property {string | undefined} [testID] - Used to locate this view in end-to-end tests.
 * @property {Palette} [palette] - colour palette for the List component
 */
export interface ListProps {
  background?: ListBackground;
  children?: React.ReactElement | React.ReactElement[];
  testID?: string | undefined;
  palette?: OdidoPalette;
}
/**
 * Base properties shared by all List.Item variants. Includes common properties
 * like `icon`, `title`, and `description`, as well as variant-specific configurations
 * through the `variant` prop.
 * @interface BaseListItemProps
 * @property {string} [title] - Title text of the list item.
 * @property {IconNames} [icon] - Optional icon to display alongside the lsist item content.
 * @property {string} [description1] - Primary description text.
 * @property {string} [description2] - Secondary description text.
 * @property {string} [detail] - Detail text shown next to the `clickIndicator`.
 * @property {number} [notification] - The notification count shown next to the `clickIndicator`.
 * @property {AttentionProps} [attention] - Attention text
 * @property {IconNames} [clickIndicator] - Optional icon to indicate that the list item is clickable.
 */
export interface BaseListItemProps {
  title: string;
  icon?: IconNames;
  description1?: string;
  description2?: string;
  detail?: string;
  notification?: number;
  attention?: AttentionProps;
  clickIndicator?: IconNames;
  clickable?: boolean;
  Wrapper?: React.ComponentType | React.ElementType;
  wrapperProps?: Record<string, unknown>;
}

/**
 * Properties for a List.Item that includes an `onPress` callback, typically making it interactive.
 * Limited to "default" and "price" variants. The `action` prop, if provided, must be a Paragraph component.
 * @interface ListItemWithOnPressProps
 * @extends BaseListItemProps
 * @property {("default" | "price")} variant - Confines the variant to either default or price for interactive list items.
 * @property {(event: GestureResponderEvent) => void} onPress - Callback function invoked when the list item is pressed.
 * @property {React.ReactElement<typeof Paragraph | typeof Button | typeof Toggle | typeof Price>} [action] - Optional Paragraph component to be used as the action element.
 */
interface ListItemWithOnPressProps
  extends Omit<BaseListItemProps, "variant" | "action"> {
  onPress: (event?: GestureResponderEvent) => void;
  action?: React.ReactElement<
    typeof Paragraph | typeof Button | typeof Toggle | typeof Price
  >;
}

/**
 * Properties for a List.Item that does not include an `onPress` callback.
 * Allows for a wider range of variants and the `action` prop can include a Button component.
 *
 * @interface ListItemWithoutOnPressProps
 * @extends BaseListItemProps
 * @prop {never} [onPress] - Ensures that onPress is not provided for this variant of list item.
 * @prop {never} [clickIndicator] - Optionally ensures that clickIndicator is not used here.
 * @prop {React.ReactElement<typeof Button> | React.ReactElement<typeof Button>} [action] - Optional Button component(s) to be used as the action element.
 */
interface ListItemWithoutOnPressProps extends BaseListItemProps {
  onPress?: never;
  clickIndicator?: never;
  action?:
    | React.ReactElement<
        typeof Paragraph | typeof Button | typeof Toggle | typeof Price
      >
    | React.ReactElement<
        typeof Paragraph | typeof Button | typeof Toggle | typeof Price
      >; // TODO Allow toggle
}

/**
 * Composite type for all possible props for a List.Item component, encompassing both
 * interactive and static variants. Usage depends on the presence of an `onPress` callback
 * and the chosen `variant`.
 *
 * @type ListItemProps
 */
export type ListItemProps =
  | ListItemWithOnPressProps
  | ListItemWithoutOnPressProps;
