import { BrandName } from "components/ThemeProvider";

/**
 * Represents a hyperlink with an optional URL.
 */
export type Link = {
  title: string;
  href?: string;
  onClick?: () => void;
};

/**
 * Represents a collection of related links grouped under a common title, defining a Footer column
 */
export type ColumnLink = {
  title: string;
  links: Link[];
};

/**
 * Represents a footer link with an associated icon.
 */
export type FooterLink = {
  icon: React.ReactNode;
  href?: string;
  ariaLabel?: string;
  onClick?: () => void;
};

/**
 * Props for the Footer component.
 * @property {ColumnLink[]} [columnLinks] - An array of grouped column links (optional)
 * @property {React.ReactNode} [logo] - The logo element displayed in the footer (optional)
 * @property {FooterLink[]} [socialLinks] - An array of social media links with icons (optional)
 * @property {FooterLink[]} [storeLinks] - An array of store-related links (e.g., App Store, Play Store) with icons (optional)
 * @property {Link[]} [assortedLinks] - A collection of assorted standalone links (optional)
 * @property {string} [copyright] - The copyright text displayed at the bottom (optional)
 * @property {string} [testID] - An optional test identifier for testing purposes
 * @property {BrandName} [brand='odido'] - Brand name for the logo
 */
export type FooterProps = {
  columnLinks?: ColumnLink[];
  logo?: React.ReactNode;
  socialLinks?: FooterLink[];
  storeLinks?: FooterLink[];
  assortedLinks?: Link[];
  copyright?: string;
  testID?: string;
  brand?: BrandName;
};
