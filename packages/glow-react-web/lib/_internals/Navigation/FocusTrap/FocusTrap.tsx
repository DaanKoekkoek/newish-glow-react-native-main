import React, { useRef, useEffect, useCallback } from "react";

type FocusTrapProps = {
  children: React.ReactNode;
  active?: boolean;
  focus?: "mount" | "arrowdown" | "none";
  returnFocusOnDeactivate?: boolean;
  onDeactivate?: () => void;
  onDeactivateOutside?: (e?: MouseEvent) => void;
  clickOutsideDeactivates?: boolean;
  enableArrowKeyNavigation?: boolean;
  closeOnEscape?: boolean;
  className?: string;
  testID?: string;
};

export const FocusTrap = ({
  children,
  active = false,
  focus = "none",
  returnFocusOnDeactivate = true,
  onDeactivate,
  onDeactivateOutside,
  clickOutsideDeactivates = false,
  enableArrowKeyNavigation = false,
  closeOnEscape = true,
  className,
  testID = "focus-trap",
}: FocusTrapProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedElement = useRef<HTMLElement | null>(null);
  const trapActivatedRef = useRef(false);

  /** Collect focusable elements within the trap */
  const getFocusableElements = useCallback(() => {
    return Array.from(
      containerRef.current?.querySelectorAll<HTMLElement>(
        "a, button, input, textarea, select, [tabindex]:not([tabindex='-1'])",
      ) || [],
    ).filter((el) => !el.hasAttribute("disabled"));
  }, []);

  /** Save previously focused element when activating */
  useEffect(() => {
    if (active) {
      previouslyFocusedElement.current = document.activeElement as HTMLElement;
    }
  }, [active]);

  /** Handle keyboard navigation */
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      // Activate trap when ArrowDown pressed
      if (
        focus === "arrowdown" &&
        !trapActivatedRef.current &&
        event.key === "ArrowDown"
      ) {
        trapActivatedRef.current = true;
        const focusables = getFocusableElements();
        if (focusables.length > 0) {
          event.preventDefault();
          focusables[0].focus();
        }
        return;
      }

      if (!trapActivatedRef.current) return;

      const focusables = getFocusableElements();
      if (focusables.length === 0) return;

      const currentIndex = focusables.indexOf(
        document.activeElement as HTMLElement,
      );

      // Tab trapping
      if (event.key === "Tab") {
        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }

      // Arrow navigation
      if (enableArrowKeyNavigation) {
        if (event.key === "ArrowDown") {
          event.preventDefault();
          const next = (currentIndex + 1) % focusables.length;
          focusables[next].focus();
        } else if (event.key === "ArrowUp") {
          event.preventDefault();
          const prev =
            (currentIndex - 1 + focusables.length) % focusables.length;
          focusables[prev].focus();
        }
      }

      // Escape closes trap
      if (event.key === "Escape" && closeOnEscape) {
        event.preventDefault();
        trapActivatedRef.current = false;
        onDeactivate?.();
        if (returnFocusOnDeactivate && previouslyFocusedElement.current) {
          previouslyFocusedElement.current.focus();
        }
      }
    },
    [
      focus,
      getFocusableElements,
      enableArrowKeyNavigation,
      closeOnEscape,
      onDeactivate,
      returnFocusOnDeactivate,
    ],
  );

  /** Handle outside click */
  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        clickOutsideDeactivates &&
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        trapActivatedRef.current = false;
        if (onDeactivateOutside) {
          onDeactivateOutside(event);
        } else {
          onDeactivate?.();
        }
        if (returnFocusOnDeactivate && previouslyFocusedElement.current) {
          previouslyFocusedElement.current.focus();
        }
      }
    },
    [
      clickOutsideDeactivates,
      onDeactivate,
      onDeactivateOutside,
      returnFocusOnDeactivate,
    ],
  );

  /** Attach key + click listeners when active */
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!active) return;

    const target = window;

    target.addEventListener("keydown", handleKeyDown, true);
    target.addEventListener("click", handleClickOutside, true);

    const container = containerRef.current;
    if (container) {
      container.tabIndex = -1; // ensure focusable container
      if (focus === "mount") {
        const focusables = getFocusableElements();
        if (focusables.length > 0) {
          focusables[0].focus();
          trapActivatedRef.current = true;
        } else {
          container.focus(); // fallback
        }
      }
    }

    return () => {
      target.removeEventListener("keydown", handleKeyDown, true);
      target.removeEventListener("click", handleClickOutside, true);
    };
  }, [active, focus, handleKeyDown, handleClickOutside, getFocusableElements]);

  return (
    <div
      ref={containerRef}
      data-testid={testID}
      className={className}
      tabIndex={-1}
    >
      {children}
    </div>
  );
};
