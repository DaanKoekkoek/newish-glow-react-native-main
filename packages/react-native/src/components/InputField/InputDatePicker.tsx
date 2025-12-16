import { useFontFamily } from "_global-hooks";
import { Popover } from "_internals/popover";
import { ViewWithBoxShadow } from "_utility";
import dayjs from "dayjs";
import customDateFormat from "dayjs/plugin/customParseFormat";
import { Icon } from "foundations/Icon";
import type { IconNames } from "foundations/Icon";
import type { MutableRefObject } from "react";
import { useMemo } from "react";
import { Platform, View, StyleSheet } from "react-native";
import type { DateType } from "react-native-ui-datepicker";
import DateTimePicker from "react-native-ui-datepicker";
import { createStyleSheet, useStyles } from "react-native-unistyles";

import { Button } from "../Button";
import { BaseButton } from "../Button/BaseButton";
import { Modal } from "../Modal";
import { useThemeProviderContext } from "../ThemeProvider";

type InputDatePickerProps = {
  ownerRef: MutableRefObject<View | null>;
  format: string;
  isVisible?: boolean;
  date?: string;
  min?: dayjs.ConfigType;
  max?: dayjs.ConfigType;
  onClose?: () => void;
  onChange?: (date: string) => void;
};

dayjs.extend(customDateFormat);

const version = "v1";
const versionDatePicker = "v1";

export const InputDatePicker = ({
  ownerRef,
  isVisible,
  date,
  format,
  min,
  max,
  onClose,
  onChange,
}: InputDatePickerProps) => {
  const { breakpoint } = useStyles();
  const { theme } = useThemeProviderContext();
  const isWebMobile =
    Platform.OS === "web" && ["mobile", "mobileSmall"].includes(breakpoint);
  const isModal =
    Platform.OS === "android" || Platform.OS === "ios" || isWebMobile;

  const { styles } = useStyles(stylesheet, {
    mode: theme,
    popupMode: isModal ? "modal" : "popup",
  });

  const dateValue = useMemo(
    () => parse(date, format, true, dayjs()),
    [date, format],
  );
  const minValue = useMemo(() => (min ? dayjs(min) : null), [min]);
  const maxValue = useMemo(() => (max ? dayjs(max) : null), [max]);

  const handleChange = (params: { date: DateType }) => {
    if (!isVisible) return;
    const newDate = dayjs(params.date?.toString()).format(format).toString();
    onChange?.(newDate);

    if (!isModal && onClose) {
      onClose();
    }

    if (isModal && onClose) {
      onClose();
    }
  };

  const fontFamilyHeader = useFontFamily(
    theme === "light" ? "Heading_Regular" : "Heading_Medium",
  );

  const fontFamilyText = useFontFamily("Paragraph_Regular");

  const picker = (
    <DateTimePicker
      mode="single"
      firstDayOfWeek={1}
      date={dateValue}
      maxDate={maxValue}
      minDate={minValue}
      onChange={handleChange}
      buttonPrevIcon={<CustomBaseButton iconName="arrow-left" />}
      buttonNextIcon={<CustomBaseButton iconName="arrow-right" />}
      selectedItemColor={styles.numbersText.color}
      headerContainerStyle={styles.headerContainer}
      weekDaysContainerStyle={styles.pickerWeekDaysContainer}
      todayTextStyle={styles.todayText}
      todayContainerStyle={styles.numbersContainer}
      dayContainerStyle={styles.weekdaysContainer}
      monthContainerStyle={styles.numbersContainer}
      yearContainerStyle={styles.numbersContainer}
      headerTextStyle={StyleSheet.flatten([
        { fontFamily: fontFamilyHeader },
        styles.headerText,
      ])}
      selectedTextStyle={StyleSheet.flatten([
        { fontFamily: fontFamilyText },
        styles.selectedText,
      ])}
      weekDaysTextStyle={StyleSheet.flatten([
        { fontFamily: fontFamilyText },
        styles.numbersText,
      ])}
      calendarTextStyle={StyleSheet.flatten([
        { fontFamily: fontFamilyText },
        styles.numbersText,
      ])}
    />
  );

  if (isModal) {
    return (
      <Modal
        closable={false}
        position="bottom"
        visible={isVisible}
        onClose={onClose}
        title="Kies een datum"
        footer="subtle"
        footerChildren={
          <Button testID="glow-date-picker-modal-close" fill onPress={onClose}>
            Sluiten
          </Button>
        }
      >
        <View style={styles.container} testID="glow-date-picker">
          {picker}
        </View>
      </Modal>
    );
  }

  return (
    <Popover
      ownerRef={ownerRef}
      isVisible={isVisible}
      width={
        // if screen is small enough then popup will match the width, with the owner element
        breakpoint === "mobileSmall" || breakpoint === "mobile"
          ? "match-owner"
          : undefined
      }
      onClose={onClose}
    >
      <ViewWithBoxShadow
        testID="glow-date-picker"
        shadowStylePreset="right"
        style={styles.container}
      >
        {picker}
      </ViewWithBoxShadow>
    </Popover>
  );
};

