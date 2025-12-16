"use client"; // Added due to usePersistentStateReadOnly

import {
  MySection,
  MySectionGrid,
} from "@odido-portals/glow-react-web/my-section";
import { Paragraph } from "@odido-portals/glow-react-web/paragraph";
import type { BrandName } from "@odido-portals/glow-react-web/theme-provider";

import BaseLayout from "../../../BaseLayout";

import { usePersistentStateReadOnly } from "@/app/hooks";

export default function MySectionPage() {
  const brand = usePersistentStateReadOnly<BrandName>("odido", "odido");
  return (
    <BaseLayout title="MySection" grid="custom">
      <MySection
        variant={brand === "sim-wallet" ? "emphasised" : "default"}
        title={{ text: "title size: xl" }}
      >
        <MySectionGrid>
          <Paragraph>Paragraph in {`<MySection />`}</Paragraph>
        </MySectionGrid>
      </MySection>
    </BaseLayout>
  );
}
