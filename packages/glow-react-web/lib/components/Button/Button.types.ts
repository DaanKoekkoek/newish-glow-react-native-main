import type { BaseButtonProps, BaseStatusButtonProps } from "_internals/Button";

/**
 * Props for the Button component.
 * @template C - React element type, default is "button".
 * @typedef {BaseButtonProps<C extends React.ElementType = "button">} ButtonProps
 */
export type ButtonProps<C extends React.ElementType> = BaseButtonProps<C>;

/**
 * Props for the StatusButton component.
 * @template C - React element type, default is "button".
 * @typedef {BaseStatusButtonProps<C extends React.ElementType = "button">} StatusButtonProps
 */
export type StatusButtonProps<C extends React.ElementType = "button"> =
  BaseStatusButtonProps<C>;
