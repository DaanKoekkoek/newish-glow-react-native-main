import { HorizontalCard } from "@odido-portals/glow-react-web/horizontal-card";
import { Icon } from "@odido-portals/glow-react-web/icon";

import BaseLayout from "../../../BaseLayout";

export default function HorizontalCardPage() {
  return (
    <BaseLayout title="HorizontalCard">
      <HorizontalCard
        variant="color"
        icon="4g-for-home"
        title="Title"
        textLink={{
          size: "sm",
          children: ["Link ", <Icon key="icon" name="arrow-right" />],
        }}
      >
        Horizontal card content
      </HorizontalCard>
    </BaseLayout>
  );
}
