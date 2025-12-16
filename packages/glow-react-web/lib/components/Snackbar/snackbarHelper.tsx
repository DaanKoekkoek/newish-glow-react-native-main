import { Snack } from "./Snack";
import type { SnackOptions } from "./Snackbar.types";
import { toast as sonnerToast } from "sonner";

export const snackbarHelper = ({
  message,
  cancelButtonText,
  type,
  position,
  id,
  icon,
  duration,
  onDismiss,
}: SnackOptions) => {
  if (!message) {
    return;
  }

  const snackOptions = {
    cancelButtonText: cancelButtonText || "Cancel",
    duration: duration || 5000,
    icon,
    id: id || String(new Date().getTime()),
    message,
    position: position === "top" ? "top-center" : "bottom-center",
    type: type || "default",
  };

  return sonnerToast.custom(
    (id) => (
      <Snack
        message={message}
        cancelButtonText={snackOptions.cancelButtonText}
        id={id.toString()}
        type={snackOptions.type}
        icon={snackOptions.icon}
        onDismiss={() => {
          snackbarHelper.dismiss(id);
          onDismiss?.(id);
        }}
      />
    ),
    {
      position: position === "top" ? "top-center" : "bottom-center",
      duration: type === "loading" ? Infinity : snackOptions.duration,
      id: snackOptions.id,
    },
  );
};

snackbarHelper.dismiss = (snackId?: string | number) =>
  sonnerToast.dismiss(snackId);

/**
 * Same functionallity as dismiss, keeping it for backwards compatibility
 * with RN Snakcbar
 */
snackbarHelper.remove = (snackId?: string | number) =>
  sonnerToast.dismiss(snackId);
