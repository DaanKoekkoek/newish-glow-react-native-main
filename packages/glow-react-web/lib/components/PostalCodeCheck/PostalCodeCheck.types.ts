import { OdidoPalette } from "_internals/Color";
import { Button } from "components/Button";
import { CalloutProps } from "components/Callout";
import { SegmentedTabButtonsProps } from "components/SegmentedTab";
import type { TechnologyName } from "foundations/Technology";
import { ReactElement } from "react";

/**
 * Represents a title and descriptive text block.
 * @type PostalCodeDefinitionList
 * @property {string} title - The label or heading for the definition item.
 * @property {string} text - The descriptive content associated with the title.
 */
export type PostalCodeDefinitionList = {
  title: string;
  text: string;
};

/**
 * Represents a postal code address with optional edit capabilities.
 * @type PostalCodeAddress
 * @extends PostalCodeDefinitionList
 * @property {{ text: string; onClick: () => void; }} [editable] - Optional edit link configuration.
 */
export type PostalCodeAddress = PostalCodeDefinitionList & {
  editable?: {
    text: string;
    onClick: () => void;
  };
};

/**
 * Layout variants for rendering promo content.
 * @type {"default" | "inside"}
 */
export type PostalCodePromo = "none" | "default" | "inside";

/**
 * Represents the state of the Postal Code check.
 * @type {("information" | "success")}
 */
export type PostalCodeCheckState = "information" | "success";

/**
 * @type PostalCodeOutputProps
 * @property {PostalCodeCheckState} state - State of the postal code output.
 * @property {TechnologyName} technology - The technology icon.
 * @property {PostalCodeAddress} address - Address of the user, along with the option to reset it.
 * @property {string} [title] - Title rendered next to `technology`.
 * @property {string | React.ReactNode} [description] - Additional description rendered underneath the `title`.
 * @property {React.ReactNode} [callToAction] - Additional call to action slot, intended for `TextLink` or `Button` components only.
 * @property {React.ReactNode} [children] - Additional children, changes position when `promo` is set.
 * @property {PostalCodePromo} [promo='none'] - Renders children: 'none' (hidden), 'default' (outside container), or 'inside' (inside container).
 * @property {PostalCodeDefinitionList} [watchTv] - Renders a `DescriptionList` with the option to set the title and text.
 */
export type PostalCodeOutputProps = {
  state: PostalCodeCheckState;
  technology: TechnologyName;
  address: PostalCodeAddress;
  title?: string;
  description?: string | React.ReactNode;
  callToAction?: React.ReactNode;
  children?: React.ReactNode;
  promo?: PostalCodePromo;
  watchTv?: PostalCodeDefinitionList;
};

/**
 * Represents the state of the PostalCodeCheckInput
 * @type {"error" | "warning" | "none"}
 */
export type PostalCodeCheckInputState = "error" | "warning" | "none";

/**
 * Represents the variant of the PostalCodeCheckInput
 * @type {"error" | "warning" | "default"}
 */
export type PostalCodeCheckInputVariant = "default" | "overlay";

/**
 * Type for TV section properties
 *
 * @type TvSectionProps
 * @property {string} title - Title for tv section.
 * @property {string} description - Description for tv section.
 */
export type TvSectionProps = {
  title: string;
  description: string;
} & Pick<SegmentedTabButtonsProps, "onTabChange" | "options">;

/**
 * A component that wraps postcode check inputs with structured UI and logic.
 * Used to display a form where users can check availability based on postcode data.
 *
 * @type PostalCodeCheckInputProps
 * @property {string} title - The heading displayed at the top of the component.
 * @property {PostalCodeCheckInputState} state - The current state of the input block (used for validation styling).
 * @property {number} marker - A marker number used for visual indicator.
 * @property {string | React.ReactElement} description - A description shown under the title; supports plain text or custom elements.
 * @property {string} buttonLabel - Label for submit button at bottom of the component.
 * @property {callback} onClick - Handler for button at bottom of the component.
 * @property {PostalCodeCheckInputVariant} variant - The layout variant of the component.
 * @property {TvSectionProps} tvSectionProps - Props for TV section.
 * @property {Pick<CalloutProps, "title" | "description">} calloutProps - Props for call out.
 * @property {OdidoPalette} palette - A theme palette object used for custom styling.
 */
export type PostalCodeCheckInputProps = {
  title: string;
  marker: number;
  description: string | React.ReactElement;
  callToActionButton: ReactElement<typeof Button>;
  state?: PostalCodeCheckInputState;
  tvSectionProps?: TvSectionProps;
  calloutProps?: Pick<CalloutProps, "title" | "description">;
  variant?: PostalCodeCheckInputVariant;
  palette?: OdidoPalette;
  children: React.ReactNode;
};
