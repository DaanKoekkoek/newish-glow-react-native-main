import { composeStory } from "@storybook/react";
import { render, screen } from "@testing-library/react";
import { Paragraph } from "foundations/Paragraph";

import meta, { Basic, GrowEnabled } from "./Box.stories";

const BoxBasic = composeStory(Basic, meta);
const BoxGrow = composeStory(GrowEnabled, meta);

describe("Box Component", () => {
  it("a stable snapshot", () => {
    const { container } = render(
      <BoxBasic {...Basic.args} className="custom-box-class" />,
    );
    expect(container).toMatchSnapshot();
  });

  it("renders children", () => {
    render(
      <BoxBasic
        {...Basic.args}
        children={<Paragraph>Box content 1</Paragraph>}
      />,
    );
    expect(screen.getByText("Box content 1")).toBeTruthy();
  });

  it('renders GlowGradient when prominence is "emphasised"', () => {
    render(<BoxBasic {...Basic.args} prominence="emphasised" />);
    expect(screen.getByTestId("glow-gradient")).toBeTruthy();
  });

  it('does not render GlowGradient when prominence is not "emphasised"', () => {
    render(<BoxBasic {...Basic.args} prominence="color" />);
    expect(screen.queryByTestId("glow-gradient")).toBeNull();
  });

  it('conditionally renders logic based on prominence="outline"', () => {
    render(<BoxBasic {...Basic.args} prominence="outline" />);

    const box = screen.getByTestId("box");

    expect(box.classList.contains("box-prominence-outline")).toBe(true);
  });

  it('applies palette when prominence is "color"', () => {
    render(<BoxBasic {...Basic.args} prominence="color" palette="red" />);

    const box = screen.getByTestId("box");

    expect(box.classList.contains(`box-prominence-color`)).toBe(true);
    expect(box.classList.contains(`box-palette-red`)).toBe(true);
  });

  it("renders multiple children", () => {
    render(
      <BoxBasic
        {...Basic.args}
        children={[
          <Paragraph key="1">Box content A</Paragraph>,
          <Paragraph key="2">Box content B</Paragraph>,
        ]}
      />,
    );
    expect(screen.getByText("Box content A")).toBeTruthy();
    expect(screen.getByText("Box content B")).toBeTruthy();
  });

  it("handles the grow prop", () => {
    render(<BoxGrow {...GrowEnabled.args} />);

    const box = screen.getByTestId("box");

    expect(box.classList.contains("box-grow")).toBe(true);
  });

  it("handles the size prop", () => {
    render(<BoxBasic {...Basic.args} size="sm" />);

    const box = screen.getByTestId("box");

    expect(box.classList.contains("box-size-sm")).toBe(true);
  });
});
