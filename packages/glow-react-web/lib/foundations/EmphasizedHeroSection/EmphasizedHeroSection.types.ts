import type { HeroProps } from "components/Hero";

/**
 * Represents the background variant of the emphasized hero section.
 * @type {"default" | "emphasised" | "subtle" | "custom"}
 */
export type EmphasizedBackgroundType =
  | "default"
  | "emphasised"
  | "subtle"
  | "custom";

/**
 * Props for the EmphasizedHeroSection component.
 * @type EmphasizedHeroSectionProps
 * @extends {Partial<Pick<HeroProps, "testID" | "palette" | "order">>}
 * @property {React.ReactElement} children - Accepts a `<EmphasizedHero />` component.
 * @property {EmphasizedBackgroundType} [background='default'] - The background of the emphasized hero section.
 * @property {React.ReactNode} [custom] - Is displayed when `background` is set to `custom`.
 */
export type EmphasizedHeroSectionProps = Partial<
  Pick<HeroProps, "testID" | "palette" | "order">
> & {
  children: React.ReactElement;
  background?: EmphasizedBackgroundType;
  custom?: React.ReactNode;
};
