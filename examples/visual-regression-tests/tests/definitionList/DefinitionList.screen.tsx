import {
  Main,
  Section,
  Grid,
  DefinitionList,
} from "@odido-portals/glow-react-native";
import React from "react";

export function DefinitionListDemoScreen() {
  return (
    <Main>
      <Section>
        <Grid>
          <Grid.Column>
            <DefinitionList color="default">
              <DefinitionList.Item
                title="title (color: default)"
                description="description (color: default)"
              />
            </DefinitionList>
          </Grid.Column>
        </Grid>
      </Section>
      <Section style={{ backgroundColor: "black" }}>
        <Grid>
          <Grid.Column>
            <DefinitionList color="inverted">
              <DefinitionList.Item
                title="title (color: inverted)"
                description="description (color: default)"
              />
            </DefinitionList>
          </Grid.Column>
        </Grid>
      </Section>
    </Main>
  );
}
