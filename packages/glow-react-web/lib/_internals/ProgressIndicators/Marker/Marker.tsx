import { Heading } from "foundations/Heading";
import styles from "./Marker.module.scss";
import { Icon } from "foundations/Icon";
import { MarkerProps } from "./Marker.types";
import { tokenClassNames } from "_utility";

export const Marker = ({
  state = "default",
  index,
  palette = "default",
}: MarkerProps) => {
  return (
    <div
      className={tokenClassNames(
        styles,
        "marker",
        styles[`is-state-${state}`],
        {
          [styles[`marker-palette-${palette}`]]: state !== "completed",
        },
      )}
    >
      <div className={styles["marker-inner"]}>
        {state === "completed" ? (
          <Icon name="checkmark" className={styles["marker-icon"]} />
        ) : (
          <Heading as="span" className={styles["marker-text"]} size="md">
            {index}
          </Heading>
        )}
      </div>
    </div>
  );
};
