import { composeStory } from "@storybook/react";
import "@testing-library/jest-dom";
import { render, screen, render as storyRender } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { List, ListItem } from "./List";

import meta, { Default } from "./List.stories";
import IMAGES from "foundations/Image/Image.mock";

const ListStory = composeStory(Default, meta);

describe("<List />", () => {
  it("renders a stable snapshot", () => {
    const { container } = storyRender(<ListStory {...ListStory.args} />);
    expect(container).toMatchSnapshot();
  });

  test("renders empty list with default props", () => {
    render(
      <List>
        <ListItem text="Item 1" />
        <ListItem text="Item 2" />
      </List>,
    );

    const listElement = screen.getByTestId("list");
    expect(listElement).toBeInTheDocument();
    expect(listElement.tagName).toBe("UL");
  });

  test("renders with default background and palette", () => {
    render(
      <List background="default" palette="pink">
        <ListItem text="Item 1" />
        <ListItem text="Item 2" />
      </List>,
    );

    const listElement = screen.getByTestId("list");
    expect(listElement).toHaveClass("background-default");
    expect(listElement).toHaveClass("palette-pink");
  });

  test("renders with subtle background and palette", () => {
    render(
      <List background="subtle" palette="pink">
        <ListItem text="Item 1" />
        <ListItem text="Item 2" />
      </List>,
    );

    const listElement = screen.getByTestId("list");
    expect(listElement).toHaveClass("background-subtle");
    expect(listElement).not.toHaveClass("palette-pink");
  });

  test("renders children correctly", () => {
    render(
      <List testID="test-child">
        <ListItem text="Item 1" />
        <ListItem text="Item 2" />
      </List>,
    );

    expect(screen.getByTestId("test-child")).toBeInTheDocument();
  });
});

describe("<ListItem />", () => {
  test("renders with basic text", () => {
    render(<ListItem text="Test Item" testID="list-item-test" />);

    const listItem = screen.getByTestId("list-item-test");
    expect(listItem).toBeInTheDocument();
    expect(listItem.tagName).toBe("LI");
    expect(screen.getByText("Test Item")).toBeInTheDocument();
  });

  test("renders with left icon", () => {
    render(
      <List>
        <ListItem
          text="Item with icon"
          leadingContent={{ icon: "home" }}
          testID="testleft"
        />
      </List>,
    );

    expect(
      screen.getByTestId("list-item-leading-content-testleft"),
    ).toBeInTheDocument();
    expect(screen.getByText("Item with icon")).toBeInTheDocument();
  });

  test("renders with right icon", () => {
    render(
      <List>
        <ListItem
          text="Item with icon"
          iconRight="home"
          leadingContent={{ icon: "home", mediaContentSize: "sm" }}
          testID="testright"
          clickable
        />
      </List>,
    );

    expect(screen.getByTestId("list-icon-right-testright")).toBeInTheDocument();
    expect(screen.getByText("Item with icon")).toBeInTheDocument();
  });

  test("renders with descriptions", () => {
    render(
      <List>
        <ListItem
          text="Main text"
          description1="First description"
          description2="Second description"
          testID="withDesc"
        />
      </List>,
    );

    expect(screen.getByText("Main text")).toBeInTheDocument();
    expect(screen.getByText("First description")).toBeInTheDocument();
    expect(screen.getByText("Second description")).toBeInTheDocument();
  });

  test("renders with divider with one list item if bottomDivider is true", () => {
    render(
      <List>
        <ListItem text="Item 1" bottomDivider />
      </List>,
    );

    expect(screen.getByTestId("divider")).toBeInTheDocument();
  });

  test("renders without divider with one list item if bottomDivider is false", () => {
    render(
      <List>
        <ListItem text="Item 1" />
      </List>,
    );

    expect(screen.getByTestId("divider")).toBeInTheDocument();
  });

  test("renders with attention text", () => {
    render(
      <ListItem
        text="Item with attention"
        attention={{ text: "Important!", variant: "warning" }}
        leadingContent={{
          image: { resizeMode: "cover", localSrc: IMAGES["mid-hero"], alt: "" },
          mediaContentSize: "sm",
        }}
        testID="attention"
      />,
    );

    expect(screen.getByText("Item with attention")).toBeInTheDocument();
    expect(screen.getByText("Important!")).toBeInTheDocument();
    expect(screen.getByText("Important!")).toHaveClass("attention-warning");
  });

  test("renders with notification", () => {
    render(
      <List>
        <ListItem
          text="Item with notification"
          notification={5}
          testID="notification"
        />
      </List>,
    );

    expect(screen.getByText("Item with notification")).toBeInTheDocument();
    expect(screen.getByTestId("badge-status-number")).toBeInTheDocument();
    expect(screen.getByTestId("badge-status-number")).toHaveTextContent("5");
  });

  test("handles click events", async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    render(
      <List>
        <ListItem
          text="Clickable"
          onClick={handleClick}
          testID="list-item-clickEvent"
          clickable
        />
      </List>,
    );

    await user.click(screen.getByTestId("text-link-list-item-clickEvent"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("handles keyboard navigation correctly", async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    render(
      <List>
        <ListItem
          text="Keyboard navigable"
          onClick={handleClick}
          testID="list-item-keyboard"
          clickable
        />
      </List>,
    );

    const item = screen.getByTestId("text-link-list-item-keyboard");
    item.focus();

    // Test Enter key
    await user.keyboard("{Enter}");
    expect(handleClick).toHaveBeenCalledTimes(1);

    // Test Space key
    await user.keyboard(" ");
    expect(handleClick).toHaveBeenCalledTimes(2);

    // Other keys should not trigger click
    await user.keyboard("{Tab}");
    expect(handleClick).toHaveBeenCalledTimes(2);
  });
});
