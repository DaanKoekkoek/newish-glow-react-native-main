import { Badge } from "@odido-portals/glow-react-web/badge";
import { Icon } from "@odido-portals/glow-react-web/icon";
import { Paragraph } from "@odido-portals/glow-react-web/paragraph";
import {
  StepperInpage,
  StepperInpageStep,
} from "@odido-portals/glow-react-web/stepper-inpage";
import { TextLink } from "@odido-portals/glow-react-web/text-link";

import BaseLayout from "../../../BaseLayout";

export default function StepperInpagePage() {
  return (
    <BaseLayout title="StepperInpage">
      <StepperInpage>
        <StepperInpageStep
          state="completed"
          key="step-1"
          title="Stepper Inpage 1"
          badge={<Badge text="Klantvoordeel" />}
          textLink={
            <TextLink href="#" size="sm">
              <Icon name="add" />
              Text link
            </TextLink>
          }
        >
          <Paragraph size="sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
            hendrerit dolor in fermentum dictum. Aenean ac pulvinar sapien.
            Quisque nec elit placerat, eleifend nisi ac, venenatis velit. Ut et
            aliquet lorem. Pellentesque ac mollis ligula.
          </Paragraph>
        </StepperInpageStep>
        <StepperInpageStep
          state="active"
          key="step-2"
          title="Stepper Inpage 2"
          badge={<Badge text="Klantvoordeel" />}
          textLink={
            <TextLink href="#" size="sm">
              <Icon name="add" />
              Text link
            </TextLink>
          }
        >
          <Paragraph size="sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
            hendrerit dolor in fermentum dictum. Aenean ac pulvinar sapien.
            Quisque nec elit placerat, eleifend nisi ac, venenatis velit. Ut et
            aliquet lorem. Pellentesque ac mollis ligula.
          </Paragraph>
        </StepperInpageStep>
        <StepperInpageStep
          key="step-3"
          title="Stepper Inpage 3"
          badge={<Badge text="Klantvoordeel" />}
          textLink={
            <TextLink href="#" size="sm">
              <Icon name="add" />
              Text link
            </TextLink>
          }
        >
          <Paragraph size="sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
            hendrerit dolor in fermentum dictum. Aenean ac pulvinar sapien.
            Quisque nec elit placerat, eleifend nisi ac, venenatis velit. Ut et
            aliquet lorem. Pellentesque ac mollis ligula.
          </Paragraph>
        </StepperInpageStep>
      </StepperInpage>
    </BaseLayout>
  );
}
