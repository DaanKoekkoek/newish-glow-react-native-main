import { SectionProps, SectionTitle } from "foundations/Section/Section.types";
import { GridProps } from "../Grid";

/**
 * Represents the background color of the MySection
 * @type {"default" | "subtle" | "emphasised" | "image"}
 */
export type MySectionVariant = "default" | "subtle" | "emphasised" | "image";

export type MySectionType = "my" | "my-sidebar";

/**
 * Represents the grid-layout of the MySection
 * @type {MySectionTitle}
 * @extends {SectionTitle}
 */
export type MySectionTitle = SectionTitle;

/**
 * MySection props
 * @interface MysectionProps
 * @extends {Omit<SectionProps, "type" | "paddingBottom">}
 * @property {MySectionTitle} [title] - Title of the MySection
 * @property {MySectionType} [type='my'] - Grid layout variant of the MySection
 */
export interface MySectionProps
  extends Omit<SectionProps, "type" | "paddingBottom" | "paddingTop"> {
  title?: MySectionTitle;
  paddingTop?: boolean;
}

/**
 * MySectionGridProps props
 * @interface MySectionGridProps
 * @extends {Pick<GridProps, "direction">}
 * @property {React.ReactNode | React.ReactNode[]} children - Children of the MySectionGrid. Wrapped inside a Column.
 * @property {MyGridType} type - Grid layout type
 */
export interface MySectionGridProps
  extends Pick<GridProps, "direction" | "columnSize"> {
  children: React.ReactNode | React.ReactNode[];
}
