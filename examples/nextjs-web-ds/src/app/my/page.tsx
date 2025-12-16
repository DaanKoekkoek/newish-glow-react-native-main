"use client";

import { Column, Grid } from "@odido-portals/glow-react-web/grid";

import BaseLayout from "../BaseLayout";
import { BoxLayout } from "../BoxLayout";

import { routes } from "@/app/routes";

export default function ShopPage() {
  const myRoute = routes.find((r) => r.href === "/my");

  const allSublinks = myRoute?.sublinks || [];

  return (
    <BaseLayout title="My" grid="custom-with-section">
      <Grid>
        <Column>
          <BoxLayout items={allSublinks} prominence="outline" />
        </Column>
      </Grid>
    </BaseLayout>
  );
}
