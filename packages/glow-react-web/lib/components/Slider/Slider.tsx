import classNames from "classnames";
import type { SliderProps } from "./Slider.types";
import styles from "./Slider.module.scss";
import React, { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import { Button } from "components/Button";
import { Paragraph } from "foundations/Paragraph";
import { useMergeRefs } from "_global-hooks";
import { tokenClassNames } from "_utility";

const buildLegend = (
  min: number,
  max: number,
  step: number,
): (number | string)[] => {
  const list: (number | string)[] = [];
  const totalTicks = Math.floor((max - min) / step) + 1;

  if (totalTicks <= 6) {
    for (let v = min; v <= max; v += step) list.push(v);
  } else {
    // first 5 values, then '6+'
    for (let i = 0; i < 5; i++) list.push(min + i * step);
    list.push("6+");
  }
  return list;
};

export const Slider = React.forwardRef<HTMLButtonElement, SliderProps>(
  (
    {
      id,
      minValue,
      maxValue,
      value = 0,
      step = 1,
      palette = "default",
      onValueChange,
      legend = false,
      className,
    },
    ref,
  ) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const railRef = useRef<HTMLDivElement | null>(null);
    const mergedRefs = useMergeRefs(ref, buttonRef);

    const updateProgress = useCallback(
      (val: number) => {
        const percentage = Math.max(
          ((val - minValue) / (maxValue - minValue)) * 100,
          0,
        );
        const railWidth = railRef.current?.clientWidth ?? 0;
        const thumbWidth = buttonRef.current?.offsetWidth ?? 48;
        const maxOffset = railWidth - thumbWidth;

        const pixelOffset = Math.min(
          Math.max((percentage / 100) * railWidth - thumbWidth / 2, 0),
          maxOffset,
        );

        // Update gradient fill
        inputRef.current?.style.setProperty("--progress", `${percentage}%`);

        // Move the button thumb
        if (buttonRef.current) {
          buttonRef.current!.style.left = `${pixelOffset}px`;
        }
      },
      [minValue, maxValue],
    );

    useEffect(() => {
      updateProgress(value);
    }, [value, minValue, maxValue, updateProgress]);

    const legendValues = legend ? buildLegend(minValue, maxValue, step) : [];

    useLayoutEffect(() => {
      if (!railRef.current) return;

      const observer = new ResizeObserver(() => {
        const currentVal = inputRef.current?.valueAsNumber ?? minValue;
        updateProgress(currentVal);
      });

      observer.observe(railRef.current);
      return () => observer.disconnect();
    }, [minValue, updateProgress]);

    return (
      <div className={tokenClassNames(styles, "slider", className)}>
        <div className={styles["rail-wrapper"]} ref={railRef}>
          <input
            id={id}
            ref={inputRef}
            step={step}
            defaultValue={value}
            type="range"
            min={minValue}
            max={maxValue}
            tabIndex={-1}
            className={classNames(
              styles["slider-input"],
              styles[`slider-palette-${palette}`],
              styles[`slider-track-${palette}`],
            )}
            style={
              {
                "--progress": `${((value - minValue) / (maxValue - minValue)) * 100}%`,
              } as React.CSSProperties
            }
            onInput={(e) => {
              const val = e.currentTarget.valueAsNumber;
              updateProgress(val);
              onValueChange?.(val);
            }}
          />
          <SliderThumb
            ref={mergedRefs}
            value={value}
            minValue={minValue}
            maxValue={maxValue}
            step={step}
            onValueChange={onValueChange}
            updateProgress={updateProgress}
          />
        </div>
        {legend && (
          <div className={styles.legend}>
            {legendValues.map((value) => (
              <Paragraph size={"sm"} key={value}>
                {value}
              </Paragraph>
            ))}
          </div>
        )}
      </div>
    );
  },
);

type SliderThumbProps = {
  value: number;
  minValue: number;
  maxValue: number;
  step: number;
  onValueChange?: (value: number) => void;
  updateProgress: (val: number) => void;
  ref?: React.Ref<HTMLButtonElement>;
};

const SliderThumb = React.forwardRef<HTMLButtonElement, SliderThumbProps>(
  ({ value, minValue, maxValue, step, onValueChange, updateProgress }, ref) => {
    return (
      <Button
        icon={{ name: "slider" }}
        ref={ref}
        className={styles["custom-thumb"]}
        aria-hidden="true"
        onKeyDown={(e: React.KeyboardEvent<HTMLButtonElement>) => {
          let newValue = value;
          if (e.key === "ArrowRight" || e.key === "ArrowUp") {
            newValue = Math.min(value + step, maxValue);
            e.preventDefault();
          } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
            newValue = Math.max(value - step, minValue);
            e.preventDefault();
          }
          if (newValue !== value) {
            onValueChange?.(newValue);
            updateProgress(newValue);
          }
        }}
      />
    );
  },
);
