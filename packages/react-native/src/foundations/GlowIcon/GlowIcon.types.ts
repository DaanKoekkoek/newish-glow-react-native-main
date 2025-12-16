import type { IconProps } from "foundations/Icon";

import type { GlowGradientProps } from "../GlowGradient/GlowGradient.types";

export interface GlowIconProps
  extends Omit<IconProps, "style">,
    Omit<GlowGradientProps, "mask"> {}
