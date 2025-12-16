import styles from "./Afm.module.scss";
import { AfmProps } from "./Afm.types";
import { Afm } from "./assets/Afm.tsx";
import { tokenClassNames } from "_utility";

export const AFM = ({
  ariaLabel = "Let op! Geld lenen kost geld.",
  testID = "afm",
  className,
}: AfmProps) => {
  return (
    <div className={tokenClassNames(styles, "afm", className)}>
      <Afm
        aria-label={ariaLabel}
        data-testid={testID}
        className={styles["afm-svg"]}
      />
    </div>
  );
};
