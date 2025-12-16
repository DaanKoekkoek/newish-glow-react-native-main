import {
  MySection,
  MySectionGrid,
} from "@odido-portals/glow-react-web/my-section";
import { Paragraph } from "@odido-portals/glow-react-web/paragraph";

import BaseLayout from "../../../BaseLayout";

export default function MySectionGridPage() {
  return (
    <BaseLayout title="MySectionGrid" grid="custom">
      <MySection title={{ text: "title size: xl" }}>
        <MySectionGrid>
          <Paragraph>
            Paragraph in {`<MySection />`} and {`<MySectionGrid />`}
          </Paragraph>
        </MySectionGrid>
      </MySection>
    </BaseLayout>
  );
}
