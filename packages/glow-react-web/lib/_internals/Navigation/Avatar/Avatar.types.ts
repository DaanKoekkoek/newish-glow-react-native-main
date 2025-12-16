import { OdidoPalette } from "_internals/Color";

type AvatarSize = "default" | "sm";

/**
 * Represents the properties for the `Avatar` component.
 * @type {AvatarProps}
 * @property {React.ReactNode} children - The content inside the avatar, typically text.
 * @property {string} [className] - Optional additional class names to apply custom styles to the avatar.
 * @property {string} [testID='avatar'] - testID applied on the container.
 * @property {OdidoPalette} [palette] - Renders a glow gradient background based on the given palette.
 * @property {AvatarSize} [size='default'] - Set the size of the avatar
 */
export type AvatarProps = {
  children: React.ReactNode;
  className?: string;
  testID?: string;
  palette?: OdidoPalette;
  size?: AvatarSize;
};
