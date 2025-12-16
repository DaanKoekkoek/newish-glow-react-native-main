import type React from "react";

/**
 * Represents the horizontal text alignment for display
 * @type {"left" | "center"}
 */
export type DisplayAlignment = "left" | "center";

/**
 * Represents the available sizes for display
 * @type {"md" | "sm"}
 */
export type DisplaySize = "md" | "sm";

/**
 * Represents the colors of display
 * @type {"default" | "inverted"}
 */
export type DisplayColor = "default" | "inverted";

export type DisplayTag = "p" | "span" | "div";

/**
 * Props for Display.
 * @type DisplayProps
 * @extends {Pick<React.HTMLProps<HTMLElement>, "lang">}
 * @property {DisplayAlignment} [alignment='left'] - Sets the text alignment of the display.
 * @property {string} [highlightClassName=styles["display-highlight"]] - The className to apply when adding a custom format (through [] brackets).
 * @property {DisplayColor} [color='default'] - Sets the text color for display.
 * @property {DisplaySize} [size='md'] - Sets the size of the display text.
 * @property {React.ReactNode} [children] - The content of the display.
 * @property {string} [className] - Additional styling for the display.
 * @property {string | undefined} [testID] - Used to locate this view in end-to-end tests.
 * @property {DisplayTag} [as='p'] - Renders a different tag.
 */
export type DisplayProps = Pick<React.HTMLProps<HTMLElement>, "lang"> & {
  alignment?: DisplayAlignment;
  highlightClassName?: string;
  color?: DisplayColor;
  size?: DisplaySize;
  children?: React.ReactNode;
  className?: string;
  testID?: string;
  as?: DisplayTag;
};
