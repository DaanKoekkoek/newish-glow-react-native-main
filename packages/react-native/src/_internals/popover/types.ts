import type { MutableRefObject, ReactNode } from "react";
import type { View } from "react-native";

export const POPOVER_EVENT = "glow-popover";

export type PopoverEvent =
  | {
      action: "open";
      id: string;
      owner: MutableRefObject<View>;
      node: ReactNode;
      config: PopoverConfig;
    }
  | { action: "close"; id: string };

export type PopoverConfig = {
  width?: "match-owner" | number;
  height?: number;
  anchor?: "left" | "right";
  onClose?: () => void;
};

export type PopoverDimension = {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
  height?: number;
  width?: number;
};

export type Coord = {
  x: number;
  y: number;
  height: number;
  width: number;
};
