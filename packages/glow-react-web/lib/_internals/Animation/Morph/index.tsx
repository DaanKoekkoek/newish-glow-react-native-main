import { motion } from "framer-motion";
import { MORPH_PRESETS } from "../Animation.configuration";
import { useMorph } from "./hooks";

export type SupportedMorphShapes = "circle" | "square" | "triangle" | "none";

export type MorphProps = {
  size: number;
  ratio: number;
  edgeThreshold?: number;
  startShape?: SupportedMorphShapes;
  endShape?: SupportedMorphShapes;
  middleShape?: SupportedMorphShapes;
  preset?: keyof typeof MORPH_PRESETS;
  className?: string;
};

export function Morph(props: MorphProps) {
  const { size, className } = props;
  const { d } = useMorph(props);

  return (
    <motion.svg width={size} height={size} className={className}>
      <motion.path d={d} />
    </motion.svg>
  );
}
