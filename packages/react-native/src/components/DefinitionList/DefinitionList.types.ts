import type { Paragraph } from "foundations/Paragraph";
import type { ReactNode } from "react";

/**
 * Represents the text color of the Definition list.
 * @type {"default" | "inverted"}
 */
export type DefinitionListColor = "default" | "inverted";

/**
 * DefinitionList component for displaying a list of terms and their descriptions.
 * This component acts as a container for DefinitionListItem components.
 * @interface DefinitionListProps
 * @property {DefinitionListColor} [color='default'] - The color scheme of the list. 'default' for standard coloring or 'inverted' for an inverted color scheme.
 * @property {(React.ReactElement<typeof DefinitionListItem> | React.ReactElement<typeof DefinitionListItem>[])} [children] - The list items to be displayed. Each item must be a DefinitionListItem component.
 * @property {string | undefined} [testID] - Used to locate this view in end-to-end tests.
 */
export interface DefinitionListProps {
  color?: DefinitionListColor;
  children?: ReactNode;
  testID?: string | undefined;
}

/**
 * DefinitionList.Item component for displaying a term and its description within a DefinitionList.
 * @interface DefinitionListItemProps
 * @property {string} [title] - The title of the term to be defined.
 * @property {(string | React.ReactElement<typeof Text> | React.ReactElement<typeof Paragraph>)} [description] - The description of the term. Can be a string or a React component for custom styling.
 */
export interface DefinitionListItemProps {
  title: string;
  description:
    | string
    | React.ReactElement<typeof Text>
    | React.ReactElement<typeof Paragraph>;
  testID?: string | undefined;
}
