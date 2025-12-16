import { render } from "@testing-library/react";
import { Display } from "./Display";

describe("Display component", () => {
  it("should apply correct font", async () => {
    const { asFragment } = render(<Display>Display component</Display>);

    expect(asFragment()).toMatchSnapshot();
  });

  it("should apply correct center align", async () => {
    const { asFragment } = render(
      <Display alignment="center">Display component</Display>,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it("should apply correct size", async () => {
    const { asFragment } = render(<Display>Display component</Display>);

    expect(asFragment()).toMatchSnapshot();
  });

  it("should apply correct lineheight", async () => {
    const { asFragment } = render(<Display>Display component</Display>);

    expect(asFragment()).toMatchSnapshot();
  });
});
