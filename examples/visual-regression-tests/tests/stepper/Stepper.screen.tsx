import {
  StepperHorizontal,
  StepperVertical,
  StepperInpage,
  Main,
  Section,
  Grid,
  TextLink,
  Paragraph,
  Button,
  Box,
} from "@odido-portals/glow-react-native";
import React from "react";

export function StepperScreenHorizontal() {
  return (
    <Main>
      <Section>
        <Grid>
          <Grid.Column>
            <StepperHorizontal activeStep={3}>
              <StepperHorizontal.Step title="Step 1" />
              <StepperHorizontal.Step title="Step 2" />
              <StepperHorizontal.Step title="Step 3" />
            </StepperHorizontal>
          </Grid.Column>
          <Grid.Column>
            <StepperHorizontal activeStep={3}>
              <StepperHorizontal.Step title="Step 1" />
              <StepperHorizontal.Step title="Step 2" />
              <StepperHorizontal.Step title="Step 3" />
              <StepperHorizontal.Step title="Step 4" />
              <StepperHorizontal.Step title="Step 5" />
            </StepperHorizontal>
          </Grid.Column>
        </Grid>
      </Section>
    </Main>
  );
}

export function StepperScreenVerticalCollapse() {
  return (
    <Main>
      <Section>
        <Grid>
          <Grid.Column>
            <StepperVertical activeStep={3} collapsable palette="default">
              <StepperVertical.Step
                contentBody={<ExampleBodyComponent />}
                title="Step 1 label"
              />
              <StepperVertical.Step
                contentBody={<ExampleBodyComponent />}
                title="Step 2 label"
              />
              <StepperVertical.Step
                title="Step 4 label"
                contentBody={<ExampleBodyComponent />}
                contentFooter={
                  <Box prominence="color" size="sm">
                    <Paragraph alignment="center">Example component</Paragraph>
                  </Box>
                }
              />
              <StepperVertical.Step
                title="Step 4 label"
                contentBody={<ExampleBodyComponent />}
              />
            </StepperVertical>
          </Grid.Column>
        </Grid>
      </Section>
    </Main>
  );
}

export function StepperScreenVertical() {
  return (
    <Main>
      <Section>
        <Grid>
          <Grid.Column>
            <StepperVertical activeStep={3} palette="yellow">
              <StepperVertical.Step
                title="Step 1 label"
                contentBody={<ExampleBodyComponent />}
              />
              <StepperVertical.Step
                title="Step 2 label"
                contentBody={<ExampleBodyComponent />}
              />
              <StepperVertical.Step
                title="Step 3 label"
                contentBody={<ExampleBodyComponent />}
                contentFooter={
                  <Box prominence="color" size="sm">
                    <Paragraph alignment="center">Example component</Paragraph>
                  </Box>
                }
              />
              <StepperVertical.Step
                contentBody={<ExampleBodyComponent />}
                title="Step 4 label"
              />
            </StepperVertical>
          </Grid.Column>
        </Grid>
      </Section>
    </Main>
  );
}

export function StepperScreenInpage() {
  return (
    <Main>
      <Section>
        <Grid>
          <Grid.Column>
            <StepperInpage>
              <StepperInpage.Step
                badgeText="Klantvoordeel"
                content={<ExampleBodyComponent />}
                textLink={
                  <TextLink href="#" size="sm">
                    <TextLink.Icon name="add" />
                    Text link
                  </TextLink>
                }
                title="Stap 1 Ontdek je voordeel"
              />
              <StepperInpage.Step
                content={<ExampleBodyComponent />}
                button={
                  <Button prominence="emphasised" fill>
                    Button text
                  </Button>
                }
                status="active"
                title="Step 2 label"
              />
              <StepperInpage.Step
                content={<ExampleBodyComponent />}
                status="inactive"
                title="Step 3 label with extra long title text to test wrapping"
              />
              <StepperInpage.Step
                textLink={
                  <TextLink href="#" size="sm">
                    Text link
                  </TextLink>
                }
                status="completed"
                title="Step 4 label"
              />
            </StepperInpage>
          </Grid.Column>
        </Grid>
      </Section>
    </Main>
  );
}

const ExampleBodyComponent = () => {
  return (
    <Paragraph size="sm">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam hendrerit
      dolor in.
    </Paragraph>
  );
};
