import { Grid, Main, LargeSticker } from "@odido-portals/glow-react-native";
import React from "react";

export function LargeStickerScreen() {
  return (
    <Main>
      <Grid>
        <Grid.Column>
          <LargeSticker description="description" type="default" />
        </Grid.Column>
        <Grid.Column>
          <LargeSticker
            variant="emphasised"
            description="description"
            type="default"
            price={
              <LargeSticker.Price beforeText="vanaf" value="10" size="lg" />
            }
          />
        </Grid.Column>
        <Grid.Column>
          <LargeSticker
            type="usp"
            palette="pink"
            list={
              <LargeSticker.List variant="icon">
                <LargeSticker.ListItem icon="checkmark">
                  List item 1
                </LargeSticker.ListItem>
                <LargeSticker.ListItem icon="checkmark">
                  List item 2
                </LargeSticker.ListItem>
                <LargeSticker.ListItem icon="checkmark">
                  List item 3
                </LargeSticker.ListItem>
              </LargeSticker.List>
            }
          />
        </Grid.Column>
        <Grid.Column>
          <LargeSticker
            type="usp"
            palette="blue"
            list={
              <LargeSticker.List variant="icon">
                <LargeSticker.ListItem icon="checkmark">
                  List item 1
                </LargeSticker.ListItem>
                <LargeSticker.ListItem icon="checkmark">
                  List item 2
                </LargeSticker.ListItem>
                <LargeSticker.ListItem icon="checkmark">
                  List item 3
                </LargeSticker.ListItem>
              </LargeSticker.List>
            }
          />
        </Grid.Column>
      </Grid>
    </Main>
  );
}
