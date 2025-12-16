import { HeadingRenderType } from "foundations/Heading";
import { Button } from "../Button";

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
 * Set the prominence of the callout.
 * @type {"default" | "subtle"}
 */
export type CalloutProminence = "default" | "subtle";

/**
 * Props for the Callout.
 * @type CalloutProps
 * @property {React.ReactElement} [children] - Children of the callout. Placed underneath the title.
 * @property {CalloutContent} [content='default'] - The accepted content of the callout. Allows description to be rendered when content is set to default, otherwise children is rendered.
 * @property {string} [description] - The description of the callout.
 * @property {string} [className] - Additional class name to be added to the callout.
 * @property {CalloutProminence} [prominence='default'] - The prominence of the callout.
 * @property {CalloutStatus} [status='default'] - The functional style of the callout.
 * @property {CalloutTipPosition} [tipPosition] - The location of the non-rounded corner of the callout.
 * @property {string} [title] - The title of the callout.
 * @property {React.ReactElement<typeof Button>} [buttonPrimary] - The buttons of the callout. Placed underneath the children.
 * @property {React.ReactElement<typeof Button>} [buttonSecondary] - The secondary buttons of the callout. Placed underneath the children.
 * @property {string | undefined} [testID] - Used to locate this view in end-to-end tests.
 */
export type CalloutProps = {
  children?: React.ReactElement;
  content?: CalloutContent;
  description?: string;
  className?: string;
  prominence?: CalloutProminence;
  status?: CalloutStatus;
  tipPosition?: CalloutTipPosition;
  title: string;
  titleAs?: HeadingRenderType;
  buttonPrimary?: React.ReactElement<typeof Button>;
  buttonSecondary?: React.ReactElement<typeof Button>;
  testID?: string | undefined;
};
