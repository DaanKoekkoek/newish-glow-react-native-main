export function positionToClassName(position: string): string {
  return `image-position-${position.replace(/\s+/g, "-")}`;
}
