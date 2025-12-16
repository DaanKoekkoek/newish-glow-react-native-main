import { Column, Grid } from "@odido-portals/glow-react-web/grid";
import { Paragraph } from "@odido-portals/glow-react-web/paragraph";
import { Section } from "@odido-portals/glow-react-web/section";

import BaseLayout from "../../../BaseLayout";

export default function SectionPage() {
  return (
    <BaseLayout title="Section" grid="custom">
      <Section>
        <Grid>
          <Column>
            <Paragraph>Paragraph in {`<Section />`}</Paragraph>
          </Column>
        </Grid>
      </Section>
      <Section variant="emphasised">
        <Grid>
          <Column>
            <Paragraph>variant: emphasised</Paragraph>
          </Column>
        </Grid>
      </Section>
      <Section variant="subtle">
        <Grid>
          <Column>
            <Paragraph>variant: subtle</Paragraph>
          </Column>
        </Grid>
      </Section>
      <Section
        variant="image"
        image={{
          src: "https://a.storyblok.com/f/145395/1600x900/5e4649628f/mid-hero.webp",
          alt: "alt text",
        }}
      >
        <Grid>
          <Column>
            <Paragraph>variant: image</Paragraph>
          </Column>
        </Grid>
      </Section>
    </BaseLayout>
  );
}
