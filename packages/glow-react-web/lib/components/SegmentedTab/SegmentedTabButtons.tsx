"use client";

import styles from "./SegmentedTab.module.scss";
import { Tab } from "./Tab";
import { Button } from "components/Button";
import classNames from "classnames";
import { ButtonOption, SegmentedTabButtonsProps } from "./SegmentedTab.types";
import { useEffect, useState } from "react";
import { tokenClassNames } from "_utility";

export const SegmentedTabButtons = ({
  options,
  active = 0,
  state = "default",
  variant = "default",
  backgroundPalette = "default",
  shadowPalette = "default",
  uuid,
  onTabChange,
}: SegmentedTabButtonsProps) => {
  const [activeTab, setActiveTab] = useState(options[active]);
  const handleTabOnClick = (tab: ButtonOption) => {
    setActiveTab(tab);
    if (onTabChange) onTabChange(tab.id);

    document.querySelectorAll(`[data-unique-id="${uuid}"]`).forEach((panel) => {
      panel.classList.remove(styles["panel-show"]);
      panel.classList.add(styles["panel-hide"]);
    });

    const activePanel = document.querySelector(`.${uuid}-${tab.id}`);

    if (activePanel) {
      activePanel.classList.remove(styles["panel-hide"]);
      activePanel.classList.add(styles["panel-show"]);
    }
  };

  useEffect(() => {
    handleTabOnClick(options[active]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles[`tab-count-${options.length}`]}>
      <div
        className={tokenClassNames(styles, "segmented-tab", {
          [styles[
            `segmented-tab-variant-${variant}-palette-${backgroundPalette}`
          ]]: state !== "inactive",
          [styles[`segmented-tab-bg-inactive`]]: state === "inactive",
        })}
      >
        {/* Tab Selector */}
        <div className={styles["tab-background-container"]}>
          <div
            className={classNames({
              [styles[`tab-background-sliding`]]: true,
              [styles[`tab-palette-${shadowPalette}`]]:
                state === "default" && variant === "default",
              [styles[`tab-variant-${state}`]]:
                state === "inactive" ||
                (variant === "subtle"
                  ? [styles[`tab-variant-${variant}`]]
                  : [styles[`tab-variant-default`]]),
            })}
            style={{
              "--active-tab": activeTab.id,
            }}
          ></div>
        </div>

        {/* Tab Buttons */}
        <div className={styles["tab-container"]}>
          {options.map((tab) => (
            <Button
              disabled={state === "inactive"}
              className={classNames(
                styles[`button-base`],
                styles[`button-base-segmented-tab`],
                styles[`bg-color`],
              )}
              key={tab.id}
              onClick={() => handleTabOnClick(tab)}
            >
              <Tab
                content={tab.tab}
                selected={activeTab.id === tab.id}
                activeState={state}
              />
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};
