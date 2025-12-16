import React from "react";
import type { ButtonProps } from "components/Button";

/**
 * Props for the DropdownPanel component.
 * @property {boolean} [animated='false'] - Whether to stagger animate its children.
 * @property {boolean} [maxHeight='false'] - Sets a max-height to prevent contents from overflowing outside of the available viewport height.
 * @property {string} [testID='dropdown-panel'] - testID applied on the container of the dropdown panel.
 * @property {string} [className] - Additional className to overrule the styling. Applied on the container.
 * @property {DropdownPanelCornerPosition} [cornerPosition='right'] - Determines which top corner is squared off.
 * @property {React.ReactNode} [children] - The top content of the dropdown panel.
 * @property {React.ReactNode} [footerChildren] - The bottom content of the dropdown panel. Placed above `callToAction`.
 * @property {ButtonProps<React.ElementType>} [callToAction] - Renders a button at bottom of the dropdown panel.
 */
export type DropdownPanelProps = {
  animated?: boolean;
  maxHeight?: boolean;
  testID?: string;
  className?: string;
  cornerPosition?: "left" | "right";
  children?: React.ReactNode;
  footerChildren?: React.ReactNode;
  callToAction?: ButtonProps<React.ElementType>;
};
