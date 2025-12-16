import { composeStory } from "@storybook/react";
import { render, screen, fireEvent } from "@testing-library/react";

import meta, { Default, Compact, Extended } from "./Selector.stories";
import { Selector } from "./Selector";

const DefaultSelectorStory = composeStory(Default, meta);
const CompactSelectorStory = composeStory(Compact, meta);
const ExtendedSelectorStory = composeStory(Extended, meta);

describe.each([
  ["Default", DefaultSelectorStory],
  ["Compact", CompactSelectorStory],
  ["Extended", ExtendedSelectorStory],
])("%s Selector", (_, Story) => {
  test("renders a stable snapshot", () => {
    const { container } = render(<Story {...Story.args} />);
    expect(container).toMatchSnapshot();
  });
});

describe("<Selector /> behaviour", () => {
  test("calls onClick when selector is pressed", () => {
    const mockOnChangeCallback = jest.fn();
    render(
      <Selector
        id="selector"
        onChange={mockOnChangeCallback}
        title="Test Selector"
        state="default"
        variant="default"
      />,
    );

    const selector = screen.getByTestId("selector-label");
    fireEvent.click(selector);
    expect(mockOnChangeCallback).toHaveBeenCalled();
  });
});
