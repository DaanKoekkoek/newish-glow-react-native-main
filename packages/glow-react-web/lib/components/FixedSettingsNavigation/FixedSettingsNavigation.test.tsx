import { composeStory } from "@storybook/react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import meta, {
  Default,
  CustomLabelsAndUrls,
} from "./FixedSettingsNavigation.stories";
import { FixedSettingsNavigation } from "./FixedSettingsNavigation";

const DefaultStory = composeStory(Default, meta);
const CustomStory = composeStory(CustomLabelsAndUrls, meta);

describe("FixedSettingsNavigation Component", () => {
  it("renders a stable snapshot", () => {
    const { asFragment } = render(<DefaultStory {...Default.args} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders with default testID", () => {
    render(<DefaultStory {...Default.args} />);
    expect(screen.getByTestId("fixed-settings-navigation")).toBeInTheDocument();
  });

  it("renders with custom testID", () => {
    render(
      <FixedSettingsNavigation {...Default.args} testID="custom-navigation" />,
    );
    expect(screen.getByTestId("custom-navigation")).toBeInTheDocument();
  });

  describe("Top Navigation Links", () => {
    it("renders back to main link when both href and label are provided", () => {
      render(
        <FixedSettingsNavigation
          backToMainHref="/"
          backToMainLabel="Terug naar Odido.nl"
        />,
      );
      const link = screen.getByRole("link", { name: "Terug naar Odido.nl" });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", "/");
    });

    it("does not render back to main link when href is missing", () => {
      render(<FixedSettingsNavigation backToMainLabel="Terug naar Odido.nl" />);
      expect(
        screen.queryByRole("link", { name: "Terug naar Odido.nl" }),
      ).not.toBeInTheDocument();
    });

    it("does not render back to main link when label is missing", () => {
      render(<FixedSettingsNavigation backToMainHref="/" />);
      const links = screen.queryAllByRole("link");
      expect(links.some((l) => l.textContent === "Terug naar Odido.nl")).toBe(
        false,
      );
    });

    it("renders service link when both href and label are provided", () => {
      render(
        <FixedSettingsNavigation
          serviceHref="/service"
          serviceLabel="Naar service"
        />,
      );
      const link = screen.getByRole("link", { name: "Naar service" });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", "/service");
    });

    it("renders both top navigation links", () => {
      render(<DefaultStory {...Default.args} />);
      expect(
        screen.getByRole("link", { name: "Terug naar Odido.nl" }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("link", { name: "Naar service" }),
      ).toBeInTheDocument();
    });
  });

  describe("User Information Section", () => {
    it("renders user avatar with initials", () => {
      render(<DefaultStory {...Default.args} />);
      expect(screen.getByText("AD")).toBeInTheDocument();
    });

    it("renders my account label with initials", () => {
      render(<DefaultStory {...Default.args} />);
      expect(screen.getByText("Mijn account")).toBeInTheDocument();
    });

    it("renders custom user label", () => {
      render(<CustomStory {...CustomLabelsAndUrls.args} />);
      expect(screen.getByText("My Profile")).toBeInTheDocument();
    });
  });

  describe("Product Information Section", () => {
    it("renders product label when provided", () => {
      render(<DefaultStory {...Default.args} />);
      expect(
        screen.getByText("Internet + TV + Vast bellen"),
      ).toBeInTheDocument();
    });

    it("does not render product label when missing", () => {
      render(<FixedSettingsNavigation productIcon="internet" />);
      expect(
        screen.queryByText("Internet + TV + Vast bellen"),
      ).not.toBeInTheDocument();
    });

    it("renders custom product label", () => {
      render(<CustomStory {...CustomLabelsAndUrls.args} />);
      expect(screen.getByText("Services")).toBeInTheDocument();
    });

    it("does not render product icon without label", () => {
      render(<FixedSettingsNavigation productIcon="internet" />);
      expect(screen.queryByText("Internet + TV")).not.toBeInTheDocument();
    });
  });

  describe("Customization", () => {
    it("applies custom style prop", () => {
      const customStyle = { backgroundColor: "red" };
      render(<FixedSettingsNavigation {...Default.args} style={customStyle} />);
      const root = screen.getByTestId("fixed-settings-navigation");
      expect(root).toHaveStyle("background-color: red");
    });

    it("renders with all custom values from CustomLabelsAndUrls story", () => {
      render(<CustomStory {...CustomLabelsAndUrls.args} />);

      expect(screen.getByText("Home")).toBeInTheDocument();
      expect(screen.getByText("Support")).toBeInTheDocument();
      expect(screen.getByText("My Profile")).toBeInTheDocument();
      expect(screen.getByText("Services")).toBeInTheDocument();
      expect(screen.getByText("JD")).toBeInTheDocument();
    });

    it("applies custom URLs to links", () => {
      render(<CustomStory {...CustomLabelsAndUrls.args} />);

      const homeLink = screen.getByRole("link", { name: "Home" });
      const supportLink = screen.getByRole("link", { name: "Support" });

      expect(homeLink).toHaveAttribute("href", "/home");
      expect(supportLink).toHaveAttribute("href", "/support");
    });
  });

  describe("Empty State", () => {
    it("renders with no props", () => {
      render(<FixedSettingsNavigation />);
      // Should render without crashing
      expect(
        screen.getByTestId("fixed-settings-navigation"),
      ).toBeInTheDocument();
    });
  });

  describe("Semantic HTML", () => {
    it("uses proper link elements for navigation", () => {
      render(<DefaultStory {...Default.args} />);
      const links = screen.getAllByRole("link");
      expect(links.length).toBeGreaterThan(0);
      links.forEach((link) => {
        expect(link.tagName).toBe("A");
      });
    });
  });

  describe("Component Integration", () => {
    it("renders complete structure with all sections", () => {
      const { asFragment } = render(
        <FixedSettingsNavigation
          backToMainHref="/"
          backToMainLabel="Terug naar Odido.nl"
          serviceHref="/service"
          serviceLabel="Naar service"
          initials="JD"
          userLabel="Account"
          productIcon="internet"
          productLabel="Internet + TV"
        />,
      );
      expect(asFragment()).toMatchSnapshot();
    });

    it("renders without required sections when props are omitted", () => {
      const { asFragment } = render(
        <FixedSettingsNavigation initials="JD" userLabel="Account" />,
      );
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
