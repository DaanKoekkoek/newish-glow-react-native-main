import { useState, useEffect, useRef } from "react";

export const useAccordionState = (
  initialActive: number[] = [],
  multiple: boolean,
) => {
  const [activePanels, setActivePanels] =
    useState<Array<number>>(initialActive);
  const togglePanel = (id: number) => {
    if (multiple) {
      setActivePanels((prev) =>
        prev.includes(id)
          ? // Remove this id if present
            prev.filter((x) => x !== id)
          : // Add this id if not present
            [...prev, id],
      );
    } else {
      setActivePanels((prev) => (prev.includes(id) ? [] : [id]));
    }
  };
  return { activePanels, togglePanel };
};

export const useDelayedUnmount = (isActive: boolean, delay: number) => {
  const [shouldRender, setShouldRender] = useState(isActive);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isActive) {
      setShouldRender(true);
      if (timerRef.current) clearTimeout(timerRef.current);
    } else {
      timerRef.current = setTimeout(() => setShouldRender(false), delay);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isActive, delay]);

  return shouldRender;
};
