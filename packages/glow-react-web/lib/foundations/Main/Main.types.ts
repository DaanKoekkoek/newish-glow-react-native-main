/**
 * Props for the Main component.
 * @interface MainProps
 * @property {React.ReactNode | React.ReactNode[]} [children] - The content to be rendered inside the main element.
 * @property {React.ReactElement} [header] - Should be a `Header` component.
 * @property {React.ReactElement} [footer] - Should be a `Footer` component.
 */
export interface MainProps {
  children: React.ReactNode | React.ReactNode[];
  header?: React.ReactElement;
  footer?: React.ReactElement;
}
