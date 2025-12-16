"use client";

import { SelectorImage } from "@odido-portals/glow-react-web/selector-image";
import { Stack } from "@odido-portals/glow-react-web/stack";

import BaseLayout from "../../../BaseLayout";

export default function SelectorImagePage() {
  return (
    <BaseLayout title="SelectorImage">
      <Stack
        direction={{ mobileSmall: "column", laptop: "row" }}
        alignItems={{ mobileSmall: "stretch", laptop: "flex-end" }}
      >
        <SelectorImage
          image={{
            src: "https://a.storyblok.com/f/145395/1600x900/5e4649628f/mid-hero.webp",
            alt: "alt",
          }}
          id="selector-image-id"
          name="selector-image-name"
          glow="glow2"
          title="Vertical direction"
          type="checkbox"
          promotion="promotion"
          description="description"
          highlight="SelectorImage"
        />
        <SelectorImage
          image={{
            src: "https://a.storyblok.com/f/145395/1600x900/5e4649628f/mid-hero.webp",
            alt: "alt",
          }}
          id="selector-image-id-2"
          name="selector-image-name"
          glow="glow2"
          title="Vertical direction"
          type="checkbox"
          promotion="promotion"
          description="description"
        />
        <SelectorImage
          image={{
            src: "https://a.storyblok.com/f/145395/1600x900/5e4649628f/mid-hero.webp",
            alt: "alt",
          }}
          id="selector-image-id-3"
          name="selector-image-name"
          glow="glow2"
          title="Vertical direction"
          type="checkbox"
          promotion="promotion"
          description="description"
        />
      </Stack>
    </BaseLayout>
  );
}
