import { TooltipProps } from "components/Tooltip";
import { IconProps } from "foundations/Icon";

/**
 * Represents a button to be used on the Shopping Cart component
 * @property {ReactElement} [icon] - Icon to be displayed in the button
 * @property {TooltipProps} tooltip - Tooltip properties for the button
 * @property {boolean} [enableTooltip] - Flag to enable or disable the tooltip functionality
 * @property {function} [onClick] - Callback function invoked when the button is clicked
 * @property {keyof JSX.IntrinsicElements | React.ElementType} [as='button'] - Controls the tag type of the button, set to anything but `button` in case `<CartButton />` is placed within another button.
 */
export type CartButtonProps = {
  icon: IconProps;
  tooltip?: TooltipProps;
  enableTooltip?: boolean;
  onClick?: () => void;
  as?: keyof JSX.IntrinsicElements | React.ElementType;
};
