export type BadgeStatusVariant = "default" | "success" | "error";

export type BadgeStatusSize = "default" | "sm";

interface BadgeStatusTextProps {
  count: number;
  variant?: BadgeStatusVariant;
  size?: BadgeStatusSize;
  testID?: string | undefined;
}
interface BadgeStatusIconProps {
  count?: never;
  variant?: BadgeStatusVariant;
  size?: BadgeStatusSize;
  testID?: string | undefined;
}

export type BadgeStatusProps = BadgeStatusTextProps | BadgeStatusIconProps;
