import { Dimensions } from "react-native";

import { type Coord, type PopoverConfig, type PopoverDimension } from "./types";

/**
 * based on the popup config and the owner component position this calculate the position and the size for the popup
 *
 * @param ownerSize - Owner size properties
 * @param offset - StatusBar size in (android | ios) and scrollY position on web
 * @param config
 */
export function getDockingPos(
  ownerSize: Coord,
  offset: number,
  config?: PopoverConfig,
): PopoverDimension {
  let ops = {};

  const windowDimensions = Dimensions.get("window");
  const topOffset = ownerSize.y;
  const bottomOffset = windowDimensions.height - ownerSize.y + ownerSize.height;

  const anchor = {
    left: ownerSize.x,
    right: windowDimensions.width - ownerSize.x - ownerSize.width,
    bottom: ownerSize.y + ownerSize.height - offset,
    top: windowDimensions.height - ownerSize.y + offset,
  };

  const offsetOps =
    topOffset > bottomOffset
      ? {
          bottom: anchor.top,
        }
      : { top: anchor.bottom };

  switch (config?.anchor) {
    case "right":
      ops = { right: anchor.right, ...offsetOps };
      break;
    case "left":
    default:
      ops = { left: anchor.left, ...offsetOps };
  }

  return {
    height: config?.height,
    width: config?.width === "match-owner" ? ownerSize.width : config?.width,
    ...ops,
  };
}
