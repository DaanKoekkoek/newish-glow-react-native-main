import classNames from "classnames";
import styles from "./ProgressBar.module.scss";
import { ProgressBarProps, ProgressBarStepProps } from "./ProgressBar.types";
import { Paragraph } from "foundations/Paragraph";
import { tokenClassNames } from "_utility";

export const ProgressBar = ({
  palette = "default",
  progress = 0,
  children = null,
}: ProgressBarProps) => {
  return (
    <div className={tokenClassNames(styles, "progress-bar")}>
      <div
        className={classNames(
          styles["progress-track"],
          styles[`palette-${palette}`],
        )}
      >
        <div
          className={classNames(
            styles["progress-fill"],
            styles[`palette-active-${palette}`],
          )}
          style={{
            ["--progress-scale" as string]: progress / 100,
          }}
        />
      </div>

      <div className={classNames(styles["steps"])}>{children}</div>
    </div>
  );
};

export const ProgressBarStep = ({
  title,
  active,
  testID,
}: ProgressBarStepProps) => (
  <Paragraph
    as="span"
    size="sm"
    testID={testID}
    className={classNames(styles.step, {
      [styles["step-active"]]: active,
    })}
  >
    {title}
  </Paragraph>
);
