import { debounce } from "_utility";
import React, {
  type MutableRefObject,
  type ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  DeviceEventEmitter,
  Platform,
  StatusBar,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

import { useIosStatusBarHeight } from "./hooks";
import {
  POPOVER_EVENT,
  type Coord,
  type PopoverConfig,
  type PopoverEvent,
} from "./types";
import { getDockingPos } from "./utils";

type State = {
  id: string;
  owner?: MutableRefObject<View>;
  node?: ReactNode;
  config?: PopoverConfig;
  ownerCoord: Coord;
};

export const PopoverHost = () => {
  const [state, update] = useState<State>();

  const { styles } = useStyles(stylesheet);
  const iosStatusBarHeight = useIosStatusBarHeight();

  const close = useCallback(() => {
    state?.config?.onClose?.();
    update(undefined);
  }, [state?.config]);

  const measureUpdate = useCallback(() => {
    if (state?.owner) {
      measure(state?.owner).then((ownerCoord) => {
        state?.config?.onClose?.();
        update((p) => ({ ...p, ownerCoord }) as State);
      });
    }
  }, [state?.config, state?.owner]);

  const handler = useCallback(
    (e: PopoverEvent) => {
      switch (e.action) {
        case "open":
          measure(e.owner).then((ownerCoord) => {
            state?.config?.onClose?.();
            update((p) => ({
              ...p,
              ...e,
              ownerCoord,
            }));
          });
          break;
        case "close":
          close();
          break;
      }
    },
    [state, close],
  );

  useEffect(() => {
    const sub = DeviceEventEmitter.addListener(POPOVER_EVENT, handler);
    return () => sub?.remove?.();
  }, [handler]);

  useEffect(() => {
    if (Platform.OS !== "web") return;

    const handle = (e: MouseEvent) => {
      const container = document.getElementById("glow-popup-container");
      const owner = state?.owner?.current as unknown as HTMLElement;

      if (!e.target || !owner || !container) {
        return;
      }
      if (
        !owner.contains(e.target as Node) &&
        !container.contains(e.target as Node)
      ) {
        close();
      }
    };

    window.addEventListener("click", handle);
    window.addEventListener("resize", debounce(measureUpdate, 300));
    return () => {
      window.removeEventListener("click", handle);
      window.addEventListener("resize", debounce(measureUpdate, 300));
    };
  }, [state?.owner, close, measureUpdate]);

  if (!state || !state?.node) return null;

  const offset = Platform.select({
    ios: iosStatusBarHeight,
    android: StatusBar.currentHeight ?? 0,
    web: -window.scrollY,
    default: 0,
  });

  const position = getDockingPos(state.ownerCoord, offset, state.config);

  return Platform.select({
    web: (
      <View id="glow-popup-container" style={[styles.menu, position]}>
        {state.node}
      </View>
    ),
    // TODO: this can fail if the Element that we are trying to show is
    // larger than screen height
    default: (
      <TouchableOpacity
        onPress={close}
        activeOpacity={1}
        style={styles.backdrop}
      >
        <View style={[styles.menu, position]}>
          <TouchableWithoutFeedback>{state.node}</TouchableWithoutFeedback>
        </View>
      </TouchableOpacity>
    ),
  });
};

/**
 * measures the given component's position and size
 *
 * @param owner - component that needs to be measured
 */
function measure(owner: MutableRefObject<View | null>) {
  return new Promise<Coord>((resolve) => {
    if (!owner?.current) return resolve({ x: 0, y: 0, width: 0, height: 0 });

    return owner.current.measure((_x, _y, width, height, px, py) => {
      resolve({ x: px, y: py, width, height });
    });
  });
}

const stylesheet = createStyleSheet(() => ({
  backdrop: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,
    position: "absolute",
    backgroundColor: "transparent",
  },
  menu: {
    position: "absolute",
  },
}));
