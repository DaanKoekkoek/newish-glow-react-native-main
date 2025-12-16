import { DefaultList } from "@odido-portals/glow-react-web/default-list";
import { Stack } from "@odido-portals/glow-react-web/stack";

import BaseLayout from "../../../BaseLayout";

export default function DefaultListPage() {
  return (
    <BaseLayout title="DefaultList">
      <Stack direction="row" wrap="wrap">
        <DefaultList
          variant="icon"
          items={[
            {
              icon: "checkmark",
              text: "Variant: icon",
            },
            {
              icon: "checkmark",
              text: "Variant: icon",
            },
            {
              icon: "checkmark",
              text: "Variant: icon",
            },
          ]}
        />
        <DefaultList
          variant="iconColored"
          items={[
            {
              icon: "checkmark",
              text: "Variant: iconColored",
            },
            {
              icon: "checkmark",
              text: "Variant: iconColored",
            },
            {
              icon: "checkmark",
              text: "Variant: iconColored",
            },
          ]}
        />
        <DefaultList
          variant="numbered"
          items={[
            {
              text: "Variant: numbered",
            },
            {
              text: "Variant: numbered",
            },
            {
              text: "Variant: numbered",
            },
          ]}
        />
        <DefaultList
          variant="bullet"
          items={[
            {
              text: "Variant: bullet",
            },
            {
              text: "Variant: bullet",
            },
            {
              text: "Variant: bullet",
            },
          ]}
        />
      </Stack>
    </BaseLayout>
  );
}
