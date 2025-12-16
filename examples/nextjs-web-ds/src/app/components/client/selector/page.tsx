"use client";

import { Selector } from "@odido-portals/glow-react-web/selector";
import { Stack } from "@odido-portals/glow-react-web/stack";

import BaseLayout from "../../../BaseLayout";

export default function SelectorPage() {
  return (
    <BaseLayout title="Selector">
      <Stack
        direction={{ mobileSmall: "column", laptop: "row" }}
        alignItems={{ mobileSmall: "stretch", laptop: "flex-end" }}
      >
        <Selector
          variant="compact"
          id="selector-id"
          name="selector-name"
          title="Compact variant"
          highlight="Selector"
        />
        <Selector
          variant="compact"
          id="selector-id-2"
          name="selector-name"
          title="Compact variant"
        />
        <Selector
          variant="compact"
          id="selector-id-3"
          name="selector-name"
          title="Compact variant"
        />
      </Stack>
    </BaseLayout>
  );
}
