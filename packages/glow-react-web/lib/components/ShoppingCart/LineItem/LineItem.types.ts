import type React from "react";

/**
 * Represents the props for a Line Item in the Shopping Cart component
 * @property {string} [line2] - Second line of the description
 * @property {string} [title] - Title of the line item
 * @property {string} [price] - Price to be displayed on the line item
 * @property {string} [currency] - Currency of the price to be displayed
 * @property {string} [description] - Description of the line item
 * @property {function} [onRemove] - Callback when the line item is removed
 * @property {ReactNode} [moreInfo] - Icon to be displayed to provide user with more information
 * @property {ReactNode} [discount] - Discount for the line item
 */
export type LineItemProps = {
  variant?: LineItemVariant;
  title: string;
  price?: string;
  currency?: string;
  description?: string;
  onRemove?: () => void;
  moreInfo?: React.ReactNode;
  discount?: React.ReactNode | React.ReactNode[];
};

/**
 * Represents the content type of the Line Item
 * @type {"default" | "free item" | "short description"}
 */
export type LineItemVariant = "default" | "free item" | "short description";
