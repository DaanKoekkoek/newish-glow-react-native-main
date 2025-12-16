import { Addon } from "foundations/Addon";
import { render, screen, fireEvent } from "@testing-library/react";
import { AddonListItem } from "./AddonListItem";

const mockArgs = {
  title: "Item 1",
  isFirstChild: true,
  actionLabel: "button",
  onClick: jest.fn(),
};

describe("<AddonListItem />", () => {
  it("applies styles when isFirstChild is true", () => {
    const { asFragment } = render(<AddonListItem {...mockArgs} isFirstChild />);

    expect(asFragment()).toMatchSnapshot();
  });

  it("renders addOn when provided", () => {
    render(
      <AddonListItem
        {...mockArgs}
        addOn={<Addon name="Amazon Prime" size="sm" testID="amazonprime" />}
      />,
    );

    expect(screen.getByTestId("amazonprime")).toBeTruthy();
  });

  it("renders description when provided", () => {
    render(
      <AddonListItem {...mockArgs} description="This is a description." />,
    );

    expect(screen.getByText("This is a description.")).toBeTruthy();
  });

  it("renders promo text when provided", () => {
    render(
      <AddonListItem
        {...mockArgs}
        attention={{ text: "Special Offer!", variant: "information" }}
      />,
    );

    expect(screen.getByText("Special Offer!")).toBeTruthy();
  });

  it("calls onClick when button is clicked", async () => {
    const onPressSpy = jest.fn();

    render(<AddonListItem {...mockArgs} onClick={onPressSpy} />);

    const button = screen.getAllByTestId("button")[0];

    fireEvent.click(button);
    expect(onPressSpy).toHaveBeenCalledTimes(1);
  });
});
