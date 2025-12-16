import { render, screen } from "@testing-library/react";
import { BaseText } from "./BaseText";
import styles from "./BaseText.module.scss";

describe("<BaseText />", () => {
  test("renders default tag (span) and applies correct class for paragraph variant", () => {
    render(<BaseText variant="paragraph">Paragraph Text</BaseText>);

    const element = screen.getByText("Paragraph Text");
    expect(element.tagName.toLowerCase()).toBe("span");
    expect(element).toHaveClass(styles["base-paragraph"]);
  });

  test("renders h1 tag and applies correct class for heading variant", () => {
    render(
      <BaseText as="h1" variant="heading">
        Heading Text
      </BaseText>,
    );

    const element = screen.getByText("Heading Text");
    expect(element.tagName.toLowerCase()).toBe("h1");
    expect(element).toHaveClass(styles["base-heading"]);
  });

  test("renders p tag and applies correct class for display variant", () => {
    render(
      <BaseText as="p" variant="display">
        Display Text
      </BaseText>,
    );

    const element = screen.getByText("Display Text");
    expect(element.tagName.toLowerCase()).toBe("p");
    expect(element).toHaveClass(styles["base-display"]);
  });

  test("renders custom className alongside default variant class", () => {
    render(<BaseText className="custom-class">Custom Class Test</BaseText>);

    const element = screen.getByText("Custom Class Test");
    expect(element).toHaveClass(styles["base-paragraph"]);
    expect(element).toHaveClass("custom-class");
  });

  test("renders children", () => {
    render(<BaseText>Test Children</BaseText>);

    const element = screen.getByText("Test Children");
    expect(element).toBeInTheDocument();
  });

  test("renders with htmlFor for label tag", () => {
    render(
      <BaseText as="label" htmlFor="input-id">
        Label Text
      </BaseText>,
    );

    const element = screen.getByText("Label Text");
    expect(element.tagName.toLowerCase()).toBe("label");
    expect(element).toHaveAttribute("for", "input-id");
  });

  test("renders with id for div tag", () => {
    render(
      <BaseText as="div" id="test-id">
        Div Content
      </BaseText>,
    );

    const element = screen.getByText("Div Content");
    expect(element.tagName.toLowerCase()).toBe("div");
    expect(element).toHaveAttribute("id", "test-id");
  });

  test("renders correct tag when no tag prop is provided", () => {
    render(<BaseText>Default Tag Test</BaseText>);

    const element = screen.getByText("Default Tag Test");
    expect(element.tagName.toLowerCase()).toBe("span");
  });
});
