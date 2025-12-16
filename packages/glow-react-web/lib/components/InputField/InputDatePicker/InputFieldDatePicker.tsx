import React, { useEffect, useMemo, useReducer, useState } from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import classNames from "classnames";
import { ActionButtonIcon } from "components/ActionButton";
import styles from "./InputDatePicker.module.scss";
import { getDefaultState, reducer } from "../InputField.reducer";
import { InputField } from "../InputField";
import type { InputDatePickerProps, DaysOfTheWeek } from "../Input.types";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { useDateInputMask } from "./hooks/useDateInputMask";

import { nl } from "date-fns/locale";
import "dayjs/locale/nl";
import { tokenClassNames } from "_utility";
import { Heading } from "foundations/Heading";

dayjs.extend(customParseFormat);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(localizedFormat);

const TOGGLE_DATE_PICKER = { type: "toggle-date-picker" } as const;

export const InputFieldDatePicker = ({
  format = "dd-MM-yyyy",
  min,
  max,
  onChange,
  palette = "default",
  excludeDaysOfWeek = [],
  locale,
  value,
  id,
  ...props
}: InputDatePickerProps) => {
  const minAllowedDate = useMemo(
    () => (min ? dayjs(min).toDate() : undefined),
    [min],
  );
  const maxAllowedDate = useMemo(
    () => (max ? dayjs(max).toDate() : undefined),
    [max],
  );

  const [typedDate, setTypedDate] = useState<string | null>(null);
  const [calendarFocusDate, setCalendarFocusDate] = useState<
    Date | undefined
  >();

  const [, dispatch] = useReducer(reducer, getDefaultState("date"));

  useEffect(() => {
    const localeCode = locale?.code ?? "nl";
    dayjs.locale(localeCode);
    registerLocale(localeCode, locale?.object ?? nl);
  }, [locale]);

  // Convert format from react-datepicker format to dayjs format
  const dayjsFormat = useMemo(() => {
    return format
      .toUpperCase()
      .replace(/Y/g, "Y")
      .replace(/D/g, "D")
      .replace(/M/g, "M");
  }, [format]);

  const currentSelectedDate = useMemo(() => {
    const parsedTypedDate = typedDate
      ? parseDate(typedDate, dayjsFormat)
      : null;
    if (parsedTypedDate) return parsedTypedDate.toDate();

    const parsedPropDate = parseDate(value, dayjsFormat);
    return parsedPropDate?.toDate() ?? null;
  }, [typedDate, value, dayjsFormat]);

  const updateDate = (date: Date | null) => {
    setTypedDate(null);
    if (date) {
      setCalendarFocusDate(date);
    }
    const formattedValue = date ? dayjs(date).format(dayjsFormat) : "";
    onChange?.(formattedValue);
  };

  const {
    handleInputMask,
    handleInputBlur: createHandleInputBlur,
    syncInputValue,
  } = useDateInputMask(
    typedDate,
    setTypedDate,
    dayjsFormat,
    (validDate: Date) => {
      setCalendarFocusDate(validDate);
    },
    minAllowedDate,
    maxAllowedDate,
    excludeDaysOfWeek,
  );

  // Syncing the input value when it changes from external sources (like calendar selection)
  useEffect(() => {
    if (value && !typedDate) {
      syncInputValue(value);
    }
  }, [value, typedDate, syncInputValue]);

  const handleInputBlur = createHandleInputBlur(
    excludeDaysOfWeek,
    updateDate,
    setCalendarFocusDate,
    minAllowedDate,
    maxAllowedDate,
  );

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const inputElement = event.currentTarget;
    const { value, selectionStart } = inputElement;

    if (event.key === "Backspace" && selectionStart) {
      // If we are about to delete a dash, skip over it to delete the digit before
      if (value[selectionStart - 1] === "-" && selectionStart > 1) {
        event.preventDefault();
        const newCursorPosition = selectionStart - 1;
        inputElement.setSelectionRange(newCursorPosition, newCursorPosition);

        // Triggering deletion of the character before the dash
        const newValue =
          value.slice(0, newCursorPosition - 1) +
          value.slice(newCursorPosition);
        inputElement.value = newValue;
        setTypedDate(newValue);
      }
    }
  };

  const handleCalendarOpen = () => {
    dispatch(TOGGLE_DATE_PICKER);
  };

  const handleCalendarClose = () => {
    dispatch(TOGGLE_DATE_PICKER);
  };

  const isValidCalendarDate = (date: Date) =>
    !excludeDaysOfWeek.includes(date.getDay() as DaysOfTheWeek);

  const datepickerTokenStyles = tokenClassNames(styles);

  return (
    <DatePicker
      className={classNames(datepickerTokenStyles, styles["date-picker"], {
        [styles.error]: props.validated?.valid === false,
        [styles.valid]: props.validated?.valid === true,
      })}
      autoComplete="off"
      customInput={
        <InputField
          {...props}
          id={id}
          type="date"
          onBlur={handleInputBlur}
          onKeyDown={handleKeyDown}
          onInput={handleInputMask}
          maxLength={dayjsFormat.length}
        />
      }
      calendarClassName={classNames(
        datepickerTokenStyles,
        "react-datepicker__calendar",
        styles["date-picker-calendar"],
        styles[`date-picker-palette-${palette}`],
      )}
      openToDate={calendarFocusDate ?? currentSelectedDate ?? undefined}
      id={id}
      name={props.name}
      placeholderText={props.placeholder}
      locale={locale?.code ?? "nl"}
      disabled={props.inactive}
      filterDate={isValidCalendarDate}
      selected={currentSelectedDate}
      minDate={minAllowedDate}
      maxDate={maxAllowedDate}
      onChange={updateDate}
      onCalendarOpen={handleCalendarOpen}
      onCalendarClose={handleCalendarClose}
      showPopperArrow={false}
      portalId="root"
      dateFormat={format}
      popperPlacement="bottom-start"
      renderCustomHeader={({ date, decreaseMonth, increaseMonth }) => {
        const currentMonth = dayjs(date).startOf("month");
        const hasReachedMin = min && currentMonth.isSameOrBefore(min, "month");
        const hasReachedMax = max && currentMonth.isSameOrAfter(max, "month");

        return (
          <div className={styles["date-picker-header-container"]}>
            <ActionButtonIcon
              icon="arrow-left"
              className={styles["date-picker-action-button"]}
              prominence="secondary"
              onClick={decreaseMonth}
              state={hasReachedMin ? "inactive" : undefined}
            />
            <Heading
              as="span"
              size="xs"
              className={styles["date-picker-header-text"]}
            >
              {dayjs(date)
                .locale(locale?.code || "nl")
                .format("MMMM YYYY")
                .replace(/^./, (c) => c.toUpperCase())}
            </Heading>
            <ActionButtonIcon
              icon="arrow-right"
              className={styles["date-picker-action-button"]}
              prominence="secondary"
              onClick={increaseMonth}
              state={hasReachedMax ? "inactive" : undefined}
            />
          </div>
        );
      }}
    />
  );
};

const parseDate = (
  dateStr: string | undefined,
  format: string,
  strict = false,
  fallback?: dayjs.Dayjs,
) => {
  const parsed = dayjs(dateStr, format, strict);
  return parsed.isValid() ? parsed : fallback;
};
