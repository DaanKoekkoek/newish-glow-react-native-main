import { useAllowedChildren } from "_global-hooks";
import React, { useState } from "react";

import { SegmentedTabButtons } from "./SegmentedTab.Buttons";
import { Panel } from "./SegmentedTab.Panel";
import { SegmentedTabContext } from "./useSegmentedTabContext";

export const SegmentedTab = ({
  children,
  onTabChange,
}: {
  children: React.ReactNode;
  onTabChange: (activeTab: number) => void;
}) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const segmentedTabChildren = useAllowedChildren(children, [
    Panel,
    SegmentedTabButtons,
  ]);

  return (
    <SegmentedTabContext.Provider
      value={{ activeTab, setActiveTab, onTabChange }}
    >
      {segmentedTabChildren}
    </SegmentedTabContext.Provider>
  );
};

SegmentedTab.Buttons = SegmentedTabButtons;
SegmentedTab.Panel = Panel;
