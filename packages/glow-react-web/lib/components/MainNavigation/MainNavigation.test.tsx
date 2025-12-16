import { composeStory } from "@storybook/react";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import userEvent from "@testing-library/user-event";
import meta, { Default } from "./MainNavigation.stories";
import type { MainNavigationTree } from "./MainNavigation.types";
import type { BannerCardProps } from "_internals/Card/BannerCard";

const MainNavigationStory = composeStory(Default, meta);

describe("<MainNavigation />", () => {
  it("should not have any accessibility violations", async () => {
    const { container } = render(
      <MainNavigationStory {...MainNavigationStory.args} />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("renders a stable snapshot", () => {
    const { container } = render(
      <MainNavigationStory {...MainNavigationStory.args} />,
    );
    expect(container).toMatchSnapshot();
  });

  it("renders all main navigation branches", () => {
    render(<MainNavigationStory {...MainNavigationStory.args} />);
    const branches = MainNavigationStory.args?.navigationTree?.map(
      (b: MainNavigationTree) => b.label,
    );

    branches?.forEach((label?: string) => {
      expect(
        screen.getByRole("button", { name: new RegExp(label ?? "", "i") }),
      ).toBeInTheDocument();
    });
  });

  it("renders promo banners for active branch", async () => {
    render(<MainNavigationStory {...MainNavigationStory.args} />);
    const branchButton = screen.getByRole("button", { name: /branch 21/i });
    await userEvent.hover(branchButton);

    const activeBranch = MainNavigationStory.args?.navigationTree?.[0];
    if (activeBranch && activeBranch.promotions?.length) {
      activeBranch.promotions.forEach((promo: BannerCardProps) => {
        expect(
          screen.getByText(new RegExp(promo.title, "i")),
        ).toBeInTheDocument();
      });
    }
  });

  it("renders navigation and meta links", () => {
    render(<MainNavigationStory {...MainNavigationStory.args} />);

    expect(screen.getByRole("link", { name: /consumer/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /business/i })).toBeInTheDocument();
  });

  it("renders the logo with title", () => {
    render(<MainNavigationStory {...MainNavigationStory.args} />);
    const logoLink = screen.getByTitle(/keer terug naar homepagina/i);
    expect(logoLink).toHaveAttribute("href", "#");
  });

  it("renders a skip link pointing to main content", () => {
    render(<MainNavigationStory {...MainNavigationStory.args} />);
    const skipLink = screen.getByRole("link", { name: /skip to content/i });
    expect(skipLink).toHaveAttribute("href", "#main-content");
  });

  it("toggles mobile menu on button click", async () => {
    render(<MainNavigationStory {...MainNavigationStory.args} />);
    const toggleButton = screen.getByRole("button", { name: /open menu/i });

    // Initial state
    expect(toggleButton).toHaveAttribute("aria-expanded", "false");

    await userEvent.click(toggleButton);
    expect(toggleButton).toHaveAttribute("aria-expanded", "true");

    await userEvent.click(toggleButton);
    expect(toggleButton).toHaveAttribute("aria-expanded", "false");
  });

  it("opens a dropdown when hovering a main nav item", async () => {
    render(<MainNavigationStory {...MainNavigationStory.args} />);

    const productsButton = screen.getByRole("button", { name: /branch 21/i });
    await userEvent.hover(productsButton);

    // Automatically waits for the dropdown to appear
    expect(await screen.findByText(/category 1/i)).toBeInTheDocument();
  });

  it("renders user and cart controls", () => {
    render(<MainNavigationStory {...MainNavigationStory.args} />);
    const userLinks = screen.getAllByRole("link", { name: /user/i });
    expect(userLinks.length).toBeGreaterThan(0);
  });
});
