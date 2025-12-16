export const linearGradientVariants = [
  "Linear1",
  "Linear2",
  "Linear3",
  "Linear4",
] as const;

export const glowGradientVariants = [
  "Glow1",
  "Glow2",
  "Glow3",
  "Glow4",
] as const;

export const gradientVariants = [
  ...linearGradientVariants,
  ...glowGradientVariants,
] as const;
