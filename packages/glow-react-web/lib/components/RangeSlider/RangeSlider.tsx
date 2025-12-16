import { Morph, Follower } from "_internals/Animation";
import React, { useState, useRef, useEffect } from "react";
import { Slider } from "components/Slider";
import { RangeSliderProps } from "./RangeSlider.types";
import styles from "./RangeSlider.module.scss";
import { tokenClassNames } from "_utility";
import { ActionButtonIcon } from "components/ActionButton";
import { Paragraph } from "foundations/Paragraph";
import { debounce, formatPriceDisplay } from "_utility";

const THRESHOLD_PERCENT = 0.2;

export const RangeSlider = ({
  buttons,
  onValueChange,
  palette = "default",
  value: propValue,
  minValue = 0,
  maxValue = 100,
  prices,
  priceRange,
  ariaLabel,
  brand = "odido",
  step,
  ...sliderProps
}: RangeSliderProps) => {
  const [value, setValue] = useState(propValue ?? minValue);
  const thumbRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLLabelElement>(null);
  const range = maxValue - minValue;

  useEffect(() => {
    if (propValue !== undefined) setValue(propValue);
  }, [propValue]);

  const increase = () => {
    setValue((v) => Math.min(v + (step ?? 1), maxValue));
  };

  const decrease = () => {
    setValue((v) => Math.max(v - (step ?? 1), minValue));
  };

  const handleValueChangeDebounced = useRef(
    debounce((value: number) => {
      onValueChange?.(value);
    }, 100),
  ).current;

  const handleValueChange = (value: number) => {
    setValue(value);
    if (!onValueChange) return;

    handleValueChangeDebounced(value);
  };

  return (
    <div
      className={tokenClassNames(styles, "range-slider", {
        [styles["has-range"]]: range,
        [styles["has-buttons"]]: buttons,
        [styles["is-near-max"]]: value >= maxValue - range * THRESHOLD_PERCENT,
        [styles["is-near-min"]]: value <= minValue + range * THRESHOLD_PERCENT,
      })}
    >
      <div className={styles["range-slider-container"]}>
        {buttons && (
          <ActionButtonIcon
            ariaLabel={ariaLabel && ariaLabel.subtract}
            state={value <= minValue ? "inactive" : undefined}
            icon="min"
            size="sm"
            prominence="secondary"
            onClick={decrease}
            className={styles["range-slider-button"]}
          />
        )}

        <div className={styles["range-slider-tooltip-and-input"]}>
          <label
            ref={containerRef}
            htmlFor={sliderProps.id}
            className={styles["range-slider-tooltip"]}
          >
            {prices && (
              <div className={styles["range-slider-tooltip-content"]}>
                {prices.map((price, i) => (
                  <React.Fragment key={i}>
                    <Paragraph
                      as="span"
                      size="sm"
                      className={styles["range-slider-tooltip-price"]}
                    >
                      <span>{price.beforeText}</span>
                      <span>
                        {formatPriceDisplay(price.value, {
                          showCurrency: price.showCurrency ?? true,
                        })}
                      </span>
                    </Paragraph>
                    {i < prices.length - 1 && (
                      <span
                        className={styles["range-slider-tooltip-divider"]}
                      />
                    )}
                  </React.Fragment>
                ))}
              </div>
            )}
            {brand === "ben" && (
              <Follower
                targetRef={thumbRef}
                containerRef={containerRef}
                useRAF
                className={styles["range-slider-tooltip-shape-container"]}
              >
                <Morph
                  size={30}
                  edgeThreshold={0.15}
                  startShape="triangle"
                  middleShape="triangle"
                  endShape="triangle"
                  preset="fast"
                  ratio={value / maxValue}
                  className={styles["range-slider-tooltip-shape"]}
                />
              </Follower>
            )}
          </label>
          <Slider
            step={step}
            id={sliderProps.id}
            {...sliderProps}
            ref={thumbRef}
            value={value}
            minValue={minValue}
            maxValue={maxValue}
            palette={palette}
            onValueChange={handleValueChange}
            className={styles["range-slider-slide"]}
          />
        </div>

        {buttons && (
          <ActionButtonIcon
            ariaLabel={ariaLabel && ariaLabel.add}
            state={value >= maxValue ? "inactive" : undefined}
            icon="plus"
            size="sm"
            prominence="secondary"
            onClick={increase}
            className={styles["range-slider-button"]}
          />
        )}
      </div>
      {priceRange &&
        priceRange.length > 0 &&
        (() => {
          const min = priceRange[0];
          const max = priceRange[priceRange.length - 1];

          return (
            <div className={styles["range-slider-range"]}>
              {[min, max].map((item, i) => (
                <Paragraph size="sm" as="span" key={i}>
                  <span>{item.beforeText}</span>
                  <span>
                    {formatPriceDisplay(item.value, {
                      showCurrency: item.showCurrency ?? true,
                    })}
                  </span>
                </Paragraph>
              ))}
            </div>
          );
        })()}
    </div>
  );
};
