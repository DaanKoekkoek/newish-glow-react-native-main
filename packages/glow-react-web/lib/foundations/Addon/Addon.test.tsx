import { render, screen } from "@testing-library/react";
import { Addon } from "./Addon";
import { addons, addonXsSm } from "./Addon.config";
import * as globalHooks from "_global-hooks";

jest.mock("_global-hooks", () => ({
  useGenerateClassNames: jest.fn(),
}));

describe("Addon component", () => {
  it("should render the default Addon size component", () => {
    (globalHooks.useGenerateClassNames as jest.Mock).mockReturnValue(
      "addon-size-default",
    );

    render(<Addon name="Amazon Prime" size="default" testID="addon-test-id" />);

    const addonElement = screen.getByTestId("addon-test-id");

    expect(addonElement).toBeInTheDocument();
    expect(addonElement).toHaveClass("addon-size-default");
    expect(addonElement).toHaveClass("addons");
    expect(addonElement).toHaveAttribute("aria-label", "Amazon Prime");
  });

  it("should render a custom size Addon component", () => {
    (globalHooks.useGenerateClassNames as jest.Mock).mockReturnValue(
      "addon-size-sm",
    );

    render(<Addon name="Amazon Prime" size="sm" testID="addon-test-id" />);

    const addonElement = screen.getByTestId("addon-test-id");

    expect(addonElement).toBeInTheDocument();
    expect(addonElement).toHaveClass("addon-size-sm");
    expect(addonElement).toHaveClass("addons");
  });

  it("should apply 'is-inactive' class when the state is inactive", () => {
    (globalHooks.useGenerateClassNames as jest.Mock).mockReturnValue(
      "addon-size-default",
    );

    render(
      <Addon name="Amazon Prime" state="inactive" testID="addon-test-id" />,
    );

    const addonElement = screen.getByTestId("addon-test-id");

    expect(addonElement).toHaveClass("is-inactive");
  });

  it("should not apply 'is-inactive' class when the state is not inactive", () => {
    (globalHooks.useGenerateClassNames as jest.Mock).mockReturnValue(
      "addon-size-default",
    );

    render(
      <Addon
        name="Amazon Prime"
        size="default"
        state="default"
        testID="addon-test-id"
      />,
    );

    const addonElement = screen.getByTestId("addon-test-id");

    // Check if the 'is-inactive' class is NOT added
    expect(addonElement).not.toHaveClass("is-inactive");
  });

  it("should pass the testID prop correctly", () => {
    (globalHooks.useGenerateClassNames as jest.Mock).mockReturnValue(
      "addon-size-default",
    );

    render(<Addon name="Amazon Prime" size="default" testID="addon-test-id" />);

    const addonElement = screen.getByTestId("addon-test-id");

    expect(addonElement).toHaveAttribute("data-testid", "addon-test-id");
  });

  it("should render the correct component based on the name", () => {
    (globalHooks.useGenerateClassNames as jest.Mock).mockReturnValue(
      "addon-size-default",
    );

    render(<Addon name="Amazon Prime" size="default" testID="addon-test-id" />);

    expect(addons["Amazon Prime"]).toBeDefined();
  });

  it("should render the Addon component for extra small size", () => {
    const name = "Amazon Prime";

    (globalHooks.useGenerateClassNames as jest.Mock).mockReturnValue(
      "addon-size-xs",
    );

    render(<Addon name={name} size="xs" testID="addon-test-id" />);

    expect(addonXsSm[name]).toBeDefined();

    const addonElement = screen.getByTestId("addon-test-id");
    expect(addonElement).toHaveClass("addon-size-xs");
  });
});
