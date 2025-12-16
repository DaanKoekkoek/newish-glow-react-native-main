import { render, screen } from "@testing-library/react";
import { ShopSection } from "./ShopSection";

describe("ShopSection", () => {
  it("renders children", () => {
    const children = <>Main Content</>;

    render(<ShopSection>{children}</ShopSection>);

    expect(screen.getByText("Main Content")).toBeInTheDocument();
  });

  it("renders aside when present", () => {
    const children = <>Main Content</>;

    render(<ShopSection aside={<>Aside Content</>}>{children}</ShopSection>);

    expect(screen.getByText("Aside Content")).toBeInTheDocument();
    expect(screen.getByText("Main Content")).toBeInTheDocument();
  });

  it("does not render aside when absent", () => {
    const children = "Main Content";

    render(<ShopSection>{children}</ShopSection>);

    expect(screen.queryByText("Aside Content")).toBeNull();
  });
});
