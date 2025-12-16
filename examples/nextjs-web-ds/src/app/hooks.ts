"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";

import { routes, categorizeAutosuggestExamples } from "@/app/routes";

/**
 * Custom hook to read a persisted value from localStorage without setting it.
 * It also listens for changes to localStorage and re-runs when the value changes.
 * @param key The key for the localStorage item.
 * @param defaultValue The default value to return if the value isn't found in localStorage.
 * @returns The stored value or the default value.
 */
export function usePersistentStateReadOnly<T>(key: string, defaultValue: T): T {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") return defaultValue;
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : defaultValue;
    } catch {
      return defaultValue;
    }
  });

  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key === key) {
        try {
          setStoredValue(
            event.newValue ? JSON.parse(event.newValue) : defaultValue,
          );
        } catch {
          setStoredValue(defaultValue);
        }
      }
    };

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [key, defaultValue]);

  return storedValue;
}

/**
 * Custom hook to set and persist a value in localStorage.
 * This hook also notifies other hooks about the change via the `storage` event.
 * @param key The key for the localStorage item.
 * @param defaultValue The default value to return if no value is in localStorage.
 * @returns An array with the current state and a setter function to update the state.
 */
export function usePersistentState<T>(
  key: string,
  defaultValue: T,
): [T, (newState: T) => void] {
  const [state, setState] = useState<T>(() => {
    if (typeof window === "undefined") return defaultValue;
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : defaultValue;
    } catch {
      return defaultValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}

/**
 * Custom hook for managing footer navigation routing links.
 * It constructs an array of objects for each link, including a title and an `onClick` handler.
 * @returns Array of objects containing titles and links for different sections in the footer.
 */
export const useFooterRouting = () => {
  const router = useRouter();

  // Find the "shop" route and its sublinks
  const shopRoute = routes.find((r) => r.href === "/shop");
  const shopLinks =
    shopRoute?.sublinks?.map(({ label, href }) => ({
      title: label,
      as: "button",
      onClick: () => router.push(href),
    })) ?? [];

  // Find the "my" route and its sublinks
  const myRoute = routes.find((r) => r.href === "/my");
  const myLinks =
    myRoute?.sublinks?.map(({ title, href }) => ({
      title,
      as: "button",
      onClick: () => router.push(href),
    })) ?? [];

  // Find "components" route and filter for SSR or Client groups
  const componentLinks = routes
    .filter((r) => r.href === "/components")
    .flatMap((r) =>
      (r.groups ?? [])
        .filter((g) => g.key === "ssr" || g.key === "client")
        .map((group) => ({
          title: group.title,
          as: "button",
          onClick: () => router.push(group.href),
        })),
    );

  return [
    { title: "Shop", links: shopLinks },
    { title: "My", links: myLinks },
    { title: "Components", links: componentLinks },
  ]; // Return the structured footer links
};

/**
 * Custom hook for managing the main navigation routing.
 * It builds an array of objects for main navigation routes, each containing links and their associated `onClick` handlers.
 * @returns Array of objects for main navigation, including sublinks and actions.
 */
export const useMainNavRouting = () => {
  const router = useRouter();

  // Extract shop and my routes and their sublinks
  const shopRoute = routes.find((r) => r.href === "/shop");
  const shopRoutes = shopRoute?.sublinks ?? [];
  const myRoute = routes.find((r) => r.href === "/my");
  const myRoutes = myRoute?.sublinks ?? [];

  // Extract components routes with additional filtering
  const componentRoutes = routes
    .filter((r) => r.href === "/components")
    .flatMap((r) =>
      (r.groups ?? []).filter(
        (g): g is typeof g =>
          g !== undefined && (g.key === "ssr" || g.key === "client"),
      ),
    );

  // Safe mapping function for creating route links with onClick handlers
  const safeMap = (
    arr:
      | typeof routes
      | typeof componentRoutes
      | typeof myRoutes
      | typeof shopRoutes,
  ) =>
    arr.map(({ title, href }) => ({
      label: title ?? "Untitled", // Default to "Untitled" if title is missing
      onClick: (e?: React.MouseEvent) => {
        e?.preventDefault();
        if (href) router.push(href); // Push the route to the router
      },
    }));

  return [
    {
      id: 1,
      label: "Components",
      onClick: () => router.push("/components"),
      links: [
        {
          title: "Go to component overview page",
          label: "Component overview",
          onClick: () => router.push("/components"),
          sublinks: safeMap(componentRoutes), // Map component routes to sublinks
        },
      ],
    },
    {
      id: 2,
      label: "Shop",
      onClick: () => router.push("/shop"),
      links: [
        {
          label: "Shop overview",
          title: "Go to shop overview page",
          onClick: () => router.push("/shop"),
          sublinks: safeMap(shopRoutes), // Map shop routes to sublinks
        },
      ],
    },
    {
      id: 3,
      label: "My",
      onClick: () => router.push("/my"),
      links: [
        {
          label: "My overview",
          title: "Go to my overview page",
          onClick: () => router.push("/my"),
          sublinks: safeMap(myRoutes), // Map my routes to sublinks
        },
      ],
    },
  ]; // Return the main navigation structure
};

/**
 * Custom hook for managing autosuggest routing.
 * It manages the input value, search open state, and allows selection of an autosuggest item.
 * @returns Object containing autosuggest-related data, including event handlers and suggestions.
 */
export function useAutosuggestRouting() {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const [searchOpen, setSearchOpen] = useState<boolean | undefined>();

  // Handle input change for the search value
  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value); // Update the search value state
  }, []);

  // Handle selection of an autosuggest item
  const onSelect = useCallback(
    (item: { value: string; text: string }) => {
      setSearchValue(item.text); // Set the input value to the selected item's text
      router.push(item.value); // Navigate to the selected item's value
      setSearchOpen(false); // Close the search suggestions
      setTimeout(() => setSearchOpen(undefined), 1000); // Reset the searchOpen state after a short delay
    },
    [router],
  );

  // Handle closing the search input
  const onSearchClose = useCallback(() => {
    setSearchValue(""); // Clear the search value when the search closes
  }, []);

  return categorizeAutosuggestExamples({
    value: searchValue,
    open: searchOpen,
    onChange,
    onSelect,
    onSearchClose,
  }); // Return the formatted autosuggest examples based on the input
}
