import { OdidoPalette } from "_internals/Color";
import { LargeStickerProps } from "components/LargeSticker";
import { VisualProps } from "_internals/Assets";

/**
 * If set to `solid` the image is placed inside the container along with the content.
 * @type {"default" | "solid"}
 */
export type HeroVariant = "default" | "solid";

/**
 * Set the Hero component size.
 * @type {"default" | "compact"}
 */
export type HeroSize = "default" | "compact";

/**
 * Set the image size and/or padding offset.
 * Compact size applies only in desktop breakpo
 * @type {"default" | "uneven" | "no-padding"}
 */
export type HeroLayout = "default" | "uneven" | "no-padding";

/**
 * Set the render order of the content and image.
 * When multiple Hero components are stacked,
 * alternate between "default" and "inverted" to create a zig-zag visual pattern.
 * @type {"default" | "inverted"}
 */
export type HeroOrder = "default" | "inverted";

/**
 * Defines the size variant for the `HeroHeading` `title` and `subtitle`.
 * @type {"default" | "sm"}
 */
export type HeroHeadingSize = "default" | "sm";

/**
 * Represents the heading content for the `Hero` component.
 * @type {HeroHeading}
 * @property {string} [title] - Primary heading text displayed prominently.
 * @property {string} [subTitle] - Secondary heading text displayed below the title.
 * @property {HeroHeadingSize} [size='default'] - Heading size variant; use "sm" for a smaller visual hierarchy.
 */
export type HeroHeading = {
  title?: string;
  subTitle?: string;
  size?: HeroHeadingSize;
};

/**
 * Represents `Hero` properties.
 * @type {HeroProps}
 * @property {HeroHeading} [heading] - Main and secondary headings with optional size.
 * @property {HeroVariant} [variant='default'] - Visual style of the Hero, affecting background and layout.
 * @property {HeroLayout} [layout='default'] - Layout configuration for padding and alignment.
 * @property {HeroSize} [layout='default'] - Size of component, compact size applies only in desktop breakpoint.
 * @property {OdidoPalette} [palette='default'] - Color palette used for theming the Hero.
 * @property {LargeStickerProps} [sticker] - Optional sticker element to visually highlight a feature or benefit.
 * @property {HeroOrder} [order='default'] - Render order of content and image; use 'inverted' for zig-zag stacking.
 * @property {string | React.ReactNode} [children] - Description content below the heading.
 * @property {string | React.ReactNode} [footnote] - Footnote or additional content below the description or interactive elements.
 * @property {React.ReactNode} [callToAction] - Optional call-to-action elements such as buttons or links.
 * @property {VisualProps} [visual] - Visual media (image, illustration, animation) to display alongside content.
 * @property {string} [testID='hero'] - Test identifier used for querying the component in tests.
 */
export type HeroProps = {
  heading?: HeroHeading;
  variant?: HeroVariant;
  layout?: HeroLayout;
  size?: HeroSize;
  palette?: OdidoPalette;
  sticker?: LargeStickerProps;
  order?: HeroOrder;
  children?: string | React.ReactNode;
  footnote?: string | React.ReactNode;
  callToAction?: React.ReactNode;
  visual?: VisualProps;
  testID?: string;
};
