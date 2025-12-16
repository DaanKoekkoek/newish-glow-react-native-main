import {
  useState,
  useEffect,
  useRef,
  useCallback,
  MutableRefObject,
} from "react";
import {
  SLIDE_PRESETS,
  GROW_PRESETS,
} from "_internals/Animation/Animation.configuration";
import type {
  BranchId,
  MainNavigationAdditions,
} from "../MainNavigation.types";

const SLIDE_ANIMATION: keyof typeof SLIDE_PRESETS = "gentle";
const GROW_ANIMATION: keyof typeof GROW_PRESETS = "gentle";

/** Mobile animation durations */
const slideDurationMs = SLIDE_PRESETS[SLIDE_ANIMATION].duration * 500; // slide animation in ms
const growDurationMs = GROW_PRESETS[GROW_ANIMATION].duration * 1000; // grow animation in ms

export function useMobileNavigation({
  externalControlsRef,
  searchOpen,
  routeKey,
}: {
  externalControlsRef?: React.ForwardedRef<HTMLDivElement>;
  searchOpen?: boolean;
  routeKey?: MainNavigationAdditions["routeKey"];
}) {
  /** Refs */
  const internalRef = useRef<HTMLDivElement>(null);

  const getControlsElement = (): HTMLDivElement | null => {
    if (!externalControlsRef) return internalRef.current;
    if (typeof externalControlsRef === "function") return internalRef.current;
    return (externalControlsRef as MutableRefObject<HTMLDivElement | null>)
      .current;
  };

  /** State */
  const [activeLevel, setActiveLevel] = useState(1);
  const [activeBranchId, setActiveBranchId] = useState<BranchId | null>(null);
  const [isClosingMenu, setIsClosingMenu] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [growOffsetTop, setGrowOffsetTop] = useState(0);

  /** Calculate top offset for grow animation */
  const calculateTopOffset = useCallback(() => {
    const el = getControlsElement();
    if (el) {
      const top = el.offsetTop + el.offsetHeight - 1;
      setGrowOffsetTop(top);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** Open a specific branch or return to top-level */
  const openBranch = useCallback(
    (branchId: BranchId | null) => {
      if (branchId !== null) {
        setGrowOffsetTop(0);
        setActiveLevel(2);
      } else {
        calculateTopOffset();
        setActiveLevel(1);
      }
      setActiveBranchId(branchId);
    },
    [calculateTopOffset],
  );

  /** Return to top-level branch after slide animation completes */
  const returnToTopLevel = useCallback(
    (onReset: () => void) => {
      calculateTopOffset();
      setActiveLevel(1);

      setTimeout(() => {
        onReset(); // cleanup or reset callback
      }, slideDurationMs);
    },
    [calculateTopOffset],
  );

  /** Toggle menu open/close with animation */
  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => {
      const next = !prev;

      if (next) {
        // Opening: calculate offsets
        calculateTopOffset();
      } else {
        // Closing: trigger reverse animation first
        setActiveLevel(1); // reset level immediately for animation
        setIsClosingMenu(true);

        // After grow animation duration, remove active branch
        setTimeout(() => {
          setActiveBranchId(null);
          setIsClosingMenu(false);
        }, growDurationMs);
      }

      return next;
    });
  }, [calculateTopOffset]);

  /** Search panel */
  const openSearch = useCallback(() => {
    setIsMenuOpen(false);
    setIsSearchOpen(true);
  }, []);

  const closeSearch = useCallback(() => {
    setIsSearchOpen(false);
  }, []);

  useEffect(() => {
    if (searchOpen === false) {
      closeSearch();
    }
  }, [searchOpen, closeSearch]);

  useEffect(() => {
    if (routeKey === undefined) return;

    setActiveLevel(1);
    setActiveBranchId(null);
    setIsClosingMenu(false);
    setIsMenuOpen(false);
    setIsSearchOpen(false);
    setGrowOffsetTop(0);
  }, [routeKey]);

  return {
    activeLevel,
    activeBranchId,
    growOffsetTop,
    isClosingMenu,
    isMenuOpen,
    isSearchOpen,
    openBranch,
    openSearch,
    closeSearch,
    returnToTopLevel,
    toggleMenu,
  };
}
