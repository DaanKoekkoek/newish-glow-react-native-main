import type React from "react";

export type StrongSize = "xxs" | "xs" | "sm" | "default" | "lg";

export type StrongAlignment = "left" | "center" | "right";

/**
 * Props interface for the Strong component.s
 * @interface StrongProps
 * @property {React.ReactNode} [children] - The text content of strong.
 * @property {string} [className] - Additional CSS class to apply
 * @property {StrongSize} [size='default'] - Size for strong
 * @property {string} [testID='strong'] - TestID applied on the strong tag
 */
export interface StrongProps {
  children?: React.ReactNode;
  className?: string;
  size?: StrongSize;
  alignment?: StrongAlignment;
  testID?: string;
}
