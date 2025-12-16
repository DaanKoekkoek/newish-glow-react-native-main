import type { OdidoPalette, BreakpointKeys } from "_theming/index";
import type { GlowGradientTypes } from "foundations/GlowGradient";
import type { ImageProps } from "foundations/Image";
import type React from "react";
import type { ReactNode } from "react";
import type {
  GestureResponderEvent,
  ModalProps as NativeModalProps,
} from "react-native";

/**
 * Trigger handlers to open or close the modal. Use case for this would be when the property `closable` is set to `false`. Create an `useRef`, along with this interface to expose these functions.
 * @interface ModalHandle
 * @property {(event?: GestureResponderEvent) => void} [triggerModalOpen] - Opens the modal.
 * @property {(event?: GestureResponderEvent) => void} [triggerModalClose] - Closes the modal.
 */
export interface ModalHandle {
  triggerModalOpen: (event?: GestureResponderEvent) => void;
  triggerModalClose: (event?: GestureResponderEvent) => void;
}

/**
 * Represents the backdrop (when modal is opened) color of the modal.
 * @type {"default" | "subtle"}
 */
export type BackdropStyle = "default" | "subtle";

/**
 * Represents the dialog footer styling.
 * @type {"subtle" | "strong" | "none"}
 */
export type ModalFooterStyle = "subtle" | "strong" | "none";

/**
 * Represents the different starting positions of where the modal appears from.
 * @type {"default" | "right" | "bottom"}
 */
export type ModalPosition = "default" | "right" | "bottom";

/**
 * Represents the modal position for each breakpoint.
 * @type {Object.<BreakpointKeys, ModalPosition>}
 */
export type ModalPositionPerBreakpoint = {
  [Breakpoint in BreakpointKeys]?: ModalPosition;
};

/**
 * Represents the different widths of the modal dialog.
 * @type {"default" | "wide" | "narrow"}
 */
export type ModalWidth = "default" | "wide" | "narrow";

/**
 * Inner token structure for the modal.
 * @interface ModalScreenSizeProfile
 * @property {Record<ModalWidth, number>} - Max width of the modal.
 */
export interface ModalScreenSizeProfile {
  components: {
    overlay: {
      modal: {
        size: {
          maxWidth: Record<ModalWidth, number>;
        };
      };
    };
  };
}

/**
 * Token structure for the button.
 * @interface ModalScreenSizesTheme
 * @property {ModalScreenSizeProfile} - Max width tokens for modal.
 */
export interface ModalScreenSizesTheme {
  mobileSmall: ModalScreenSizeProfile;
  mobile: ModalScreenSizeProfile;
  tablet: ModalScreenSizeProfile;
  laptop: ModalScreenSizeProfile;
  desktop: ModalScreenSizeProfile;
}

/**
 * Base props for modal components.
 * @interface BaseModalProps
 * @property {string} [title] - Header text of the modal.
 * @property {ModalHeaderComponent} [customHeader] - Additional component to place inside the header.
 * @property {"lg" | "md"} [titleSize='lg'] - Set the header text size.
 * @property {boolean} [hasSnackbar] - Whether the modal has a snackbar or not.
 * @property {ModalWidth} [width] - The width of the modal.
 * @property {BackdropStyle} [backdrop='default'] - The backdrop style of the modal.
 * @property {ModalFooterStyle} [footer='strong'] - Displays a `Divider` at the top of the modal footer when set to `strong`, not applicable when `displayFooter` is set to `false`
 * @property {boolean} [visible] - Opens the modal when the component is mounted when set to `true`.
 * @property {boolean} [closable='true'] - Prevents modal from being closable when clicking on the backdrop, hides the close buttons as well.
 * @property {ModalPosition | ModalPositionPerBreakpoint} [position='default'] - The rendering position of the modal within the viewport.
 * @property {ImageProps} [image] - Image path
 * @property {ImageProps["ratio"]} [headerRatio] - Image ratio, only applicable when `image` path is valid and set.
 * @property {string | React.ReactElement} [footerChildren] - The children of the fixed footer. Placed on top of the footer buttons.
 * @property {string} [dismissButtonLabel='Sluiten'] - The default label of the close button in the fixed footer.
 * @property {string} [buttonLabel] - Renders an additional button next to the dismiss button in the fixed footer.
 * @property {boolean} [wrapToContent] - Whether the modal should wrap to content.
 * @property {(event: GestureResponderEvent) => void} [onPress] - Callback that is triggered when `footerbuttonLabel` is set.
 * @property {(event: GestureResponderEvent) => void} [onClose] - Callback that is triggered when the modal is closed.
 * @property {(event: GestureResponderEvent) => void} [onOpen] - Callback that is triggered when the modal is opened.
 */
