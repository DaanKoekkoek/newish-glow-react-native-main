import {
  SummaryList,
  Main,
  Section,
  Grid,
} from "@odido-portals/glow-react-native";
import React from "react";

export function SummaryListScreen() {
  return (
    <Main>
      <Section>
        <Grid>
          <Grid.Column>
            <SummaryList>
              <SummaryList.Item
                heading="Heading"
                subheading="Subheading"
                promotionText="Promotion"
                price={<SummaryList.Price value="30" />}
                list={
                  <SummaryList.List>
                    <SummaryList.List.Item>
                      DefaultList item 1
                    </SummaryList.List.Item>
                    <SummaryList.List.Item>
                      DefaultList item 1
                    </SummaryList.List.Item>
                  </SummaryList.List>
                }
                actions={[
                  <SummaryList.Button onPress={() => {}}>
                    <SummaryList.Button.Icon name="edit" solid={false} />
                    Button
                  </SummaryList.Button>,
                  <SummaryList.ActionButton
                    onPress={() => {}}
                    icon="trashcan"
                  />,
                ]}
                image={{
                  alt: "Alt text",
                  src: "https://assets.odido.nl/305x450/671d6313b9/dvi-back-front_apple_iphone_15promax_kleur2_305x450_v1.webp",
                }}
              >
                Extra content
              </SummaryList.Item>
              <SummaryList.Item
                heading="Heading"
                subheading="Subheading"
                promotionText="Promotion"
                price={
                  <SummaryList.Price fromValue="500" showCurrency value="300" />
                }
                list={
                  <SummaryList.List variant="icon">
                    <SummaryList.List.Item icon="checkmark">
                      DefaultList item 1 (variant: icon, icon: checkmark)
                    </SummaryList.List.Item>
                  </SummaryList.List>
                }
                actions={[
                  <SummaryList.NumberInput />,
                  <SummaryList.ActionButton onPress={() => {}} icon="edit" />,
                  <SummaryList.ActionButton
                    onPress={() => {}}
                    icon="trashcan"
                  />,
                ]}
                image={{ name: "Apple One" }}
              >
                Extra content
              </SummaryList.Item>
            </SummaryList>
          </Grid.Column>
        </Grid>
      </Section>
    </Main>
  );
}
