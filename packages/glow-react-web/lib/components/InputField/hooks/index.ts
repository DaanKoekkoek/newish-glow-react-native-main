import { useCallback, useEffect } from "react";
import { SuffixIconState } from "../InputField.reducer";

export function useInput(
  internalRef: React.RefObject<HTMLInputElement>,
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void,
  state?: SuffixIconState,
) {
  const triggerChange = useCallback(
    (newValue: string, focusInput = false) => {
      if (internalRef.current && onChange) {
        internalRef.current.value = newValue;

        const syntheticEvent = {
          target: internalRef.current,
          currentTarget: internalRef.current,
          preventDefault: () => {},
          stopPropagation: () => {},
        } as React.ChangeEvent<HTMLInputElement>;

        onChange(syntheticEvent);

        if (focusInput) {
          internalRef.current.focus();
        }
      }
    },
    [onChange, internalRef],
  );

  const triggerFocus = useEffect(() => {
    if (internalRef.current && state?.isDatePickerVisible) {
      internalRef.current.focus();
    }
  }, [state?.isDatePickerVisible, internalRef]);

  const clearInput = useCallback(() => {
    triggerChange("", true);
  }, [triggerChange]);

  return { triggerChange, triggerFocus, clearInput };
}
