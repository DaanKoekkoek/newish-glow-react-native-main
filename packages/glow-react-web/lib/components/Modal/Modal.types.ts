import type React from "react";
import type { PropsWithChildren } from "react";
import type { OdidoPalette } from "_internals/Color";
import type { ImageProps } from "foundations/Image";
import type { HeadingRenderType } from "foundations/Heading";

export type ModalEvent =
  | KeyboardEvent
  | React.MouseEvent<HTMLElement>
  | React.KeyboardEvent<HTMLDialogElement>
  | React.TouchEvent<HTMLElement>;

/**
 * Trigger handlers to open or close the modal. Use case for this would be when the property `closable` is set to `false`. Create an `useRef`, along with this interface to expose these functions.
 * @interface ModalHandle
 * @property {(event?: ModalEvent) => void} [triggerModalOpen] - Opens the modal.
 * @property {(event?: ModalEvent) => void} [triggerModalClose] - Closes the modal.
 */
export interface ModalHandle {
  triggerModalOpen: (event: ModalEvent) => void;
  triggerModalClose: (event: ModalEvent) => void;
}

/**
 * Represents the backdrop (when modal is opened) color of the modal.
 * @type {("default" | "subtle")}
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
 * Represents the different widths of the modal dialog.
 * @type {"default" | "wide" | "narrow"}
 */
export type ModalWidth = "default" | "wide" | "narrow";

/**
 * Represents the footer top padding variants.
 * @type {"default" | "none"}
 */
export type ModalFooterTopPadding = "default" | "none";

/**
 * Base props for modal components.
 * @interface BaseModalProps
 * @property {string} [title] - Header text of the modal.
 * @property {ModalHeaderComponent} [customHeader] - Additional component to place inside the header.
 * @property {("lg" | "md")} [titleSize='lg'] - Set the header text size.
 * @property {ModalWidth} [width] - The width of the modal.
 * @property {BackdropStyle} [backdrop='default'] - The backdrop style of the modal.
 * @property {ModalFooterStyle} [footer='strong'] - Displays a `Divider` at the top of the modal footer when set to `strong`, not applicable when `displayFooter` is set to `false`
 * @property {boolean} [visible] - Opens the modal when the component is mounted when set to `true`.
 * @property {boolean} [closable='true'] - Prevents modal from being closable when clicking on the backdrop, hides the close buttons as well.
 * @property {ModalPosition} [position='default'] - The rendering position of the modal within the viewport.
 * @property {ImageProps} [image] - Image path
 * @property {ImageProps["ratio"]} [headerRatio] - Image ratio, only applicable when `image` path is valid and set.
 * @property {(string | React.ReactElement)} [footerChildren] - The children of the fixed footer. Placed on top of the footer buttons.
 * @property {string} [dismissButtonLabel='Sluiten'] - The default label of the close button in the fixed footer.
 * @property {string} [buttonLabel] - Renders an additional button next to the dismiss button in the fixed footer.
 * @property {boolean} [wrapToContent] - Whether the modal should wrap to content.
 * @property {ModalFooterTopPadding} [footerTopPadding='default'] - Sets the top padding for the modal footer.
 * @property {(event: ModalEvent) => void} [onClick] - Callback that is triggered when `footerbuttonLabel` is set.
 * @property {(event: ModalEvent) => void} [onClose] - Callback that is triggered when the modal is closed.
 * @property {(event: ModalEvent) => void} [onOpen] - Callback that is triggered when the modal is opened.
 */
interface BaseModalProps extends PropsWithChildren {
  title: string;
  customHeader?: React.ReactElement;
  headerRatio?: ImageProps["ratio"];
  titleSize?: "lg" | "md";
  titleTag?: HeadingRenderType;
  // hasSnackbar?: boolean; TODO: not implemented
  width?: ModalWidth;
  backdrop?: BackdropStyle;
  footer?: ModalFooterStyle;
  visible?: boolean;
  closable?: boolean;
  position?: ModalPosition;
  image?: ImageProps;
  dismissButtonLabel?: string;
  buttonLabel?: string;
  footerChildren?: string | React.ReactElement;
  wrapToContent?: boolean;
  footerTopPadding?: ModalFooterTopPadding;
  hideCloseIconButton?: boolean;
  onClick?(event?: ModalEvent): void;
  onClose?(event?: ModalEvent): void;
  onOpen?(event?: ModalEvent): void;
}

/**
 * Props for the Modal component.
 * @interface ModalProps
 * @extends BaseModalProps
 * @property {React.ReactElement} [trigger] - The trigger of the modal. Can be any component that accepts an onClick property.
 * @property {React.ReactNode} [children] - The children of the modal dialog. Placed below the `header`.
 * @property {(string | undefined)} [testID] - Used to locate this view in end-to-end tests.
 */
export interface ModalProps extends BaseModalProps {
  trigger?: React.ReactElement;
  children?: React.ReactNode;
  testID?: string | undefined;
}

/**
 * Custom header component
 * @interface ModalCustomHeaderProps
 * @property {React.ReactElement} [children] - Contents of the custom header component
 * @property {Palette} [palette='default'] - Palette variant as background. Visible when `variant` is set to `default`.
 * @property {("default" | "emphasised")} [variant] - Background style of the custom header component
 * @property {boolean} [verticalPadding] - Applies a vertical padding to the `content` of the custom header.
 * @property {boolean} [fixedWidth] - Sets the `width` of the child to 100% if set to `false`.
 * @property {string} [testID] - testID of the modal header
 */
export interface ModalCustomHeaderProps {
  children: React.ReactElement;
  verticalPadding?: boolean;
  palette?: OdidoPalette;
  variant?: "default" | "emphasised";
  ratio?: ImageProps["ratio"];
  fixedWidth?: boolean;
  testID?: string;
}
