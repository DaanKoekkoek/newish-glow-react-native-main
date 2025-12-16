import { Button } from "@odido-portals/glow-react-web/button";
import { Stack } from "@odido-portals/glow-react-web/stack";

import BaseLayout from "../../../BaseLayout";

export default function ButtonPage() {
  return (
    <BaseLayout title="Button (with href)">
      <Stack alignItems="stretch" direction="row" wrap="wrap">
        <Button prominence="default" href="#" as="a">
          prominence: default
        </Button>
        <Button prominence="secondary" href="#" as="a">
          prominence: secondary
        </Button>
        <Button prominence="emphasised" href="#" as="a">
          prominence: emphasised
        </Button>
      </Stack>
    </BaseLayout>
  );
}
