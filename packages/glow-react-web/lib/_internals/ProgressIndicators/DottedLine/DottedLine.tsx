import styles from "./DottedLine.module.scss";
import type { DottedLineProps } from "./DottedLine.types";
import { tokenClassNames } from "_utility";

export const DottedLine = ({
  active = false,
  direction = "horizontal",
}: DottedLineProps) => {
  const stepperDot = {
    offset: 6,
    size: 2,
    count: 100,
  };

  const propSvg =
    direction === "horizontal"
      ? {
          width: "100%",
          height: stepperDot.size * 2,
          preserveAspectRatio: "xMinYMid",
        }
      : {
          width: stepperDot.size * 2,
          height: "100%",
          preserveAspectRatio: "xMidYMid meet",
        };

  const propCircle = (i: number) =>
    direction === "horizontal"
      ? {
          r: stepperDot.size,
          cx: (i + 0.5) * (stepperDot.size + stepperDot.offset),
          cy: stepperDot.size,
        }
      : {
          r: stepperDot.size,
          cx: stepperDot.size,
          cy: (i + 0.5) * (stepperDot.size + stepperDot.offset),
        };

  return (
    <div
      className={tokenClassNames(
        styles,
        "stepper-dotted-line",
        direction === "horizontal"
          ? styles["horizontal-space"]
          : styles["vertical-space"],
      )}
    >
      <svg
        {...propSvg}
        className={direction === "vertical" ? styles["svg-vertical"] : ""}
      >
        {[...Array(stepperDot.count)].map((_, i) => (
          <circle
            className={active ? styles["dots-active"] : styles["dots"]}
            key={i}
            {...propCircle(i)}
          />
        ))}
      </svg>
    </div>
  );
};
