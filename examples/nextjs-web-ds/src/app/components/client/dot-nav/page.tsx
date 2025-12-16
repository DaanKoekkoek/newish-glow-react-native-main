"use client";

import { DotNav } from "@odido-portals/glow-react-web/dot-nav";

import BaseLayout from "../../../BaseLayout";

export default function DotNavPage() {
  return (
    <BaseLayout title="DotNav">
      <DotNav count={5} timerDuration={5000} />
    </BaseLayout>
  );
}
