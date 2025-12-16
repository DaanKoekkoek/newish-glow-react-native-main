import type { IconProps } from "foundations/Icon";
import type { ViewStyle, GestureResponderEvent } from "react-native";

/**
 * Represents the different states of the action button.
 * @type {"loading" | "disabled"}
 */
export type NumberInputButtonState = "loading" | "disabled";

/**
 * Props for the Action Button component.
 * @interface NumberInputButtonProps
 * @property {(event: GestureResponderEvent) => void} [onPress] - onPress callback of the action button.
 * @property {IconProps["name"]} [icon] - The icon name.
 * @property {string} [label] - The label, placed underneath the icon of the action button.
 * @property {NumberInputButtonState} [state] - The state of the action button.
 * @property {ViewStyle} [style] - Applies additional styling
 * @property {string | undefined} [testID] - Used to locate this view in end-to-end tests.
 */
export interface NumberInputButtonProps {
  onPress(event: GestureResponderEvent): void;
  label?: string;
  icon: IconProps["name"];
  state?: NumberInputButtonState;
  style?: ViewStyle;
  testID?: string | undefined;
}
