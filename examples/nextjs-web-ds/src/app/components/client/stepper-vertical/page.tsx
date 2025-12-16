"use client";

import {
  StepperVertical,
  StepperVerticalStep,
} from "@odido-portals/glow-react-web/stepper-vertical";

import BaseLayout from "../../../BaseLayout";

export default function StepperVerticalPage() {
  return (
    <BaseLayout title="StepperVertical">
      <StepperVertical>
        <StepperVerticalStep title="state: completed" state="completed" />
        <StepperVerticalStep title="state: default" state="default" />
        <StepperVerticalStep title="state: active" state="active" />
        <StepperVerticalStep title="state: inactive" state="inactive" />
      </StepperVertical>
    </BaseLayout>
  );
}
