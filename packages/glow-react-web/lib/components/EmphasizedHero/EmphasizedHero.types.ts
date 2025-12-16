import type { HeroProps } from "components/Hero";
import type { EmphasizedHeroSectionProps } from "foundations/EmphasizedHeroSection";

/**
 * Props for the EmphasizedHeroProps component.
 * @type EmphasizedHeroProps
 * @extends {Omit<HeroProps, "layout" | "variant">}
 * @property {EmphasizedHeroSectionProps["background"]} [background='default'] - If set to `default`, renders `<GlowGradient />` on the mobile breakpoint.
 * @property {React.ReactElement} [countdown] - Displays a `<Countdown />` above the `heading`.
 */
export type EmphasizedHeroProps = Omit<HeroProps, "layout" | "variant"> & {
  background?: EmphasizedHeroSectionProps["background"];
  countdown?: React.ReactElement;
};
