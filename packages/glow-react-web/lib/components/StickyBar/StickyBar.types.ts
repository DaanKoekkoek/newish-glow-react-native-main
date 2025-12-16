import type { ActionButtonIconProps } from "components/ActionButton";
import type { BreakpointKey } from "_theming/breakpoints";
import { ModalProps } from "../Modal";

/**
 * Represents the stickybar position.
 * @type {"top" | "bottom"}
 */
export type StickyBarPosition = "top" | "bottom";

/**
 * Represents the stickybar container max-width.
 * @type {"default" | "narrow"}
 */
export type StickyBarWidth = "default" | "narrow";

/**
 * Represents the stickybar content layout.
 * @type {"default" | "stacked"}
 */
export type StickyBarLayout = "default" | "stacked";

/**
 * Represents the stickybar content layout for all breakpoints.
 * @type {[Breakpoint in BreakpointKey]?: StickyBarLayout}
 */
export type StickyBarLayoutPerBreakpointSize = {
  [Breakpoint in BreakpointKey]?: StickyBarLayout;
};

/**
 * Represents the stickybar content layout for all breakpoints.
 * @type {StickyBarProps}
 * @property {React.ReactNode} [children] - Rendered as copy content of the stickybar
 * @property {React.ReactElement} [modal] - Accepts a `<Modal />` component. Generates a modal with action inbetween the content and `callToAction`.
 * @property {React.ReactElement | React.ReactElement[]} callToAction - Accepts an array of `<Button />` components
 * @property {StickyBarLayout | StickyBarLayoutPerBreakpointSize} [layout='default'] - Defines the content layout of the stickybar.
 * @property {StickyBarPosition} [position='default'] - Defines the position of the stickybar within the context of the container.
 * @property {string} [testID] - Sets a testID on container of the stickybar.
 * @property {StickyBarWidth} [width='default'] - Sets the container width of the stickybar.
 * @property {React.RefObject<HTMLElement>} [hideWhenVisibleRef] - Hides the sticky-bar when ref is in viewport.
 */
export type StickyBarProps = {
  children?: React.ReactNode;
  modal?: ModalProps;
  callToAction: React.ReactElement | React.ReactElement[];
  layout?: StickyBarLayout | StickyBarLayoutPerBreakpointSize;
  position?: StickyBarPosition;
  testID?: string;
  width?: StickyBarWidth;
  hideWhenVisibleRef?: React.RefObject<HTMLElement>;
};

/**
 * Represents the stickybar content layout for all breakpoints.
 * @interface StickyBarActionButtonProps
 * @extends {Omit<ActionButtonIconProps, "icon">}
 * @property {StickyBarPosition} position - Defines the position of the stickybar within the context of the container.
 */
export interface StickyBarActionButtonProps
  extends Omit<ActionButtonIconProps, "icon"> {
  position: StickyBarPosition;
  isModalOpen?: boolean;
}
