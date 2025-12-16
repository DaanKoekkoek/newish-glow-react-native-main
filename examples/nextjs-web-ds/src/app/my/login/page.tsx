"use client";

import {
  Accordion,
  AccordionPanel,
} from "@odido-portals/glow-react-web/accordion";
import { Box } from "@odido-portals/glow-react-web/box";
import { Button } from "@odido-portals/glow-react-web/button";
import { Heading } from "@odido-portals/glow-react-web/heading";
import { Paragraph } from "@odido-portals/glow-react-web/paragraph";
import { Stack } from "@odido-portals/glow-react-web/stack";

import BaseLayout from "../BaseLayout";

const code = `<>
  <MySection>
    <MySectionGrid>
      <Stack
        direction={{ mobileSmall: "column", tablet: "row" }}
        alignItems="stretch"
        justifyContent="stretch"
      >
        <Box grow prominence="emphasised">
          <Stack>
            <Heading size="lg" as="h1">Login title</Heading>
            <Paragraph size="sm">Login description</Paragraph>
          </Stack>
        </Box>
        <Box prominence="outline">
          <Stack>
            <Paragraph>Login input fields</Paragraph>
            <Stack gap="sm">
              <Button fill>Login</Button>
              <Button fill prominence="secondary">Create account</Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </MySectionGrid>
  </MySection>
  <MySection title={{ text: "Veelgestelde vragen", size: "lg" }}>
      <Accordion multiple>
        <AccordionPanel title="Accordion title 1">Accordion title</AccordionPanel>
        <AccordionPanel title="Accordion title 2">Accordion title</AccordionPanel>
      </Accordion>
  </MySection>
</>`;

export default function ExampleMyPage() {
  return (
    <BaseLayout code={code}>
      <Stack
        direction={{ mobileSmall: "column", tablet: "row" }}
        alignItems="stretch"
        justifyContent="stretch"
      >
        <Box prominence="emphasised">
          <Stack>
            <Heading size="lg" as="h1">
              Login title
            </Heading>
            <Paragraph size="sm">Login description</Paragraph>
          </Stack>
        </Box>
        <Box prominence="outline">
          <Stack>
            <Paragraph>Login input fields</Paragraph>
            <Stack gap="sm">
              <Button fill>Login</Button>
              <Button fill prominence="secondary">
                Create account
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
      <Accordion>
        <AccordionPanel title="Accordion title 1">
          Content of accordion
        </AccordionPanel>
      </Accordion>
    </BaseLayout>
  );
}
