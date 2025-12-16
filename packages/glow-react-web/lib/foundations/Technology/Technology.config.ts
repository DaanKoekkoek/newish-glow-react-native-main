import { DSL } from "./assets/DSL";
import { Fiber } from "./assets/Fiber";
import { KlikKlaar } from "./assets/KlikKlaar";
import { InternetTv } from "./assets/InternetTv";

import { TechnologyName, Technologies } from "./Technology.types";

/**
 * Centralized addon configuration.
 * This defines all available addon names and their corresponding SVG components.
 */
export const technologyDefault = {
  DSL: DSL,
  Fiber: Fiber,
  "Klik & Klaar": KlikKlaar,
  "Internet + TV": InternetTv,
} as const;

export const technologyName = Object.keys(
  technologyDefault,
) as TechnologyName[];

export const technologies: Technologies = technologyDefault;
