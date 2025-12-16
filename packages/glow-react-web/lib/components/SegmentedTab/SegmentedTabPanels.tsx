import styles from "./SegmentedTab.module.scss";
import { SegmentedTabPanelsProps } from "./SegmentedTab.types";

export const SegmentedTabPanels = ({
  options,
  active = 0,
  uuid,
}: SegmentedTabPanelsProps) => {
  return (
    <div className={styles[`tab-count-${options.length}`]}>
      {options.map((tab, index) => (
        <div
          data-testid="segmented-tab-panel-child"
          key={index}
          data-unique-id={uuid}
          className={`${styles["panel"]} ${uuid}-${tab.id} ${
            active === index ? styles["panel-show"] : styles["panel-hide"]
          }`}
        >
          {tab.panel}
        </div>
      ))}
    </div>
  );
};
