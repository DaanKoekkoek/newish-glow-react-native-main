import { Display } from "@odido-portals/glow-react-web/display";
import { Stack } from "@odido-portals/glow-react-web/stack";

import BaseLayout from "../../../BaseLayout";

export default function DisplayPage() {
  return (
    <BaseLayout title="Display">
      <Stack>
        <Display size="sm">size: sm</Display>
        <Display size="md">size: md</Display>
      </Stack>
    </BaseLayout>
  );
}
