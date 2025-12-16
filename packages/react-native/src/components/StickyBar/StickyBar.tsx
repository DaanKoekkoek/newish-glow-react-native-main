import { usePropAcrossBreakpoints } from "_global-hooks";
import { useEffect } from "react";

import type { StickyBarProps, StickyBarContentProps } from "./StickyBar.types";
import { useStickyBarContext } from "./StickyBarContext";

const StickyBar = ({
  position = "bottom",
  width = "default",
  layout = "default",
  modal,
  button,
  children,
}: StickyBarProps & StickyBarContentProps) => {
  const { setStickyBarContent } = useStickyBarContext();

  const internalLayout = usePropAcrossBreakpoints(layout);

  useEffect(() => {
    setStickyBarContent({
      position,
      width,
      layout: internalLayout,
      modal,
      button,
      children,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modal, button, children]);

  return null;
};

export { StickyBar };
