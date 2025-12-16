import type { SectionInfoProps, SectionVariant } from "foundations/Section";
import type React from "react";

import type { OdidoPalette } from "../../_theming/tokenLoader";
import type { SubscriptionHeroInfoType } from "../SubscriptionHero/SubscriptionHero.types";

/**
 * Represents a different palette type
 * @type {"subscriptionHero" | "section"}
 */
export type TopNavigationPaletteType = "subscriptionHero" | "section";

/**
 * Represents the trigger point to start animating in the title.
 * @interface TopNavigationOffset
 * @property {number} [y] - The y starting position
 * @property {number} [height] - The height of an element
 */
export interface TopNavigationOffset {
  y: number;
  height: number;
}

/**
 * Represents the buttons to the left and right of the title
 * @interface TopNavigationAction
 * @property {React.ReactNode} [left] - The left action
 * @property {React.ReactNode} [right] - The left action
 */
export interface TopNavigationAction {
  left?: React.ReactNode;
  right?: React.ReactNode;
}

/**
 * Props for the TopNavigationProps component.
 * @interface TopNavigationProps
 * @property {string} [title] - The heading of the TopNavigation.
 * @property {boolean} [showTitle] - Whether we should show the title or not.
 * @property {number} [height] - The height of the TopNavigation.
 * @property {boolean} [mirrorColor] - Whether the TopNavigation mirrors the color of the current visible section.
 * @property {SectionVariant} [variant] - The variant of the section,
 * determines the visual emphasis of the navigation bar. Can be 'default', 'subtle', etc.
 * @property {Palette} [palette] - The color palette to use for background styling.
 * Applies specific theme colors to the navigation component.
 * @property {SharedValue<number>} [opacityYOffset] - The vertical scroll position of the content, which is
 * used to calculate the opacity of the navigation component as the user scrolls.
 * @property {TopNavigationAction} [action] - Contains both the left- and right-positioned navigation element of the TopNavigation.
 * @property {TopNavigationPaletteType} [paletteType] - Whether to grab the hero palette or the section palette.
 */
export interface TopNavigationProps {
  title?: string;
  showTitle?: boolean;
  height?: number;
  mirrorColor?: boolean;
  variant?: SectionVariant;
  palette?: OdidoPalette;
  opacityYOffset?: number;
  action?: TopNavigationAction;
  paletteType?: undefined | SubscriptionHeroInfoType;
}

/**
 * Props for the TopNavigation's content
 * @interface TopNavigationContentProps
 * @extends TopNavigationProps
 * @property {{ opacity: number }} [opacityTitleAnimation] - A dynamic opacity value.
 * @property {number} [headingHeight] - The total height of the title
 * @property {(height: number) => void} [onHeadingHeightChange] - The callback that is triggered when the title height has changed.
 */
export interface TopNavigationContentProps extends TopNavigationProps {
  opacityTitleAnimation?: {
    opacity: number;
  };
  headingHeight: number;
  onHeadingHeightChange: (height: number) => void;
}

/**
 * Props for the TopNavigationContext provider.
 * @interface TopNavigationContextProps
 * @property {string} [subscriptionHeroTitle] - The subscription hero title.
 * Is dynamically updated in case there's a subscription hero.
 * @property {TopNavigationOffset} [opacityOffset] - The trigger point in which the opacity
 * changes from 0 to 1 (or the other way around).
 * @property {(text: string) => void} [updateTopNavigationTitle] - Updates `subscriptionHeroTitle`.
 * @property {(offset: TopNavigationOffset) => void} [updateOpacityOffset] - Updates `opacityOffset`.
 * @property {TopNavigationProps | null} [topNavigationContent] - The content passed from `TopNavigation` into `TopNavigationBase`.
 * @property {(content: TopNavigationProps) => void | null} [setTopNavigationContent] - Updates `topNavigationContent`
 * @property {(sectionInfo?: SectionInfoProps[]) => void} [setInitialPaletteColors] - Sets initial palette color on load
 * @property {(SectionInfoProps[])} [sectionInfo] - Contains an array of Section data. Is updated from the Section component.
 * @property {({sectionHeight, sectionVariant, sectionPalette}: SectionInfoProps) => void} [updateSectionInfo] - Updates `sectionInfo`
 * @property {(offsetYPosition: number) => void} [updatePaletteColors] - Dynamically updates current palette color based on scroll Y position.
 * @property {SectionVariant} [topNavigationVariant] - Contains the current variant. Can be updated dynamically when `mirrorColor` is `true`.
 * @property {Palette} [topNavigationPalette] - Contains the current palette. Can be updated dynamically when `mirrorColor` is `true`.
 * @property {boolean} [topNavigationPaletteHero] -  Contains a boolean that checks if the scroll Y position is on a section with a SubscriptionHero.
 * Can be updated dynamically when `mirrorColor` is `true`.
 * @property {(uuid: string) => void} [removeSectionInfo] - Removes a section from `sectionInfo` by its UUID.
 */
export interface TopNavigationContextProps {
  opacityOffset?: TopNavigationOffset;
  yOffset?: number;
  setTopNavigationContent: (content: TopNavigationProps) => void | null;
  setInitialPaletteColors: (sectionInfo?: SectionInfoProps[]) => void;
  setYOffset: (currentOffset: number) => void;
  sectionInfo: SectionInfoProps[];
  subscriptionHeroTitle?: string;
  topNavigationContent?: TopNavigationProps | null;
  topNavigationVariant?: SectionVariant;
  topNavigationPalette?: OdidoPalette;
  topNavigationPaletteHero?: undefined | SubscriptionHeroInfoType;
  updateTopNavigationTitle?: (text: string) => void;
  updateOpacityOffset?: (offset: TopNavigationOffset) => void;
  updateSectionInfo?: ({
    sectionHeight,
    sectionVariant,
    sectionPalette,
  }: SectionInfoProps) => void;
  updatePaletteColors: (offsetYPosition: number) => void;
  removeSectionInfo: (uuid: string) => void;
}
