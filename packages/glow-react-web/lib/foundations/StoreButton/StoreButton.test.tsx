import { composeStory } from "@storybook/react";
import { render, screen } from "@testing-library/react";

import meta, { Default } from "./StoreButton.stories";
import { StoreButton } from "./StoreButton";

const StoreButtonStory = composeStory(Default, meta);

describe("<StoreButton />", () => {
  it("renders a stable snapshot", () => {
    const { container } = render(
      <StoreButtonStory {...StoreButtonStory.args} />,
    );
    expect(container).toMatchSnapshot();
  });

  it("renders Apple store button correctly", () => {
    render(<StoreButton brand="Apple" />);
    expect(screen.getByTestId("Apple-store-button")).toBeInTheDocument();
  });

  it("renders Google store button correctly", () => {
    render(<StoreButton brand="Google" />);
    const button = screen.getByTestId("Google-store-button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("aria-label", "Google");
  });

  it("has proper accessibility attributes for Apple", () => {
    render(<StoreButton brand="Apple" />);
    const button = screen.getByTestId("Apple-store-button");
    expect(button).toHaveAttribute("aria-label", "Apple");
  });

  it("has proper accessibility attributes for Google", () => {
    render(<StoreButton brand="Google" />);
    const button = screen.getByTestId("Google-store-button");
    expect(button).toHaveAttribute("aria-label", "Google");
  });

  it("renders secondary prominence with correct styling", () => {
    render(<StoreButton brand="Apple" prominence="secondary" />);
    const button = screen.getByTestId("Apple-store-button");
    expect(button).toHaveClass("store-button-secondary");
  });

  it("renders inverted variant with correct styling", () => {
    render(<StoreButton brand="Apple" variant="inverted" />);
    const button = screen.getByTestId("Apple-store-button");
    expect(button).toHaveClass("store-button-inverted");
  });

  it("applies brand-specific class", () => {
    render(<StoreButton brand="Apple" />);
    const button = screen.getByTestId("Apple-store-button");
    expect(button).toHaveClass("store-button-apple");
  });

  it("applies Google brand-specific class", () => {
    render(<StoreButton brand="Google" />);
    const button = screen.getByTestId("Google-store-button");
    expect(button).toHaveClass("store-button-google");
  });

  it("sets correct data attributes", () => {
    render(
      <StoreButton brand="Apple" prominence="secondary" variant="inverted" />,
    );
    const button = screen.getByTestId("Apple-store-button");
    expect(button).toHaveAttribute("data-prominence", "secondary");
    expect(button).toHaveAttribute("data-variant", "inverted");
  });

  it("applies default class when prominence and variant are default", () => {
    render(
      <StoreButton brand="Apple" prominence="default" variant="default" />,
    );
    const button = screen.getByTestId("Apple-store-button");
    expect(button).toHaveClass("store-button-default");
  });
});
