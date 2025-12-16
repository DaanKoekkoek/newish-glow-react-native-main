import { Addon } from "@odido-portals/glow-react-web/addon";
import { Stack } from "@odido-portals/glow-react-web/stack";

import BaseLayout from "../../../BaseLayout";

export default function AddonPage() {
  return (
    <BaseLayout title="Addon">
      <Stack direction="row">
        <Addon name="Amazon Prime" />
        <Addon name="Amazon Prime" size="sm" />
        <Addon name="Amazon Prime" size="xs" />
      </Stack>
    </BaseLayout>
  );
}