/**
 * Parses the date string based on the given format
 * if the given date does not match with the format
 * it will use the fallback value
 *
 * @param dateStr - give date string should match the date format.
 * @param format - the date format
 * @param fallback - if the date is not matching the format this value will be returned
 */

function parse(
  dateStr: string | undefined,
  format: string,
  strict = false,
  fallback?: dayjs.Dayjs,
) {
  const date = dayjs(dateStr, format, strict);
  if (date.isValid()) {
    return date;
  }

  return fallback;
}

// NOTE: the reason we are using this instead of actual Button Component
// is because Button component captures on press event in this case the event
// for the datepicker button won't be fired.
const CustomBaseButton = ({ iconName }: { iconName: IconNames }) => {
  const { styles } = useStyles(stylesheet);
  return (
    <BaseButton
      asText
      prominence="secondary"
      pressableStyle={styles.arrowButton}
      baseStyle={styles.arrowButton}
    >
      <Icon name={iconName} style={styles.arrowButtonIcon} size="sm" />
    </BaseButton>
  );
};

const versionTextStyles = "v1";

const stylesheet = createStyleSheet(
  ({
    themes: {
      semantics: {
        color: { text },
      },
      components: {
        input,
        input: {
          atoms: {
            datePicker: { [versionDatePicker]: datepicker },
          },
        },
        button: {
          iconActionButton: { [version]: iconActionButton },
          button: { [version]: button },
        },
        foundations: {
          typography: {
            textStyles: { [versionTextStyles]: textStyles },
          },
        },
      },
    },
  }) => ({
    container: {
      flex: 1,
      borderRadius: datepicker.radius.default,
      backgroundColor: datepicker.color.background.default,
      variants: {
        popupMode: {
          popup: {
            paddingVertical: datepicker.padding.vertical.default,
            paddingHorizontal: datepicker.padding.horizontal.default,
            maxWidth: {
              tablet: 336,
              desktop: 336,
            },
          },
          modal: {},
        },
      },
    },
    arrowButton: {
      borderRadius: button.radius.lg,
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: iconActionButton.padding.vertical.sm,
      paddingHorizontal: iconActionButton.padding.horizontal.sm,
    },
    arrowButtonIcon: {
      color: input.color.icon.default,
    },
    headerText: {
      fontSize: textStyles.heading.fontSize.xs,
      letterSpacing: textStyles.heading.letterSpacing.xs,
      lineHeight: textStyles.heading.lineHeight.xs,
      color: input.color.text.default,
      variants: {
        mode: {
          dark: {
            fontWeight: "400",
          },
          light: {
            fontWeight: "500",
          },
        },
      },
    },
    numbersText: {
      fontSize: textStyles.paragraph.fontSize.sm,
      lineHeight: textStyles.paragraph.lineHeight.sm,
      letterSpacing: textStyles.paragraph.letterSpacing.sm,
      color: input.color.text.default,
    },
    todayText: {
      color: input.color.text.subtle,
    },
    numbersContainer: {
      backgroundColor: input.color.background.default,
    },
    weekdaysContainer: {},
    headerContainer: {
      marginBottom: datepicker.padding.vertical.default,
    },
    pickerWeekDaysContainer: {
      borderBottomWidth: 0,
    },
    selectedText: {
      fontSize: textStyles.paragraph.fontSize.sm,
      lineHeight: textStyles.paragraph.lineHeight.sm,
      letterSpacing: textStyles.paragraph.letterSpacing.sm,
      color: text.inverted.default,
    },
  }),
);
