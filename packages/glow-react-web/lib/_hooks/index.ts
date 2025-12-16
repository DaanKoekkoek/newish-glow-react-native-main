import React, { Children, isValidElement, useCallback, useMemo } from "react";
import { type BreakpointKey, breakpointsArray } from "_theming/breakpoints";

export const usePropAcrossBreakpoints = <T>(
  prop: T | Partial<Record<BreakpointKey, T>>,
): Partial<Record<BreakpointKey, T>> => {
  return useMemo(() => {
    const mappedProp: Partial<Record<BreakpointKey, T>> =
      typeof prop === "object" && prop !== null
        ? (prop as Partial<Record<BreakpointKey, T>>)
        : (Object.fromEntries(
            breakpointsArray.map((bp) => [bp, prop]),
          ) as Partial<Record<BreakpointKey, T>>);

    const expandedProp = {} as Partial<Record<BreakpointKey, T>>;

    breakpointsArray.forEach((breakpoint: BreakpointKey, i: number) => {
      if (mappedProp[breakpoint] !== undefined) {
        expandedProp[breakpoint] = mappedProp[breakpoint];
      } else if (i > 0) {
        expandedProp[breakpoint] = expandedProp[breakpointsArray[i - 1]];
      }
    });

    return expandedProp;
  }, [prop]);
};

export const useGenerateClassNames = (
  styles: CSSModuleClasses,
  propValue:
    | boolean
    | string
    | number
    | { [key: string]: string | number | boolean },
  propName: string,
): string => {
  const sanitize = (value: string | number): string =>
    String(value).replace(/[%&/\\]/g, "-");

  if (typeof propValue === "boolean") {
    return propValue ? styles[propName] : "";
  } else if (typeof propValue === "string" || typeof propValue === "number") {
    const sanitizedValue = sanitize(propValue);
    return styles[`${propName}-${sanitizedValue}`] || "";
  } else if (typeof propValue === "object") {
    return Object.entries(propValue)
      .map(([breakpoint, value]) => {
        const kebabedBreakPoint =
          breakpoint === "mobileSmall" ? "mobile-small" : breakpoint;
        if (typeof value === "boolean") {
          return value
            ? styles[`${propName}-${kebabedBreakPoint}`]
            : styles[`${propName}-${kebabedBreakPoint}-reset`];
        } else {
          const sanitizedValue = sanitize(value);
          return (
            styles[`${propName}-${sanitizedValue}-${kebabedBreakPoint}`] || ""
          );
        }
      })
      .filter(Boolean)
      .join(" ");
  }
  return "";
};

type AllowedChild<P> = React.ReactElement<P, React.JSXElementConstructor<P>>;

/**
 * A custom hook to filter allowed children components from a list of children.
 *
 * @param children - The children to filter through.
 * @param allowedComponents - An array of allowed component types.
 * @returns - An array of allowed child components.
 */
export const useAllowedChildren = <P extends object>(
  children: React.ReactNode,
  allowedComponents: Array<React.ComponentType<P>>,
): AllowedChild<P>[] => {
  return useMemo(() => {
    if (!children || Children.count(children) === 0) {
      return [];
    }

    // Recursive function to filter allowed children
    const filterValidChildren = (child: React.ReactNode): AllowedChild<P>[] => {
      if (!isValidElement<P>(child)) {
        return [];
      }

      // Check if the child is one of the allowed components
      const isAllowedComponent = allowedComponents.some((component) => {
        return (
          child.type === component ||
          (typeof child.type === "function" &&
            (child.type as React.ComponentType<P>).displayName ===
              component.displayName)
        );
      });

      // If the child is allowed, return it
      if (isAllowedComponent) {
        return [child as AllowedChild<P>];
      }

      // Always check children recursively, even if not a Fragment
      const nestedChildren =
        child.props && "children" in child.props
          ? Children.toArray(child.props.children as React.ReactNode)
          : [];

      return nestedChildren.flatMap(filterValidChildren);
    };

    return Children.toArray(children).flatMap(filterValidChildren);
  }, [children, allowedComponents]);
};

/**
 * A custom hook to filter out specific components from the given children.
 *
 * @param children - The children elements to filter.
 * @param excludedComponents - An array of component types to exclude.
 * @returns - A filtered array of children excluding the specified components.
 */
export const useExcludeChildren = <P extends object>(
  children: React.ReactNode,
  excludedComponents: React.ComponentType<P>[],
) => {
  return useMemo(() => {
    const filteredChildren = Children.toArray(children).filter((child) => {
      if (!isValidElement(child)) {
        return true; // Keep non-element nodes (strings, numbers, etc.)
      }

      // Check if the child is an instance of one of the excluded components
      const isExcluded = excludedComponents.some(
        (excludedComponent) => child.type === excludedComponent,
      );

      // Only include the child if it is not one of the excluded components
      return !isExcluded;
    });

    return filteredChildren;
  }, [children, excludedComponents]);
};

// Check whether children of a component contains a specific component. Returns true if a match is found.
export const useContainsComponent = <T extends React.ElementType>(
  children: React.ReactNode,
  Component: T,
): boolean => {
  const checkContainsComponent = useCallback(
    (node: React.ReactNode): boolean => {
      return Children.toArray(node).some((child) => {
        if (isValidElement(child)) {
          if (child.type === Component) {
            return true;
          }

          // Recursively check whether child contains the target component.
          if (child.props?.children) {
            return checkContainsComponent(child.props.children);
          }
        }
        return false;
      });
    },
    [Component],
  );

  return useMemo(
    () => checkContainsComponent(children),
    [children, checkContainsComponent],
  );
};

// Merge multiple refs into one.
export function useMergeRefs<T>(
  ...refs: (React.Ref<T> | undefined)[]
): React.RefCallback<T> {
  return useCallback(
    (value: T) => {
      refs.forEach((ref) => {
        if (!ref) return;
        if (typeof ref === "function") {
          ref(value);
        } else {
          (ref as React.MutableRefObject<T | null>).current = value;
        }
      });
    },
    [refs],
  );
}
