import { renderHook } from "@testing-library/react-hooks";
import {
  usePropAcrossBreakpoints,
  useGenerateClassNames,
  useAllowedChildren,
  useExcludeChildren,
  useContainsComponent,
} from "./index";
import { PropsWithChildren } from "react";

jest.mock("../_theming/breakpoints", () => ({
  breakpointsArray: ["mobileSmall", "mobile", "tablet", "laptop", "desktop"],
}));

describe("usePropAcrossBreakpoints", () => {
  it("should return the same value for all breakpoints when prop is a single value", () => {
    const { result } = renderHook(() => usePropAcrossBreakpoints("value"));
    expect(result.current).toEqual({
      mobileSmall: "value",
      mobile: "value",
      tablet: "value",
      laptop: "value",
      desktop: "value",
    });
  });

  it("should return the correct values for each breakpoint when prop is an object", () => {
    const prop = {
      mobileSmall: "small",
      tablet: "medium",
      desktop: "large",
    };
    const { result } = renderHook(() => usePropAcrossBreakpoints(prop));
    expect(result.current).toEqual({
      mobileSmall: "small",
      mobile: "small",
      tablet: "medium",
      laptop: "medium",
      desktop: "large",
    });
  });

  it("should fill in missing breakpoint values with the nearest previous value", () => {
    const prop = {
      mobileSmall: "small",
      desktop: "large",
    };
    const { result } = renderHook(() => usePropAcrossBreakpoints(prop));
    expect(result.current).toEqual({
      mobileSmall: "small",
      mobile: "small",
      tablet: "small",
      laptop: "small",
      desktop: "large",
    });
  });
});

describe("useGenerateClassNames", () => {
  const mockStyles = {
    direction: "direction",
    "direction-row": "direction-row",
    "direction-column": "direction-column",
    "direction-row-tablet": "direction-row-tablet",
    "direction-column-mobile-small": "direction-column-mobile-small",
    "grow-tablet": "grow-tablet",
    "grow-desktop": "grow-desktop",
  };

  it("should return the correct class name for a boolean propValue", () => {
    const { result } = renderHook(() =>
      useGenerateClassNames(mockStyles, true, "direction"),
    );
    expect(result.current).toBe("direction");
  });

  it("should return an empty string for a false boolean propValue", () => {
    const { result } = renderHook(() =>
      useGenerateClassNames(mockStyles, false, "direction"),
    );
    expect(result.current).toBe("");
  });

  it("should return the correct class name for a string propValue", () => {
    const { result } = renderHook(() =>
      useGenerateClassNames(mockStyles, "row", "direction"),
    );
    expect(result.current).toBe("direction-row");
  });

  it("should return the correct class names for an object propValue with string values", () => {
    const propValue = {
      tablet: "row",
      mobileSmall: "column",
    };
    const { result } = renderHook(() =>
      useGenerateClassNames(mockStyles, propValue, "direction"),
    );
    expect(result.current).toBe(
      "direction-row-tablet direction-column-mobile-small",
    );
  });

  it("should return the correct class names for an object propValue with boolean values", () => {
    const propValue = {
      tablet: true,
      desktop: false,
    };
    const { result } = renderHook(() =>
      useGenerateClassNames(mockStyles, propValue, "grow"),
    );
    expect(result.current).toBe("grow-tablet");
  });
});

const AllowedComponent: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => <div>{children}</div>;
AllowedComponent.displayName = "AllowedComponent";

const AnotherAllowed: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => <span>{children}</span>;
AnotherAllowed.displayName = "AnotherAllowed";

const DisallowedComponent = () => <p>Not allowed</p>;

