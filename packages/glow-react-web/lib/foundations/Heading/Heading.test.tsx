import { render, screen } from "@testing-library/react";

import { Heading } from "./Heading";
import {
  HeadingAlignment,
  HeadingRenderType,
  HeadingSize,
} from "./Heading.types";

describe("<Heading />", () => {
  it("renders by default with children, size xl, color default, alignment left and as div", () => {
    render(<Heading testID="foo">Foo</Heading>);

    const heading = screen.getByTestId("foo") as HTMLElement;

    expect(heading.classList.contains("heading-size-xl")).toBe(true);
    expect(heading.classList.contains("heading-color-default")).toBe(false);
    expect(heading.classList.contains("align-left")).toBe(true);
    expect(heading.tagName).toBe("DIV");
    expect(heading.textContent).toBe("Foo");
  });

  it.each(["xl", "lg", "md", "sm", "xs"])(
    "renders with provided size className as provided: %s",
    (i) => {
      render(
        <Heading size={i as HeadingSize} testID="foo">
          Foo
        </Heading>,
      );

      const heading = screen.getByTestId("foo") as HTMLElement;

      expect(heading.classList.contains(`heading-size-${i}`)).toBe(true); // size
    },
  );

  it("renders with additional className provided", () => {
    render(
      <Heading testID="foo" className="bar">
        Foo
      </Heading>,
    );

    const heading = screen.getByTestId("foo") as HTMLElement;

    expect(heading.classList.contains("bar")).toBe(true);
  });

  it("renders with color className as inverted when provided", () => {
    render(
      <Heading testID="foo" color="inverted">
        Foo
      </Heading>,
    );

    const heading = screen.getByTestId("foo") as HTMLElement;

    expect(heading.classList.contains("heading-color-default")).toBe(false);
    expect(heading.classList.contains("heading-color-inverted")).toBe(true);
  });

  it.each(["left", "center"])(
    "renders with the alignment className as provided: %s",
    (alignment) => {
      render(
        <Heading testID="foo" alignment={alignment as HeadingAlignment}>
          Foo
        </Heading>,
      );

      const heading = screen.getByTestId("foo");

      expect(heading.classList.contains(`align-${alignment}`)).toBe(true);
      expect(
        heading.classList.contains(
          alignment === "left" ? "align-center" : "align-left",
        ),
      ).toBe(false);
    },
  );

  it.each(["h1", "h2", "h3", "h4", "h5", "h6"])(
    "renders with the HTML element 'as' provided: %s",
    (i) => {
      render(
        <Heading testID="foo" as={i as HeadingRenderType}>
          Foo
        </Heading>,
      );

      const heading = screen.getByTestId("foo") as HTMLElement;

      expect(heading.tagName).toBe(i.toUpperCase());
    },
  );

  it("renders with additional styles when provided", () => {
    render(
      <Heading testID="foo" style={{ backgroundColor: "red" }}>
        Foo
      </Heading>,
    );

    const heading = screen.getByTestId("foo") as HTMLElement;

    expect(window.getComputedStyle(heading).backgroundColor).toBe("red");
  });
});
