import { useFontFamily } from "_global-hooks";
import { Text } from "react-native";
import { useStyles } from "react-native-unistyles";

import { titleStyles } from "./Title.styles";
import type { TitleProps } from "./Title.types";

export const Title = ({ size, state, text }: TitleProps): JSX.Element => {
  const isXs = size === "xs";
  const isSm = size === "sm";
  const isLg = size === "lg";
  const isXl = size === "xl";
  const isInactive = state === "inactive";

  const fontFamily = useFontFamily("Heading_Medium");

  const { styles } = useStyles(titleStyles, {
    isXs,
    isSm,
    isLg,
    isXl,
    isInactive,
  });

  return <Text style={[{ fontFamily }, styles.title]}>{text}</Text>;
};
