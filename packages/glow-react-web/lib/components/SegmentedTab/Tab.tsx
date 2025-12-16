import { Icon } from "foundations/Icon";
import { Strong } from "foundations/Strong";
import styles from "./SegmentedTab.module.scss";
import classNames from "classnames";
import { TabContent, TabState } from "./SegmentedTab.types";

interface Tab {
  content: TabContent;
  selected: boolean;
  activeState: TabState;
}

export const Tab = ({ content, selected, activeState }: Tab) => {
  const tabColorClassName = classNames({
    [styles[`tab-color-default`]]: activeState === "default",
    [styles[`tab-color-selected-inactive`]]:
      activeState !== "default" && selected,
    [styles[`tab-color-inactive`]]: activeState !== "default" && !selected,
    [styles[`bg-color`]]: true,
  });

  const iconLabel = content.icon ? content.icon : "";

  return (
    <div
      className={styles.tab}
      aria-label={content.label + iconLabel}
      aria-selected={selected}
      data-testid={content.label}
    >
      {content.icon && (
        <Icon name={content.icon} className={tabColorClassName} />
      )}
      <Strong size={content.icon ? "xs" : "sm"} className={tabColorClassName}>
        {content.label}
      </Strong>
    </div>
  );
};
