import { Icon } from "@odido-portals/glow-react-web/icon";
import { Paragraph } from "@odido-portals/glow-react-web/paragraph";
import { Stack } from "@odido-portals/glow-react-web/stack";

import BaseLayout from "../../../BaseLayout";

export default function IconPage() {
  return (
    <BaseLayout title="Icon">
      <Stack>
        <Stack direction="row" alignItems="center">
          <Paragraph>size: sm</Paragraph>
          <Icon name="3d" size="sm" />
        </Stack>
        <Stack direction="row" alignItems="center">
          <Paragraph>size: md</Paragraph>
          <Icon name="3d" size="md" />
        </Stack>
        <Stack direction="row" alignItems="center">
          <Paragraph>size: lg</Paragraph>
          <Icon name="3d" size="lg" />
        </Stack>
        <Stack direction="row" alignItems="center">
          <Paragraph>size: xl</Paragraph>
          <Icon name="3d" size="xl" />
        </Stack>
        <Stack direction="row" alignItems="center">
          <Paragraph>size: xxl</Paragraph>
          <Icon name="3d" size="xxl" />
        </Stack>
      </Stack>
    </BaseLayout>
  );
}
