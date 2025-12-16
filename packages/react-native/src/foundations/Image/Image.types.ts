import type React from "react";
import type {
  ImageStyle,
  ImageLoadEventData,
  ImageErrorEventData,
  LayoutChangeEvent,
  ImageSourcePropType,
  ImageResizeMode,
  StyleProp,
} from "react-native";

import type { ratios } from "./Image.constants";

/**
 * Represents the native image type.
 * @type {"background" | "foreground"}
 */
export type ImageType = "background" | "foreground";

/**
 * Represents the image ratio.
 * @type {keyof typeof ratios}
 */
export type ImageRatio = (typeof ratios)[number];
/**
 * Base props for image component.
 * @interface ImageProps
 * @property {string} [src] - Source path of the image (remote URL).
 * @property {ImageSourcePropType} [localSrc] - Source path of the image (local image module).
 * @property {string} [srcSet] - Sourceset paths of the image.
 * @property {string} [alt] - Image's alt text.
 * @property {React.ReactNode} [children] - Content that is nested when `type` is set to `background`, and rendered underneath the image when `type` is set to `foreground`.
 * @property {ImageType} [type] - Renders a react native `BackgroundImage` when set to `background, and an `Image` when set to `foreground`.
 * @property {ImageResizeMode} [resizeMode] - Renders the image in a specific resize mode.
 * @property {ImageRatio} [imageRatio] - The image ratio, sets a fixed ratio width and height on the image.
 * @property {string} [placeholderSrc] - Placeholder image source when image is loading.
 * @property {StyleProp<ImageStyle>} [backgroundImageStyle] - Additional styling applied on an image.
 * @property {StyleProp<ImageStyle>} [imageStyle] - Additional styling applied on a background image.
 * @property {(event: LayoutChangeEvent) => void} [onLayout] - Callback that returns an onLayout object of the image.
 * @property {(event: ImageLoadEventData) => void} [onLoad] - Callback that is fired when the image is loaded. Is fired when either the image has failed or succesfully loaded in.
 * @property {(event: ImageErrorEventData) => void} [onError] - Callback that is fired when image has failed to load.
 * @property {(event: ImageLoadEventData) => void} [onLoadStart] - Callback that is fired when image first started loading in.
 * @property {(event: ImageLoadEventData) => void} [onLoadEnd] - Callback that is fired when image has finished loading in.
 */
export interface ImageProps {
  src?: string;
  localSrc?: ImageSourcePropType;
  srcSet?: string;
  alt?: string;
  children?: React.ReactNode;
  type?: ImageType;
  resizeMode?: ImageResizeMode;
  ratio?: ImageRatio;
  placeholderSrc?: string;
  backgroundImageStyle?: StyleProp<ImageStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  onLayout?(event: LayoutChangeEvent): void;
  onLoad?(event: ImageLoadEventData): void;
  onError?(event: ImageErrorEventData): void;
  onLoadStart?(event: ImageLoadEventData): void;
  onLoadEnd?(event: ImageLoadEventData): void;
}
