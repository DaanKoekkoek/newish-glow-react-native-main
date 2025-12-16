import { Heading } from "@odido-portals/glow-react-web/heading";
import { Stack } from "@odido-portals/glow-react-web/stack";

import BaseLayout from "../../../BaseLayout";

export default function HeadingPage() {
  return (
    <BaseLayout title="Heading">
      <Stack>
        <Heading size="xs">size: xs</Heading>
        <Heading size="sm">size: sm</Heading>
        <Heading size="md">size: md</Heading>
        <Heading size="lg">size: lg</Heading>
        <Heading size="xl">size: xl</Heading>
      </Stack>
    </BaseLayout>
  );
}
