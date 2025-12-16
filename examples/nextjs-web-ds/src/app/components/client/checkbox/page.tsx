"use client";

import { Checkbox } from "@odido-portals/glow-react-web/checkbox";

import BaseLayout from "../../../BaseLayout";

export default function CheckboxPage() {
  return (
    <BaseLayout title="Checkbox">
      <Checkbox id="checkbox-id" name="checkbox-name" label="checkbox label" />
    </BaseLayout>
  );
}