describe("useAllowedChildren", () => {
  it("returns an empty array when children is null", () => {
    const { result } = renderHook(() =>
      useAllowedChildren(null, [AllowedComponent]),
    );
    expect(result.current).toEqual([]);
  });

  it("returns an empty array when no allowed components are present", () => {
    const { result } = renderHook(() =>
      useAllowedChildren(<DisallowedComponent />, [AllowedComponent]),
    );
    expect(result.current).toEqual([]);
  });

  it("allows only specified components", () => {
    const { result } = renderHook(() =>
      useAllowedChildren(
        <>
          <AllowedComponent>Allowed</AllowedComponent>
          <DisallowedComponent />
        </>,
        [AllowedComponent],
      ),
    );
    expect(result.current).toHaveLength(1);
    expect(result.current[0].type).toBe(AllowedComponent);
  });

  it("allows multiple specified components", () => {
    const { result } = renderHook(() =>
      useAllowedChildren(
        <>
          <AllowedComponent>Allowed</AllowedComponent>
          <AnotherAllowed>Also Allowed</AnotherAllowed>
          <DisallowedComponent />
        </>,
        [AllowedComponent, AnotherAllowed],
      ),
    );
    expect(result.current).toHaveLength(2);
    expect(result.current[0].type).toBe(AllowedComponent);
    expect(result.current[1].type).toBe(AnotherAllowed);
  });

  it("filters nested children", () => {
    const { result } = renderHook(() =>
      useAllowedChildren(
        <AllowedComponent>
          <AnotherAllowed>Nested</AnotherAllowed>
        </AllowedComponent>,
        [AnotherAllowed],
      ),
    );
    expect(result.current).toHaveLength(1);
    expect(result.current[0].type).toBe(AnotherAllowed);
  });

  it("flattens fragments and filters children inside them", () => {
    const { result } = renderHook(() =>
      useAllowedChildren(
        <>
          <AllowedComponent />
          <DisallowedComponent />
        </>,
        [AllowedComponent],
      ),
    );
    expect(result.current).toHaveLength(1);
    expect(result.current[0].type).toBe(AllowedComponent);
  });

  it("matches components by displayName", () => {
    AllowedComponent.displayName = "AllowedComponent";
    const CustomAllowed = () => <div />;
    CustomAllowed.displayName = "AllowedComponent";

    const { result } = renderHook(() =>
      useAllowedChildren(<CustomAllowed />, [AllowedComponent]),
    );
    expect(result.current).toHaveLength(1);
    expect(result.current[0].type).toBe(CustomAllowed);
  });
});

const DummyComponent = () => <div>Dummy</div>;
const StickyBarActionButton = () => <button>ActionButton</button>;
const AnotherComponent = () => <span>Another Component</span>;
describe("useExcludeChildren", () => {
  it("should exclude the specified component from children", () => {
    const children = [
      <DummyComponent key="1" />,
      <StickyBarActionButton key="2" />,
      <AnotherComponent key="3" />,
    ];

    const { result } = renderHook(() =>
      useExcludeChildren(children, [StickyBarActionButton]),
    );

    // Ensure that StickyBarActionButton is excluded
    expect(result.current).toHaveLength(2);
    expect((result.current[0] as React.ReactElement).type).toBe(DummyComponent);
    expect((result.current[1] as React.ReactElement).type).toBe(
      AnotherComponent,
    );
  });

  it("should include components that are not excluded", () => {
    const children = [
      <DummyComponent key="1" />,
      <StickyBarActionButton key="2" />,
      <AnotherComponent key="3" />,
    ];

    const { result } = renderHook(() =>
      useExcludeChildren(children, [AnotherComponent]),
    );

    // Ensure that AnotherComponent is excluded but others are included
    expect(result.current).toHaveLength(2);
    expect((result.current[0] as React.ReactElement).type).toBe(DummyComponent);
    expect((result.current[1] as React.ReactElement).type).toBe(
      StickyBarActionButton,
    );
  });

  it("should return all children if no component is excluded", () => {
    const children = [
      <DummyComponent key="1" />,
      <StickyBarActionButton key="2" />,
      <AnotherComponent key="3" />,
    ];

    const { result } = renderHook(() => useExcludeChildren(children, []));

    // No exclusions should result in all children being included
    expect(result.current).toHaveLength(3);
    expect((result.current[0] as React.ReactElement).type).toBe(DummyComponent);
    expect((result.current[1] as React.ReactElement).type).toBe(
      StickyBarActionButton,
    );
    expect((result.current[2] as React.ReactElement).type).toBe(
      AnotherComponent,
    );
  });

  it("should return empty array if all children are excluded", () => {
    const children = [
      <DummyComponent key="1" />,
      <StickyBarActionButton key="2" />,
      <AnotherComponent key="3" />,
    ];

    const { result } = renderHook(() =>
      useExcludeChildren(children, [StickyBarActionButton, AnotherComponent]),
    );

    expect(result.current).toHaveLength(1); // Only DummyComponent should remain
    expect((result.current[0] as React.ReactElement).type).toBe(DummyComponent);
  });

  it("should handle non-element nodes (strings, numbers, etc.) correctly", () => {
    const children = [
      "Some text",
      <StickyBarActionButton key="1" />,
      123,
      <AnotherComponent key="2" />,
    ];

    const { result } = renderHook(() =>
      useExcludeChildren(children, [StickyBarActionButton]),
    );

    expect(result.current).toHaveLength(3);
    expect(result.current[0]).toBe("Some text");
    expect(result.current[1]).toBe(123);
    expect((result.current[2] as React.ReactElement).type).toBe(
      AnotherComponent,
    );
  });
});

