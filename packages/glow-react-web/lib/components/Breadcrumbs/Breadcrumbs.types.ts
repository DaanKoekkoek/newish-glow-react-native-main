import { TextLinkAsAnchor } from "components/TextLink";

/**
 * Props for the Breadcrumbs.
 * @interface BreadcrumbsProps
 * @property {BreadcrumbItemProps[]} items - List of items to be displayed in Breadcrumbs
 */

export interface BreadcrumbsProps {
  items: BreadcrumbItemProps[];
}

/**
 * Props for the BreadcrumbItem.
 * @interface BreadcrumbItemProps
 * @property {string} name - Name of breadcrumb
 * @property {function} [onClick] - Callback for when the breadcrumb is clicked.
 */
export interface BreadcrumbItemProps
  extends Pick<TextLinkAsAnchor, "onClick" | "href"> {
  name: string;
  testID?: string;
}
