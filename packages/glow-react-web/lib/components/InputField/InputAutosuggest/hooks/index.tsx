import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import {
  useFloating,
  offset,
  flip,
  shift,
  autoUpdate,
  size,
} from "@floating-ui/react-dom";
import styles from "../InputFieldAutosuggest.module.scss";

export const useAutosuggestDropdown = (options: {
  ref?: React.ForwardedRef<HTMLDivElement> | React.RefObject<HTMLElement>;
  autoSuggestions: { text: string; category?: string; value: string }[];
  value?: string;
  fill?: boolean;
  variant?: string;
  customPortalRoot?: Element | null;
}) => {
  const { ref, autoSuggestions, value = "", fill = false } = options;

  const [showDropdown, setShowDropdown] = useState(false);
  const suggestionRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Determine the actual portal target element
  const getPortalTarget = () => {
    if (!ref) return null;

    if ("current" in ref) {
      return ref.current ?? null;
    }

    // For function refs, we cannot access .current, fallback will be null
    return null;
  };
  const portalTarget = getPortalTarget();

  const middleware = fill
    ? [
        size({
          apply({ elements }) {
            const referenceWidth =
              elements.reference.getBoundingClientRect().width;
            const fullWidth =
              typeof window !== "undefined"
                ? window.innerWidth
                : referenceWidth;

            Object.assign(elements.floating.style, {
              maxWidth: `${fullWidth}px`,
            });
          },
        }),
      ]
    : [
        offset(0),
        flip(),
        shift(),
        size({
          apply({ elements }) {
            const referenceWidth =
              elements.reference.getBoundingClientRect().width;

            Object.assign(elements.floating.style, {
              maxWidth: `${Math.max(0, referenceWidth)}px`,
            });
          },
        }),
      ];

  const { refs, floatingStyles, update } = useFloating({
    placement: "bottom-start",
    middleware,
    strategy: fill ? "fixed" : "absolute",
    whileElementsMounted: autoUpdate,
  });

  const adjustedFloatingStyles = useMemo(() => {
    if (!refs.reference.current) return floatingStyles;

    const rect = refs.reference.current.getBoundingClientRect();
    const offsetTop = 0;

    if (fill) {
      return {
        ...floatingStyles,
        top: rect.bottom + offsetTop,
        left: 0,
        right: 0,
        transform: undefined,
      };
    } else {
      return {
        ...floatingStyles,
        left: 0,
        transform: `translate(0px, ${
          floatingStyles.transform?.match(/,\s*([\d.]+)px\)/)?.[1] ?? "0"
        }px)`,
      };
    }
  }, [floatingStyles, refs.reference, fill]);

  const handleOpenDropdown = useCallback(() => {
    setShowDropdown((prev) => {
      if (prev) return prev;
      setTimeout(() => {
        try {
          update();
        } catch {
          /* ignore */
        }
      }, 0);
      return true;
    });
  }, [update]);

  const handleCloseDropdown = useCallback(() => {
    setShowDropdown(false);
  }, []);

  const matches = useMemo(() => {
    const q = (value ?? "").trim();
    if (!q || q.length < 2) return [];

    const v = q.toLowerCase();
    return autoSuggestions.filter((item) => {
      const t = (item.text ?? "").toLowerCase();
      const c = (item.category ?? "").toLowerCase();
      return t.includes(v) || c.includes(v);
    });
  }, [value, autoSuggestions]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleResize = () => handleCloseDropdown();
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, [handleCloseDropdown]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleClickOutside = (event: Event) => {
      const refEl = refs.reference.current;
      const floatingEl = refs.floating.current;

      const refNode =
        refEl && "contains" in refEl ? (refEl as unknown as HTMLElement) : null;

      if (
        refNode &&
        floatingEl &&
        event.target instanceof Node &&
        !refNode.contains(event.target) &&
        !floatingEl.contains(event.target)
      ) {
        handleCloseDropdown();
      }
    };

    document.addEventListener("mousedown", handleClickOutside, {
      passive: true,
    });
    document.addEventListener(
      "touchstart",
      handleClickOutside as EventListener,
      {
        passive: true,
      },
    );

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener(
        "touchstart",
        handleClickOutside as EventListener,
      );
    };
  }, [handleCloseDropdown, refs]);

  const highlightMatch = useCallback(
    (text: string | undefined, highlight: string | undefined) => {
      if (!text) return text ?? "";
      if (!highlight) return text;

      const query = highlight.trim();
      if (!query) return text;

      const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regex = new RegExp(`(${escaped})`, "gi");

      const parts = text.split(regex);
      if (parts.length === 1) return text;

      return parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <span key={i} className={styles["autosuggest-option-highlight"]}>
            {part}
          </span>
        ) : (
          part
        ),
      );
    },
    [],
  );

  return {
    showDropdown,
    setShowDropdown,
    handleOpenDropdown,
    handleCloseDropdown,
    refs,
    adjustedFloatingStyles,
    update,
    matches,
    highlightMatch,
    suggestionRefs,
    portalTarget,
  };
};