interface BaseModalProps {
  title: string;
  customHeader?: React.ReactElement;
  headerRatio?: ImageProps["ratio"];
  titleSize?: "lg" | "md";
  hasSnackbar?: boolean;
  width?: ModalWidth;
  backdrop?: BackdropStyle;
  footer?: ModalFooterStyle;
  visible?: boolean;
  closable?: boolean;
  position?: ModalPosition | ModalPositionPerBreakpoint;
  image?: ImageProps;
  dismissButtonLabel?: string;
  buttonLabel?: string;
  footerChildren?: string | React.ReactElement;
  wrapToContent?: boolean;
  onPress?(event?: GestureResponderEvent): void;
  onClose?(event?: GestureResponderEvent): void;
  onOpen?(event?: GestureResponderEvent): void;
}

/**
 * Props for the Modal component.
 * @interface ModalProps
 * @extends BaseModalProps
 * @property {React.ReactElement} [trigger] - The trigger of the modal. Can be any component that accepts an onPress property.
 * @property {React.ReactNode} [children] - The children of the modal dialog. Placed below the `header`.
 * @property {string | undefined} [testID] - Used to locate this view in end-to-end tests.
 */
export interface ModalProps extends BaseModalProps {
  trigger?: React.ReactElement;
  children?: React.ReactNode;
  testID?: string | undefined;
}

/**
 * Props for the backdrop within the Modal component.
 * @interface ModalOverlayProps
 * @extends NativeModalProps, Omit<ModalProps, "visible" | "position" | "width" | "displayFooter">
 * @extends BaseModalProps, Omit<BaseModalProps, "position" | "displayFooter">
 * @property {boolean} [visible] - Whether the modal is visible or not.
 * @property {ModalPositionPerBreakpoint} [position] - Rendering position of the modal.
 * @property {width} [width] - Modal width.
 * @property {ModalFooterStyle} [footer] - The footer style.
 */
export interface ModalOverlayProps
  extends Omit<NativeModalProps, "visible" | "position" | "width">,
    Omit<BaseModalProps, "position" | "displayFooter"> {
  visible: boolean;
  position: ModalPositionPerBreakpoint;
  width: ModalWidth;
  footer: ModalFooterStyle;
  siblings?: ReactNode;
}

/**
 * Props for the Modal footer component.
 * @interface ModalFooterProps
 * @extends ModalProps, Omit<ModalProps, "header">
 * @property {(height: number) => void} [onFooterHeight] - onLayout callback that is intended for when `footer` is set to `subtle`. Returns the height of the footer.
 */
export interface ModalFooterProps extends Omit<ModalProps, "header"> {
  onFooterHeight: (height: number) => void;
}

/**
 * Props for the Modal footer component content.
 * @interface ModalFooterContentProps
 * @extends ModalFooterProps, Omit<ModalProps, "header">
 */
export interface ModalFooterContentProps
  extends Omit<ModalFooterProps, "onFooterHeight"> {}

/**
 * Props for the Modal context provider.
 * @interface ModalContextProps
 * @property {BreakpointKeys} [breakpoint] - Contains current breakpoint.
 */
export interface ModalContextProps {
  breakpoint: BreakpointKeys;
}

/**
 * Custom header component
 * @interface ModalCustomHeaderProps
 * @property {React.ReactElement} [children] - Contents of the custom header component
 * @property {GlowGradientTypes} [glow='Glow1'] - Glow variant as background. Visible when `variant` is set to `emphasised`.
 * @property {Palette} [palette='default'] - Palette variant as background. Visible when `variant` is set to `default`.
 * @property {"default" | "emphasised"} [variant] - Background style of the custom header component
 * @property {boolean} [verticalPadding] - Applies a vertical padding to the `content` of the custom header.
 * @property {boolean} [fixedWidth] - Sets the `width` of the child to 100% if set to `false`.
 * @property {string} [testID] - testID of the modal header
 */
export interface ModalCustomHeaderProps {
  children: React.ReactElement;
  verticalPadding?: boolean;
  glow?: GlowGradientTypes;
  palette?: OdidoPalette;
  variant?: "default" | "emphasised";
  ratio?: ImageProps["ratio"];
  fixedWidth?: boolean;
  testID?: string;
}
