import classNames from "classnames";
import { Paragraph } from "foundations/Paragraph";
import { tokenClassNames } from "_utility";

import styles from "./DonutGraph.module.scss";
import { type DonutGraphProps } from "./DonutGraph.types";

const GRAPH_SIZES = {
  sm: 68,
  md: 120,
  lg: 240,
};

const STROKE_WIDTH_BASE = {
  sm: 2.35,
  md: 4.15,
  lg: 8.3,
};

const STROKE_WIDTH_PROGRESS = {
  sm: 3.35,
  md: 6,
  lg: 12,
};

export const DonutGraph = ({
  label = "test",
  value = "23",
  palette = "default",
  size = "md",
  percentage = 20,
  testID = "donut-graph",
}: DonutGraphProps) => {
  const baseStroke = STROKE_WIDTH_BASE[size];
  const viewSize = GRAPH_SIZES[size] + baseStroke / 2;
  const progressStroke = STROKE_WIDTH_PROGRESS[size];
  const radius = viewSize / 2 - progressStroke / 2;
  const circumference = 2 * Math.PI * radius;
  const dashoffset = circumference * (1 - percentage / 100);

  return (
    <div
      className={classNames(
        tokenClassNames(styles),
        styles["donut-graph-wrapper"],
      )}
    >
      <div
        className={classNames(
          tokenClassNames(styles, "donut-graph"),
          styles[`size-${size}`],
          styles[`palette-${palette}`],
        )}
        data-testid={testID}
      >
        <svg
          className={styles["donut-graph-svg"]}
          viewBox={`0 0 ${viewSize} ${viewSize}`}
          shapeRendering="geometricPrecision"
        >
          <circle
            className={classNames(styles["donut-base"], styles[`size-${size}`])}
            cx="50%"
            cy="50%"
            r={radius}
          />
          <circle
            className={classNames(
              styles["donut-progress"],
              styles[`palette-${palette}`],
              styles[`size-${size}`],
            )}
            cx="50%"
            cy="50%"
            r={radius}
            strokeWidth={progressStroke}
            strokeDasharray={circumference}
            strokeDashoffset={dashoffset}
            strokeLinecap="round"
            transform={`rotate(-90 ${viewSize / 2} ${viewSize / 2})`}
          />
        </svg>
        <div className={styles["donut-graph-text-container"]}>
          <span className={styles[`donut-graph-number-${size}`]}>{value}</span>
          {(size === "lg" || size === "md") && (
            <Paragraph
              className={classNames(styles["donut-graph-label"], {
                [styles["size-lg"]]: size === "lg",
              })}
            >
              {label}
            </Paragraph>
          )}
        </div>
      </div>
      {size === "sm" && (
        <Paragraph className={styles["donut-graph-label"]}>{label}</Paragraph>
      )}
    </div>
  );
};
