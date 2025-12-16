import { AccessibilityInfo } from "react-native";

import type { SnackOptions } from "./Snackbar.types";
import { SnackbarActionType, dispatch } from "./snackbarStore";

const snackbarHelper = ({
  message,
  cancelButtonText,
  type,
  position,
  context,
  isSwipeable,
  id,
  icon,
  accessabilityMessage,
  duration,
}: SnackOptions) => {
  if (!message) {
    return;
  }

  const snack = {
    cancelButtonText: cancelButtonText || "Cancel",
    createdAt: Date.now(),
    duration,
    icon,
    id: id || String(new Date().getTime()),
    isSwipeable: isSwipeable || true,
    message,
    position: position || "bottom",
    context: context || "persists",
    type: type || "default",
    visible: true,
  };

  dispatch({ type: SnackbarActionType.UPSERT_SNACK, snack });

  if (accessabilityMessage) {
    AccessibilityInfo.announceForAccessibility(accessabilityMessage);
  }

  return snack.id;
};

snackbarHelper.dismiss = (snackId?: string) => {
  dispatch({
    type: SnackbarActionType.DISMISS_SNACK,
    snackId,
  });
};

snackbarHelper.remove = (snackId?: string) =>
  dispatch({ type: SnackbarActionType.REMOVE_SNACK, snackId });

export { snackbarHelper };
