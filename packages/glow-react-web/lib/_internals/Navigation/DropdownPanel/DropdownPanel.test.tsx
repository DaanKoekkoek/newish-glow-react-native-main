import { composeStory } from "@storybook/react";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import userEvent from "@testing-library/user-event";

import meta, { Default } from "./DropdownPanel.stories";

const DropdownPanelStory = composeStory(Default, meta);

describe("<DropdownPanel />", () => {
  it("should not have any accessibility violations", async () => {
    const { container } = render(
      <DropdownPanelStory {...DropdownPanelStory.args} />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("renders a stable snapshot", () => {
    const { container } = render(
      <DropdownPanelStory {...DropdownPanelStory.args} />,
    );
    expect(container).toMatchSnapshot();
  });

  it("renders children", () => {
    render(<DropdownPanelStory {...DropdownPanelStory.args} />);
    expect(screen.getByText("Replace me")).toBeInTheDocument();
  });

  it("renders the footer when provided", () => {
    render(<DropdownPanelStory callToAction={{ children: "Uitloggen" }} />);
    expect(
      screen.getByRole("button", { name: "Uitloggen" }),
    ).toBeInTheDocument();
  });

  it("calls the provided onClick handler of the footer", async () => {
    const onClick = jest.fn();
    render(
      <DropdownPanelStory callToAction={{ children: "Uitloggen", onClick }} />,
    );
    await userEvent.click(screen.getByRole("button", { name: "Uitloggen" }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not render the footer when none is provided", () => {
    render(<DropdownPanelStory />);
    expect(
      screen.queryByRole("button", { name: "Uitloggen" }),
    ).not.toBeInTheDocument();
  });
});
