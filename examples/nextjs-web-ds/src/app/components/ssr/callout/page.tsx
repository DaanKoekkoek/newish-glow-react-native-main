import { Callout } from "@odido-portals/glow-react-web/callout";
import { Paragraph } from "@odido-portals/glow-react-web/paragraph";
import { Stack } from "@odido-portals/glow-react-web/stack";

import BaseLayout from "../../../BaseLayout";

export default function CalloutPage() {
  return (
    <BaseLayout title="Callout">
      <Stack alignItems="stretch" direction="row" wrap="wrap">
        <Callout title="Callout title" content="alternate">
          <Paragraph>status: default</Paragraph>
        </Callout>
        <Callout title="Callout title" status="error" content="alternate">
          <Paragraph>status: error</Paragraph>
        </Callout>
        <Callout title="Callout title" status="warning" content="alternate">
          <Paragraph>status: warning</Paragraph>
        </Callout>
        <Callout title="Callout title" status="success" content="alternate">
          <Paragraph>status: success</Paragraph>
        </Callout>
      </Stack>
    </BaseLayout>
  );
}
