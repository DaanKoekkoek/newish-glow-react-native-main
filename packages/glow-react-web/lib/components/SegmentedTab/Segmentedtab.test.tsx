import { composeStory } from "@storybook/react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import meta, { WithIcon, WithoutIcon } from "./SegmentedTab.stories";
import { SegmentedTabButtons } from "./SegmentedTabButtons";
import { SegmentedTabPanels } from "./SegmentedTabPanels";

const WithIconStory = composeStory(WithIcon, meta);
const WithoutIconStory = composeStory(WithoutIcon, meta);

describe("SegmentedTab Component", () => {
  it("renders a stable snapshot", () => {
    const view = render(<WithIconStory {...WithIconStory.args} />);

    expect(view.asFragment()).toMatchSnapshot();
  });

  it("should display an icon if passed into the content", () => {
    render(<WithIconStory {...WithIconStory.args} />);

    const label = screen.getByTestId("Home").getAttribute("aria-label");
    expect(label).toEqual(`Homehome`);
  });

  it("should not display an icon if not passed into the content", () => {
    render(<WithoutIconStory {...WithoutIconStory.args} />);

    const label = screen.getByTestId("Home").getAttribute("aria-label");
    expect(label).toEqual(`Home`);
  });

  it("should display a child component if passed into the content", () => {
    render(<WithoutIconStory {...WithoutIconStory.args} />);

    expect(screen.getAllByTestId("segmented-tab-panel-child")).toHaveLength(3);
  });

  it("changes the active tab when clicked", async () => {
    render(<WithoutIconStory {...WithoutIconStory.args} />);

    const tab1 = screen.getByTestId("Home").getAttribute("aria-selected");
    const tab2 = screen.getByTestId("Profile").getAttribute("aria-selected");

    expect(tab1).toBe("true");
    expect(tab2).toBe("false");

    fireEvent.click(screen.getAllByTestId("button")[1]);

    await waitFor(() => {
      const panelTwo = screen.getByTestId("Profile");
      expect(panelTwo.getAttribute("aria-selected")).toBe("true");
    });

    await waitFor(() => {
      const panelTwo = screen.getByTestId("Home");
      expect(panelTwo.getAttribute("aria-selected")).toBe("false");
    });
  });

  it("does not change active tab if the component is in inactive state", async () => {
    render(<WithoutIconStory {...WithoutIconStory.args} state="inactive" />);

    const tab1 = screen.getByTestId("Home").getAttribute("aria-selected");
    const tab2 = screen.getByTestId("Profile").getAttribute("aria-selected");

    expect(tab1).toBe("true");
    expect(tab2).toBe("false");

    fireEvent.click(screen.getAllByTestId("button")[1]);

    await waitFor(() => {
      const panelTwo = screen.getByTestId("Profile");
      expect(panelTwo.getAttribute("aria-selected")).toBe("false");
    });

    await waitFor(() => {
      const panelTwo = screen.getByTestId("Home");
      expect(panelTwo.getAttribute("aria-selected")).toBe("true");
    });
  });

  it("sets the active tab if specified in the parameters", () => {
    render(<WithoutIconStory {...WithoutIconStory.args} active={1} />);

    const tab1 = screen.getByTestId("Home").getAttribute("aria-selected");
    const tab2 = screen.getByTestId("Profile").getAttribute("aria-selected");

    expect(tab1).toBe("false");
    expect(tab2).toBe("true");
  });

  it("calls the callback when the selected tab changes", async () => {
    const mockTabChange = jest.fn();

    render(
      <div>
        <SegmentedTabButtons
          options={[
            {
              id: 0,
              tab: {
                label: "Home",
                icon: "home",
              },
            },
            {
              id: 1,
              tab: {
                label: "Profile",
                icon: "profile-business",
              },
            },
            {
              id: 2,
              tab: {
                label: "Settings",
                icon: "3d",
              },
            },
          ]}
          onTabChange={mockTabChange}
          uuid="TESTID"
        />
        <SegmentedTabPanels
          uuid="TESTID"
          options={[
            {
              id: 0,
              panel: "Welcome to the Home tab!",
            },
            {
              id: 1,
              panel: "This is your Profile information.",
            },
            {
              id: 2,
              panel: "Here you can change Settings.",
            },
          ]}
        />
      </div>,
    );

    expect(mockTabChange).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByTestId("Profile"));

    await waitFor(() => {
      expect(mockTabChange).toHaveBeenCalledTimes(2);
    });
  });
});
