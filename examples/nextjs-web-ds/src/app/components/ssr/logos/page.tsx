import { Logos } from "@odido-portals/glow-react-web/logos";
import { Stack } from "@odido-portals/glow-react-web/stack";

import BaseLayout from "../../../BaseLayout";

export default function LogosPage() {
  return (
    <BaseLayout title="Logos">
      <Stack direction="row">
        <Stack>
          <Logos />
          <Logos size="lg" />
          <Logos size="xl" />
        </Stack>
        <Stack>
          <Logos brand="ben" />
          <Logos brand="ben" size="lg" />
          <Logos brand="ben" size="xl" />
        </Stack>
        <Stack>
          <Logos brand="simpel" />
          <Logos brand="simpel" size="lg" />
          <Logos brand="simpel" size="xl" />
        </Stack>
      </Stack>
    </BaseLayout>
  );
}
