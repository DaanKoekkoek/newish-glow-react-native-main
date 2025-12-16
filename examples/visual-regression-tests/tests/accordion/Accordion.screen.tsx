import {
  Main,
  Section,
  Grid,
  Accordion,
  Paragraph,
  Strong,
  TextLink,
  Box,
} from "@odido-portals/glow-react-native";
import React from "react";

export function AccordionScreen() {
  return (
    <Main>
      <Section>
        <Grid>
          <Grid.Column>
            <Accordion>
              {[1, 2, 3, 4, 5].map((i) => {
                return (
                  <Accordion.Step
                    key={i}
                    title={`Title ${i}`}
                    onPress={() => console.log(`Step ${i}`)}
                  >
                    <ExampleComponent />
                  </Accordion.Step>
                );
              })}
            </Accordion>
          </Grid.Column>
        </Grid>
      </Section>
    </Main>
  );
}

function ExampleComponent() {
  return (
    <>
      <Paragraph size="sm">
        A palindrome is a word, number, phrase, or other sequence of symbols
        that reads the same <Strong>backwards as forwards</Strong>, such as the
        sentence: ‘A man, a plan, a canal –{" "}
        <TextLink href="#" size="lg">
          Panama
        </TextLink>
        ’.
      </Paragraph>
      <Box prominence="outline">
        <Paragraph>Box component</Paragraph>
      </Box>
    </>
  );
}
