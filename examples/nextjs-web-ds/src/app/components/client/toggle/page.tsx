"use client";

import { Stack } from "@odido-portals/glow-react-web/stack";
import { Toggle } from "@odido-portals/glow-react-web/toggle";

import BaseLayout from "../../../BaseLayout";

export default function TogglePage() {
  return (
    <BaseLayout title="Toggle">
      <Stack>
        <Toggle id="toggle-id-1" name="toggle-name" />
        <Toggle
          id="toggle-id-2"
          name="toggle-name"
          labelText="onoff"
          size="lg"
        />
        <Toggle
          id="toggle-id-3"
          name="toggle-name"
          labelText="onoff"
          size="xl"
        />
      </Stack>
    </BaseLayout>
  );
}
