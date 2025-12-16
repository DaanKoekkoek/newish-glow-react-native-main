import { OdidoPalette } from "_internals/Color";
import { type IconProps } from "foundations/Icon";

export type SnackBarActionType = "dismiss" | "pause" | "resume";
export type SnackbarPosition = "top" | "bottom";
export type SnackbarItemStatusType =
  | "default"
  | "error"
  | "loading"
  | "success";
export type SnackbarItemIconPropsType = Pick<IconProps, "name" | "solid">;

export interface Snack {
  type: SnackbarItemStatusType;
  id: string;
  message: string;
  cancelButtonText?: string;
  ariaLabel?: string;
  icon?: SnackbarItemIconPropsType;
  duration?: number;
  position?: SnackbarPosition;
  height?: number;
  width?: number;
  onDismiss?: (id: string | number) => void;
  palette?: OdidoPalette;
}

export type SnackOptions = Partial<
  Pick<
    Snack,
    | "id"
    | "type"
    | "message"
    | "cancelButtonText"
    | "icon"
    | "ariaLabel"
    | "duration"
    | "position"
    | "onDismiss"
    | "palette"
  >
>;
