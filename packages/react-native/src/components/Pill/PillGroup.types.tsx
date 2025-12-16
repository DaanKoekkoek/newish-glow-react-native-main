import type { PillProps } from "./Pill.types";

/**
 * Pill element type.
 * @type {React.ReactElement<PillProps>}
 */
export type PillElement = React.ReactElement<PillProps>;

/**
 * Props for the PillGroup component.
 * @interface PillGroupProps
 * @property {boolean} [disabled] - Specifies whether the all pills inside this group is disabled.
 * @property {PillElement[] | PillElement} [children] - The Pill elements to be controlled by the group.
 */
export interface PillGroupProps {
  disabled?: boolean;
  children?: PillElement[] | PillElement;
}
