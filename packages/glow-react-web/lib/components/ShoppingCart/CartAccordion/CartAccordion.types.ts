import { PriceProps } from "components/Price/Price.types";

/**
 * Type representing an individual row in the shopping cart accordion's props
 * @interface CartAccordionRowProps
 * @property {boolean} [open] - Whether the row is displayed as open
 * @property {string} [title] - Title of the row
 * @property {string} [beforePrice] - Previous price displayed with a strikethrough
 * @property {PriceProps} [price] - Price of the row item
 * @property {ReactElement} [cartDetails] - Representation of the cart details
 * @property {ReactElement} [description] - Description of the item
 */
export type CartAccordionRowProps = {
  title?: string;
  beforePrice?: string;
  price?: PriceProps;
  cartDetails?: React.ReactNode;
  description?: React.ReactNode;
  isOpen?: boolean;
  promotion?: string;
  onToggle?: () => void;
};

/**
 * Type representing an Accordion component in the shopping cart's props
 * @interface CartAccordionProps
 * @property {ReactNode} [cartAccordionRows] - Array of CartAccordionRows to be displayed in the accordion
 * @property {ReactNode} [extraLine] - Potential extra LineItem to display
 * @property {boolean} [topDivider] - Whether to display a divider at the top
 * @property {boolean} [bottomDivider] - Whether to display a divider at the bottom
 */
export type CartAccordionProps = {
  cartAccordionRows: React.ReactNode[];
  extraLine?: React.ReactNode;
  topDivider?: boolean;
  bottomDivider?: boolean;
};
