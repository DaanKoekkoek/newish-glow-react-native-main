import { TextLink } from "./TextLink";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Icon } from "foundations/Icon";

describe("<TextLink />", () => {
  test("renders a stable snapshot", () => {
    const { asFragment } = render(<TextLink children={"Text"} />);

    expect(asFragment()).toMatchSnapshot();
  });

  test("renders an anchor element with the correct href and target", () => {
    render(
      <TextLink href="https://example.com" target="_blank">
        Visit Example
      </TextLink>,
    );

    const link = screen.getByRole("link", { name: /Visit Example/i });
    expect(link).toHaveAttribute("href", "https://example.com");
    expect(link).toHaveAttribute("target", "_blank");
  });

  test("triggers onClick when clicked", () => {
    const onClickMock = jest.fn();
    render(
      <TextLink as="button" onClick={onClickMock}>
        Click Me
      </TextLink>,
    );
    fireEvent.click(screen.getByText("Click Me"));

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  test("does not trigger onClick when inactive", () => {
    const onClickMock = jest.fn();
    render(
      <TextLink as="button" inactive onClick={onClickMock}>
        Inactive Link
      </TextLink>,
    );

    fireEvent.click(screen.getByText("Inactive Link"));

    expect(onClickMock).not.toHaveBeenCalled();
  });

  test("applies inverted styles when inverted prop is true", () => {
    render(<TextLink inverted>Inverted Link</TextLink>);

    expect(screen.getByText("Inverted Link")).toHaveClass("is-inverted");
  });

  test("applies inactive styles when inactive prop is true", () => {
    render(
      <TextLink as="button" inactive>
        Inactive Link
      </TextLink>,
    );
    expect(screen.getByRole("button")).toBeDisabled;
  });

  test("applies the correct size class", () => {
    render(
      <TextLink href="https://google.com" size="lg">
        Large Link
      </TextLink>,
    );

    expect(screen.getByRole("link")).toHaveClass("size-lg");
  });

  test("renders an icon when passed as a child", () => {
    const { asFragment } = render(
      <TextLink href="https://google.com">
        <Icon name="24h" />
        Text
      </TextLink>,
    );

    expect(screen.getByRole("link")).toContainElement(
      screen.getByTestId("icon"),
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("adapt the icon size for lg based on the link size", () => {
    const { asFragment } = render(
      <TextLink href="https://google.com" size="lg">
        <Icon name="24h" />
        Text
      </TextLink>,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test("adapt the icon size for xs based on the link size", () => {
    const { asFragment } = render(
      <TextLink href="https://google.com" size="xs">
        <Icon name="24h" />
        Text
      </TextLink>,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
