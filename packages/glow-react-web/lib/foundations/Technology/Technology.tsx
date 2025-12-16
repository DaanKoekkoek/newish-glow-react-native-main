import styles from "./Technology.module.scss";
import type { TechnologyProps } from "./Technology.types";
import { technologies } from "./Technology.config";
import { BadgeStatus } from "components/Badge";
import { tokenClassNames } from "_utility";

export const Technology = ({
  state,
  type,
  testID = "technology",
}: TechnologyProps) => {
  const TechnologyComponent = technologies[type];
  if (!TechnologyComponent) {
    console.error(`Technology component for type "${type}" not found.`);
    return null;
  }
  return (
    <div
      className={tokenClassNames(styles, "technology")}
      data-testid={testID}
      data-technology={type}
    >
      <TechnologyComponent
        data-testid={`${testID}-${type}`}
        className={styles["technology-icon"]}
      />
      <BadgeStatus
        className={styles["technology-badge"]}
        variant={state === "information" ? "default" : state}
      />
    </div>
  );
};
