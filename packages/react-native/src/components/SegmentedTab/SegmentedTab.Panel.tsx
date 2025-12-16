import { View } from "react-native";

import type { SegmentedTabPanelProps } from "./SegmentedTab.types";
import { useSegmentedTabContext } from "./useSegmentedTabContext";

export const Panel = ({
  child,
  index,
}: SegmentedTabPanelProps): JSX.Element => {
  const { activeTab } = useSegmentedTabContext();

  return (
    <View
      testID="segmented-tab-panel-child"
      style={{ display: activeTab === index ? "flex" : "none" }}
    >
      {child}
    </View>
  );
};
