"use client";

import { Select } from "@odido-portals/glow-react-web/select";

import BaseLayout from "../../../BaseLayout";

export default function SelectPage() {
  return (
    <BaseLayout title="Select">
      <Select
        id="select-id"
        legend={{ label: "Label" }}
        options={[
          { value: "value-1", name: "Value 1" },
          { value: "value-2", name: "Value 2" },
          { value: "value-3", name: "Value 3" },
        ]}
      />
    </BaseLayout>
  );
}
