import { composeStory } from "@storybook/react";
import { render } from "_test-utils";
import React from "react";

import meta, {
  Basic,
  WithoutSubscriptionHero,
  WithoutTitle,
} from "./TopNavigation.stories";

const TopNavigationBasic = composeStory(Basic, meta);
const TopNavigationWithoutSubscriptionHero = composeStory(
  WithoutSubscriptionHero,
  meta,
);

const TopNavigationWithoutTitle = composeStory(WithoutTitle, meta);

describe("<TopNavigation />", () => {
  it("a stable snapshot", () => {
    const { toJSON } = render(<TopNavigationBasic {...Basic.args} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it("renders a header from a subscription hero", () => {
    const { getByText } = render(
      <TopNavigationBasic {...Basic.args} showTitle />,
    );
    expect(getByText("Internet Klik&Klaar")).toBeDefined();
  });

  it("renders a header without a subscription hero", () => {
    const { getByText } = render(
      <TopNavigationWithoutSubscriptionHero
        {...WithoutSubscriptionHero.args}
      />,
    );
    expect(getByText("Without subscription hero")).toBeDefined();
  });

  it("does not render header if showTitle is false", () => {
    const { queryByText } = render(
      <TopNavigationWithoutTitle
        title="Internet Klik&Klaar"
        showTitle={false}
      />,
    );
    expect(queryByText("Internet Klik&Klaar")).toBeNull();
  });

  it("Initially have an opacity of 0", () => {
    const { getByTestId } = render(<TopNavigationBasic {...Basic.args} />);
    const topNavigationContent = getByTestId("top-navigation-content");
    expect(topNavigationContent.props.style.opacity).toBe(0);
  });

  it("renders left action button when provided", () => {
    const { getByTestId } = render(<TopNavigationBasic {...Basic.args} />);
    const leftButton = getByTestId("top-navigation-left-button");
    expect(leftButton).toBeDefined();
  });

  it("applies default color when mirrorColor is false", () => {
    const { getByTestId } = render(<TopNavigationBasic {...Basic.args} />);
    const topNavigation = getByTestId("top-navigation");
    expect(topNavigation.props.style.backgroundColor).toBe("#ffffff");
  });

  it("renders right action button when provided", () => {
    const { getByTestId } = render(<TopNavigationBasic {...Basic.args} />);
    const rightButton = getByTestId("top-navigation-right-button");
    expect(rightButton).toBeDefined();
  });
});
