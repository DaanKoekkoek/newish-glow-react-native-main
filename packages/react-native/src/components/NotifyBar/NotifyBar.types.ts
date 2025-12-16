import { type IconProps } from "foundations/Icon";

/**
 * Represents the state of the NotifyBar.
 * @state {"default" | "error" | "success"}
 */
type NotifyBarState = "default" | "error" | "success";

/**
 * Props for the NotifyBar.
 * @interface NotifyBarProps
 * @property {NotifyBarState} [state='default'] - The state of the Notify bar.
 * @property {string} [message] - The notify bar description message.
 * @property {string} [actionText] - The label on the action button of notify bar.
 * @property {string} [closeText] - The label of the close button.
 * @property {IconProps["name"]} [icon] - Renders an optional glow-icon above the description message.
 * @property {Function} [onActionPress={}] - Callback function that is called onPress of the Action button.
 * @property {Function} [onClose={}] - Callback function that is called onPress of the Close button.
 */
export interface NotifyBarProps {
  message: string;
  onClose: () => void;
  actionText?: string;
  closeText?: string;
  onActionPress?: () => void;
  icon?: IconProps["name"];
  state?: NotifyBarState;
}
