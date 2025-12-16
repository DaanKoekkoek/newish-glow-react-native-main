import { render, screen } from "@testing-library/react";

import { Icon } from "./Icon";
import { iconSize } from "./Icon.constants";
import type { IconSize } from "./Icon.types";

describe("<Icon />", () => {
  it("renders icon by default as outline and with default size", () => {
    render(<Icon name="add" testID="add" />);

    const icon = screen.getByTestId("add") as HTMLElement;

    expect(icon.classList.contains("icon")).toBe(true);
    expect(icon.classList.contains("outline")).toBe(true);
    expect(icon.classList.contains("solid")).toBe(false);
    expect(icon.classList.contains("icon-size-default")).toBe(true);
  });

  it("renders icon width added className when provided via the props", () => {
    render(<Icon name="add" testID="add" className="foo" />);

    const icon = screen.getByTestId("add") as HTMLElement;

    expect(icon.classList.contains("foo")).toBe(true);
  });

  it("renders icon width added className when provided via the props", () => {
    render(<Icon name="add" testID="add" className="foo" />);

    const icon = screen.getByTestId("add") as HTMLElement;

    expect(icon.classList.contains("foo")).toBe(true);
  });

  it("renders icon as solid when provided via the props", () => {
    render(<Icon name="add" testID="add" solid />);

    const icon = screen.getByTestId("add") as HTMLElement;

    expect(icon.classList.contains("solid")).toBe(true);
    expect(icon.classList.contains("outline")).toBe(false);
  });

  it.each(Object.keys(iconSize))(
    "renders icon with provided size class: %s",
    (i) => {
      render(<Icon name="add" testID="add" size={i as IconSize} />);

      const icon = screen.getByTestId("add") as HTMLElement;

      expect(icon.classList.contains(`icon-size-${i}`)).toBe(true);
    },
  );
});
