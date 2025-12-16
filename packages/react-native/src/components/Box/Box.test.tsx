import { composeStory } from "@storybook/react";
import { render } from "_test-utils";
import { Paragraph } from "foundations/Paragraph";
import React from "react";

import meta, { Basic, GrowEnabled } from "./Box.stories";

const BoxBasic = composeStory(Basic, meta);
const BoxGrow = composeStory(GrowEnabled, meta);

describe("Box Component", () => {
  it("renders children", () => {
    const { getByText } = render(
      <BoxBasic
        {...Basic.args}
        children={<Paragraph>Box content 1</Paragraph>}
      />,
    );
    expect(getByText("Box content 1")).toBeTruthy();
  });

  it('renders GlowGradient when prominence is "emphasised"', () => {
    const { getByTestId } = render(
      <BoxBasic {...Basic.args} prominence="emphasised" />,
    );
    expect(getByTestId("glow-gradient")).toBeTruthy();
  });

  it('does not render GlowGradient when prominence is not "emphasised"', () => {
    const { queryByTestId } = render(
      <BoxBasic {...Basic.args} prominence="color" />,
    );
    expect(queryByTestId("glow-gradient")).toBeNull();
  });

  it('conditionally renders logic based on prominence="outline"', () => {
    const { getByTestId } = render(
      <BoxBasic {...Basic.args} prominence="outline" />,
    );

    const box = getByTestId("box");

    expect(box).toBeTruthy();

    const styles = box.props.style;
    const hasBorderWidth = Array.isArray(styles)
      ? styles.some((style) => style?.borderWidth != null)
      : styles?.borderWidth != null;

    expect(hasBorderWidth).toBe(true);
  });

  it('applies palette when prominence is "color"', () => {
    const { getByTestId } = render(
      <BoxBasic {...Basic.args} prominence="color" palette="default" />,
    );

    const box = getByTestId("box");

    expect(box).toBeTruthy();
    const styles = box.props.style;
    const hasBackgroundColor = Array.isArray(styles)
      ? styles.some((style) => style?.backgroundColor != null)
      : styles?.backgroundColor != null;

    expect(hasBackgroundColor).toBe(true);
  });

  it("renders multiple children", () => {
    const { getByText } = render(
      <BoxBasic
        {...Basic.args}
        children={[
          <Paragraph key="1">Box content A</Paragraph>,
          <Paragraph key="2">Box content B</Paragraph>,
        ]}
      />,
    );
    expect(getByText("Box content A")).toBeTruthy();
    expect(getByText("Box content B")).toBeTruthy();
  });

  it("handles the grow prop", () => {
    const { getByTestId } = render(<BoxGrow {...GrowEnabled.args} />);

    const box = getByTestId("box");

    expect(box).toBeTruthy();

    const styles = box.props.style;
    const hasFlexGrow = Array.isArray(styles)
      ? styles.some((style) => style?.flexGrow != null)
      : styles?.flexGrow != null;

    expect(hasFlexGrow).toBe(true);
  });
});
