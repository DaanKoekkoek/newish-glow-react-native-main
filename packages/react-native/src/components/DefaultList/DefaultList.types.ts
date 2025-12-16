import type { OdidoPalette } from "_theming/tokenLoader";
import type { IconNames } from "foundations/Icon";
import type { Paragraph } from "foundations/Paragraph";

/**
 * Represents the variant of the Default list.
 * @type {"icon" | "iconColored" | "numbered" | "bullet"}
 */
export type DefaultListVariant = "icon" | "iconColored" | "numbered" | "bullet";

/**
 * Represents the text size of the Default list.
 * @type {"icon" | "iconColored" | "numbered" | "bullet"}
 */
export type DefaultListSize = "default" | "sm";

/**
 * Represents the text color of the Default list.
 * @type {"default" | "inverted"}
 */
export type DefaultListColor = "default" | "inverted";

/**
 * Props interface for the FeatureCard component.
 * @interface FeatureCardProps
 * @property {DefaultListVariant} [variant='bullet'] - Defines the style of the list. Options are `icon`, `iconColored`, `numbered`, and `bullet`.
 * @property {DefaultListSize} [size='default'] - Size of the list items. Available options are 'default' and 'sm'.
 * @property {DefaultListColor} [color='default'] - Color scheme of the list. Options are 'default' for standard coloring or 'inverted' for an inverted color scheme.
 * @property {React.ReactElement<typeof DefaultListItem> | React.ReactElement<typeof DefaultListItem>[]} [children] -
 * @property {string | undefined} [testID] - Used to locate this view in end-to-end tests.
 * @property {OdidoPalette} [palette] - Palette color
 */
export interface DefaultListProps {
  variant?: DefaultListVariant;
  size?: DefaultListSize;
  color?: DefaultListColor;
  children?:
    | React.ReactElement<DefaultListItemProps>
    | React.ReactElement<DefaultListItemProps>[];
  inactive?: boolean;
  testID?: string | undefined;
  palette?: OdidoPalette;
}

/**
 * DefaultListItem component for displaying an individual item within a DefaultList.
 * Items can optionally include an icon and support custom content including strings and React components.
 * @interface DefaultListItemProps
 * @extends Defaultlist
 * @property {IconNames} [icon] - The name of the icon to display next to the list item content. Refer to the Icons enumeration for possible values.
 * @property {(string | React.ReactElement<typeof Text> | React.ReactElement<typeof Paragraph>)} [children] - The content of the list item. Can be a simple string or React components for more complex layouts.
 * @property {number} [index] - Index of the default list item
 */
export interface DefaultListItemProps
  extends Omit<DefaultListProps, "children"> {
  index?: number;
  icon?: IconNames;
  children?:
    | string
    | React.ReactElement<typeof Text>
    | React.ReactElement<typeof Paragraph>;
}
