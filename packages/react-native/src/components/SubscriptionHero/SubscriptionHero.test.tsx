import { composeStory } from "@storybook/react";
import { render, waitFor } from "_test-utils";
import React from "react";

import meta, { Basic } from "./SubscriptionHero.stories";

const SubscriptionHeroBasic = composeStory(Basic, meta);

describe("SubscriptionHero component", () => {
  it("renders a subscription hero correctly", async () => {
    const { toJSON } = render(<SubscriptionHeroBasic {...Basic.args} />);
    await waitFor(() => expect(toJSON()).toMatchSnapshot());
  });

  it("renders list items (capped at 5)", async () => {
    const { getByText, queryByText } = render(
      <SubscriptionHeroBasic {...Basic.args} />,
    );
    await waitFor(() => {
      expect(getByText("list item 1")).toBeTruthy();
      expect(queryByText("list item 6")).toBeNull();
    });
  });

  it("renders action button (capped at 3)", async () => {
    const { getByText, queryByText } = render(
      <SubscriptionHeroBasic {...Basic.args} />,
    );
    await waitFor(() => {
      expect(getByText("action 1")).toBeTruthy();
      expect(queryByText("action 4")).toBeNull();
    });
  });
});
