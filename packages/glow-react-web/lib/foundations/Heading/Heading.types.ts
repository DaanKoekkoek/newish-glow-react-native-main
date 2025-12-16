import type React from "react";

/**
 * Represents the DOM rendering type of the heading.
 * @type {"span" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6"}
 */
export type HeadingRenderType =
  | "div"
  | "span"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6";

/**
 * Represents the horizontal alignment of the heading.
 * @type {"left" | "center"}
 */
export type HeadingAlignment = "left" | "center";

/**
 * Represents the sizes of the heading.
 * @type {"xl" | "lg" | "md" | "sm" | "xs"}
 */
export type HeadingSize = "xl" | "lg" | "md" | "sm" | "xs";

/**
 * Represents the colors of heading.
 * @type {"default" | "inverted"}
 */
export type HeadingColor = "default" | "inverted";

/**
 * Props interface for the Heading component.
 * @type HeadingProps
 * @extends {Pick<React.HTMLProps<HTMLElement>, "lang">}
 * @property {HeadingSize} [size] - The size of the heading.
 * @property {React.ReactNode} [children] - The content of the heading.
 * @property {string} [highlightClassName=styles["heading-highlight"]] - The className to apply when adding a custom format (through [] brackets).
 * @property {HeadingRenderType} [as] - The DOM rendering output of the heading.
 * @property {HeadingAlignment} [alignemnt] - The horizontal alignment of the text within heading.
 * @property {string} [className] - Additional class string for styling the heading.
 * @property {HeadingColor} [color] - Color of the heading.
 * @property {React.CSSProperties} [style] - Additional styles for the heading.
 * @property {string | undefined} [testID] - Used to locate this view in end-to-end tests.
 */
export type HeadingProps = Pick<React.HTMLProps<HTMLElement>, "lang"> & {
  size?: HeadingSize;
  children: React.ReactNode;
  highlightClassName?: string;
  as?: HeadingRenderType;
  alignment?: HeadingAlignment;
  className?: string;
  color?: HeadingColor;
  style?: React.CSSProperties;
  testID?: string | undefined;
};
