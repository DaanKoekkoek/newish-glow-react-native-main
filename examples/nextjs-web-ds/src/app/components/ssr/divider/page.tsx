import { Divider } from "@odido-portals/glow-react-web/divider";
import { Paragraph } from "@odido-portals/glow-react-web/paragraph";
import { Stack } from "@odido-portals/glow-react-web/stack";

import BaseLayout from "../../../BaseLayout";

export default function DividerPage() {
  return (
    <BaseLayout title="Divider">
      <Stack>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Paragraph>no props</Paragraph>
          <Divider />
        </Stack>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Paragraph>variant: strong</Paragraph>
          <Divider variant="strong" />
        </Stack>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Paragraph>prominence: subtle</Paragraph>
          <Divider prominence="subtle" />
        </Stack>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Paragraph>prominence: subtle, variant: strong</Paragraph>
          <Divider prominence="subtle" variant="strong" />
        </Stack>
      </Stack>
    </BaseLayout>
  );
}
