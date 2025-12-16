import { Button } from "@odido-portals/glow-react-web/button";
import { Heading } from "@odido-portals/glow-react-web/heading";
import { Paragraph } from "@odido-portals/glow-react-web/paragraph";
import { Stack } from "@odido-portals/glow-react-web/stack";

import BaseLayout from "../../../BaseLayout";

export default function StackPage() {
  return (
    <BaseLayout title="Stack">
      <Stack>
        <Heading>Heading in {`<Stack />`}</Heading>
        <Paragraph>Paragraph in {`<Stack />`}</Paragraph>
        <Button>Button in {`<Stack />`}</Button>
      </Stack>
    </BaseLayout>
  );
}
