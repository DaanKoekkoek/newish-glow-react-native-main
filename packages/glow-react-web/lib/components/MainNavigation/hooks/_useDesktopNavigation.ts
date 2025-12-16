import type { MainNavigationAdditions, PanelID } from "../MainNavigation.types";
import { useRef, useState, useCallback, useEffect } from "react";

/**
 * Timing constants
 * - HOVER_CLOSE_DELAY: wait this long after the mouse leaves before starting the closing animation.
 * - PANEL_REMOVAL_DELAY: how long the reverse animation runs before actually unmounting the panel.
 */
const HOVER_CLOSE_DELAY = 250;
const PANEL_REMOVAL_DELAY = 250;

export function useDesktopNavigation({
  searchOpen,
  routeKey,
}: {
  searchOpen?: boolean;
  routeKey?: MainNavigationAdditions["routeKey"];
}) {
  /** Refs to hold latest hover state for use inside timeouts */
  const isHoveringButtonRef = useRef(false);
  const isHoveringPanelRef = useRef(false);

  /** Ref to the active panel DOM node */
  const activePanelRef = useRef<HTMLDivElement>(null);

  /** Timeout IDs */
  const hoverCloseTimeout = useRef<number | null>(null);

  /** State */
  const [activePanelId, setActivePanelId] = useState<PanelID | null>(null);
  const [isClosingPending, setIsClosingPending] = useState(false); // signals reverse animation
  const [isHoveringButton, setIsHoveringButton] = useState(false);
  const [isHoveringPanel, setIsHoveringPanel] = useState(false);
  const [isPanelFocused, setIsPanelFocused] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  /** Derived state: panel is considered "open" if it exists and is not fully closing */
  const isPanelOpen =
    !!activePanelId &&
    (!isClosingPending ||
      isHoveringButton ||
      isHoveringPanel ||
      isPanelFocused);

  /** Keep refs in sync with hover state */
  useEffect(() => {
    isHoveringButtonRef.current = isHoveringButton;
  }, [isHoveringButton]);
  useEffect(() => {
    isHoveringPanelRef.current = isHoveringPanel;
  }, [isHoveringPanel]);

  /** Utility: clear hover close timeout */
  const clearHoverCloseTimeout = useCallback(() => {
    if (hoverCloseTimeout.current) {
      clearTimeout(hoverCloseTimeout.current);
      hoverCloseTimeout.current = null;
    }
  }, []);

  /** Open a panel */
  const openPanel = useCallback(
    (id: PanelID) => {
      clearHoverCloseTimeout();
      setIsClosingPending(false);
      setActivePanelId(id);
      setIsHoveringButton(true);
      setIsHoveringPanel(false);
    },
    [clearHoverCloseTimeout],
  );

  /** Start closing panel (used for Escape key or programmatically) */
  const initiatePanelClose = useCallback(() => {
    clearHoverCloseTimeout();
    setIsHoveringButton(false);
    setIsHoveringPanel(false);
    setIsClosingPending(true);
  }, [clearHoverCloseTimeout]);

  /** Mouse leave handlers: trigger closing sequence */
  const handleButtonMouseLeave = useCallback(() => {
    setIsHoveringButton(false);

    clearHoverCloseTimeout();

    // Wait HOVER_CLOSE_DELAY before starting closing animation
    hoverCloseTimeout.current = window.setTimeout(() => {
      setIsClosingPending(true); // panel starts reverse animation

      // Wait PANEL_REMOVAL_DELAY before actually removing panel from DOM
      setTimeout(() => {
        if (!isHoveringButtonRef.current && !isHoveringPanelRef.current) {
          setActivePanelId(null);
          setIsClosingPending(false);
        }
      }, PANEL_REMOVAL_DELAY);
    }, HOVER_CLOSE_DELAY);
  }, [clearHoverCloseTimeout]);

  const handlePanelMouseLeave = useCallback(() => {
    setIsHoveringPanel(false);

    clearHoverCloseTimeout();

    hoverCloseTimeout.current = window.setTimeout(() => {
      setIsClosingPending(true); // panel starts reverse animation

      setTimeout(() => {
        if (!isHoveringButtonRef.current && !isHoveringPanelRef.current) {
          setActivePanelId(null);
          setIsClosingPending(false);
        }
      }, PANEL_REMOVAL_DELAY);
    }, HOVER_CLOSE_DELAY);
  }, [clearHoverCloseTimeout]);

  /** Mouse enter / focus handlers: cancel closing sequence */
  const handlePanelMouseEnter = useCallback(() => {
    clearHoverCloseTimeout();
    setIsClosingPending(false);
    setIsHoveringPanel(true);
  }, [clearHoverCloseTimeout]);

  const handlePanelFocus = useCallback(() => {
    clearHoverCloseTimeout();
    setIsPanelFocused(true);
  }, [clearHoverCloseTimeout]);

  const handlePanelBlur = useCallback(() => {
    setIsPanelFocused(false);
    hoverCloseTimeout.current = window.setTimeout(() => {
      if (!isHoveringButtonRef.current && !isHoveringPanelRef.current) {
        setIsClosingPending(true);
        setActivePanelId(null);
      }
    }, HOVER_CLOSE_DELAY);
  }, []);

  /** Search panel */
  const openSearch = useCallback(() => {
    setIsPanelFocused(false);
    setActivePanelId("search");
    setIsClosingPending(true);
    setIsSearchOpen(true);
  }, []);

  const closeSearch = useCallback(() => {
    setIsSearchOpen(false);
    setActivePanelId(null);
  }, []);

  useEffect(() => {
    if (searchOpen === false) {
      closeSearch();
    }
  }, [searchOpen, closeSearch]);

  /** Escape key listener */
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        initiatePanelClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [initiatePanelClose]);

  useEffect(() => {
    if (routeKey === undefined) return;

    setActivePanelId(null);
    setIsClosingPending(false);
    setIsHoveringButton(false);
    setIsHoveringPanel(false);
    setIsPanelFocused(false);
    setIsSearchOpen(false);
    clearHoverCloseTimeout();
  }, [routeKey, clearHoverCloseTimeout]);

  return {
    activePanelId,
    activePanelRef,
    handleButtonMouseLeave,
    handleButtonMouseClick: openPanel,
    handlePanelBlur,
    handlePanelFocus,
    handlePanelMouseEnter,
    handlePanelMouseLeave,
    isPanelOpen,
    isSearchOpen,
    openSearch,
    closeSearch,
    openPanel,
  };
}
