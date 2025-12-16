/**
 * Props for an individual row in the shopping cart accordion
 * @interface CartSummaryRowProps
 * @property {boolean} [open] - Whether the row is displayed as open
 * @property {string} [title] - Title of the row
 * @property {string} [beforePrice] - Previous price displayed with a strikethrough
 * @property {ReactElement} [price] - Price of the row item
 * @property {string} [currency] - Currency of the price
 * @property {ReactElement} [cartDetails] - Representation of the cart details
 * @property {string} [promotion] - Promotion text to be displayed
 */
export type CartSummaryRowProps = {
  open?: boolean;
  title: string;
  beforePrice?: string;
  price?: string;
  currency?: string;
  cartDetails: React.ReactElement;
  promotion?: string;
};

/**
 * Props for a Cart Summary component
 * @property {ReactElement} [cartSummaryRows] - Array of cartSummaryRows to be displayed in the accordion
 * @property {string} [expandLinkText] - Text to display on the TextLink that opens the rows
 * @property {ReactNode} [extraLine] - Potential extra LineItem to display
 */
export type CartSummaryProps = {
  cartSummaryRows: React.ReactElement[];
  expandLinkText: string;
  extraLine?: React.ReactNode;
};
