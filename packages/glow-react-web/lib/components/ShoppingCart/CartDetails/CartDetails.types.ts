import { OdidoPalette } from "_internals/Color";

/**
 * Props for Cart Details category
 * @interface CartCategoryProps
 * @property {string} [title] - Title of the cart details category
 * @property {React.ReactNode | React.ReactNode[]} [children] - Line Items in a category
 */
export interface CartCategoryProps {
  title: string;
  children: React.ReactNode | React.ReactNode[]; //of type LineItem or LineItem[]
}

/**
 * Props for a Cart Details component
 * @interface CartDetailsProps
 * @property {React.ReactNode} [children] - Categories in a cart details
 * @property {OdidoPalette} [palette] - Color palette for the category
 */
export type CartDetailsProps = {
  children: React.ReactNode; //of type CartCategory[]
  palette?: OdidoPalette;
};
