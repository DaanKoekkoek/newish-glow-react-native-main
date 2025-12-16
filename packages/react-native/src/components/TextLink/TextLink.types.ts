import type { CommonPalette } from "_theming/tokenLoader";
import type React from "react";
import type {
  GestureResponderEvent,
  PressableProps,
  StyleProp,
  TextStyle,
} from "react-native";

/**
 * Represents the state of the TextLink.
 * @type {"default" | "visited"}
 */
export type TextLinkState = "default" | "visited";

/**
 * Represents the size of the TextLink.
 * @type {"xs" | "sm" | "default" | "lg"}
 */
export type TextLinkSize = "xs" | "sm" | "default" | "lg";

/**
 * Represents the behavior of the TextLink.
 * @type {"blank" | "self"}
 */
export type LinkTarget = "blank" | "self";

/**
 * Represents the combination of both PressableProps and TextProps.
 * @type {LinkProps}
 * @property {string} [href] - The href of the link
 * @property {string} [target] - The link behavior
 */
export type LinkProps = {
  href?: string;
  target?: string;
};

/**
 * Represents the allowed children of the TextLink.
 * @type {React.ReactElement | string}
 */
export type AllowedInTextLink = React.ReactElement | string;

/**
 * Props for the TextLink.
 * @interface InputFieldProps
 * @property {string} - The TextLink url
 * @property {Text | Icon | Text[] | Icon[] | Array<Text | Icon>} [Content] - Content intended render Text and/or Icon. Can only accept multiple Text and/or Icon
 * @property {LinkTarget} [target='self'] - The TextLink behavior when navigating towards the given url. When set to 'self', the url will be passed as an Expo Link
 * @property {boolean} [inverted={false}] - Sets the style of TextLink into inverted. Intended for darker backgrounds only
 * @property {TextLinkSize} [size='md'] - The TextLink size
 * @property {TextLinkState} [state='default'] - The TextLink state
 * @property {(e: GestureResponderEvent) => void} [onPress] - Adds an onPress event on the Pressable wrapper to override the default behavior.
 * @property {StyleProp<PressableStyle>} [style] - Applies additional styling to the TextLink.
 * @property {boolean} [disabled] - Whether the TextLink is disabled or not
 * @property {StyleProp<TextStyle>} [textStyle] - Applies additional styling to the <Text /> within the TextLink.
 */
export interface TextLinkProps
  extends Omit<PressableProps, "onHoverIn" | "onHoverOut"> {
  children: AllowedInTextLink | AllowedInTextLink[];
  href?: string;
  target?: LinkTarget;
  inverted?: boolean;
  size?: TextLinkSize;
  state?: TextLinkState;
  onPress?: (event: GestureResponderEvent) => void;
  onHoverIn?: (hovered?: boolean) => void;
  onHoverOut?: (hovered?: boolean) => void;
  textStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
  style?: StyleProp<TextStyle>;
  palette?: CommonPalette;
}
