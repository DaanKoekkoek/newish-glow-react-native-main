/**
 * Props for stepper step's spacer (dotted lines)
 * @type DottedLineProps
 * @property {boolean} [active] - Whether the dotted lines should be active or inactive.
 * @property {"horizontal" | "vertical"} [direction='horizontal'] - The direction of the dotted line.
 */
export type DottedLineProps = {
  active?: boolean;
  direction?: "horizontal" | "vertical";
};
