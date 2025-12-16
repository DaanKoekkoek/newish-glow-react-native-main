"use client"; // Added due to usePersistentStateReadOnly

import { Box } from "@odido-portals/glow-react-web/box";
import { Paragraph } from "@odido-portals/glow-react-web/paragraph";
import { ShopSection } from "@odido-portals/glow-react-web/shop-section";
import type { BrandName } from "@odido-portals/glow-react-web/theme-provider";

import BaseLayout from "../../../BaseLayout";

import { usePersistentStateReadOnly } from "@/app/hooks";

export default function ShopSectionPage() {
  const brand = usePersistentStateReadOnly<BrandName>("odido", "odido");
  return (
    <BaseLayout title="ShopSection" grid="custom">
      <ShopSection
        variant={brand === "sim-wallet" ? "emphasised" : "default"}
        title={{ text: "title size: xl" }}
        aside={
          <Box prominence="color">
            <Paragraph>Aside content</Paragraph>
          </Box>
        }
      >
        <div style={{ minHeight: "75vh" }}>
          <Box prominence="color">
            <Paragraph>Paragraph in {`<ShopSection />`}</Paragraph>
          </Box>
        </div>
      </ShopSection>
    </BaseLayout>
  );
}
