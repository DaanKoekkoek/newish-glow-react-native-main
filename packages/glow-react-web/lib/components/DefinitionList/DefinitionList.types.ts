/**
 * Represents the colors of heading.
 * @type {"default" | "inverted"}
 */
export type ListColor = "default" | "inverted";

/**
 * props for the DefinitionList component
 *
 * @interface DefinitionListProps
 * @property {string} title - The title of the definition list.
 * @property {string} description - The description of the definition list.
 * @property {ListColor} [color] - The color of the definition list. Default is "default".
 * @property {string} [testID] - Optional test identifier for testing purposes.
 *
 */

export type DefinitionListProps = {
  title: string | React.ReactNode;
  className?: string;
  children: string | React.ReactNode;
  color?: ListColor;
  testID?: string;
};
