import { render, screen } from "_test-utils";
import { TextLink } from "components/TextLink";
import React from "react";

import { Paragraph } from "./Paragraph";
import { Strong } from "../Strong";

describe("Paragraph component", () => {
  it("should apply correct font", async () => {
    const { toJSON } = render(<Paragraph>Testing font</Paragraph>);
    // @ts-ignore
    const paragraphStyle = toJSON().props.style[0];
    let hasCorrectFontFamily = false;
    if (paragraphStyle.fontFamily === "odido_Paragraph_Regular") {
      hasCorrectFontFamily = true;
    }

    expect(hasCorrectFontFamily).toBe(true);
    expect(toJSON()).toMatchSnapshot();
  });

  it("should apply correct center align", async () => {
    const { toJSON } = render(
      <Paragraph alignment="center">Testing font</Paragraph>,
    );
    // @ts-ignore
    const displayStyle = toJSON().props.style[1];
    expect(displayStyle.textAlign).toBe("center");
    expect(toJSON()).toMatchSnapshot();
  });

  it("should apply correct size", async () => {
    const { toJSON } = render(<Paragraph>Testing font</Paragraph>);
    // @ts-ignore
    const paragraphStyle = toJSON().props.style[1];
    expect(paragraphStyle.fontSize).toBe(18);
    expect(toJSON()).toMatchSnapshot();
  });

  it("should apply correct lineheight", async () => {
    const { toJSON } = render(<Paragraph>Testing font</Paragraph>);
    // @ts-ignore
    const paragraphStyle = toJSON().props.style[1];
    expect(paragraphStyle.lineHeight).toBe(28);
    expect(toJSON()).toMatchSnapshot();
  });

  it("should apply correct letterSpacing", async () => {
    const { toJSON } = render(<Paragraph>Testing font</Paragraph>);
    // @ts-ignore
    const paragraphStyle = toJSON().props.style[1];
    expect(Number(paragraphStyle.letterSpacing.toFixed(2))).toBe(0.27);
    expect(toJSON()).toMatchSnapshot();
  });

  it("should accept <Strong> components as children", async () => {
    const { getByText } = render(
      <Paragraph>
        Testing <Strong>strong</Strong>
      </Paragraph>,
    );

    // full text can be found
    getByText("Testing strong");

    const strongText = getByText("strong");

    expect(strongText.props.style[0].fontFamily).toBe("odido_Paragraph_Strong");
  });

  it("should accept <TextLink> components as children", async () => {
    const { getByText } = render(
      <Paragraph>
        Testing <TextLink href="#">my link</TextLink>
      </Paragraph>,
    );

    // full text can be found
    getByText("Testing my link");

    const link = screen.getByRole("link", { name: "my link" });
    expect(link).not.toBeNull();
  });

  it("renders with data attributes passed in as props", () => {
    const { getByTestId } = render(
      <Paragraph dataAttributes={{ "data-foo": "bar" }}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </Paragraph>,
    );

    expect(getByTestId("paragraph").props["data-foo"]).toBe("bar");
  });
});
