import { Button } from "@odido-portals/glow-react-web/button";
import { Icon } from "@odido-portals/glow-react-web/icon";
import { Paragraph } from "@odido-portals/glow-react-web/paragraph";
import { Stack } from "@odido-portals/glow-react-web/stack";
import {
  StepperInpage,
  StepperInpageStep,
} from "@odido-portals/glow-react-web/stepper-inpage";
import { TextLink } from "@odido-portals/glow-react-web/text-link";

import BaseLayout from "../../BaseLayout";

import { InputField } from "@/app/ClientComponents";

const code = `<ShopSection aside={<Box prominence="outline" size="sm">Shopping cart</Box>}
  <StepperInpage>
    <StepperInpageStep
      key="step-1"
      title="Stepper Inpage"
    >
      <Stack alignItems="flex-end">
        <Paragraph size="sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Nam hendrerit dolor in fermentum dictum. Aenean ac
          pulvinar sapien. Quisque nec elit placerat, eleifend
          nisi ac, venenatis velit. Ut et aliquet lorem.
          Pellentesque ac mollis ligula.
        </Paragraph>
        <Stack size={{ mobileSmall: 12, tablet: 6 }} alignItems="stretch">
          <InputField id="id-1" placeholder="Content" legend={{ label: "Label" }} />
        </Stack>
        <Stack direction={{ mobileSmall: "column", tablet: "row" }} alignItems={{ mobileSmall: "stretch", tablet: "flex-end" }}>
          <InputField id="id-2" placeholder="Content" legend={{ label: "Label" }} />
          <InputField id="id-3" placeholder="Content" />
        </Stack>
        <Button>Button</Button>
      </Stack>
    </StepperInpageStep>
  </StepperInpage>
</ShopSection>`;

export default function ExampleShopCheckoutPage() {
  return (
    <>
      <BaseLayout title="Shop Checkout example" code={code}>
        <StepperInpage>
          <StepperInpageStep key="step-1" title="Stepper Inpage" state="active">
            <Stack>
              <Paragraph size="sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
                hendrerit dolor in fermentum dictum. Aenean ac pulvinar sapien.
                Quisque nec elit placerat, eleifend nisi ac, venenatis velit. Ut
                et aliquet lorem. Pellentesque ac mollis ligula.
              </Paragraph>
              <Stack size={{ mobileSmall: 12, tablet: 6 }} alignItems="stretch">
                <InputField
                  id="id-1"
                  placeholder="Content"
                  legend={{ label: "Label" }}
                />
              </Stack>
              <Stack
                direction={{ mobileSmall: "column", tablet: "row" }}
                alignItems={{ mobileSmall: "stretch", tablet: "flex-end" }}
              >
                <InputField
                  id="id-2"
                  placeholder="Content"
                  legend={{ label: "Label" }}
                />
                <InputField id="id-3" placeholder="Content" />
              </Stack>
              <Button>Button</Button>
            </Stack>
          </StepperInpageStep>
          <StepperInpageStep
            key="step-2"
            title="Stepper Inpage 2"
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
              Quisque nec elit placerat, eleifend nisi ac, venenatis velit. Ut
              et aliquet lorem. Pellentesque ac mollis ligula.
            </Paragraph>
          </StepperInpageStep>
        </StepperInpage>
      </BaseLayout>
    </>
  );
}
