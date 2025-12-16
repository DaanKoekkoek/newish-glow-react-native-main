import { composeStory } from "@storybook/react";
import { render, screen } from "@testing-library/react";

import meta, { Default } from "./Technology.stories";

const Basic = composeStory(Default, meta);

describe("<Technology />", () => {
  it("renders DSL icon and badge", () => {
    render(<Basic {...Default.args} state="information" type="DSL" />);
    expect(screen.getByTestId("technology")).toBeInTheDocument();
    expect(screen.getByTestId("technology-DSL")).toBeInTheDocument();
  });

  it("renders Fiber icon with success state", () => {
    render(<Basic {...Default.args} state="success" type="Fiber" />);
    expect(screen.getByTestId("technology")).toBeInTheDocument();
    expect(screen.getByTestId("technology-Fiber")).toBeInTheDocument();
    expect(screen.getByTestId("badge-status")).toHaveClass(
      "badge-status-variant-success",
    );
  });

  it("renders Klik & Klaar icon", () => {
    render(<Basic {...Default.args} state="success" type="Klik & Klaar" />);
    expect(screen.getByTestId("technology-Klik & Klaar")).toBeInTheDocument();
  });

  it("renders Internet + TV icon", () => {
    render(<Basic {...Default.args} state="success" type="Internet + TV" />);
    expect(screen.getByTestId("technology-Internet + TV")).toBeInTheDocument();
  });

  it("uses a custom testID", () => {
    render(
      <Basic
        {...Default.args}
        state="information"
        type="DSL"
        testID="custom-tech"
      />,
    );
    expect(screen.getByTestId("custom-tech")).toBeInTheDocument();
    expect(screen.getByTestId("custom-tech-DSL")).toBeInTheDocument();
  });
});
