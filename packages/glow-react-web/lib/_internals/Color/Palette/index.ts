export const OdidoPalette = [
  "default",
  "blue",
  "green",
  "orange",
  "pink",
  "purple",
  "red",
  "yellow",
] as const;

export type OdidoPalette = (typeof OdidoPalette)[number];

export const SimWalletPalette = [
  "default",
  "basic",
  "fast",
  "fastest",
  "neutral",
] as const;

export type SimWalletPalette = (typeof SimWalletPalette)[number];
