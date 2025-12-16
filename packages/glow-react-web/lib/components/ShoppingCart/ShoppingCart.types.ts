import React from "react";

/**
 * Represents the props for the heading in the ShoppingCart component.
 * @type {ShoppingCartHeadingProps}
 * @property {React.ReactNode} title - Displays a title
 * @property {React.ReactNode} [info] - Displays a component (usually `<TextLink />` or `<Tooltip />`) next to `title`.
 * @property {string} [promotion] - Displays a promotion text next to `title` and `info`.
 * @property {boolean} [showDivider] - Displays a `<Divider />` below the `title` and `info`.
 */
type ShoppingCartHeadingProps = {
  title: React.ReactNode;
  info?: React.ReactNode;
  promotion?: string;
  showDivider?: boolean;
};

/**
 * Represents the props for the ShoppingCart component
 * @type {ShoppingCartProps}
 * @property {React.ReactNode} children - Should contain `ShoppingCart` atoms
 * @property {React.ReactNode} [callToAction] - Should contain either `<TextLink />` or `<Button />`
 * @property {ShoppingCartHeadingProps} [heading] - Contains text rendered above `children`
 * @property {string | React.ReactElement} [footnote] - Contains text rendered underneath `callToAction`
 * @property {boolean} [active] - Indicates if the shopping cart is active, affecting styles
 */
export type ShoppingCartProps = {
  children: React.ReactNode;
  callToAction?: React.ReactNode;
  heading?: ShoppingCartHeadingProps;
  footnote?: string | React.ReactElement;
  active?: boolean;
};
