export const observerMap = new Map<Element, IntersectionObserverCallback>();

export function setupIntersectionObserverMock() {
  class MockIntersectionObserver implements IntersectionObserver {
    constructor(private callback: IntersectionObserverCallback) {}

    observe = (element: Element) => {
      observerMap.set(element, this.callback);

      // Auto-trigger as intersecting.
      // Delay is required due to mock firing too early.
      requestAnimationFrame(() => {
        this.callback(
          [
            {
              target: element,
              isIntersecting: true,
              intersectionRatio: 1,
              boundingClientRect: {} as DOMRectReadOnly,
              intersectionRect: {} as DOMRectReadOnly,
              rootBounds: null,
              time: Date.now(),
            },
          ],
          this as IntersectionObserver,
        );
      });
    };

    unobserve = (element: Element) => {
      observerMap.delete(element);
    };

    disconnect = () => {
      observerMap.clear();
    };

    takeRecords = () => [];

    readonly root = null;
    readonly rootMargin = "";
    readonly thresholds = [];
  }

  Object.defineProperty(window, "IntersectionObserver", {
    writable: true,
    configurable: true,
    value: MockIntersectionObserver,
  });

  Object.defineProperty(global, "IntersectionObserver", {
    writable: true,
    configurable: true,
    value: MockIntersectionObserver,
  });
}
