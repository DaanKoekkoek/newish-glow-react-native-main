/**
 * Set the status of the callout, reflects on the icon shown and background color
 * @type {"default" | "success" | "warning" | "error"}
 */
export type CalloutStatus = "default" | "success" | "warning" | "error";

/**
 * Set the position of the tip of the callout, default is left bottom
 * @type {"default" | "top"}
 */
export type CalloutTipPosition = "default" | "top";

/**
 * Set the accepted content type of the callout.
 * @type {"default" | "alternate"}
 */
export type CalloutContent = "default" | "alternate";

/**
 * Props for the Callout.
 * @interface CalloutProps
 * @property {string} [title] - The title of the callout.
 * @property {CalloutStatus} [status] - The functional style of the callout.
 * @property {CalloutContent} [content='default'] - The accepted content of the callout. Allows description to be rendered when content is set to default, otherwise children is rendered.
 * @property {CalloutTipPosition} [tipPosition] - The location of the non-rounded corner of the callout.
 * @property {React.ReactElement[]} [triggers] - The buttons of the callout. Placed underneath the children.
 * @property {React.ReactElement} [children] - Children of the callout. Placed underneath the title.
 * @property {string | undefined} [testID] - Used to locate this view in end-to-end tests.
 */
export interface CalloutProps {
  title: string;
  status: CalloutStatus;
  content?: CalloutContent;
  description?: string;
  tipPosition?: CalloutTipPosition;
  triggers?: React.ReactElement[];
  children?: React.ReactElement;
  testID?: string | undefined;
}
