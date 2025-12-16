import {
  Stack,
  Main,
  Section,
  Grid,
  Select,
} from "@odido-portals/glow-react-native";
import React from "react";

export function SelectScreen() {
  return (
    <Main>
      <Section>
        <Grid>
          <Grid.Column>
            <Stack>
              <Select
                id="id-1"
                options={[
                  { label: "Option1", value: "Option 1" },
                  { label: "Option2", value: "Option 2" },
                  { label: "Option3", value: "Option 3" },
                ]}
              />
              <Select
                id="id-2"
                disabled
                placeholder="Placeholder"
                label={{ text: "Label", optional: false }}
                options={[
                  { label: "Option1", value: "Option 1" },
                  { label: "Option2", value: "Option 2" },
                  { label: "Option3", value: "Option 3" },
                ]}
              />
              <Select
                id="id-3"
                placeholder="Placeholder"
                label={{ text: "Label", optional: false }}
                validated={{ success: true }}
                options={[
                  { label: "Option1", value: "Option 1" },
                  { label: "Option2", value: "Option 2" },
                  { label: "Option3", value: "Option 3" },
                ]}
              />
              <Select
                id="id-4"
                placeholder="Placeholder"
                label={{ text: "Label", optional: false }}
                validated={{
                  success: false,
                  message: "This is an error message",
                }}
                options={[
                  { label: "Option1", value: "Option 1" },
                  { label: "Option2", value: "Option 2" },
                  { label: "Option3", value: "Option 3" },
                ]}
              />
              <Select
                id="id-5"
                placeholder="Placeholder"
                label={{ text: "Label", optional: true, info: "More info" }}
                options={[
                  { label: "Option1", value: "Option 1" },
                  { label: "Option2", value: "Option 2" },
                  { label: "Option3", value: "Option 3" },
                ]}
              />
            </Stack>
          </Grid.Column>
        </Grid>
      </Section>
    </Main>
  );
}
