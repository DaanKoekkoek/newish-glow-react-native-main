export type StatusType = "success" | "warning" | "error";

/**
 * Props for the Status.
 * @interface StatusProps
 * @property {StatusType} type - Color of the Status
 * @property {string} statusText - The value of the Status
 * @property {string} testID - Used to locate this view in end-to-end tests.
 */

export interface StatusProps {
  type: StatusType;
  statusText: string;
  testID?: string;
}
