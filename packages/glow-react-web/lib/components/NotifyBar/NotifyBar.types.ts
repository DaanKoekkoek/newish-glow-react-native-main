import { type IconProps } from "foundations/Icon";

/**
 * Represents the state of the NotifyBar.
 * @state {"default" | "error" | "success"}
 */
type NotifyBarState = "default" | "error" | "success";

/**
 * Props for the NotifyBar.
 * @interface NotifyBarProps
 * @property {React.ReactNode} [children] - The notify bar description content.
 * @property {Function} [onClose={}] - Callback function that is called onPress of the Close button.
 * @property {Function} [onActionPress={}] - Callback function that is called onPress of the Action button.
 * @property {string} [actionText] - The label on the action button of notify bar.
 * @property {string} [closeText] - The label of the close button.
 * @property {IconProps["name"]} [icon] - Renders an optional glow-icon above the description message.
 * @property {NotifyBarState} [state='default'] - The state of the Notify bar.
 * @property {string} [testID='notify-bar'] - Additional test id applied on the container of the notifybar.
 */
export interface NotifyBarProps {
  children?: React.ReactNode;
  onClose?: () => void;
  onActionPress?: () => void;
  actionText?: string;
  closeText?: string;
  icon?: IconProps["name"];
  state?: NotifyBarState;
  testID?: string;
}
