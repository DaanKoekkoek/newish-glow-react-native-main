import { render } from "_test-utils";
import React from "react";

import { Heading } from "./Heading";

describe("Heading component", () => {
  it("should apply correct font", async () => {
    const { toJSON } = render(<Heading size="md">Testing font</Heading>);
    // @ts-ignore
    const headingStyle = toJSON().props.style[0];
    expect(headingStyle.fontFamily).toBe("odido_Heading_Medium");
    expect(toJSON()).toMatchSnapshot();
  });

  it("should apply correct center align", async () => {
    const { toJSON } = render(
      <Heading alignment="center" size="md">
        Testing font
      </Heading>,
    );
    // @ts-ignore
    const displayStyle = toJSON().props.style[1];
    expect(displayStyle.textAlign).toBe("center");
    expect(toJSON()).toMatchSnapshot();
  });

  it("should apply correct size", async () => {
    const { toJSON } = render(<Heading size="md">Testing font</Heading>);
    // @ts-ignore
    const headingStyle = toJSON().props.style[1];
    expect(headingStyle.fontSize).toBe(24);
    expect(toJSON()).toMatchSnapshot();
  });

  it("should apply correct font weight", async () => {
    const { toJSON } = render(<Heading size="md">Testing font</Heading>);
    // @ts-ignore
    const headingStyle = toJSON().props.style[1];
    expect(headingStyle.fontWeight).toBe("500");
    expect(toJSON()).toMatchSnapshot();
  });

  it("should apply correct lineheight", async () => {
    const { toJSON } = render(<Heading size="md">Testing font</Heading>);
    // @ts-ignore
    const headingStyle = toJSON().props.style[1];
    expect(headingStyle.lineHeight).toBe(28);
    expect(toJSON()).toMatchSnapshot();
  });

  it("should apply correct letterSpacing", async () => {
    const { toJSON } = render(<Heading size="md">Testing font</Heading>);
    // @ts-ignore
    const headingStyle = toJSON().props.style[1];
    expect(Number(headingStyle.letterSpacing.toFixed(2))).toBe(0.24);
    expect(toJSON()).toMatchSnapshot();
  });
});
