import { Column } from "@odido-portals/glow-react-web/grid";
import { Paragraph } from "@odido-portals/glow-react-web/paragraph";

import BaseLayout from "../../../BaseLayout";

export default function ColumnPage() {
  return (
    <BaseLayout title="Column">
      <Column>
        <Paragraph>Paragraph inside a {`<Columnn />`}</Paragraph>
      </Column>
    </BaseLayout>
  );
}
