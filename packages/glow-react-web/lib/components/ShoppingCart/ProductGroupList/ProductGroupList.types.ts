/**
 * Types for Product Group List component
 * @interface ProductGroupListProps
 * @property {React.ReactNode[]} productGroups - Array of product group components
 * Each product group is expected to be a React node, typically containing multiple products
 */
export type ProductGroupListProps = {
  productGroups: React.ReactNode[];
};

/**
 * Props for a Product Group component
 * @interface ProductGroupProps
 * @property {string} title - Title of the product group
 * @property {React.ReactNode[]} products - Array of product components in the group
 */
export type ProductGroupProps = {
  title: string;
  products: React.ReactNode[];
};
