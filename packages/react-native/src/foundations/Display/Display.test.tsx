import { render } from "_test-utils";
import React from "react";

import { Display } from "./Display";

describe("Display component", () => {
  it("should apply correct font", async () => {
    const { toJSON } = render(<Display>Testing font</Display>);
    // @ts-ignore
    const displayStyle = toJSON().props.style;
    expect(displayStyle.fontFamily).toBe("odido_Display");
    expect(toJSON()).toMatchSnapshot();
  });

  it("should apply correct center align", async () => {
    const { toJSON } = render(
      <Display alignment="center">Testing font</Display>,
    );
    // @ts-ignore
    const displayStyle = toJSON().props.style;
    expect(displayStyle.textAlign).toBe("center");
    expect(toJSON()).toMatchSnapshot();
  });

  it("should apply correct size", async () => {
    const { toJSON } = render(<Display>Testing font</Display>);
    // @ts-ignore
    const displayStyle = toJSON().props.style;
    expect(displayStyle.fontSize).toBe(48);
    expect(toJSON()).toMatchSnapshot();
  });

  // TODO: currently fontweight 500 doesn't do anything so im disabling this. as we are directly using the medium font when rendering display.
  // it("should apply correct font weight", async () => {
  //   const { toJSON } = render(<Display>Testing font</Display>);
  //   const displayStyle = toJSON().props.style;
  //   expect(displayStyle.fontWeight).toBe("500");
  //   expect(toJSON()).toMatchSnapshot();
  // });

  it("should apply correct lineheight", async () => {
    const { toJSON } = render(<Display>Testing font</Display>);
    // @ts-ignore
    const displayStyle = toJSON().props.style;
    expect(displayStyle.lineHeight).toBe(48);
    expect(toJSON()).toMatchSnapshot();
  });
});
