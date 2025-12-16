import { useEffect, useState } from "react";

import type {
  DefaultSnackOptions,
  Snack,
  SnackbarItemStatusType,
} from "./Snackbar.types";

const SNACK_LIMIT = 5;

export enum SnackbarActionType {
  ADD_SNACK,
  UPDATE_SNACK,
  UPSERT_SNACK,
  DISMISS_SNACK,
  REMOVE_SNACK,
  START_PAUSE,
  END_PAUSE,
}

type SnackbarAction =
  | {
      type: SnackbarActionType.ADD_SNACK;
      snack: Snack;
    }
  | {
      type: SnackbarActionType.UPSERT_SNACK;
      snack: Snack;
    }
  | {
      type: SnackbarActionType.UPDATE_SNACK;
      snack: Partial<Snack>;
    }
  | {
      type: SnackbarActionType.DISMISS_SNACK;
      snackId?: string;
    }
  | {
      type: SnackbarActionType.REMOVE_SNACK;
      snackId?: string;
    }
  | {
      type: SnackbarActionType.START_PAUSE;
      time: number;
    }
  | {
      type: SnackbarActionType.END_PAUSE;
      time: number;
    };

interface State {
  snacks: Snack[];
  pausedAt: number | undefined;
}

const snackTimeouts = new Map<Snack["id"], ReturnType<typeof setTimeout>>();

const addToRemoveQueue = (snackId: string) => {
  if (snackTimeouts.has(snackId)) {
    return;
  }

  const timeout = setTimeout(() => {
    snackTimeouts.delete(snackId);
    dispatch({
      type: SnackbarActionType.REMOVE_SNACK,
      snackId,
    });
  }, 1000);

  snackTimeouts.set(snackId, timeout);
};

const clearFromRemoveQueue = (snackId: string) => {
  const timeout = snackTimeouts.get(snackId);
  if (timeout) {
    clearTimeout(timeout);
  }
};

export const reducer = (state: State, action: SnackbarAction): State => {
  switch (action.type) {
    case SnackbarActionType.ADD_SNACK:
      return {
        ...state,
        snacks: [action.snack, ...state.snacks].slice(0, SNACK_LIMIT),
      };

    case SnackbarActionType.UPDATE_SNACK:
      if (action.snack.id) {
        clearFromRemoveQueue(action.snack.id);
      }

      return {
        ...state,
        snacks: state.snacks.map((s) =>
          s.id === action.snack.id ? { ...s, ...action.snack } : s,
        ),
      };

    case SnackbarActionType.UPSERT_SNACK:
      return state.snacks.find((s) => s.id === action.snack.id)
        ? reducer(state, {
            type: SnackbarActionType.UPDATE_SNACK,
            snack: action.snack,
          })
        : reducer(state, {
            type: SnackbarActionType.ADD_SNACK,
            snack: action.snack,
          });

    case SnackbarActionType.DISMISS_SNACK:
      if (action.snackId) {
        addToRemoveQueue(action.snackId);
      } else {
        state.snacks.forEach((snack) => {
          addToRemoveQueue(snack.id);
        });
      }

      return {
        ...state,
        snacks: state.snacks.map((s) =>
          s.id === action.snackId || action.snackId === undefined
            ? {
                ...s,
                visible: false,
              }
            : s,
        ),
      };
    case SnackbarActionType.REMOVE_SNACK:
      if (action.snackId === undefined) {
        return {
          ...state,
          snacks: [],
        };
      }
      return {
        ...state,
        snacks: state.snacks.filter((s) => s.id !== action.snackId),
      };

    case SnackbarActionType.START_PAUSE:
      return {
        ...state,
        pausedAt: action.time,
      };

    case SnackbarActionType.END_PAUSE:
      return {
        ...state,
        pausedAt: undefined,
        snacks: state.snacks.map((s) => ({
          ...s,
          pauseDuration: action.time - (state.pausedAt || 0),
        })),
      };
  }
};

const listeners: ((state: State) => void)[] = [];
let memoryState: State = { snacks: [], pausedAt: undefined };

export const dispatch = (action: SnackbarAction) => {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => {
    listener(memoryState);
  });
};

const defaultTimeouts: {
  [key in SnackbarItemStatusType]: number;
} = {
  default: 5000,
  error: 5000,
  success: 5000,
  loading: Infinity,
};

export const useSnackbarStore = (
  snackOptions: DefaultSnackOptions = {},
): State => {
  const [state, setState] = useState<State>(memoryState);

  useEffect(() => {
    listeners.push(setState);

    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]);

  const mergedSnacks = state.snacks
    .filter(
      (s) =>
        snackOptions?.context === undefined ||
        s.context === snackOptions?.context ||
        s.context === "persists",
    )
    .map((s) => ({
      ...snackOptions,
      ...snackOptions[s.type],
      ...s,
      duration:
        s.duration ||
        snackOptions[s.type]?.duration ||
        snackOptions?.duration ||
        defaultTimeouts[s.type],
    }));

  return {
    ...state,
    snacks: mergedSnacks,
  };
};
