import { Price } from "@odido-portals/glow-react-web/price";
import { Stack } from "@odido-portals/glow-react-web/stack";

import BaseLayout from "../../../BaseLayout";

export default function PricePage() {
  return (
    <BaseLayout title="Price">
      <Stack>
        <Price value="19,52" beforeText="size: sm" size="sm" showAsterisk />
        <Price value="19,52" beforeText="size: default" showAsterisk />
        <Price value="19,52" beforeText="size: lg" size="lg" showAsterisk />
        <Price value="19,52" beforeText="size: xl" size="xl" showAsterisk />
      </Stack>
    </BaseLayout>
  );
}
