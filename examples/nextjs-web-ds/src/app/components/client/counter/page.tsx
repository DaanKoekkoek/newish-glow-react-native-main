"use client";

import { Counter } from "@odido-portals/glow-react-web/counter";

import BaseLayout from "../../../BaseLayout";

export default function CounterPage() {
  const futureDate: Date = new Date();
  futureDate.setDate(futureDate.getDate());

  const targetDate: Date = new Date(futureDate);
  targetDate.setDate(targetDate.getDate() + 2);
  targetDate.setHours(targetDate.getHours() + 12);

  return (
    <BaseLayout title="Counter">
      <Counter
        targetDate={targetDate.toISOString()}
        size={{ mobileSmall: "default", tablet: "lg" }}
      />
    </BaseLayout>
  );
}
