import { renderHook } from "_test-utils";

import { usePropAcrossBreakpoints } from "./index";

describe("index.tsx", () => {
  it("converts various types of values into an object with values for all breakpoints", () => {
    const testCases = [
      {
        input: {
          mobileSmall: 6,
          tablet: 10,
        },
        expected: {
          mobileSmall: 6,
          mobile: 6,
          tablet: 10,
          laptop: 10,
          desktop: 10,
        },
      },
      {
        input: "center",
        expected: {
          mobileSmall: "center",
          mobile: "center",
          tablet: "center",
          laptop: "center",
          desktop: "center",
        },
      },
      {
        input: {
          mobileSmall: true,
          desktop: false,
        },
        expected: {
          mobileSmall: true,
          mobile: true,
          laptop: true,
          tablet: true,
          desktop: false,
        },
      },
    ];

    testCases.forEach(({ input, expected }) => {
      const { result } = renderHook(() => usePropAcrossBreakpoints(input));
      expect(result.current).toEqual(expected);
    });
  });
});
