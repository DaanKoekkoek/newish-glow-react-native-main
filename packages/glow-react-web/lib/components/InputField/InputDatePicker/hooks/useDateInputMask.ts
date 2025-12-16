import { useCallback, useMemo, useRef } from "react";
import dayjs from "dayjs";

// Types for better type safety
interface DateParts {
  day?: string;
  month?: string;
  year?: string;
}

interface FormatInfo {
  parts: string[];
  separators: string[];
  dayIndex: number;
  monthIndex: number;
  yearIndex: number;
}

export const useDateInputMask = (
  typedDate: string | null,
  setTypedDate: (date: string | null) => void,
  format: string = "DD-MM-YYYY",
  onValidDate?: (date: Date) => void,
  minAllowedDate?: Date,
  maxAllowedDate?: Date,
  excludeDaysOfWeek?: number[],
) => {
  // Store the last known input value to properly detect deletions
  const lastInputValueRef = useRef<string>("");

  // Memoize format parsing to avoid recalculating on every input
  const formatInfo = useMemo((): FormatInfo => {
    const formatUpper = format.toUpperCase();
    const separators = formatUpper.match(/[^A-Z]/g) || [];
    const parts = formatUpper.split(/[^A-Z]/);

    // Pre-calculate part indices for faster lookups
    let dayIndex = -1;
    let monthIndex = -1;
    let yearIndex = -1;

    parts.forEach((part, index) => {
      if (part.includes("D")) dayIndex = index;
      else if (part.includes("M")) monthIndex = index;
      else if (part.includes("Y")) yearIndex = index;
    });

    return { parts, separators, dayIndex, monthIndex, yearIndex };
  }, [format]);

  const validateDay = useCallback(
    (value: string, month?: string, year?: string): string => {
      const numValue = parseInt(value, 10);

      if (value.length === 1) {
        // Only allow 0-3 as first digit for days
        return numValue > 3 ? "" : value;
      }

      if (value.length === 2) {
        if (numValue < 1) return "";

        // Context-aware day validation
        if (month && year) {
          const monthNum = parseInt(month, 10);
          const yearNum = parseInt(year, 10);
          const daysInMonth = new Date(yearNum, monthNum, 0).getDate();
          return numValue > daysInMonth ? "" : value;
        }

        // Fallback to basic validation
        return numValue > 31 ? "" : value;
      }

      return value;
    },
    [],
  );

  const validateMonth = useCallback((value: string): string => {
    const numValue = parseInt(value, 10);

    if (value.length === 1) {
      // Only allow 0-1 as first digit for months
      return numValue > 1 ? "" : value;
    }

    if (value.length === 2) {
      // Validate complete month (1-12)
      return numValue < 1 || numValue > 12 ? "" : value;
    }

    return value;
  }, []);

  const validateDateComponent = useCallback(
    (partValue: string, partIndex: number, allParts: DateParts): string => {
      const { dayIndex, monthIndex, yearIndex } = formatInfo;

      if (partIndex === dayIndex) {
        return validateDay(partValue, allParts.month, allParts.year);
      } else if (partIndex === monthIndex) {
        return validateMonth(partValue);
      } else if (partIndex === yearIndex) {
        // Year validation - allow any year for now
        return partValue;
      }

      return partValue;
    },
    [formatInfo, validateDay, validateMonth],
  );

  // Parsing current parts from the masked value
  const parseCurrentParts = useCallback(
    (currentResult: string): DateParts => {
      const resultParts = currentResult.split(/[^0-9]/);
      const { dayIndex, monthIndex, yearIndex } = formatInfo;

      return {
        day:
          dayIndex >= 0 && dayIndex < resultParts.length
            ? resultParts[dayIndex]
            : undefined,
        month:
          monthIndex >= 0 && monthIndex < resultParts.length
            ? resultParts[monthIndex]
            : undefined,
        year:
          yearIndex >= 0 && yearIndex < resultParts.length
            ? resultParts[yearIndex]
            : undefined,
      };
    },
    [formatInfo],
  );

  const applyDateMask = useCallback(
    (value: string): string => {
      // Extract only digits
      const digits = value.replace(/\D/g, "");
      const { parts, separators } = formatInfo;

      let result = "";
      let digitIndex = 0;

      for (let i = 0; i < parts.length && digitIndex < digits.length; i++) {
        const partLength = parts[i].length;
        const partDigits = digits.slice(digitIndex, digitIndex + partLength);

        if (partDigits.length > 0) {
          // Get current context for validation
          const currentParts = parseCurrentParts(result);

          const validatedDigits = validateDateComponent(
            partDigits,
            i,
            currentParts,
          );

          if (validatedDigits.length > 0) {
            result += validatedDigits;
            digitIndex += validatedDigits.length;

            // Add separator when part is complete and there are more parts
            if (
              i < parts.length - 1 &&
              validatedDigits.length === partLength &&
              separators[i]
            ) {
              result += separators[i];
            }
          } else {
            break;
          }
        }
      }

      return result;
    },
    [formatInfo, parseCurrentParts, validateDateComponent],
  );

  const validateDateConstraints = useCallback(
    (date: dayjs.Dayjs): boolean => {
      const dateObject = date.toDate();

      // Check min/max date constraints
      if (minAllowedDate && date.isBefore(dayjs(minAllowedDate), "day"))
        return false;
      if (maxAllowedDate && date.isAfter(dayjs(maxAllowedDate), "day"))
        return false;

      // Check excluded days of week
      if (excludeDaysOfWeek && excludeDaysOfWeek.includes(dateObject.getDay()))
        return false;

      return true;
    },
    [minAllowedDate, maxAllowedDate, excludeDaysOfWeek],
  );

  const checkAndUpdateCalendar = useCallback(
    (value: string) => {
      if (!onValidDate || value.length !== format.length) return;

      const parsedDate = dayjs(value, format, true);
      if (parsedDate.isValid() && validateDateConstraints(parsedDate)) {
        onValidDate(parsedDate.toDate());
      }
    },
    [onValidDate, format, validateDateConstraints],
  );

  const validateInput = useCallback(
    (
      maskedValue: string,
      previousValue: string,
      rawValueLength: number,
    ): string => {
      // Check if masking caused unexpected truncation (validation failure)
      if (
        maskedValue.length < previousValue.length &&
        rawValueLength >= previousValue.length
      ) {
        return previousValue;
      }

      // Final date validation when input is complete
      if (maskedValue.length === format.length) {
        const parsedDate = dayjs(maskedValue, format, true);
        if (parsedDate.isValid() && !validateDateConstraints(parsedDate)) {
          return previousValue;
        }
      }

      return maskedValue;
    },
    [format, validateDateConstraints],
  );

  const handleInputMask = useCallback(
    (event: React.FormEvent<HTMLInputElement>) => {
      const inputElement = event.currentTarget;
      const rawValue = inputElement.value;
      const cursorPosition = inputElement.selectionStart || 0;
      const previousValue = lastInputValueRef.current;

      // Quick deletion check
      if (rawValue.length < previousValue.length) {
        lastInputValueRef.current = rawValue;
        setTypedDate(rawValue);
        checkAndUpdateCalendar(rawValue);
        return;
      }

      // Apply masking and validation
      const maskedValue = applyDateMask(rawValue);
      const finalValue = validateInput(
        maskedValue,
        previousValue,
        rawValue.length,
      );

      if (finalValue !== rawValue) {
        inputElement.value = finalValue;

        const cursorOffset = Math.max(0, finalValue.length - rawValue.length);
        const newCursorPosition = Math.min(
          cursorPosition + cursorOffset,
          finalValue.length,
        );

        requestAnimationFrame(() => {
          inputElement.setSelectionRange(newCursorPosition, newCursorPosition);
        });
      }

      // Update state and check calendar
      lastInputValueRef.current = finalValue;
      setTypedDate(finalValue);
      checkAndUpdateCalendar(finalValue);
    },
    [applyDateMask, validateInput, checkAndUpdateCalendar, setTypedDate],
  );

  const handleInputBlur = useCallback(
    (
      excludeDaysOfWeek: number[],
      updateDate: (date: Date | null) => void,
      setCalendarFocusDate?: (date: Date | undefined) => void,
      minAllowedDate?: Date,
      maxAllowedDate?: Date,
    ) => {
      return () => {
        // Early return if no typed date or incomplete date
        if (!typedDate || typedDate.length !== format.length) {
          setTypedDate(null);
          return;
        }

        const parsedDate = dayjs(typedDate, format, true);
        if (!parsedDate.isValid()) {
          setTypedDate(null);
          return;
        }

        // Checking excluded days
        if (excludeDaysOfWeek.includes(parsedDate.day())) {
          setTypedDate(null);
          updateDate(null);
          return;
        }

        let finalDate = parsedDate.toDate();

        if (minAllowedDate && parsedDate.isBefore(minAllowedDate, "day")) {
          finalDate = minAllowedDate;
        } else if (
          maxAllowedDate &&
          parsedDate.isAfter(maxAllowedDate, "day")
        ) {
          finalDate = maxAllowedDate;
        }

        // Update calendar and date
        setCalendarFocusDate?.(finalDate);
        updateDate(finalDate);
        setTypedDate(null);
      };
    },
    [typedDate, setTypedDate, format],
  );

  const syncInputValue = useCallback((value: string) => {
    lastInputValueRef.current = value;
  }, []);

  return {
    applyDateMask,
    handleInputMask,
    handleInputBlur,
    syncInputValue,
  };
};
