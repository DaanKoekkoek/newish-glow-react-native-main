import { technologyDefault } from "./Technology.config";

/**
 * A valid technology name derived from the `technologyDefault` mapping.
 * @type TechnologyName
 */
export type TechnologyName = keyof typeof technologyDefault;

/**
 * Component renderer function for a specific technology.
 * @type TechnologyNameProps
 * @param {Record<string, string>} props - Component props.
 * @returns {JSX.Element} - Rendered JSX for the technology.
 */
export type TechnologyNameProps = (
  props: Record<string, string>,
) => JSX.Element;

/**
 * Mapping of technology names to their corresponding component renderers.
 * @type Technologies
 * @property {(props: Record<string, string>) => JSX.Element} [TechnologyName] - Renderer for the technology.
 */
export type Technologies = Record<TechnologyName, TechnologyNameProps>;

/**
 * Available visual states for a technology.
 * @type {"information" | "success"}
 */
export type TechnologyState = "information" | "success";

/**
 * Props for the Technology component.
 * @type TechnologyProps
 * @property {TechnologyState} state - The visual state of the technology badge.
 * @property {TechnologyName} type - The type of technology to render.
 * @property {string} [testID] - Optional test ID for testing purposes.
 */
export type TechnologyProps = {
  state: TechnologyState;
  type: TechnologyName;
  testID?: string;
};
