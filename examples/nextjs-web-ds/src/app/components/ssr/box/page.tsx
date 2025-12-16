import { Box } from "@odido-portals/glow-react-web/box";
import { Paragraph } from "@odido-portals/glow-react-web/paragraph";
import { Stack } from "@odido-portals/glow-react-web/stack";

import BaseLayout from "../../../BaseLayout";

export default function BoxPage() {
  return (
    <BaseLayout title="Box">
      <Stack alignItems="stretch" direction="row" wrap="wrap">
        <Box prominence="color">
          <Paragraph>prominence: color</Paragraph>
        </Box>
        <Box prominence="outline">
          <Paragraph>prominence: outline</Paragraph>
        </Box>
        <Box prominence="emphasised">
          <Paragraph>prominence: emphasised</Paragraph>
        </Box>
      </Stack>
    </BaseLayout>
  );
}
