"use client";

import { SegmentedTabButtons } from "@odido-portals/glow-react-web/segmented-tab-buttons";

import BaseLayout from "../../../BaseLayout";

export default function SegmentedTabButtonsPage() {
  return (
    <BaseLayout title="SegmentedTabButtons">
      <SegmentedTabButtons
        onTabChange={() => {}}
        uuid="UUID"
        options={[
          {
            id: 0,
            tab: {
              label: "Home",
              icon: "home",
            },
          },
          {
            id: 1,
            tab: {
              label: "Profile",
              icon: "profile-business",
            },
          },
          {
            id: 2,
            tab: {
              label: "Settings",
              icon: "3d",
            },
          },
        ]}
      />
    </BaseLayout>
  );
}
