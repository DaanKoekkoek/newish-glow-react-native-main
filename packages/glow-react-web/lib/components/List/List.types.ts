import type { OdidoPalette } from "_internals/Color";
import type { IconNames } from "foundations/Icon";
import type { ImageProps } from "foundations/Image";

/**
 * Props for the Attention element in a list item.
 * @interface AttentionProps
 * @property {string} text - The text to display in the attention element.
 * @property {"information" | "success" | "warning" | "error"} variant - The visual style of the attention element.
 */
type AttentionProps = {
  text: string;
  variant: "information" | "success" | "warning" | "error";
};

/*
 * Sets the size of leading content icon or image.
 * @type {MediaContentSizeVariant}
 */
type MediaContentSizeVariant = "xs" | "sm" | "default" | "lg";

/**
 * Props for the List component.
 * @interface ListProps
 * @property {"default" | "subtle" | "none"} background - The background style of the list.
 * @property {React.ReactElement | React.ReactElement[]} children - The list items to render.
 * @property {OdidoPalette} palette - The color palette to apply to the list.
 */
export type ListProps = {
  background?: "default" | "subtle" | "none";
  children: React.ReactElement | React.ReactElement[];
  palette?: OdidoPalette;
  testID?: string;
};

/**
 * Props for the List component.
 * @interface LeadingContentProps
 *
 * @property {IconNames} [icon] - Name of the icon
 *   Used when displaying icon as the leading element.
 *
 * @property {ImageProps} [image] - Image as leeading content
 *   an image as the leading visual. This should include `src`, `alt`, and any
 *   optional rendering options supported by the `Visual` or `Image` component.
 *
 * @property {MediaContentSizeVariant} [mediaContentSize] - Optional size variant
 *   applied to media elements (`icon` or `image`). Defines the size of
 *   the leading content, such as `"sm"`, `"md"`, or `"lg"`.
 *
 * @remarks
 * - This type is defined as a discriminated union:
 *   - If `image` is provided, the component renders a media image.
 *   - If `icon` is provided, it renders a single icon.
 *   - If `icon` is combined with `mediaContentSize`, it’s treated as a “media-icon”.
 *
 */
export type LeadingContentProps =
  | {
      icon: IconNames;
    }
  | {
      icon: IconNames;
      mediaContentSize?: MediaContentSizeVariant;
    }
  | {
      image: ImageProps;
      mediaContentSize?: MediaContentSizeVariant;
    };

/**
 * Props for the ListItem component.
 * @interface ListItemProps
 * @property {string} text - Main text content of the list item (required).
 * @property {React.ReactElement} [trailingContent] - Optional components to display as an trailing content (e.g., button, toggle).
 * @property {AttentionProps} [attention] - Optional attention message with variant styling.
 * @property {boolean} [clickable] - Whether the item shows a chevron icon and is clickable.
 * @property {string | React.ReactElement} [description1] - First line of descriptive text.
 * @property {string | React.ReactElement} [description2] - Second line of descriptive text.
 * @property {string} [detail] - Optional text displayed on the right side.
 * @property {LeadingContentProps} [leadingContent] - Leading content icon, image or media icon with palette background.
 * @property {IconNames} [iconRight] - Icon name to display on the right side of the item.
 * @property {number} [notification] - Optional number to display as a notification badge.
 * @property {string} [testID] - Test identifier for testing frameworks.
 * @property {() => void} [onClick] - Function to execute when the item is clicked.
 * @property {string} [href] - If `clickable` is set to `true`, generate a `TextLink` along with the `href`.
 * @property {OdidoPalette} palette - The color palette to apply to the list.
 */
export type ListItemProps = {
  text: string;
  trailingContent?: React.ReactElement;
  attention?: AttentionProps;
  clickable?: boolean;
  description1?: string | React.ReactElement;
  description2?: string | React.ReactElement;
  detail?: string;
  leadingContent?: LeadingContentProps;
  iconRight?: IconNames;
  notification?: number;
  testID?: string;
  onClick?: () => void;
  href?: string;
  palette?: OdidoPalette;
  action?: React.ReactNode;
  bottomDivider?: boolean;
};
