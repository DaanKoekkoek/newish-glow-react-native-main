import { useEffect, useMemo } from "react";

import type { DefaultSnackOptions, Snack } from "./Snackbar.types";
import { snackbarHelper } from "./snackbarHelper";
import {
  SnackbarActionType,
  dispatch,
  useSnackbarStore,
} from "./snackbarStore";

export const useSnackbar = (snackOptions?: DefaultSnackOptions) => {
  const { snacks, pausedAt } = useSnackbarStore(snackOptions);

  useEffect(() => {
    if (pausedAt) {
      return;
    }

    const now = Date.now();
    const timeouts = snacks.map((t) => {
      if (t.duration === Infinity) {
        return;
      }

      const durationLeft = (t.duration || 0) - (now - t.createdAt);

      if (durationLeft < 0) {
        if (t.visible) {
          snackbarHelper.dismiss(t.id);
        }
        return;
      }
      return setTimeout(() => snackbarHelper.dismiss(t.id), durationLeft);
    });

    return () => {
      timeouts.forEach((timeout) => timeout && clearTimeout(timeout));
    };
  }, [snacks, pausedAt]);

  const handlers = useMemo(
    () => ({
      startPause: () => {
        dispatch({
          type: SnackbarActionType.START_PAUSE,
          time: Date.now(),
        });
      },
      endPause: () => {
        if (pausedAt) {
          dispatch({ type: SnackbarActionType.END_PAUSE, time: Date.now() });
        }
      },
      updateHeight: (snackId: string, height: number) =>
        dispatch({
          type: SnackbarActionType.UPDATE_SNACK,
          snack: { id: snackId, height },
        }),
      calculateOffset: (
        snack: Snack,
        opts?: {
          reverseOrder?: boolean;
          gutter?: number;
          defaultPosition?: "bottom";
        },
      ) => {
        const {
          reverseOrder = false,
          gutter = 8,
          defaultPosition,
        } = opts || {};

        const relevantSnacks = snacks.filter(
          (s) =>
            (s.position || defaultPosition) ===
              (snack.position || defaultPosition) && s.height,
        );
        const snackIndex = relevantSnacks.findIndex((s) => s.id === snack.id);
        const snacksBefore = relevantSnacks.filter(
          (snack, i) => i < snackIndex && snack.visible,
        ).length;

        return relevantSnacks
          .filter((t) => t.visible)
          .slice(...(reverseOrder ? [snacksBefore + 1] : [0, snacksBefore]))
          .reduce((acc, t) => acc + (t.height || 0) + gutter, 0);
      },
    }),
    [snacks, pausedAt],
  );

  return {
    snacks,
    handlers,
  };
};
