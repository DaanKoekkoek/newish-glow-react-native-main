import { render, screen } from "@testing-library/react";
import { composeStory } from "@storybook/react";
import userEvent from "@testing-library/user-event";
import meta, {
  Default,
  Inactive,
  Valid,
  Error,
  GroupedOptions,
} from "./Select.stories";
import { Select } from "./Select";

const DefaultSelectStory = composeStory(Default, meta);
const InactiveSelectStory = composeStory(Inactive, meta);
const ValidSelectStory = composeStory(Valid, meta);
const ErrorSelectStory = composeStory(Error, meta);
const GroupedOptionsSelectStory = composeStory(GroupedOptions, meta);

describe("Select component", () => {
  it("renders a stable snapshot", () => {
    const { asFragment } = render(
      <DefaultSelectStory {...DefaultSelectStory.args} />,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it("renders with label and placeholder", () => {
    render(<DefaultSelectStory {...DefaultSelectStory.args} />);

    expect(screen.getByText("Label")).toBeInTheDocument();
    expect(screen.getByText("Placeholder message")).toBeInTheDocument();
  });

  it("calls onChange when an option is selected", async () => {
    const onChangeMock = jest.fn();

    render(
      <DefaultSelectStory
        {...DefaultSelectStory.args}
        onChange={onChangeMock}
      />,
    );

    const select = screen.getByTestId("select");

    await userEvent.selectOptions(select, "pear");

    expect(onChangeMock).toHaveBeenCalledWith("pear");
  });

  it("displays success icon when validated Valid is true", () => {
    render(<ValidSelectStory {...ValidSelectStory.args} />);

    const successIcon = screen.getByTestId("select-icon-valid");
    expect(successIcon).toBeInTheDocument();
  });

  it("renders helper text", () => {
    render(<DefaultSelectStory {...DefaultSelectStory.args} />);

    expect(screen.getByText("Helper message")).toBeInTheDocument();
  });

  it("renders as disabled when inactive", () => {
    render(<InactiveSelectStory {...InactiveSelectStory.args} />);

    const trigger = screen.getByTestId("select");
    expect(trigger).toBeDisabled();
  });

  it("renders in error state when validated fails", () => {
    render(<ErrorSelectStory {...ErrorSelectStory.args} />);

    // Check for error class on the select element
    const selectElement = screen.getByTestId("select");
    expect(selectElement).toHaveClass("error");
    expect(selectElement).toHaveAttribute("aria-invalid", "true");
  });

  it("renders error text in error state", () => {
    render(<ErrorSelectStory {...ErrorSelectStory.args} />);

    // Check for the helper message which is shown in error state
    expect(screen.getByText("An error occurred")).toBeInTheDocument();

    // Check that the select has the aria-invalid attribute
    expect(screen.getByTestId("select")).toHaveAttribute(
      "aria-invalid",
      "true",
    );
  });

  it("automatically renders option groups when options have group property", () => {
    render(<GroupedOptionsSelectStory {...GroupedOptionsSelectStory.args} />);

    // Check if optgroups are rendered
    expect(screen.getByRole("group", { name: "Fruits" })).toBeInTheDocument();
    expect(
      screen.getByRole("group", { name: "Vegetables" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("group", { name: "Dairy" })).toBeInTheDocument();

    // Check if options are properly grouped
    const fruitsGroup = screen.getByRole("group", { name: "Fruits" });
    expect(fruitsGroup).toContainElement(screen.getByTestId("select-apple"));
    expect(fruitsGroup).toContainElement(screen.getByTestId("select-banana"));
    expect(fruitsGroup).toContainElement(screen.getByTestId("select-orange"));
  });

  it("properly handles mixed options with and without group property", () => {
    const mixedOptions = [
      { name: "Option1", value: "option1", group: "Group1" },
      { name: "Option2", value: "option2" }, // No group
      { name: "Option3", value: "option3", group: "Group1" },
    ];

    render(<Select id="test-select" options={mixedOptions} />);

    // Should have one optgroup and properly handle the ungrouped option
    expect(screen.getByRole("group", { name: "Group1" })).toBeInTheDocument();
    expect(screen.getByTestId("select-option2")).toBeInTheDocument();
  });
});
