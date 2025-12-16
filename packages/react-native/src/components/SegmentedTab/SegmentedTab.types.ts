import type { OdidoPalette } from "_theming/tokenLoader";
import type { IconNames } from "foundations/Icon";

/**
 * Represents the props for a SegmentedTab
 * @type {SegmentedTabProps}
 * @property {number} activeTab - The tab in the list of tabs that is set to active
 * @property {(index: number) => void} setActiveTab - Function to set the active tab
 */
export type SegmentedTabProps = {
  activeTab: number;
  setActiveTab: (index: number) => void;
  onTabChange?: (index: number) => void;
};

/**
 * Represents the props for a SegmentedTabButton
 * @type {SegmentedTabButtonProps}
 * @property {Tab[]} options - An array of Tab objects that represent the options.
 * @property {TabVariant} [variant='default'] - style of the tab
 * @property {number} [active=0] - Chosen Tab in the array of tabs, default is 0
 * @property {TabState} [state='default'] - Represents whether the SegmentedTabButton is default or inactive
 */
export type SegmentedTabButtonsProps = {
  options: Tab[];
  variant?: TabVariant;
  active?: number;
  state?: TabState;
  backgroundPalette?: OdidoPalette;
  shadowPalette?: OdidoPalette;
};

/**
 * Represents the props for a SegmentedTabItem
 * @property {Tab} content - content to be displayed on the tab
 * @property {boolean} selected - whether the item is the selected tab
 * @property {TabState} [activeState='default'] - Represents whether the SegmentedTabButton component as a whole is default or inactive
 */
export type SegmentedTabItemProps = {
  content: Tab;
  selected: boolean;
  activeState: TabState;
  variant: TabVariant;
};

/**
 * Represents the props for a SegmentedTabSelector
 * @property {number} active - index of the selected item.
 * @property {TabItemMeasures[]} - array of measurements of each of the tabs.
 * @property {TabState} [activeState='default'] - Represents whether the SegmentedTabButton component as a whole is default or inactive.
 * @property {TabVariant} [variant='default'] - style of the tab.
 * @property {Palette} [palette] - Palette color of the segmented tab.
 */
export type SegmentedTabSelectorProps = {
  active: number;
  tabItemMeasures: TabItemMeasures[];
  activeState: TabState;
  variant: TabVariant;
  palette?: OdidoPalette;
};

/**
 * Represents the props for a SegmentedTabPanel
 * @property {React.ReactNode} child - child containing the content to be displayed on the panel
 * @property {number} index - the index of the panel in relation to the other panels
 */
export type SegmentedTabPanelProps = {
  child: React.ReactNode;
  index: number;
};

/**
 * Represents a Tab
 * @property {string} label - label to be displayed on the tab
 * @property {IconName} icon - icon to be displayed on the tab
 */
export type Tab = {
  label: string;
  icon?: IconNames;
};

/**
 * Represents the measurements of a TabItem
 * @property {number} width - the width of a tab
 * @property {number} x - the x offset of a tab
 */
export type TabItemMeasures = {
  width: number;
  x: number;
};

/**
 * Represents the options available for the state of the tabs
 */
export type TabState = "default" | "inactive";

/**
 * Represents the options available for the styling variants of the tabs
 */
export type TabVariant = "default" | "subtle";
