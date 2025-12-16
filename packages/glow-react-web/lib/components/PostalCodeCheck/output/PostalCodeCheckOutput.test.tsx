import { composeStory } from "@storybook/react";
import { render, screen } from "@testing-library/react";

import meta, { Default } from "./PostalCodeCheckOutput.stories";
import { userEvent } from "@testing-library/user-event";

const Basic = composeStory(Default, meta);

describe("<PostalCodeOutput />", () => {
  it("renders Technology and Heading", () => {
    render(<Basic {...Default.args} />);
    expect(screen.getByTestId("technology")).toBeInTheDocument();
    expect(screen.getByTestId("heading")).toHaveTextContent("Title");
  });

  it("renders string description as Paragraph", () => {
    render(
      <Basic {...Default.args} description="A fast internet connection" />,
    );
    expect(screen.getAllByTestId("paragraph")[0]).toHaveTextContent(
      "A fast internet connection",
    );
  });

  it("renders JSX description directly", () => {
    render(
      <Basic
        {...Default.args}
        description={<div data-testid="custom-desc">Hello</div>}
      />,
    );
    expect(screen.getByTestId("custom-desc")).toBeInTheDocument();
  });

  it("renders call to action content", () => {
    render(
      <Basic
        {...Default.args}
        callToAction={<button data-testid="cta-btn" />}
      />,
    );
    expect(screen.getByTestId("cta-btn")).toBeInTheDocument();
  });

  it("renders children inside if promo is 'inside'", () => {
    render(
      <Basic {...Default.args} promo="inside">
        <div data-testid="child-content">Promo content</div>
      </Basic>,
    );
    expect(screen.getByTestId("child-content")).toBeInTheDocument();
  });

  it("renders children outside if promo is 'default'", () => {
    render(
      <Basic {...Default.args} promo="default">
        <div data-testid="child-content">Outside promo</div>
      </Basic>,
    );
    expect(screen.getByTestId("child-content")).toBeInTheDocument();
  });

  it("does not render children if promo is 'none'", () => {
    render(
      <Basic {...Default.args} promo="none">
        <div data-testid="child-content">Hidden promo</div>
      </Basic>,
    );
    expect(screen.queryByTestId("child-content")).not.toBeInTheDocument();
  });

  it("renders address and watchTv", async () => {
    const onClickMock = jest.fn();
    render(
      <Basic
        {...Default.args}
        address={{
          title: "Address title",
          text: "Address details",
          editable: {
            text: "Edit",
            onClick: onClickMock,
          },
        }}
        watchTv={{ title: "Watch TV", text: "TV info" }}
      />,
    );

    expect(
      screen.getByTestId("definition-list-address-title"),
    ).toHaveTextContent("Address title");
    expect(
      screen.getByTestId("definition-list-tv-description"),
    ).toHaveTextContent("TV info");

    const editLink = screen.getAllByText("Edit")[0];
    await userEvent.click(editLink);
    expect(onClickMock).toHaveBeenCalled();
  });
});
