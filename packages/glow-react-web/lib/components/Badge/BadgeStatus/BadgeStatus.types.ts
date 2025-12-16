import { IconNames } from "foundations/Icon";

export type BadgeStatusSize = "sm" | "default";

export type BadgeStatusType = "default" | "icon";

export type BadgeStatusVariant = "default" | "success" | "error";

export type BadgeStatusProps = {
  variant?: BadgeStatusVariant;
  count?: number;
  size?: BadgeStatusSize;
  testID?: string;
  type?: BadgeStatusType;
  className?: string;
  icon?: IconNames;
};
