import { render, screen } from "@testing-library/react";

import meta, {
  Default,
  Warning,
  Error,
  WithoutTV,
} from "./PostalCodeCheckInput.stories";
import { composeStory } from "@storybook/react";

const DefaultStory = composeStory(Default, meta);
const WarningStory = composeStory(Warning, meta);
const ErrorStory = composeStory(Error, meta);
const WithoutTVStory = composeStory(WithoutTV, meta);

describe("<PostalCodeCheckInput />", () => {
  it("snapshot should match default state", () => {
    const { asFragment } = render(<DefaultStory />);

    expect(screen.queryByTestId("callout")).toBeNull();
    expect(asFragment()).toMatchSnapshot();
  });

  it("snapshot should match warning state", () => {
    const { asFragment } = render(<WarningStory />);

    expect(screen.getByTestId("callout")).toBeDefined();
    expect(asFragment()).toMatchSnapshot();
  });

  it("snapshot should match warning state", () => {
    const { asFragment } = render(<ErrorStory />);

    expect(screen.getByTestId("callout")).toBeDefined();
    expect(asFragment()).toMatchSnapshot();
  });

  it("snapshot should match without TV section", () => {
    const { asFragment } = render(<WithoutTVStory />);

    expect(screen.queryByTestId("tv-section")).toBeNull();
    expect(asFragment()).toMatchSnapshot();
  });
});
