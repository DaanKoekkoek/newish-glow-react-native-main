import {
  Stack,
  Main,
  Section,
  Grid,
  InputField,
} from "@odido-portals/glow-react-native";
import React from "react";

const mock = [
  { text: "Input search mock", value: "mock_1" },
  { text: "Input search mock 1", value: "mock_2" },
  { text: "Input search mock 2", value: "mock_3" },
  { text: "Input search mock 3", value: "mock_4" },
  { text: "Input search mock 4", value: "mock_5" },
  { text: "Input search mock 5", value: "mock_6" },
];

export function InputFieldSearchScreen() {
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
                type="search"
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
