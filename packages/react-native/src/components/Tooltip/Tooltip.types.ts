export type ToolTipPosition =
  | "default"
  | "topLeft"
  | "topRight"
  | "bottomLeft"
  | "bottomRight";
export interface TooltipProps {
  description: string;
  children?: React.ReactElement | React.ReactElement[];
  animated?: boolean;
  closeIcon?: boolean;
  testID?: string;
  posHorizontal?: "Left" | "Right";
}

export type Coord = {
  x: number;
  y: number;
  height: number;
  width: number;
};
