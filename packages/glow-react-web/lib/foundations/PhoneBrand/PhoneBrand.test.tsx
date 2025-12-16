import { composeStory } from "@storybook/react";
import { render, screen } from "@testing-library/react";

import meta, { Basic } from "./PhoneBrand.stories";
import { PhoneBrand } from "./PhoneBrand";

const PhoneBrandStory = composeStory(Basic, meta);

describe("<PhoneBrand />", () => {
  it("renders a stable snapshot", () => {
    const { container } = render(<PhoneBrandStory {...PhoneBrandStory.args} />);
    expect(container).toMatchSnapshot();
  });

  it("renders inverted variant correctly", () => {
    const { container } = render(
      <PhoneBrand brand="Android" variant="inverted" />,
    );
    expect(container).toMatchSnapshot("inverted variant");
  });

  it("renders with default props", () => {
    render(<PhoneBrand brand="Android" />);
    const logo = screen.getByRole("img");
    expect(logo).toHaveAttribute("aria-label", "Android");
    expect(logo).toHaveAttribute("data-testid", "phone-brand");
    expect(logo).toHaveClass("phone-brand");
  });

  it("renders different brands correctly", () => {
    const { rerender } = render(<PhoneBrand brand="Apple" />);
    expect(screen.getByRole("img")).toHaveAttribute("aria-label", "Apple");

    rerender(<PhoneBrand brand="Samsung" />);
    expect(screen.getByRole("img")).toHaveAttribute("aria-label", "Samsung");
  });

  it("applies the correct classes for different states", () => {
    const { rerender } = render(
      <PhoneBrand brand="Android" state="inactive" />,
    );
    expect(screen.getByRole("img")).toHaveClass("phone-brand-inactive");

    // Default state should not add an extra class
    rerender(<PhoneBrand brand="Android" state="default" />);
    const logo = screen.getByRole("img");
    expect(logo).toHaveClass("phone-brand");
    expect(logo).not.toHaveClass("phone-brand-default");
  });

  it("uses custom testID when provided", () => {
    render(<PhoneBrand brand="Android" testID="custom-testid" />);
    expect(screen.getByRole("img")).toHaveAttribute(
      "data-testid",
      "custom-testid",
    );
  });
});
