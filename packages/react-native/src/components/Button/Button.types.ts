import type { CommonPalette } from "_theming/tokenLoader";
import type { IconProps } from "foundations/Icon";
import type { ViewStyle, StyleProp, GestureResponderEvent } from "react-native";

type InternalProminence = ButtonProminence | "inactive";

/**
 * Represents the prominence styling options of the button.
 * @type {"default" | "emphasised" | "secondary"}
 */
export type ButtonProminence = "default" | "emphasised" | "secondary";

/**
 * Represents the prominence styling options of the button.
 * @interface ColorDetails
 * @property {string} [default] - Default (Inverted | Emphasised) color value.
 * @property {string} [hover] - Hover (Inverted | Emphasised) color value.
 * @property {string} [pressed] - Pressed (Inverted | Emphasised) color value.
 */
export interface ColorDetails {
  default: string;
  hover: string;
  pressed: string;
}

/**
 * Inner token structure for the button.
 * @interface ColorVariant
 * @property {string} [default] - Default color value.
 * @property {string} [hover] - Hover color value.
 * @property {string} [pressed] - Pressed color value.
 * @property {string} [loading] - Loading color value.
 * @property {ColorDetails | string} [inverted] - Inverted color value(s).
 * @property {ColorDetails | string} [emphasised] - Emphasised color value(s).
 * @property {string} [inactive] - Inactive color values.
 */
export interface ColorVariant {
  default: string;
  hover?: string;
  pressed?: string;
  loading?: string;
  inverted?: ColorDetails | string;
  emphasised?: ColorDetails | string;
  inactive?: string;
}

/**
 * Inner token structure for the button.
 * @interface ButtonColorProfile
 * @property {Record<InternalProminence, ColorVariant>} - Background styling for the button.
 * @property {Record<InternalProminence, ColorVariant>} - Border styling for the button.
 * @property {Record<InternalProminence, ColorVariant>} - Icon styling for the Button.Icon.
 * @property {Record<InternalProminence, ColorVariant>} - Text styling for the button.
 */
export interface ButtonColorProfile {
  background: Record<InternalProminence, ColorVariant>;
  border: Record<InternalProminence, ColorVariant>;
  icon: Record<InternalProminence, ColorVariant>;
  text: Record<InternalProminence, ColorVariant>;
}

/**
 * Token structure for the button.
 * @interface ButtonTheme
 * @property {ButtonColorProfile} - Color tokens for button.
 */
export interface ButtonTheme {
  color: ButtonColorProfile;
}

/**
 * Styling for button (can only contain ViewStyle properties).
 * @interface ButtonStyle
 * @property {string} [borderColor] - Border color of button.
 * @property {number} [borderWidth] - Border width of button.
 * @property {number} [paddingHorizontal] - Horizontal padding of button.
 * @property {number} [paddingVertical] - Vertical padding of button.
 */
export interface ButtonStyle {
  borderColor?: string;
  borderWidth?: number;
  paddingHorizontal?: number;
  paddingVertical?: number;
}

/**
 * Represents the different sizes of the button.
 * @type {"default" | "sm" | "lg"}
 */
export type ButtonSize = "default" | "sm" | "lg";

/**
 * Represents the different states of the button.
 * @type {"loading" | "disabled" | "hover" | "pressed"}
 */
export type ButtonState =
  | "loading"
  | "disabled"
  | "hover"
  | "pressed"
  | undefined;

/**
 * Represents the pointer event type of the button.
 * @type {"box-none" | "none" | "box-only" | "auto"}
 */
export type ButtonPointerEvents = "box-none" | "none" | "box-only" | "auto";

/**
 * Props for the Button component.
 * @interface BaseButtonProps
 * @property {(event: GestureResponderEvent) => void} [onPress] - Callback function to be called when the button is pressed.
 * @property {ButtonProminence} [prominence] - Pass the prominence of the button.
 * @property {sizeType} [size] - The size of the button.
 * @property {state} [state] - The state of the button.
 * @property {boolean} [inverted] - Whether the button should be visible on dark backgrounds
 * @property {boolean} [fill] - Whether the button should fill up all available state inside a flex row
 * @property {boolean} [stretched] - Whether the button's functionality should stretch to its parent container (requires position: relative; on parent).
 * @property {ViewStyle} [baseStyle] - Overwrite base button styling
 * @property {ViewStyle} [pressableStyle] - Overwrite pressable styling
 * @property {React.ReactNode} [children] - The child elements to be rendered within the button.
 * @property {ButtonPointerEvents} [pointerEvents] - Set point events to none in case you want the button click to fall through. Useful when you nest a button inside a Pressable component.
 * @property {boolean} [asText] - Whether the button should be rendered as text element (for a11y purposes)
 * @property {boolean} [isHovered] - Set hover state internally when hovering over a Pressable wrapper.
 * @property {boolean} [isPressed] - Set pressed state internally when hovering over a Pressable wrapper.
 * @property {string | undefined} [testID] - Used to locate this view in end-to-end tests.
 */
export interface BaseButtonProps {
  onPress?: (event: GestureResponderEvent) => void;
  prominence?: ButtonProminence;
  size?: ButtonSize;
  state?: ButtonState;
  inverted?: boolean;
  fill?: boolean;
  stretched?: boolean;
  baseStyle?: StyleProp<ViewStyle>;
  pressableStyle?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
  pointerEvents?: ButtonPointerEvents;
  asText?: boolean;
  isHovered?: boolean;
  isPressed?: boolean;
  testID?: string | undefined;
  palette?: CommonPalette;
}

/**
 * Props for the button context provider.
 * @interface ButtonContextProps
 * @property {ButtonSize} [size] - Size of the button
 * @property {ButtonState} [state] - State of the button
 * @property {boolean} [inverted] - Inverted style of the button
 */
export interface ButtonContextProps {
  size: ButtonSize;
  state?: ButtonState;
  inverted?: boolean;
}

/**
 * Props for the Button.Icon extension component.
 * @interface ButtonIconProps
 */
export interface ButtonIconProps
  extends Pick<IconProps, "name">,
    Partial<Pick<IconProps, "solid">> {}

interface PublicButtonProps
  extends Omit<
    BaseButtonProps,
    "asText" | "onPress" | "isHover" | "isPressed"
  > {}

export interface ButtonProps extends PublicButtonProps {
  onPress?(event: GestureResponderEvent): void;
}

export interface TextButtonProps extends PublicButtonProps {}
