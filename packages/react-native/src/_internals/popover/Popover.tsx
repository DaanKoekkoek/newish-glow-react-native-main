import type { FC, MutableRefObject, PropsWithChildren } from "react";
import { useEffect } from "react";
import type { View } from "react-native";

import { usePopover } from "./hooks";
import type { PopoverConfig } from "./types";

type PopoverProps = {
  isVisible?: boolean;
  ownerRef: MutableRefObject<unknown>;
  onClose?: PopoverConfig["onClose"];
} & Omit<PopoverConfig, "onClose">;

/**
 * Popover - it will transfer the react node passed as children to the
 * popover host. if visible is true popover host will display the component on the screen
 *
 * NOTE: on native app if the popover height is larger than screen size,
 * Screen will crop the popover - the best use case for the popover is to
 * use it for tooltip and very simple stuff. please use Modal if the
 * component that you want to show on the screen is or may be larger
 * than the screen itself.
 *
 */
export const Popover: FC<PropsWithChildren<PopoverProps>> = ({
  ownerRef,
  isVisible,
  children,
  onClose,
  ...config
}) => {
  const popover = usePopover(ownerRef as MutableRefObject<View>, {
    ...config,
    onClose,
  });
  useEffect(() => {
    if (isVisible) {
      popover.open(children);
    } else {
      popover.close();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);

  return null;
};
