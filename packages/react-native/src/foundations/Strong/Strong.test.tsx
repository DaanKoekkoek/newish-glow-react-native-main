import { render } from "_test-utils";
import React from "react";

import { Strong } from "./Strong";

describe("Strong component", () => {
  it("should apply correct font", async () => {
    const { toJSON } = render(<Strong>Testing font</Strong>);
    // @ts-ignore
    const strongStyle = toJSON().props.style[0];
    let hasCorrectFontFamily = false;
    if (strongStyle.fontFamily === "odido_Paragraph_Strong") {
      hasCorrectFontFamily = true;
    }

    expect(hasCorrectFontFamily).toBe(true);
    expect(toJSON()).toMatchSnapshot();
  });

  it("should apply correct size", async () => {
    const { toJSON } = render(<Strong>Testing font</Strong>);
    // @ts-ignore
    const strongStyle = toJSON().props.style[1];
    let hasCorrectFontSize = false;
    if (strongStyle.fontSize === 18) {
      hasCorrectFontSize = true;
    }

    expect(hasCorrectFontSize).toBe(true);
    expect(toJSON()).toMatchSnapshot();
  });

  it("should apply correct center align", async () => {
    const { toJSON } = render(<Strong alignment="center">Testing font</Strong>);
    // @ts-ignore
    const displayStyle = toJSON().props.style[1];

    let hasCorrectAlign = false;
    if (displayStyle.textAlign === "center") {
      hasCorrectAlign = true;
    }

    expect(hasCorrectAlign).toBe(true);
    expect(toJSON()).toMatchSnapshot();
  });

  it("should apply correct lineheight", async () => {
    const { toJSON } = render(<Strong>Testing font</Strong>);
    // @ts-ignore
    const strongStyle = toJSON().props.style[1];

    let hasCorrectFontLineHeight = false;
    if (strongStyle.lineHeight === 28) {
      hasCorrectFontLineHeight = true;
    }

    expect(hasCorrectFontLineHeight).toBe(true);
    expect(toJSON()).toMatchSnapshot();
  });

  it("should apply correct letterSpacing", async () => {
    const { toJSON } = render(<Strong>Testing font</Strong>);
    // @ts-ignore
    const strongStyle = toJSON().props.style[1];
    let hasCorrectLetterSpacing = false;
    if (strongStyle.letterSpacing === 0.27000001072883606) {
      hasCorrectLetterSpacing = true;
    }

    expect(hasCorrectLetterSpacing).toBe(true);
    expect(toJSON()).toMatchSnapshot();
  });
});
