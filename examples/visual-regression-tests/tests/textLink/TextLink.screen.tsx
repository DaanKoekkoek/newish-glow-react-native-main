import type {
  TextLinkSize,
  TextLinkProps,
} from "@odido-portals/glow-react-native";
import {
  Main,
  Section,
  Grid,
  Stack,
  Paragraph,
  TextLink,
} from "@odido-portals/glow-react-native";
import React from "react";

interface TextLinksProps extends TextLinkProps {
  sizes: TextLinkSize[];
}

const availableSizes = ["xs", "sm", "default", "lg"] as TextLinkSize[];
const TextLinkSizes: React.FC<Omit<TextLinksProps, "children">> = ({
  sizes,
}) => (
  <>
    {sizes.map((size) => (
      <Stack>
        <TextLink size={size}>Link size: {size}</TextLink>
      </Stack>
    ))}
  </>
);

export function TextLinkDemoScreen() {
  return (
    <Main>
      <Section>
        <Grid>
          <Grid.Column>
            <TextLinkSizes sizes={availableSizes} />
          </Grid.Column>
          <Grid.Column>
            <Paragraph size="xs">
              Text above, text above. {"\n"}
              Text before <TextLink>Link</TextLink>, text after.
              {"\n"}
              Text below, text below.
            </Paragraph>
          </Grid.Column>
          <Grid.Column>
            <Paragraph size="sm">
              Text above, text above. {"\n"}
              Text before <TextLink>Link</TextLink>, text after.
              {"\n"}
              Text below, text below.
            </Paragraph>
          </Grid.Column>
          <Grid.Column>
            <Paragraph>
              Text above, text above. {"\n"}
              Text before <TextLink>Link</TextLink>, text after.
              {"\n"}
              Text below, text below.
            </Paragraph>
          </Grid.Column>
          <Grid.Column>
            <Paragraph size="lg">
              Text above, text above. {"\n"}
              Text before <TextLink>Link</TextLink>, text after.
              {"\n"}
              Text below, text below.
            </Paragraph>
          </Grid.Column>
        </Grid>
      </Section>
    </Main>
  );
}
