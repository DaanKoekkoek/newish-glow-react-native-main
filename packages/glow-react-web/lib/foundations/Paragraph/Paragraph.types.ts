import type React from "react";

type DataType = `data-${string}`;

type DataAttributes = Omit<
  React.HTMLAttributes<HTMLSpanElement | HTMLDivElement>,
  "align" | "children" | "color" | "id" | "size" | "style" | "title"
> & {
  [key: DataType]: string | number | boolean | undefined;
};

export type ParagraphSize = "xxs" | "xs" | "sm" | "default" | "lg";

export type ParagraphAlignment = "left" | "center" | "right";

export type ParagraphTag = "p" | "span" | "div";

/**
 * Props for Paragraph.
 * @interface ParagraphProps
 * @property {string} [id] - The id of the paragraph
 * @property {DataAttributes} [dataAttributes] - Additional data attributes to be added to the paragraph.
 * @property {React.ReactNode} [children] - The content of the paragraph.
 * @property {StyleProp<TextStyle>} [style] - Additional styling for the paragraph.
 * @property {string} [testID] - Test ID, for querying in unit tests.
 * @property {string} [className] - Additional CSS class to apply
 * @property {ParagraphSize} [size='default'] - Size of the paragraph text
 * @property {ParagraphAlignment} [alignment='left'] - Alignment of the text
 * @property {DisplayTag} [as='p'] - Renders a different tag.
 */
export interface ParagraphProps {
  id?: string;
  dataAttributes?: DataAttributes;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  testID?: string;
  className?: string;
  size?: ParagraphSize;
  alignment?: ParagraphAlignment;
  as?: ParagraphTag;
}