describe("Global Hooks", () => {
  describe("usePropAcrossBreakpoints", () => {
    it("should return the same value for all breakpoints when prop is a single value", () => {
      const { result } = renderHook(() => usePropAcrossBreakpoints("value"));
      expect(result.current).toEqual({
        mobileSmall: "value",
        mobile: "value",
        tablet: "value",
        laptop: "value",
        desktop: "value",
      });
    });

    it("should return the correct values for each breakpoint when prop is an object", () => {
      const prop = {
        mobileSmall: "small",
        tablet: "medium",
        desktop: "large",
      };
      const { result } = renderHook(() => usePropAcrossBreakpoints(prop));
      expect(result.current).toEqual({
        mobileSmall: "small",
        mobile: "small",
        tablet: "medium",
        laptop: "medium",
        desktop: "large",
      });
    });

    it("should fill in missing breakpoint values with the nearest previous value", () => {
      const prop = {
        mobileSmall: "small",
        desktop: "large",
      };
      const { result } = renderHook(() => usePropAcrossBreakpoints(prop));
      expect(result.current).toEqual({
        mobileSmall: "small",
        mobile: "small",
        tablet: "small",
        laptop: "small",
        desktop: "large",
      });
    });
  });

  describe("useGenerateClassNames", () => {
    const mockStyles = {
      direction: "direction",
      "direction-row": "direction-row",
      "direction-column": "direction-column",
      "direction-row-tablet": "direction-row-tablet",
      "direction-column-mobile-small": "direction-column-mobile-small",
      "grow-tablet": "grow-tablet",
      "grow-desktop": "grow-desktop",
    };

    it("should return the correct class name for a boolean propValue", () => {
      const { result } = renderHook(() =>
        useGenerateClassNames(mockStyles, true, "direction"),
      );
      expect(result.current).toBe("direction");
    });

    it("should return an empty string for a false boolean propValue", () => {
      const { result } = renderHook(() =>
        useGenerateClassNames(mockStyles, false, "direction"),
      );
      expect(result.current).toBe("");
    });

    it("should return the correct class name for a string propValue", () => {
      const { result } = renderHook(() =>
        useGenerateClassNames(mockStyles, "row", "direction"),
      );
      expect(result.current).toBe("direction-row");
    });

    it("should return the correct class names for an object propValue with string values", () => {
      const propValue = {
        tablet: "row",
        mobileSmall: "column",
      };
      const { result } = renderHook(() =>
        useGenerateClassNames(mockStyles, propValue, "direction"),
      );
      expect(result.current).toBe(
        "direction-row-tablet direction-column-mobile-small",
      );
    });

    it("should return the correct class names for an object propValue with boolean values", () => {
      const propValue = {
        tablet: true,
        desktop: false,
      };
      const { result } = renderHook(() =>
        useGenerateClassNames(mockStyles, propValue, "grow"),
      );
      expect(result.current).toBe("grow-tablet");
    });
  });

  describe("useContainsComponent", () => {
    const FooComponent = () => <div>Foo</div>;
    const BarComponent = () => <div>Bar</div>;
    const DepthComponent = (props: PropsWithChildren) => (
      <div>
        <h1>Test</h1>
        <section>{props.children}</section>
      </div>
    );

    it("should return true if children contain the specified component", () => {
      const { result } = renderHook(() =>
        useContainsComponent(<FooComponent />, FooComponent),
      );
      expect(result.current).toBe(true);
    });

    it("should return false if children do not contain the specified component", () => {
      const { result } = renderHook(() =>
        useContainsComponent(<FooComponent />, BarComponent),
      );
      expect(result.current).toBe(false);
    });

    it("should return true if children contain the specified component at any depth", () => {
      const { result } = renderHook(() =>
        useContainsComponent(
          <DepthComponent>
            <FooComponent />
          </DepthComponent>,
          FooComponent,
        ),
      );
      expect(result.current).toBe(true);
    });

    it("should return false if children do not contain the specified component at any depth", () => {
      const { result } = renderHook(() =>
        useContainsComponent(
          <DepthComponent>
            <BarComponent />
          </DepthComponent>,
          FooComponent,
        ),
      );
      expect(result.current).toBe(false);
    });
  });
});
