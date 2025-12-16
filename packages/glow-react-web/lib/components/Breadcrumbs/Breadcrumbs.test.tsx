import { render, screen } from "@testing-library/react";

import { Breadcrumbs } from "./Breadcrumbs";

describe("<Breadcrumbs />", () => {
  it("renders one breadcrumb", () => {
    const { container } = render(
      <Breadcrumbs items={[{ name: "Breadcrumbs 1" }]} />,
    );

    expect(screen.getByText("Breadcrumbs 1")).toBeDefined();
    expect(container).toMatchSnapshot();
  });

  it("renders two breadcrumbs", () => {
    const { container } = render(
      <Breadcrumbs
        items={[{ name: "Breadcrumbs 1" }, { name: "Breadcrumbs 2" }]}
      />,
    );

    expect(screen.getAllByText("Breadcrumbs 1")).toBeDefined();
    expect(screen.getAllByText("Breadcrumbs 2")).toBeDefined();

    expect(container).toMatchSnapshot();
  });

  it("renders more than two breadcrumbs", () => {
    const { container } = render(
      <Breadcrumbs
        items={[
          { name: "Breadcrumbs 1" },
          { name: "Breadcrumbs 2" },
          { name: "Breadcrumbs 3" },
          { name: "Breadcrumbs 4" },
        ]}
      />,
    );

    expect(container).toMatchSnapshot();
  });
});
