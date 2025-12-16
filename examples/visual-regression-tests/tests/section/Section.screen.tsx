import {
  Section,
  Main,
  MySection,
  Grid,
  Paragraph,
  Box,
  SegmentedTab,
  Badge,
  Stack,
} from "@odido-portals/glow-react-native";
import React from "react";

export function SectionScreen() {
  return (
    <Main>
      <Section>
        <Grid>
          <Grid.Column mobileSmall={6}>
            <Box prominence="color" size="sm" grow={false}>
              <Paragraph>Column 6</Paragraph>
            </Box>
          </Grid.Column>
          <Grid.Column mobileSmall={6}>
            <Box prominence="color" size="sm" grow={false}>
              <Paragraph>Column 6</Paragraph>
            </Box>
          </Grid.Column>
        </Grid>
      </Section>
      <Section>
        <Grid>
          <Grid.Column mobileSmall={6}>
            <Box prominence="outline" size="sm" grow={false}>
              <Paragraph>Column 6 (subtle prominence)</Paragraph>
            </Box>
          </Grid.Column>
          <Grid.Column mobileSmall={6}>
            <Box prominence="outline" size="sm" grow={false}>
              <Paragraph>Column 6 (subtle prominence)</Paragraph>
            </Box>
          </Grid.Column>
        </Grid>
      </Section>
      <Section palette="pink">
        <Grid>
          <Grid.Column>
            <SegmentedTab onTabChange={() => console.log("on tab change")}>
              <SegmentedTab.Buttons
                options={[
                  {
                    label: "Label",
                    icon: "mobile-phone",
                  },
                  {
                    label: "Label2",
                    icon: "mobile-phone",
                  },
                  {
                    label: "Label3",
                    icon: "mobile-phone",
                  },
                ]}
              />
              <SegmentedTab.Panel
                child={<Paragraph>Section (palette: pink)</Paragraph>}
                index={0}
              />
              <SegmentedTab.Panel child={<></>} index={1} />
              <SegmentedTab.Panel child={<></>} index={2} />
            </SegmentedTab>
          </Grid.Column>
          <Grid.Column>
            <Stack direction="row" wrap="wrap">
              <Badge
                text="badge label (prominence: default)"
                prominence="default"
              />
              <Badge
                text="badge label (prominence: outline)"
                prominence="outline"
              />
              <Badge
                text="badge label (prominence: subtle)"
                prominence="subtle"
              />
            </Stack>
          </Grid.Column>
        </Grid>
      </Section>
    </Main>
  );
}

export function MySectionScreen() {
  return (
    <Main>
      <MySection>
        <MySection.Container>
          <MySection.Title size="xl">Title</MySection.Title>
          <MySection.Grid>
            <Box prominence="outline" size="sm">
              <Paragraph>Example component 1</Paragraph>
            </Box>
            <Box prominence="outline" size="sm">
              <Paragraph>Example component 1</Paragraph>
            </Box>
          </MySection.Grid>
        </MySection.Container>
        <MySection.Container>
          <MySection.Title size="lg">Subtitle</MySection.Title>
          <MySection.Grid>
            <Box prominence="outline" size="sm">
              <Paragraph>Example component 3</Paragraph>
            </Box>
            <Box prominence="outline" size="sm">
              <Paragraph>Example component 4</Paragraph>
            </Box>
          </MySection.Grid>
        </MySection.Container>
      </MySection>
    </Main>
  );
}
