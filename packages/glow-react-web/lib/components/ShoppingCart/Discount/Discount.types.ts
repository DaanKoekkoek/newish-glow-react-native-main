/**
 * Props for the Discount component
 * @interface DiscountProps
 * @property {string} title - The title of the discount
 * @property {string} price - The price of the discount
 * @property {string} currency - The currency of the price
 * @property {React.ReactNode} [moreInfo] - Optional additional information about the discount
 */
export type DiscountProps = {
  title: string;
  price: string;
  currency: string;
  moreInfo?: React.ReactNode;
};

/**
 * Props for the Discount Group component
 * @interface DiscountGroupProps
 * @property {React.ReactNode[]} discounts - Array of discount components to be displayed in the group
 */
export type DiscountGroupProps = {
  discounts: React.ReactNode[];
};
