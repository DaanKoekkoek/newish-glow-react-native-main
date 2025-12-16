import { fireEvent, render } from "_test-utils";
import { Addon } from "foundations/Addon";

import { AddOnListItem } from "./AddOnListItem";

const mockArgs = {
  title: "Item 1",
  isFirstChild: true,
  isLastChild: true,
  actionLabel: "button",
  onPress: jest.fn(),
};

describe("<AddOnListItem />", () => {
  it("applies styles when isFirstChild is true", () => {
    const { toJSON } = render(<AddOnListItem {...mockArgs} isFirstChild />);

    expect(toJSON()).toMatchSnapshot();
  });

  it("applies styles when isLastChild is true", () => {
    const { toJSON } = render(<AddOnListItem {...mockArgs} isLastChild />);

    expect(toJSON()).toMatchSnapshot();
  });

  it("renders addOn when provided", () => {
    const { getByTestId } = render(
      <AddOnListItem
        {...mockArgs}
        addOn={<Addon name="Amazon Prime" size="sm" testID="amazonprime" />}
      />,
    );

    expect(getByTestId("amazonprime_addon")).toBeTruthy();
  });

  it("renders description when provided", () => {
    const { getByText } = render(
      <AddOnListItem {...mockArgs} description="This is a description." />,
    );

    expect(getByText("This is a description.")).toBeTruthy();
  });

  it("renders promo text when provided", () => {
    const { getByText } = render(
      <AddOnListItem {...mockArgs} attention={{ text: "Special Offer!" }} />,
    );

    expect(getByText("Special Offer!")).toBeTruthy();
  });

  it("calls onPress when Pressable is clicked", async () => {
    const onPressSpy = jest.fn();

    const { getByTestId } = render(
      <AddOnListItem {...mockArgs} onPress={onPressSpy} />,
    );

    const button = getByTestId("addon-list-item");

    fireEvent.press(button);
    expect(onPressSpy).toHaveBeenCalledTimes(1);
  });
});
