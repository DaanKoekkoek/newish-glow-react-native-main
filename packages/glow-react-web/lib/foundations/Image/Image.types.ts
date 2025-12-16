import {
  ratios,
  imageResizeOptions,
  backgroundImageResizeOptions,
} from "foundations/Image/Image.constants.ts";
import type { breakpoints, BreakpointKey } from "_theming/breakpoints";

/**
 * Represents the possible ratios for the image.
 * @type {keyof typeof ratios} ImageRatio
 */
export type ImageRatio = (typeof ratios)[number];

export type ImageRatioPerBreakpointType = {
  [Breakpoint in BreakpointKey]?: ImageRatio;
};

/**
 * Represents the possible resize options for images in the foreground.
 * @type {keyof typeof imageResizeOptions} ImageResizeOptions
 */
export type ImageResizeOptions = (typeof imageResizeOptions)[number];

/**
 * Represents the possible resize options for images in the background.
 * @type {keyof typeof backgroundImageResizeOptions} BackgroundImageResizeOptions
 */
export type BackgroundImageResizeOptions =
  (typeof backgroundImageResizeOptions)[number];

/**
 * Represents the possible image html render types.
 * - `"background"`: The image will be rendered as a background image.
 * - `"foreground"`: The image will be rendered as an `<img>` element.
 * @type {"background" | "foreground"}
 */
export type ImageRenderType = "background" | "foreground";

/**
 * Represents the possible loading behaviors for an image.
 *
 * - `lazy`: The image will be loaded lazily, meaning it will be fetched only when it is near the viewport.
 *   - `rootMargin` (optional): A margin around the viewport used to trigger lazy loading earlier or later. Accepts any valid CSS margin value (e.g., `"200px"`).
 *
 * - `eager`: The image will be loaded eagerly, meaning it will be fetched as soon as possible, regardless of its position in the viewport.
 *
 * @example
 * const loading: ImageLoading = { type: "lazy", rootMargin: "300px" };
 * const eagerLoading: ImageLoading = { type: "eager" };
 */
export type ImageLoading =
  | {
      type: "lazy";
      rootMargin?: string;
    }
  | {
      type: "eager";
    };

/**
 * Represents the properties for rendering images per breakpoint
 * @type ImageSource
 * @property {string} src - Image source, can be either a local path or remote image.
 * @property {keyof typeof breakpoints | number} [breakpoint] - The max-width breakpoint. Image is shown underneath that breakpoint. Doesn't apply for the last `ImageSource` item.
 */
export type ImageSource = {
  src: string;
  breakpoint?: keyof typeof breakpoints | number;
};

/**
 * Defines image alignment within its container.
 * Used for both `background-position` and `object-position`.
 *
 * - "left" / "right": Align horizontally
 * - "top" / "bottom": Align vertically
 * - "center": Center the image
 * @type {"left" | "right" | "center" | "bottom" | "top"}
 */
export type ImagePosition =
  | "left"
  | "right"
  | "center"
  | "bottom"
  | "top"
  | "top left"
  | "top right"
  | "bottom left"
  | "bottom right";

/**
 * Represents the properties for rendering an image component.
 * @type ImageProps
 * @property {string} alt - The alt text for the image, which is used for accessibility and SEO.
 * @property {string} [src] - The source URL for the image if it is a remote image.
 * @property {string} [localSrc] - The local source URL for the image if it is a locally imported image.
 * @property {string[]} [srcSet] - A set of images for the browser to choose from based on screen size or resolution.
 * @property {string} [pictureClassName] - An optional CSS class to apply directly on the <picture> tag (direct parent of the img).
 * @property {string} [className] - An optional CSS class to apply to the image container for custom styling.
 * @property {React.ReactNode} [children] - Optional child elements that can be rendered on top of the image, only applicable when `type` is `"background"`.
 * @property {string} [testID] - Optional test ID to target the component in tests.
 * @property {ImageRenderType} [renderType="background"] - The image rendering mode, either as a background or a foreground image.
 * @property {ImagePosition} [position="center"] - The image position relative to its container.
 * @property {ImageRatio | ImageRatioPerBreakpointType} [ratio="16/9"] - The aspect ratio for the image container, applied via CSS classes. Can also be set per breakpoint.
 * @property {number | Array<keyof typeof breakpoints>} [mediaQueryBreakpoint] - The breakpoints to use between items in `srcSet`, either a single breakpoint number or an array of predefined breakpoints like `'mobile'`, `'tablet'`, `'desktop'`, etc.
 * @property {ImageLoading} [loading={type: "lazy"}] - The loading strategy for the image; `lazy` with optional `rootMargin` or `eager`.
 * @property {ImageResizeOptions | BackgroundImageResizeOptions} [resizeMode] - The resize mode for the image depending on the type (`"foreground"` or `"background"`).
 */
export type ImageProps = {
  alt: string;
  src?: string;
  localSrc?: string;
  sources?: ImageSource[];
  pictureClassName?: string;
  className?: string;
  children?: React.ReactNode;
  testID?: string;
  renderType?: ImageRenderType;
  position?: ImagePosition;
  ratio?: ImageRatio | ImageRatioPerBreakpointType;
  loading?: ImageLoading;
  resizeMode?: ImageRenderType extends "background"
    ? BackgroundImageResizeOptions
    : ImageResizeOptions;
};
