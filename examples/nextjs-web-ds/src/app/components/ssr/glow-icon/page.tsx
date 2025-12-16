import { GlowIcon } from "@odido-portals/glow-react-web/icon";
import { Paragraph } from "@odido-portals/glow-react-web/paragraph";
import { Stack } from "@odido-portals/glow-react-web/stack";

import BaseLayout from "../../../BaseLayout";

export default function GlowIconPage() {
  return (
    <BaseLayout title="GlowIcon">
      <Stack>
        <Stack direction="row" alignItems="center">
          <Paragraph>size: sm</Paragraph>
          <GlowIcon name="3d" size="sm" />
        </Stack>
        <Stack direction="row" alignItems="center">
          <Paragraph>size: md</Paragraph>
          <GlowIcon name="3d" size="md" />
        </Stack>
        <Stack direction="row" alignItems="center">
          <Paragraph>size: lg</Paragraph>
          <GlowIcon name="3d" size="lg" />
        </Stack>
        <Stack direction="row" alignItems="center">
          <Paragraph>size: xl</Paragraph>
          <GlowIcon name="3d" size="xl" />
        </Stack>
        <Stack direction="row" alignItems="center">
          <Paragraph>size: xxl</Paragraph>
          <GlowIcon name="3d" size="xxl" />
        </Stack>
      </Stack>
    </BaseLayout>
  );
}
