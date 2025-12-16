import {
  Stack,
  Main,
  Section,
  Grid,
  InputField,
} from "@odido-portals/glow-react-native";
import React from "react";

const mock = [
  { text: "Input suggest mock", value: "mock_1", category: "Category 1" },
  { text: "Input suggest mock 1", value: "mock_2", category: "Category 1" },
  { text: "Input suggest mock 2", value: "mock_3", category: "Category 1" },
  { text: "Input suggest mock 3", value: "mock_4", category: "Category 2" },
  { text: "Input suggest mock 4", value: "mock_5", category: "Category 2" },
  { text: "Input suggest mock 5", value: "mock_6", category: "Category 3" },
];

export function InputFieldAutoSuggestionsScreen() {
  return (
    <Main>
      <Section>
        <Grid>
          <Grid.Column>
            <Stack style={{ height: 400 }}>
              <InputField
                placeholder="placeholder text"
                label={{ text: "label text" }}
                value="input"
                type="autoSuggest"
                autoFocus
                autoSuggestions={mock}
              />
            </Stack>
          </Grid.Column>
        </Grid>
      </Section>
    </Main>
  );
}

export function InputFieldAutoSuggestionsCategoryScreen() {
  return (
    <Main>
      <Section>
        <Grid>
          <Grid.Column>
            <Stack style={{ height: 400 }}>
              <InputField
                placeholder="placeholder text"
                label={{ text: "label text" }}
                value="input"
                type="autoSuggest"
                autoFocus
                autoSuggestCategory
                autoSuggestions={mock}
              />
            </Stack>
          </Grid.Column>
        </Grid>
      </Section>
    </Main>
  );
}
