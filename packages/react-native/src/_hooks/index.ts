import { breakpointsArray, type BreakpointKeys } from "_theming/index";
import { useThemeProviderContext, resolveFontFamily } from "components/index";
import React, {
  useMemo,
  useState,
  useEffect,
  useCallback,
  isValidElement,
} from "react";
import type {
  NativeSyntheticEvent,
  TextInputChangeEventData,
  ImageSourcePropType,
} from "react-native";
import { Dimensions, Image } from "react-native";

// Automatically resolve and load the correct font family.
export const useFontFamily = (fontKey: string) => {
  const { brand } = useThemeProviderContext();
  return resolveFontFamily(fontKey, brand);
};

// Check whether children contains the component, or one of the components.
export const useAllowedChildren = (
  children: React.ReactNode,
  allowedComponents: React.ComponentType<any>[],
): React.ReactElement<any, string | React.JSXElementConstructor<any>>[] => {
  const filteredChildren = useMemo(() => {
    if (!children || React.Children.count(children) === 0) {
      return [];
    }

    // Helper function to filter children and their nested elements
    const filterValidChildren = (
      child: React.ReactNode,
    ): React.ReactElement<any, string | React.JSXElementConstructor<any>>[] => {
      if (!React.isValidElement(child)) {
        return []; // Exclude invalid elements like strings or numbers
      }

      // Check if the child is an allowed component
      const isAllowedComponent = allowedComponents.some((component) => {
        const validComponent = component as React.ComponentType<any>;
        return (
          child.type === validComponent ||
          (typeof child.type === "function" &&
            (child.type as React.ComponentType<any>).displayName ===
              validComponent.displayName)
        );
      });

      if (isAllowedComponent) {
        return [child]; // Return the allowed child as-is
      }

      if (child.type === React.Fragment) {
        const wrapperChildren = React.Children.toArray(child.props.children);
        return wrapperChildren.flatMap(filterValidChildren); // Recurse on children
      }

      // Exclude any non-allowed components
      return [];
    };

    // Start filtering the children and recursively handle any fragments or Storybook wrappers
    return React.Children.toArray(children).flatMap(filterValidChildren);
  }, [children, allowedComponents]);

  return filteredChildren;
};

// Handle shared (prop and internal) input events in sequence.
type InputEvents = [NativeSyntheticEvent<TextInputChangeEventData>];
export const useCompositeInputHandler = (
  propHandler: ((...args: InputEvents) => void) | undefined,
  internalHandler?: ((...args: InputEvents) => void) | undefined,
): ((...args: InputEvents) => void) => {
  return (...args: InputEvents) => {
    if (propHandler) {
      propHandler(...args);
    }
    if (internalHandler) {
      internalHandler(...args);
    }
  };
};

export const usePrefetchImage = (imageUrl?: string | ImageSourcePropType) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    if (!imageUrl) {
      setIsImageLoaded(false);
      return;
    }

    if (typeof imageUrl !== "string") {
      setIsImageLoaded(true);
      return;
    }

    const prefetchImage = async () => {
      try {
        const cachedImages = await Image.queryCache?.([imageUrl]);
        if (cachedImages && cachedImages[imageUrl]) {
          setIsImageLoaded(true);
        } else {
          await Image.prefetch(imageUrl);
          setIsImageLoaded(true);
        }
      } catch {
        setIsImageLoaded(false);
      }
    };

    prefetchImage();
  }, [imageUrl]);

  return isImageLoaded;
};

// Merge props together, duplicates in the subsequent argument will take presedence.
export const useMergeProps = <T extends Record<string, ValueType>, ValueType>(
  ...props: T[]
) => {
  return props.reduce((acc, prop) => {
    Object.keys(prop).forEach((key) => {
      const k = key as keyof T;
      acc[k] = prop[k];
    });
    return acc;
  }, {} as T);
};

// Uses React Native's Dimensions API to grab the window dimension.
export const useWindowDimensions = () => {
  return Dimensions.get("window");
};

// Spreads a singular property across all available breakpoints.
export const usePropAcrossBreakpoints = (
  prop: unknown,
): Record<BreakpointKeys, any> => {
  return useMemo(() => {
    /* Applies the prop value to the configured breakpoints.
     * The initial output is { mobileSmall: "center", tablet: "flex-end" }
     */
    const mappedProp: Record<BreakpointKeys, any> =
      typeof prop === "object" && prop !== null
        ? (prop as Record<BreakpointKeys, any>)
        : (Object.fromEntries(
            breakpointsArray.map((bp) => [bp, prop]),
          ) as Record<BreakpointKeys, any>);

    const expandedProp: Record<BreakpointKeys, any> = {} as Record<
      BreakpointKeys,
      any
    >;

    /* Applies the prop value to the remaining breakpoints
     * The final output is { mobileSmall: "center", mobile: "center", tablet: "flex-end", laptop: "flex-end", desktop: "flex-end" }
     */
    breakpointsArray.forEach((breakpoint: BreakpointKeys, i: number) => {
      if (mappedProp[breakpoint] !== undefined) {
        expandedProp[breakpoint] = mappedProp[breakpoint];
      } else if (i > 0) {
        expandedProp[breakpoint] = expandedProp[breakpointsArray[i - 1]];
      }
    });

    return expandedProp;
  }, [prop]);
};

// Check whether children of a component contains a specific component. Returns true if a match is found.
export const useContainsComponent = <T extends React.ElementType>(
  children: React.ReactNode,
  Component: T,
): boolean => {
  const checkContainsComponent = useCallback(
    (node: React.ReactNode): boolean => {
      return React.Children.toArray(node).some((child) => {
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
