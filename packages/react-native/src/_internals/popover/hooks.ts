import {
  type MutableRefObject,
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  type View,
  DeviceEventEmitter,
  NativeEventEmitter,
  NativeModules,
  Platform,
} from "react-native";

import { type PopoverConfig, type PopoverEvent, POPOVER_EVENT } from "./types";

export function usePopover<T extends View>(
  owner: MutableRefObject<T | null>,
  options: PopoverConfig = {},
) {
  const id = useRef(Math.floor(Math.random() * 10000).toString());
  const emit = (e: PopoverEvent) => DeviceEventEmitter.emit(POPOVER_EVENT, e);

  const open = useCallback(
    (node: ReactNode) => {
      emit({
        action: "open",
        id: id.current,
        node,
        owner: owner as MutableRefObject<View>,
        config: options,
      });
    },
    [owner, options],
  );

  const close = useCallback(
    () => emit({ action: "close", id: id.current }),
    [],
  );

  return {
    open,
    close,
    id: id.current,
  };
}

const { StatusBarManager } = NativeModules;

export function useIosStatusBarHeight() {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (
      Platform.OS !== "ios" ||
      !StatusBarManager ||
      !StatusBarManager.getHeight
    )
      return;
    const emitter = new NativeEventEmitter(StatusBarManager);

    StatusBarManager.getHeight(({ height }: { height: number }) => {
      setHeight(height);
    });
    const sub = emitter.addListener("statusBarFrameWillChange", (data) =>
      setHeight(data.frame.height),
    );
    return () => sub?.remove?.();
  }, []);

  return height;
}
