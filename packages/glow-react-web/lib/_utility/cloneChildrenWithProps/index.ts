import { Children, ReactNode, isValidElement, cloneElement } from "react";

/**
 * Recursively clones a React node and its children, applying the given props
 * to every valid React element in the tree.
 *
 * Note: This approach does **not** work reliably in Next.js due to limitations
 * with server-side rendering and React internals. It is recommended to use
 * this function only in Storybook or client-only environments.
 *
 * @template P - The type of props to apply to each React element.
 * @param {ReactNode} node - The React node (element, fragment, text, etc.) to clone.
 * @param {P} props - An object containing props to add or override on each React element.
 * @returns {ReactNode} - A new React node tree with the specified props applied to all elements.
 *
 * @example
 * ```tsx
 * const newTree = cloneChildrenWithProps(originalTree, { disabled: true });
 * ```
 */
export function cloneChildrenWithProps<P extends Record<string, unknown>>(
  node: ReactNode,
  props: P,
): ReactNode {
  if (!isValidElement(node)) return node;

  const children = node.props.children
    ? Children.map(node.props.children, (child) =>
        cloneChildrenWithProps(child, props),
      )
    : node.props.children;

  return cloneElement(node, props, children);
}
