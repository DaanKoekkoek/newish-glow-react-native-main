import {
  Stepper,
  HorizontalStep,
} from "@odido-portals/glow-react-web/stepper-horizontal";

import BaseLayout from "../../../BaseLayout";

export default function StepperHorizontalPage() {
  return (
    <BaseLayout title="StepperHorizontal">
      <Stepper>
        <HorizontalStep title="state: completed" state="completed" />
        <HorizontalStep title="state: default" state="default" />
        <HorizontalStep title="state: active" state="active" />
        <HorizontalStep title="state: inactive" state="inactive" />
      </Stepper>
    </BaseLayout>
  );
}
