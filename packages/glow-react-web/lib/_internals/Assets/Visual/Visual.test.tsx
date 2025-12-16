import { render, screen } from "@testing-library/react";
import { Visual } from "./Visual";
import styles from "./Visual.module.scss";

jest.mock("foundations/GlowGradient", () => ({
  GlowGradient: jest.fn(() => <div data-testid="glow-gradient" />),
}));

jest.mock("foundations/Image", () => ({
  Image: jest.fn(({ src }) => (
    <img data-testid="image" src={src} alt="mock content" />
  )),
}));

describe("Visual", () => {
  it("renders with default props", () => {
    render(<Visual src="test.jpg" alt="Test image" />);
    expect(screen.getByTestId("visual")).toBeInTheDocument();
    expect(screen.getByTestId("image")).toHaveAttribute("src", "test.jpg");
  });

  it("renders with custom tag", () => {
    render(<Visual as="section" src="test.jpg" />);
    expect(screen.getByTestId("visual").tagName).toBe("SECTION");
  });

  it("applies fill classes", () => {
    render(<Visual src="x" fill={["height", "width"]} />);

    const visual = screen.getByTestId("visual");

    expect(visual).toHaveClass(styles["fill-width"]);
    expect(visual).toHaveClass(styles["fill-height"]);
  });

  it("renders children when type is content", () => {
    render(
      <Visual type="content">
        <p data-testid="child">Hello</p>
      </Visual>,
    );
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("does not render children when type is image", () => {
    render(
      <Visual type="image" src="x">
        <p data-testid="child">Hello</p>
      </Visual>,
    );
    expect(screen.queryByTestId("child")).not.toBeInTheDocument();
    expect(screen.getByTestId("image")).toBeInTheDocument();
  });

  it("renders glow when conditions are met", () => {
    render(
      <Visual type="illustration" palette="blue" background="emphasised" />,
    );
    expect(screen.getByTestId("glow-gradient")).toBeInTheDocument();
  });

  it("does not render glow if background is not emphasised", () => {
    render(<Visual palette="blue" background="default" type="illustration" />);
    expect(screen.queryByTestId("glow-gradient")).not.toBeInTheDocument();
  });

  it("applies palette class when background is default", () => {
    render(<Visual palette="default" background="default" src="x" />);
    expect(screen.getByTestId("visual")).toHaveClass(styles["palette-default"]);
  });

  it("applies no-padding class", () => {
    render(<Visual noPadding="left" src="x" />);
    expect(screen.getByTestId("visual")).toHaveClass(styles["no-padding-left"]);
  });

  it("applies visual ratio class", () => {
    render(<Visual visualRatio="fixed" src="x" />);
    expect(screen.getByTestId("visual")).toHaveClass(
      styles["visual-ratio-fixed"],
    );
  });
});
