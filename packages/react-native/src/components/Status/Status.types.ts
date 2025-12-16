export type StatusType = "success" | "warning" | "error";

/**
 * Props for the Status.
 * @interface StatusProps
 * @property {StatusType} [type] - The size of the Price
 * @property {string} [statusText] - The value of the Price
 * @property {string | undefined} [testID] - Used to locate this view in end-to-end tests.
 */
export interface StatusProps {
  type: StatusType;
  statusText: string;
  testID?: string | undefined;
}
