// Extend jest with custom DOM matchers from testing-library
import "@testing-library/jest-dom";

// Extend jest with react-hooks testing utilities
import "@testing-library/react-hooks";

// Extend jest with axe accessibility testing matchers
import { toHaveNoViolations } from "jest-axe";

// Import custom mock for IntersectionObserver used in components
import { setupIntersectionObserverMock } from "./__mocks__/intersectionObserverMock";

// Mock IntersectionObserver globally before any tests run
beforeAll(() => {
  setupIntersectionObserverMock();
});

// Add the jest-axe matcher to Jest's expect API
expect.extend(toHaveNoViolations);

// Mock @floating-ui hooks to avoid actual DOM calculations in tests
jest.mock("@floating-ui/react-dom", () => {
  const actual = jest.requireActual("@floating-ui/react-dom");
  const refObject = { current: null };
  return {
    ...actual,
    useFloating: () => ({
      x: 0,
      y: 0,
      strategy: "absolute",
      middlewareData: {},
      placement: "bottom",
      isPositioned: true,
      update: jest.fn(),
      refs: {
        reference: refObject,
        floating: refObject,
        setReference: jest.fn(),
        setFloating: jest.fn(),
      },
      floatingStyles: {
        position: "absolute",
        top: "0px",
        left: "0px",
        transform: "translate(0px, 0px)",
      },
    }),
    useInteractions: () => ({
      getReferenceProps: () => ({}),
      getFloatingProps: () => ({}),
    }),
  };
});

// Patch react-dom's createPortal to just return the node directly in tests
jest.mock("react-dom", () => ({
  ...jest.requireActual("react-dom"),
  createPortal: (node: React.ReactNode) => node,
}));

// Mock uuid to return a predictable UUID string for easier snapshot testing
jest.mock("uuid", () => ({
  v4: () => "-mock-uuid",
}));

// Patch missing pointer capture methods for Radix and other libs using them in JSDOM
if (!HTMLElement.prototype.hasPointerCapture) {
  HTMLElement.prototype.hasPointerCapture = () => false;
}

if (!HTMLElement.prototype.releasePointerCapture) {
  HTMLElement.prototype.releasePointerCapture = () => {};
}

if (!HTMLElement.prototype.setPointerCapture) {
  HTMLElement.prototype.setPointerCapture = () => {};
}

// Mock scrollIntoView to avoid errors where it's called on JSDOM elements
if (!HTMLElement.prototype.scrollIntoView) {
  HTMLElement.prototype.scrollIntoView = jest.fn();
}

// Mock matchMedia, used by react-slick or components needing responsive behavior
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string): MediaQueryList => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Legacy API
    removeListener: jest.fn(), // Legacy API
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }),
});

// Mock global ResizeObserver used in some UI libraries (like popovers, sliders, etc.)
global.ResizeObserver = class ResizeObserver {
  callback: ResizeObserverCallback;
  constructor(callback: ResizeObserverCallback) {
    this.callback = callback;
  }
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Patch requestAnimationFrame to immediately schedule via setTimeout
global.requestAnimationFrame = (cb: FrameRequestCallback) => {
  return setTimeout(cb, 0);
};

// Patch cancelAnimationFrame to clear the timeout
global.cancelAnimationFrame = (id: number) => {
  clearTimeout(id);
};
