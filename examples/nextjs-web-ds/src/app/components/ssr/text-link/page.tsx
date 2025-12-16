import { Icon } from "@odido-portals/glow-react-web/icon";
import { Stack } from "@odido-portals/glow-react-web/stack";
import { TextLink } from "@odido-portals/glow-react-web/text-link";

import BaseLayout from "../../../BaseLayout";

export default function TextLinkPage() {
  return (
    <BaseLayout title="TextLink">
      <Stack>
        <TextLink href="#">Link</TextLink>
        <TextLink href="#">
          Link
          <Icon name="arrow-right" />
        </TextLink>
      </Stack>
    </BaseLayout>
  );
}
