import classNames from "classnames";
import { DotNavProps } from "./DotNav.types";
import styles from "./DotNav.module.scss";
import { tokenClassNames } from "_utility";
import { useDotNav } from "./hooks";

export const DotNav = ({
  count,
  activeIndex,
  timerDuration,
  onNext,
  onDotClick,
}: DotNavProps) => {
  const { internalActiveIndex, progress, handleDotClick } = useDotNav({
    count,
    activeIndex,
    timerDuration,
    onNext,
    onDotClick,
  });

  return (
    <div className={tokenClassNames(styles, "dot-nav")}>
      {Array.from({ length: count }).map((_, index) => (
        <button
          key={index}
          type="button"
          className={classNames(styles["dot-nav-button"], {
            [styles["is-active"]]: index === internalActiveIndex,
            [styles["has-timer"]]: timerDuration,
          })}
          onClick={() => handleDotClick(index)}
          aria-label={`Go to slide ${index + 1}`}
        >
          <div
            className={styles["dot-nav-button-progress"]}
            style={
              {
                "--progress-active":
                  index === internalActiveIndex ? progress : 0,
                "--timer-duration": `${timerDuration}ms`,
              } as React.CSSProperties
            }
          />
        </button>
      ))}
    </div>
  );
};
