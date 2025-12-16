import { OdidoPalette } from "_internals/Color";
import { ButtonProps, PriceProps } from "..";
import React from "react";
import { IconNames } from "foundations/Icon";

/**
 * Represents the usage type
 * @type {"default" | "budget"}
 */
export type WidgetType = "default" | "budget";

/**
 * Represents the data type (only applicable when `type` is set to `default`)
 * @type {"data" | "minutes" | "minutes+sms" | "sms" | "internet-speed"}
 */
export type WidgetBundleType =
  | "data"
  | "minutes"
  | "minutes+sms"
  | "sms"
  | "internet-speed";

/**
 * Represents the internet-speed in units. Only applicable when `bundleType` is set to `internet-speed`
 * @type {"Mbit" | "Gbit"}
 */
export type WidgetVariant = "Mbit" | "Gbit";

/**
 * Represents `BundleWidget` properties.
 * @type {BundleWidgetProps}
 * @property {number} remaining - The remaining amount in the bundle.
 * @property {BundleType} bundleType - The unit for the amount, e.g., megabytes or gigabytes.
 * @property {WidgetVariant} [variant='Mbit'] - Only used when `bundleType` is set to `internet-speed`.
 * @property {number} [total] - The total amount of the bundle available (optional).
 * @property {OdidoPalette} [palette='default'] - Palette color
 * @property {IconNames} [icon='unlimited'] - Displays an icon before the `title`.
 * @property {string} [title] - The title or label displayed for the bundle.
 * @property {React.ReactNode} [description] - The description displayed under `title`.
 * @property {boolean} [showIcon=false] - Whether to display an accompanying icon.
 * @property {WidgetType} [type="default"] - The visual type of the widget.
 * @property {PriceProps} [price] - Optional price component to show next to the bundle.
 * @property {ButtonProps<React.ElementType>} [button] - Optional button component for action handling.
 * @property {string} [testID='bundle-widget'] - TestID applied on the container of the bundle widget.
 */
export type BundleWidgetProps = {
  remaining: number;
  bundleType: WidgetBundleType;
  variant?: WidgetVariant;
  total?: number;
  palette?: OdidoPalette;
  icon?: IconNames;
  title?: string;
  description?: React.ReactNode;
  showIcon?: boolean;
  type?: WidgetType;
  price?: PriceProps;
  button?: ButtonProps<React.ElementType>;
  testID?: string;
};
