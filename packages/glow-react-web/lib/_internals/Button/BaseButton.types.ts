import type { IconProps } from "foundations/Icon";
import type { BreakpointKey } from "_theming/breakpoints";

/**
 * Represents the position of the icon within a button.
 * @type {"left" | "right"}
 */
export type BaseButtonIconPosition = "left" | "right";

/**
 * Represents the prominence styling options for a base button.
 * @type {"default" | "emphasised" | "secondary"}
 */
export type BaseButtonProminence = "default" | "emphasised" | "secondary";

/**
 * Represents the prominence styling options specifically for status buttons.
 * @type {"default" | "secondary"}
 */
export type BaseStatusButtonProminence = "default" | "secondary";

/**
 * Represents the different sizes available for a base button.
 * @type {"default" | "sm" | "lg"}
 */
export type BaseButtonSize = "default" | "sm" | "lg";

/**
 * Represents the different states a base button can be in.
 * @type {"default" | "loading" | "inactive"}
 */
export type BaseButtonState = "default" | "loading" | "inactive";

/**
 * Represents the polymorphic `as` prop allowing rendering as different elements.
 * @template C - The React element type.
 */
type AsProp<C extends React.ElementType> = {
  as?: C;
};

/**
 * Utility type to extract keys to omit from props based on element type and props.
 * @template C - The React element type.
 * @template P - Props type.
 */
type PropsToOmit<C extends React.ElementType, P> = keyof (AsProp<C> & P);

/**
 * Props for polymorphic components combining own props with native props minus omitted keys.
 *
 * @template C - The React element type.
 * @template Props - Additional props specific to the component.
 */
type PolymorphicComponentProps<
  C extends React.ElementType,
  Props = Record<string, unknown>,
> = Props &
  AsProp<C> &
  Omit<React.ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>;

export type FillPerBreakpoint = {
  [Breakpoint in BreakpointKey]?: boolean;
};

/**
 * Boolean properties for StatusBaseButton and BaseButton
 * @type ButtonBooleanProps
 * @property {boolean} [fill='false'] - Applies a width of 100% to the button.
 * @property {boolean} [stretched='false'] - Adds an ::after layer to spans to its relative container.
 * @property {boolean} [ignoreStretched='false'] - Adds a higher z-index in case there's a sibling button with `stretched` set to `true`.
 * @property {boolean} [inverted='false'] - Applies inverted styling
 */
export type ButtonBooleanProps = {
  fill?: boolean | FillPerBreakpoint;
  stretched?: boolean;
  ignoreStretched?: boolean;
  inverted?: boolean;
};

/**
 * Props for the icon within a base button, excluding size which is controlled separately.
 * @typedef BaseButtonIconProps
 * @property {BaseButtonIconPosition} [position] - Position of the icon relative to the button text.
 */
export type BaseButtonIconProps = Omit<IconProps, "size" | "palette"> & {
  position?: BaseButtonIconPosition;
};

/**
 * Status values for a base status button.
 * @type {"success" | "error" | "warning" | "information"}
 */
export type BaseStatusButtonStatus =
  | "success"
  | "error"
  | "warning"
  | "information";

// Polymorphic ref type resolves to the correct DOM element for `C`
export type PolymorphicRef<C extends React.ElementType> =
  React.ComponentPropsWithRef<C>["ref"];

/**
 * Shared props for buttons supporting polymorphism.
 *
 * @template C - The React element type.
 */
export type SharedButtonProps<C extends React.ElementType> =
  PolymorphicComponentProps<
    C,
    {
      as?: C;
      icon?: BaseButtonIconProps;
      size?: BaseButtonSize;
      state?: BaseButtonState;
      className?: string;
      children?: React.ReactNode;
      testID?: string;
      ariaLabel?: string;
      ref?: PolymorphicRef<C>;
    }
  >;

/**
 * Props for the base button component.
 *
 * @template C - The React element type, default is "button".
 */
export type BaseButtonProps<C extends React.ElementType = "button"> =
  PolymorphicComponentProps<
    C,
    SharedButtonProps<C> &
      ButtonBooleanProps & {
        /** Prominence styling for status button */
        prominence?: BaseButtonProminence;
      }
  >;

/**
 * Props for the base status button component.
 *
 * @template C - The React element type, default is "button".
 */
export type BaseStatusButtonProps<C extends React.ElementType = "button"> =
  PolymorphicComponentProps<
    C,
    SharedButtonProps<C> &
      ButtonBooleanProps & {
        /** Status of the button */
        status?: BaseStatusButtonStatus;
        /** Prominence styling for status button */
        prominence?: BaseStatusButtonProminence;
      }
  >;
