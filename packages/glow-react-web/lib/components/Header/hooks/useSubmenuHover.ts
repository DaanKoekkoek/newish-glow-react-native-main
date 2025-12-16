import { useState, useCallback, useRef } from "react";
import { HeaderState } from "../Header.types";

interface UseSubmenuHoverOptions {
  headerState: HeaderState;
}

interface UseSubmenuHoverResult {
  activeMenuIndex: number | null;
  setActiveMenuIndex: React.Dispatch<React.SetStateAction<number | null>>;
  handleMenuHoverStart: (index: number) => void;
  handleMenuHoverEnd: () => void;
  handleSubmenuHover: (isHovered: boolean) => void;
  handleMenuTouch: (index: number, event: React.TouchEvent) => void;
  handleSubmenuTouch: () => void;
  isTouchDevice: boolean;
}

/**
 * Custom hook to manage submenu hover and touch functionality
 * Handles hover timing, submenu opening/closing, hover state, and touch interactions
 */
export const useSubmenuHover = ({
  headerState,
}: UseSubmenuHoverOptions): UseSubmenuHoverResult => {
  // State to track which menu button is active
  const [activeMenuIndex, setActiveMenuIndex] = useState<number | null>(null);

  // Use a ref for touch detection instead of state or window check to be SSR friendly
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const touchActiveRef = useRef<boolean>(false);

  // Refs for tracking hover timers and submenu hover state
  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);
  const closeTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isSubmenuHovered = useRef<boolean>(false);
  const outsideTouchListenerRef = useRef<((e: Event) => void) | null>(null);

  // Clear any pending timers
  const clearAllTimers = useCallback(() => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }

    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  // Function to handle menu button hover start
  const handleMenuHoverStart = useCallback(
    (index: number) => {
      // Skip hover handling if we've detected a touch device
      if (isTouchDevice) return;

      // Don't activate hover in search mode
      if (headerState === "search") return;

      clearAllTimers();

      // Set a new timer for 500ms delay
      hoverTimerRef.current = setTimeout(() => {
        setActiveMenuIndex(index);
      }, 500);
    },
    [headerState, isTouchDevice, clearAllTimers],
  );

  // Function to handle menu button hover end
  const handleMenuHoverEnd = useCallback(() => {
    // Skip hover handling if we've detected a touch device or touch is active
    if (isTouchDevice || touchActiveRef.current) return;

    // Don't deactivate in search mode
    if (headerState === "search") return;

    // Clear the timer if the hover ends before activation
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }

    // Only schedule deactivation if submenu is not hovered
    // Use a short delay to ensure the mouse has time to move to submenu
    setTimeout(() => {
      if (!isSubmenuHovered.current && !touchActiveRef.current) {
        closeTimerRef.current = setTimeout(() => {
          setActiveMenuIndex(null);
        }, 300);
      }
    }, 50);
  }, [headerState, isTouchDevice]);

  // Handler for submenu hover events
  const handleSubmenuHover = useCallback((isHovered: boolean) => {
    isSubmenuHovered.current = isHovered;

    // Don't close on mouse leave if touch is active
    if (!isHovered && touchActiveRef.current) return;

    // Clear the close timer immediately when submenu is hovered
    if (isHovered && closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    } else if (!isHovered && !touchActiveRef.current) {
      // When leaving submenu, add a small delay before closing
      // to handle potential mouseover jitter between menu and submenu
      closeTimerRef.current = setTimeout(() => {
        if (!isSubmenuHovered.current && !touchActiveRef.current) {
          setActiveMenuIndex(null);
        }
      }, 300);
    }
  }, []);

  // New handler specifically for submenu touch
  const handleSubmenuTouch = useCallback(() => {
    // Set touch device flag when submenu is touched
    // This is SSR safe because it only happens after a user interaction
    setIsTouchDevice(true);

    // Set touch as active to prevent any hover events from closing the menu
    touchActiveRef.current = true;

    // Clear any scheduled closing
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  // Safely remove any outside touch listeners
  const removeOutsideTouchListener = useCallback(() => {
    if (typeof document !== "undefined" && outsideTouchListenerRef.current) {
      document.removeEventListener(
        "touchstart",
        outsideTouchListenerRef.current,
      );
      outsideTouchListenerRef.current = null;
    }
  }, []);

  // Handler for touch events on menu items
  const handleMenuTouch = useCallback(
    (index: number, event: React.TouchEvent) => {
      // Always prevent default to avoid any browser side effects
      event.preventDefault();
      event.stopPropagation();

      // Set touch device flag - safe because it's triggered by a user event
      setIsTouchDevice(true);
      touchActiveRef.current = true;

      // Don't activate in search mode
      if (headerState === "search") return;

      clearAllTimers();

      // Toggle behavior - if same menu is touched, close it, otherwise open the new one
      setActiveMenuIndex((prevIndex) => {
        const newIndex = prevIndex === index ? null : index;

        // If we're closing the menu, reset touch active state
        if (newIndex === null) {
          touchActiveRef.current = false;
        }

        return newIndex;
      });

      // Only add touch listener in browser environment
      if (typeof document !== "undefined") {
        // Clean up any existing listener
        removeOutsideTouchListener();

        // Setup a document-level click handler to detect clicks outside the submenu
        outsideTouchListenerRef.current = (e: Event) => {
          if (!(e.target instanceof Node)) return;

          // Keep menu open if clicking within the submenu
          const submenu = document.querySelector(
            '[data-testid="header-submenu"]',
          );
          if (submenu && submenu.contains(e.target)) {
            return;
          }

          // Keep menu open if clicking the current menu button
          const button = document.querySelector(
            `[data-testid="menu-button-${index}"]`,
          );
          if (button && button.contains(e.target)) {
            return;
          }

          // Otherwise close the menu and reset touch state
          setActiveMenuIndex(null);
          touchActiveRef.current = false;

          // Clean up event listener
          removeOutsideTouchListener();
        };

        // Only add the document listener if we're opening a submenu
        if (activeMenuIndex !== index && index !== null) {
          // Use a small timeout to avoid the current touch triggering the handler
          setTimeout(() => {
            document.addEventListener(
              "touchstart",
              outsideTouchListenerRef.current!,
            );
          }, 100);
        }
      }
    },
    [headerState, clearAllTimers, removeOutsideTouchListener, activeMenuIndex],
  );

  return {
    activeMenuIndex,
    setActiveMenuIndex,
    handleMenuHoverStart,
    handleMenuHoverEnd,
    handleSubmenuHover,
    handleMenuTouch,
    handleSubmenuTouch,
    isTouchDevice,
  };
};
