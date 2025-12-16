import { VisualProps } from "./Visual.types";
import styles from "./Visual.module.scss";

export function fillToCssClass(fill: VisualProps["fill"]) {
  return (fill ?? []).map((key) => styles[`fill-${key}`]);
}
