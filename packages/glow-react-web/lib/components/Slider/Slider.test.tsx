import { composeStory } from "@storybook/react";
import meta, { Default } from "./Slider.stories";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const DefaultSliderStory = composeStory(Default, meta);

describe("<Slider />", () => {
  it("renders a stable snapshot", async () => {
    const { asFragment } = render(<DefaultSliderStory />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("invokes onValueChange when the slider value changes", async () => {
    const handleChange = jest.fn();
    render(<DefaultSliderStory onValueChange={handleChange} />);

    const slider = screen.getByRole("slider") as HTMLInputElement;

    fireEvent.input(slider, { target: { value: "25" } });

    expect(handleChange).toHaveBeenCalledWith(25);

    /* 2️⃣  optional: also test keyboard interaction */
    const user = userEvent.setup();
    slider.focus(); // range needs focus first
    await user.keyboard("{ArrowRight}");
    expect(handleChange).toHaveBeenCalled(); // called again
  });
});
