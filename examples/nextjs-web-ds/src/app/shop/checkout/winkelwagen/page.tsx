"use client";

import {
  SummaryList,
  SummaryListItem,
  SummaryListAction,
} from "@odido-portals/glow-react-web/summary-list";

import BaseLayout from "../../BaseLayout";

const code = `<ShopSection above={<Heading size="xl" as="h1">Winkelwagen</Heading>}>
    <SummaryList>
      <SummaryListItem />
    </SummaryList>
</ShopSection>`;

export default function ExampleShopCheckoutWinkelwagenPage() {
  return (
    <>
      <BaseLayout title="Winkelwagen" code={code}>
        <SummaryList>
          <SummaryListItem
            heading="Heading 1"
            image={{ name: "Amazon Prime" }}
            subheading="subheading"
            promotionText="Promotion"
            status={{ type: "success", statusText: "Status" }}
            list={{
              variant: "icon",
              items: [
                { text: "List item 1" },
                { text: "List item 2" },
                { text: "List item 3" },
              ],
            }}
            price={{
              value: "0,00",
            }}
            actions={[
              <SummaryListAction icon="edit" onClick={() => {}} key="action-1">
                Wijzig
              </SummaryListAction>,
              <SummaryListAction
                icon="plus"
                onClick={() => {}}
                key="action-2"
              />,
              <SummaryListAction
                icon="trashcan"
                onClick={() => {}}
                key="action-3"
              />,
            ]}
            key="item 1"
          >
            Additional content
          </SummaryListItem>
        </SummaryList>
      </BaseLayout>
    </>
  );
}
