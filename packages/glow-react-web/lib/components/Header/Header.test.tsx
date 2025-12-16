import { composeStory } from "@storybook/react";
import { render, screen, fireEvent } from "@testing-library/react";

import meta, {
  Default,
  SubtleVariant,
  LayoutAlternate,
} from "./Header.stories";
import { Header } from "./Header";
import { TextLink } from "components/TextLink";

// Compose all stories for testing
const DefaultHeader = composeStory(Default, meta);
const SubtleHeader = composeStory(SubtleVariant, meta);
const AlternateHeader = composeStory(LayoutAlternate, meta);

// Mock search auto-suggestions for tests that need to create Header directly
const mockSearchAutoSuggestions = [
  { text: "Test search", value: "test_search", category: "Test" },
];

describe("<Header />", () => {
  it("renders default header snapshot", () => {
    const { container } = render(<DefaultHeader {...DefaultHeader.args} />);
    expect(container).toMatchSnapshot();
  });

  it("renders subtle variant", () => {
    render(<SubtleHeader {...SubtleHeader.args} />);
    // Validate meta-nav is not present in subtle variant
    const metaNav = screen.queryByTestId("header-meta-nav");
    expect(metaNav).not.toBeInTheDocument();

    // Ensure main header is rendered
    const headerMain = screen.getByTestId("header-main-desktop");
    expect(headerMain).toBeInTheDocument();
  });

  it("renders alternate layout", () => {
    render(<AlternateHeader {...AlternateHeader.args} />);
    const headerMain = screen.getByTestId("header-main-desktop");
    expect(headerMain).toHaveClass("layout-alternate");
  });

  it("renders AFM banner when AFMbanner prop is true", () => {
    render(<DefaultHeader {...DefaultHeader.args} AFMbanner={true} />);
    const afmBanner = screen.getByTestId("header-afm-banner");
    expect(afmBanner).toBeInTheDocument();
  });

  it("does not render AFM banner when AFMbanner prop is false", () => {
    render(<DefaultHeader {...DefaultHeader.args} AFMbanner={false} />);
    const afmBanner = screen.queryByTestId("header-afm-banner");
    expect(afmBanner).not.toBeInTheDocument();
  });

  it("displays help information in subtle variant when helpOptions is provided", () => {
    render(
      <SubtleHeader
        {...SubtleHeader.args}
        helpOptions={{
          phone: "0800-7123",
          status: true,
          link: <TextLink href="#">Openingstijden</TextLink>,
        }}
      />,
    );

    const helpComponent = screen.getByTestId("header-nav-help");
    expect(helpComponent).toBeInTheDocument();

    // Use getAllByText to handle multiple instances of the same text and check if at least one exists
    expect(screen.getAllByText("0800-7123")).toHaveLength(2);

    // Status should show "Open" since helpStatus is true
    const statusComponent = screen.getByTestId("header-nav-help-status");
    expect(statusComponent).toBeInTheDocument();
    expect(screen.getByTestId("header-nav-help-status").textContent).toContain(
      "Open",
    );
  });

  it("toggles search mode when search button is clicked", async () => {
    render(<DefaultHeader {...DefaultHeader.args} testID="test-header" />);

    // Find and click the search button
    const searchButton = screen.getByTestId("search-button");
    fireEvent.click(searchButton);

    // Check if the header is now in search mode
    const headerElement = screen.getByTestId("test-header");
    expect(headerElement).toHaveClass("search-mode");

    // Find and click the close button to exit search mode
    // Use getAllByLabelText since there are multiple close buttons (mobile and desktop)
    const closeButtons = screen.getAllByLabelText("Close search");
    expect(closeButtons.length).toBeGreaterThan(0);
    fireEvent.click(closeButtons[0]);

    // Check if the header is no longer in search mode
    expect(headerElement).not.toHaveClass("search-mode");
  });

  it("renders mobile menu when menu button is clicked", async () => {
    render(<DefaultHeader {...DefaultHeader.args} testID="test-header" />);

    // Find and click the mobile menu button
    const menuButton = screen.getByTestId("mobile-menu-button");
    fireEvent.click(menuButton);

    // Check if the mobile menu is open (level1 state)
    const headerElement = screen.getByTestId("test-header");
    expect(headerElement).toHaveClass("mobile-menu-open");

    // Click the menu button again to close it
    fireEvent.click(menuButton);

    // Check if the mobile menu is closed
    expect(headerElement).not.toHaveClass("mobile-menu-open");
  });

  it("renders submenu when provided with mainLinks that have submenu data", async () => {
    const mainLinks = [
      {
        title: "Products",
        submenu: {
          columns: [
            {
              title: "Test Column",
              links: [{ title: "Test Link", href: "/test" }],
            },
          ],
        },
      },
    ];

    render(
      <Header
        testID="header-with-submenu"
        mainLinks={mainLinks}
        searchAutoSuggestions={mockSearchAutoSuggestions}
        onSearch={jest.fn()}
      />,
    );

    const header = screen.getByTestId("header-with-submenu");
    expect(header).toBeInTheDocument();
  });

  it("applies custom className when provided", () => {
    render(
      <Header
        testID="custom-class-header"
        className="custom-header-class"
        searchAutoSuggestions={mockSearchAutoSuggestions}
        onSearch={jest.fn()}
      />,
    );
    const header = screen.getByTestId("custom-class-header");
    expect(header).toHaveClass("custom-header-class");
  });

  it("renders with custom testID when provided", () => {
    render(
      <Header
        testID="custom-test-id"
        searchAutoSuggestions={mockSearchAutoSuggestions}
        onSearch={jest.fn()}
      />,
    );
    const header = screen.getByTestId("custom-test-id");
    expect(header).toBeInTheDocument();
  });

  it("renders custom login button with buttonOptions.loginButton", () => {
    const onLoginClick = jest.fn();
    render(
      <Header
        testID="header-with-login-button"
        searchAutoSuggestions={mockSearchAutoSuggestions}
        buttonOptions={{
          loginButton: {
            label: "Sign In",
            loggedIn: false,
            onClick: onLoginClick,
          },
        }}
        onSearch={jest.fn()}
      />,
    );

    const loginButton = screen.getByTestId("my-odido-button");
    expect(loginButton).toBeInTheDocument();
    fireEvent.click(loginButton);
    expect(onLoginClick).toHaveBeenCalled();
  });

  it("renders shop button with badge value using buttonOptions.shopButton", () => {
    const onShopClick = jest.fn();
    render(
      <Header
        testID="header-with-shop-button"
        searchAutoSuggestions={mockSearchAutoSuggestions}
        buttonOptions={{
          shopButton: {
            value: 5,
            onClick: onShopClick,
          },
        }}
        onSearch={jest.fn()}
      />,
    );

    const shopButtonDesktop = screen.getByTestId("shop-button");
    expect(shopButtonDesktop).toBeInTheDocument();

    const shopBadgeDesktop = screen.getByTestId("shop-badge-badge");
    expect(shopBadgeDesktop).toHaveTextContent("5");

    fireEvent.click(shopButtonDesktop);
    expect(onShopClick).toHaveBeenCalled();
  });

  it("renders search button with custom label using buttonOptions.searchButton", () => {
    const onSearchHover = jest.fn();
    render(
      <Header
        testID="header-with-custom-search"
        searchAutoSuggestions={mockSearchAutoSuggestions}
        buttonOptions={{
          searchButton: {
            label: "Custom Search",
            hideLabel: false,
            onHover: onSearchHover,
          },
        }}
        onSearch={jest.fn()}
      />,
    );

    const searchButton = screen.getByTestId("search-button");
    expect(searchButton).toBeInTheDocument();
    fireEvent.mouseOver(searchButton);
    expect(onSearchHover).toHaveBeenCalled();
  });
});
