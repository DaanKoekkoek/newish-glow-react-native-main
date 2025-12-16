import type { StackProps } from "foundations/Stack";
import type React from "react";

/**
 * Base footer props shared across children
 * @interface BaseFooterProps
 * @property {React.ReactElement | React.ReactElement[]} [children] - Accepts one or multiple children
 */
export interface BaseFooterProps {
  children: React.ReactElement | React.ReactElement[];
}

/**
 * Footer component for displaying links at the bottom of the page.
 * @interface FooterProps
 * @extends {BaseFooterProps}
 */
export interface FooterProps extends BaseFooterProps {}

/**
 * Footer component for displaying links and additional information at the bottom of the page.
 * @interface FooterBottomProps
 * @extends {Partial<BaseFooterProps>}
 * @property {string} [copyright] - Additional copyright text
 */
export interface FooterBottomProps extends Partial<BaseFooterProps> {
  copyright: string;
}

/**
 * Breadcrumb path shown above the footer
 * @interface FooterBreadcrumbProps
 * @extends {BaseFooterProps}
 */
export interface FooterBreadcrumbProps extends BaseFooterProps {}

/**
 * Footer grid properties
 * @interface FooterGridProps
 * @extends {Partial<Pick<StackProps, "justifyContent">>, BaseFooterProps} - uses Stack's justifyContent to allow column alignment
 */
export interface FooterGridProps
  extends Partial<Pick<StackProps, "justifyContent">>,
    BaseFooterProps {}

/**
 * Footer grid properties
 * @interface FooterGridColumnProps
 * @extends {BaseFooterProps}
 * @property {boolean} [collapsible='false'] - Whether the column should be collapsed in on mobile and mobileSmall breakpoints
 * @property {string} [title] - The title of the column
 */
export interface FooterGridColumnProps extends BaseFooterProps {
  collapsible?: boolean;
  title?: string;
}
