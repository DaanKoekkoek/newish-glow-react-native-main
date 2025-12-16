import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { composeStory } from "@storybook/react";
import meta, { Default, Error } from "./RadioButtonGroup.stories";

const RadioButtonGroupStory = composeStory(Default, meta);
const RadioButtonGroupErrorStory = composeStory(Error, meta);

describe("<RadioButtonGroup />", () => {
  it("renders a stable snapshot", () => {
    const { container } = render(
      <RadioButtonGroupStory {...RadioButtonGroupStory.args} />,
    );
    expect(container).toMatchSnapshot();
  });

  it("renders all radio buttons with correct labels", () => {
    render(<RadioButtonGroupStory {...RadioButtonGroupStory.args} />);
    RadioButtonGroupStory.args.options?.forEach((option) => {
      expect(screen.getByLabelText(option.label!)).toBeInTheDocument();
    });
  });

  it("checks only one radio button at a time", async () => {
    const user = userEvent.setup();
    render(<RadioButtonGroupStory {...RadioButtonGroupStory.args} />);

    const radio1 = screen.getByLabelText("Radio 1");
    const radio2 = screen.getByLabelText("Radio 2");

    expect(radio1).toBeChecked();
    expect(radio2).not.toBeChecked();

    await user.click(radio2);
    expect(radio1).not.toBeChecked();
    expect(radio2).toBeChecked();
  });

  it("calls onChange when selecting a different radio button", async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();

    render(
      <RadioButtonGroupStory
        {...RadioButtonGroupStory.args}
        onChange={handleChange}
      />,
    );

    const radio2 = screen.getByLabelText("Radio 2");
    await user.click(radio2);
    expect(handleChange).toHaveBeenCalledWith("value 2");
  });

  it("disables all radio buttons when disabled prop is true", () => {
    render(<RadioButtonGroupStory {...RadioButtonGroupStory.args} disabled />);

    RadioButtonGroupStory.args.options?.forEach((option) => {
      expect(screen.getByLabelText(option.label!)).toBeDisabled();
    });
  });

  it("displays error text when errorMessage is provided", () => {
    render(<RadioButtonGroupErrorStory {...RadioButtonGroupErrorStory.args} />);

    expect(screen.getByText("An error occurred")).toBeInTheDocument();
  });
});
