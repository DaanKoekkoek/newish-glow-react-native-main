"use client";

import { SelectorLight } from "@odido-portals/glow-react-web/selector-light";
import { Stack } from "@odido-portals/glow-react-web/stack";

import BaseLayout from "../../../BaseLayout";

export default function SelectorLightPage() {
  return (
    <BaseLayout title="SelectorLight">
      <Stack
        direction={{ mobileSmall: "column", laptop: "row" }}
        alignItems={{ mobileSmall: "stretch", laptop: "flex-end" }}
      >
        <SelectorLight
          id="selector-light-id"
          name="selector-light-name"
          glow="glow3"
          title="Title"
          highlight="SelectorLight"
        />
        <SelectorLight
          id="selector-light-id-2"
          name="selector-light-name"
          glow="glow3"
          title="Title"
        />
        <SelectorLight
          id="selector-light-id-3"
          name="selector-light-name"
          glow="glow3"
          title="Title"
        />
      </Stack>
    </BaseLayout>
  );
}
