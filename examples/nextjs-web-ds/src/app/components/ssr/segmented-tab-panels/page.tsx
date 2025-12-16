import { Paragraph } from "@odido-portals/glow-react-web/paragraph";
import { SegmentedTabPanels } from "@odido-portals/glow-react-web/segmented-tab-panels";

import BaseLayout from "../../../BaseLayout";

export default function SegmentedTabPanelsPage() {
  return (
    <BaseLayout title="SegmentedTabPanels">
      <SegmentedTabPanels
        uuid="EXAMPLE_SEGMENT_UNIQUE_ID"
        options={[
          {
            id: 0,
            panel: <Paragraph>SegmentedTabPanels tab 0.</Paragraph>,
          },
          {
            id: 1,
            panel: <Paragraph>SegmentedTabPanels tab 1.</Paragraph>,
          },
          {
            id: 2,
            panel: <Paragraph>SegmentedTabPanels tab 2.</Paragraph>,
          },
        ]}
      />
    </BaseLayout>
  );
}
