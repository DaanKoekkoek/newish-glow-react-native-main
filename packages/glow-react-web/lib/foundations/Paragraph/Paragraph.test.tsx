import { Paragraph } from "./Paragraph";
import { Strong } from "../Strong";
import { render, screen } from "@testing-library/react";
import { TextLink } from "../../components/TextLink/TextLink";

describe("Paragraph component", () => {
  test("should match the snapshot", () => {
    const { asFragment } = render(<Paragraph>Testing font</Paragraph>);

    expect(asFragment()).toMatchSnapshot();
  });

  test("should accept <Strong> components as children", async () => {
    render(
      <Paragraph>
        Testing <Strong>strong</Strong>
      </Paragraph>,
    );

    await expect(screen.getByText("strong")).toBeTruthy();
  });

  test("should accept <TextLink> components as children", () => {
    render(
      <Paragraph>
        Testing <TextLink href="#">my link</TextLink>
      </Paragraph>,
    );

    screen.getByText("my link");

    const link = screen.getByRole("link", { name: "my link" });

    expect(link).toBeTruthy();
  });

  test("renders with data attributes passed in as props", () => {
    render(
      <Paragraph dataAttributes={{ "data-foo": "bar" }}>Lorem ipsum</Paragraph>,
    );

    expect(screen.getByText("Lorem ipsum").getAttribute("data-foo")).toBe(
      "bar",
    );
  });

  it("applies the className prop correctly", () => {
    render(<Paragraph className="custom-class">Test</Paragraph>);

    const paragraph = screen.getByText("Test");

    expect(paragraph).toHaveClass("custom-class");
  });

  it("applies the style prop correctly", () => {
    const style = { color: "red", fontSize: "16px" };
    render(<Paragraph style={style}>Test</Paragraph>);

    const paragraph = screen.getByText("Test");

    expect(paragraph).toHaveStyle("color: red;");
    expect(paragraph).toHaveStyle("font-size: 16px;");
  });
});
