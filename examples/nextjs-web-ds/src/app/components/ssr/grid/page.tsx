import { Column, Grid } from "@odido-portals/glow-react-web/grid";
import { Paragraph } from "@odido-portals/glow-react-web/paragraph";

import BaseLayout from "../../../BaseLayout";

export default function GridPage() {
  return (
    <BaseLayout title="Grid" grid="custom-with-section">
      <Grid>
        <Column>
          <Paragraph>Paragraph inside a {`<Grid />`}</Paragraph>
        </Column>
      </Grid>
    </BaseLayout>
  );
}
