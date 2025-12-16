import { useEffect } from "react";

import type { TopNavigationProps } from "./TopNavigation.types";
import { useTopNavigationContext } from "./TopNavigationContext";

const TopNavigation = ({
  title,
  showTitle,
  height,
  action,
  mirrorColor,
  palette,
  paletteType,
  variant,
  opacityYOffset,
}: TopNavigationProps) => {
  const { setTopNavigationContent } = useTopNavigationContext();

  useEffect(() => {
    setTopNavigationContent({
      title,
      showTitle,
      height,
      mirrorColor,
      variant,
      palette,
      paletteType,
      opacityYOffset,
      action,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [action]);

  return null;
};

export { TopNavigation };
