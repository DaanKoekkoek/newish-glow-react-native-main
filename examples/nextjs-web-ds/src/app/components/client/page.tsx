"use client";

import { Grid, Column } from "@odido-portals/glow-react-web/grid";
import type { BrandName } from "@odido-portals/glow-react-web/theme-provider";

import BaseLayout from "../../BaseLayout";
import { BoxLayout } from "../../BoxLayout";

import { usePersistentStateReadOnly } from "@/app/hooks";
import { routes } from "@/app/routes";

export default function SsrPage() {
  const componentsRoute = routes.find((r) => r.href === "/components");
  const clientGroup = componentsRoute?.groups?.find((g) => g.key === "client");
  const brand = usePersistentStateReadOnly<BrandName>("odido", "odido");

  return (
    <BaseLayout title="Client components" grid="custom-with-section">
      <Grid>
        <Column>
          <BoxLayout
            items={clientGroup?.sublinks ?? []}
            prominence={brand === "sim-wallet" ? "outline" : "color"}
            getPalette={() => "red"}
          />
        </Column>
      </Grid>
    </BaseLayout>
  );
}
