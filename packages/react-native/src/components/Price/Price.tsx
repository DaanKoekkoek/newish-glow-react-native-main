import { VisuallyHidden } from "_internals/VisuallyHidden";
import { mergeTestIds } from "_utility";
import { Paragraph, Display } from "foundations/index";
import { useMemo } from "react";
import type { ViewStyle } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import { useStyles } from "react-native-unistyles";

import { PriceStyles } from "./Price.style";
import type { PriceProps } from "./Price.types";

const getRegExpMatch = (value: string, pattern: RegExp) => {
  return value.match(pattern);
};

const PRICE_PATTERN = /^(-)?\s?(€)?\s?(\d{1,3}(?:\.\d{3})*|\d+)(,\d{1,2})?$/;
const UNICODE_DIGITS = [
  "\u2070", // 0
  "\u00B9", // 1
  "\u00B2", // 2
  "\u00B3", // 3
  "\u2074", // 4
  "\u2075", // 5
  "\u2076", // 6
  "\u2077", // 7
  "\u2078", // 8
  "\u2079", // 9
];

export const Price = ({
  value,
  fromValue = "",
  beforeText,
  size = "default",
  state = "default",
  inverted = false,
  showCurrency = true,
  showDecimal = true,
  showVAT = false,
  showFrequency = false,
  showAsterisk = false,
  style,
  testID,
}: PriceProps) => {
  const getPrice = (price: RegExpMatchArray | null) => {
    const negative = price && price[1] && "-";
    const currency = price && price[2] && "€";
    const whole = price && price[3];
    const decimal =
      price && price[4] && (price[4] as unknown as string).replace(/,/, "");

    return { negative, currency, whole, decimal };
  };

  const unicodeDecimals = (raw: string) => {
    return raw
      ?.split("")
      .map((raw) => UNICODE_DIGITS[parseInt(raw, 10)])
      .join("");
  };

  const getDecimals = (decimals: string, asUnicode: boolean = false) => {
    return !!decimals && decimals.length === 1
      ? `${decimals}${asUnicode ? UNICODE_DIGITS[0] : 0}`
      : decimals;
  };

  const priceTestID = mergeTestIds(testID, "price");
  const afterPrice = getPrice(getRegExpMatch(value, PRICE_PATTERN));
  const fromPrice = getPrice(getRegExpMatch(fromValue, PRICE_PATTERN));

  const decimals = useMemo(() => {
    return size === "sm"
      ? getDecimals(afterPrice.decimal || "00")
      : getDecimals(unicodeDecimals(afterPrice.decimal || "00"), true);
  }, [afterPrice.decimal, size]);

  const { styles } = useStyles(PriceStyles, {
    size: size === "default" ? undefined : size,
    state: state === "default" ? undefined : state,
    inverted,
  });

  const formatPrice = ({
    negative,
    whole,
    currency,
    decimal,
  }: ReturnType<typeof getPrice>): string => {
    if (!whole) return "";

    let result = whole;

    if (currency) result = `${currency} ${result}`;
    if (negative) result = `-${result}`;
    if (decimal) result = `${result},${decimal}`;
    if (decimal?.length === 1) result = `${result}0`;

    return result;
  };

  const a11yText = useMemo(() => {
    let result = formatPrice(afterPrice);

    if (showFrequency) result = `${result} per maand`;
    if (showVAT) result = `${result} exclusief btw`;

    return result;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [afterPrice, beforeText, showFrequency, showVAT]);

  return (
    <View
      testID={priceTestID}
      style={StyleSheet.flatten([styles.container, style as ViewStyle])}
    >
      {/* Before */}
      {(beforeText || fromPrice.whole) && (
        <View aria-hidden>
          <Paragraph style={styles.beforeText} testID="before">
            {beforeText}{" "}
            {fromPrice.whole && (
              <Text style={styles.fromValue}>
                {fromPrice.currency ? fromPrice.currency : showCurrency && "€"}
                {fromPrice.whole}
                {fromPrice.decimal &&
                  `,${fromPrice.decimal.length === 1 ? `${fromPrice.decimal}0` : fromPrice.decimal}`}
              </Text>
            )}
          </Paragraph>
        </View>
      )}

      {/* Main */}
      <View aria-hidden style={styles.priceWrapper}>
        {afterPrice.whole && (
          <>
            <View style={styles.price}>
              {afterPrice.negative && (
                <Display
                  style={StyleSheet.flatten([
                    styles.priceText,
                    styles.currency,
                  ])}
                  testID="negative"
                >
                  -
                </Display>
              )}
              {showCurrency && (
                <Display
                  style={StyleSheet.flatten([
                    styles.priceText,
                    styles.currency,
                  ])}
                  testID="currency"
                >
                  {afterPrice.currency
                    ? afterPrice.currency
                    : showCurrency && "€"}
                </Display>
              )}
              <View style={styles.priceValueWrapper}>
                <Display style={styles.priceText} testID="whole">
                  {afterPrice.whole}
                </Display>
                {showDecimal && (
                  <View style={styles.decimalWrapper}>
                    <Display
                      style={StyleSheet.flatten([
                        styles.commaText,
                        styles.priceText,
                      ])}
                    >
                      ,
                    </Display>
                    <Display testID="decimals" style={styles.priceText}>
                      {decimals ? decimals : "00"}
                    </Display>
                  </View>
                )}
              </View>
            </View>
            {(showFrequency || showAsterisk) && (
              <View style={styles.frequency}>
                <Display style={styles.priceText} testID="frequency">
                  {showAsterisk ? "\uE701" : "\uE700"}
                </Display>
              </View>
            )}
          </>
        )}
      </View>
      {/* After */}
      {showVAT && (
        <Paragraph style={styles.taxText} testID="after">
          excl. btw
        </Paragraph>
      )}
      <VisuallyHidden testID="price-description">{a11yText}</VisuallyHidden>
    </View>
  );
};
