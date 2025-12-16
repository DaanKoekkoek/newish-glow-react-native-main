import { composeStory } from "@storybook/react";
import { render, screen, fireEvent } from "@testing-library/react";

import meta, { Vertical, Horizontal } from "./SelectorImage.stories";
import { SelectorImage } from "./SelectorImage";

const VerticalImageSelectorStory = composeStory(Vertical, meta);
const HorizontalImageSelectorStory = composeStory(Horizontal, meta);

describe.each([
  ["Vertical", VerticalImageSelectorStory],
  ["Compact", HorizontalImageSelectorStory],
])("%s ImageSelector", (_, Story) => {
  test("renders a stable snapshot", () => {
    const { container } = render(<Story {...Story.args} />);
    expect(container).toMatchSnapshot();
  });
});

describe("<SelectorImage /> behaviour", () => {
  test("calls onClick when selector is pressed", () => {
    const mockOnChangeCallback = jest.fn();
    render(
      <SelectorImage
        id="image-selector"
        onChange={mockOnChangeCallback}
        title="Test SelectorImage"
        state="default"
        variant="vertical"
        image={{
          src: "https://assets.odido.nl/1600x900/a2c094c8eb/mid-hero-stocksy_txpfcee7f02fc0400_originaldelivery_4220176.WebP",
          alt: "Alt text",
        }}
      />,
    );

    const selector = screen.getByTestId("image-selector");
    fireEvent.click(selector);
    expect(mockOnChangeCallback).toHaveBeenCalled();
  });
});
