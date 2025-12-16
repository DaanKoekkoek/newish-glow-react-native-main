import { render, screen } from "@testing-library/react";

import { DefaultList } from "./DefaultList";
import meta, { WithIcon } from "./DefaultList.stories";
import { composeStory } from "@storybook/react";
import { TextLink } from "components/TextLink";

const WithIconStory = composeStory(WithIcon, meta);

describe("DefaultList component", () => {
  it("renders a stable snapshot", () => {
    const view = render(<WithIconStory {...WithIcon.args} />);

    expect(view.asFragment()).toMatchSnapshot();
  });

  it("renders correctly with default props", () => {
    render(<DefaultList items={[{ text: "Item 1" }, { text: "Item 2" }]} />);
    expect(screen.getByText("Item 1")).toBeTruthy();
    expect(screen.getByText("Item 2")).toBeTruthy();
  });

  it('renders icons when variant is set to "Icon"', () => {
    render(
      <DefaultList
        items={[
          {
            icon: "checkmark",
            text: "Checkmark Item",
          },
        ]}
        variant="icon"
      />,
    );
    expect(screen.getByText("Checkmark Item")).toBeTruthy();
  });

  it('renders icons when variant is set to "Icon"', () => {
    render(
      <DefaultList
        items={[
          {
            icon: "checkmark",
            text: "Inactive",
          },
        ]}
        variant="icon"
        state="inactive"
      />,
    );
    const listItem = screen.getByTestId("default-list-list-item");
    expect(listItem).toHaveClass("list-state-inactive");
  });

  it('renders numbers for the "Numbered" variant', () => {
    render(
      <DefaultList
        items={[{ text: "Numbered Item 1" }, { text: "Numbered Item 2" }]}
        variant="numbered"
        testID="numbered-list"
      />,
    );

    // check if the list items are rendered with <ol> tag
    const defaultList = screen.getByTestId("numbered-list");
    expect(defaultList.tagName).toBe("OL");
  });

  it("renders styling", () => {
    render(
      <DefaultList
        items={[
          {
            text: "Custom Style Item",
          },
        ]}
        inverted
        size="sm"
      />,
    );

    const defaultList = screen.getByTestId("default-list");
    expect(defaultList).toHaveClass("default-list-inverted");
  });

  it("Items can include TextLinks in the text", () => {
    render(
      <DefaultList
        items={[
          {
            text: "Custom Style Item",
          },
          {
            text: (
              <>
                This is a <TextLink href="/">link</TextLink>
              </>
            ),
          },
        ]}
        inverted
        size="sm"
      />,
    );

    expect(screen.getByText("Custom Style Item")).toBeInTheDocument();
    expect(screen.getByText("This is a")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "link" })).toBeInTheDocument();
  });
});
