import { OdidoPalette } from "_internals/Color";
import { IconNames } from "foundations/Icon";
import { StrictArray } from "../../@types/types";

export type TabState = "default" | "inactive";

export type TabContent = {
  label: string;
  icon?: IconNames;
};

export type TabVariant = "default" | "subtle";

export type TabOption = {
  id: number;
  panel: React.ReactNode;
};

export type TabOptionArray =
  | StrictArray<TabOption, 2>
  | StrictArray<TabOption, 3>;

export type ButtonOption = {
  id: number;
  tab: TabContent;
};

export type ButtonOptionArray =
  | StrictArray<ButtonOption, 2>
  | StrictArray<ButtonOption, 3>;

export interface SegmentedTabProps {
  active?: number;
  uuid: string;
}

export interface SegmentedTabPanelsProps extends SegmentedTabProps {
  options: TabOptionArray;
}

export interface SegmentedTabButtonsProps extends SegmentedTabProps {
  options: ButtonOptionArray;
  state?: TabState;
  variant?: TabVariant;
  backgroundPalette?: OdidoPalette;
  shadowPalette?: OdidoPalette;
  onTabChange: (activeTab: number) => void;
}
