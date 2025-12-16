import React from "react";
import { Stack, type StackProps } from "foundations/Stack";
import { Heading, type HeadingRenderType } from "foundations/Heading";

/**
 * A single possible value for a variant prop.
 */
type VariantValue =
  | string
  | number
  | boolean
  | React.ReactNode
  | ((args: any) => any)
  | object
  | undefined;

/**
 * A record of variant keys and their values or possible values (as arrays).
 */
type VariantRecord = Record<string, VariantValue | VariantValue[]>;

/**
 * Options for rendering cartesian variants.
 * - `groupBy`: One or more functions that map props → string labels,
 *   used to group the rendered variants.
 */
type RenderCartesianVariantsOptions<T extends object> = StackProps & {
  groupBy?: ((props: T) => string) | Array<(props: T) => string>;
};

/**
 * A leaf group containing the final items (no further subgroups).
 */
type GroupLeaf<T> = {
  type: "leaf";
  items: Array<{ props: T; idx: number }>;
};

/**
 * A node group containing subgroups keyed by label.
 */
type GroupNode<T> = {
  type: "node";
  groups: Record<string, Group<T>>;
};

/**
 * Function signature for rendering a variant.
 *
 * - Receives the variant props (`T`) and its global index.
 * - Should return a React node to render.
 * - Allows either rendering the component directly, or using the index
 *   for custom logic (e.g., generating labels or keys).
 */
type RenderFn<T> = (props: T, idx: number) => React.ReactNode;

/**
 * Recursive group structure that can be either:
 * - a leaf with items, or
 * - a node with nested subgroups.
 */
type Group<T> = GroupLeaf<T> | GroupNode<T>;

/**
 * Expands a "loopable props" object into a full cartesian product
 * of all possible combinations.
 *
 * Example:
 *   expandVariants({ type: ["a", "b"], size: ["sm", "lg"] })
 *   → [
 *       { type: "a", size: "sm" },
 *       { type: "a", size: "lg" },
 *       { type: "b", size: "sm" },
 *       { type: "b", size: "lg" },
 *     ]
 */
function expandVariants(base: VariantRecord): VariantRecord[] {
  const entries = Object.entries(base);

  const loop = (i: number, acc: VariantRecord): VariantRecord[] => {
    if (i >= entries.length) return [acc];

    const [key, value] = entries[i];

    if (Array.isArray(value)) {
      return value.flatMap((v) => loop(i + 1, { ...acc, [key]: v }));
    }

    return loop(i + 1, { ...acc, [key]: value });
  };

  return loop(0, {});
}

/**
 * Recursively groups items based on one or more grouping functions.
 *
 * - Each function in `groupFns` defines one level of grouping.
 * - If no functions remain, we return a leaf node with the items.
 */
function groupVariants<T>(
  items: Array<{ props: T; idx: number }>,
  groupFns: Array<(props: T) => string>,
  level = 0,
): Group<T> {
  if (level >= groupFns.length) {
    return { type: "leaf", items };
  }

  const fn = groupFns[level];
  const groups: Record<string, Array<{ props: T; idx: number }>> = {};

  items.forEach((item) => {
    const label = fn(item.props);
    if (!groups[label]) groups[label] = [];
    groups[label].push(item);
  });

  const result: Record<string, Group<T>> = {};
  for (const key in groups) {
    result[key] = groupVariants(groups[key], groupFns, level + 1);
  }

  return { type: "node", groups: result };
}

/**
 * Renders grouped variants recursively.
 *
 * - Leaf groups render the actual components in a row.
 * - Node groups render a heading and recurse into subgroups.
 */
function renderGroups<T extends object & StackProps>(
  groups: Group<T>,
  Component: React.ComponentType<T> | RenderFn<T>, // allow both here
  kb: (props: T, idx: number) => string,
  level = 0,
): React.ReactNode {
  if (groups.type === "leaf") {
    return (
      <Stack direction="row" wrap="wrap">
        {groups.items.map(({ props, idx }) => {
          const key = kb(props, idx);

          if (
            typeof Component === "function" &&
            !(Component as any).propTypes
          ) {
            // Treat as render function
            return (
              <React.Fragment key={key}>
                {(Component as RenderFn<T>)(props, idx)}
              </React.Fragment>
            );
          }

          // Treat as React component type
          const Comp = Component as React.ComponentType<T>;
          return <Comp key={key} {...props} />;
        })}
      </Stack>
    );
  }

  const headingSizes = ["md", "sm", "xs"] as const;
  const headingSize = headingSizes[Math.min(level, headingSizes.length - 1)];

  return Object.entries(groups.groups).map(([label, sub]) => (
    <Stack gap="sm" key={`${label}-${level}`}>
      <Heading
        as={`h${Math.min(level + 2, 6)}` as HeadingRenderType}
        size={headingSize}
      >
        {label}
      </Heading>
      {renderGroups(sub, Component, kb, level + 1)}
    </Stack>
  ));
}

/**
 * Renders a list of component variants (cartesian expansion).
 *
 * - Accepts either:
 *   - an array of fully-formed props, OR
 *   - a "loopable props" object (expanded cartesian product).
 *
 * - Groups variants via `options.groupBy`:
 *   - single function → flat groups
 *     e.g. `{ groupBy: props => \`Type: ${props.type}\` }`
 *   - array of functions → nested subgroups
 *     e.g. `{ groupBy: [props => \`Type: ${props.type}\`, props => \`Size: ${props.size}\`] }`
 *
 * - If you don't supply a `keyBuilder`, a default one concatenates primitive props.
 * - Uses a global index for keys and accepts an optional `keyBuilder`.
 * - You can pass a component type directly (it will receive the props),
 *   or a render function `(props, idx) => ReactNode` if you need access
 *   to the index of the variant.
 */
export function renderCartesianVariants<T extends object & StackProps>(
  Component: React.ComponentType<T> | RenderFn<T>,
  variants: T[] | VariantRecord,
  options?: RenderCartesianVariantsOptions<T>,
  keyBuilder?: (variant: T, index: number) => string,
) {
  const expanded = Array.isArray(variants)
    ? (variants as T[])
    : (expandVariants(variants) as T[]);

  const defaultKeyBuilder = (props: T, index: number) => {
    const parts: string[] = [];
    Object.entries(props as Record<string, unknown>).forEach(([k, v]) => {
      if (v === undefined) return;
      if (["string", "number", "boolean"].includes(typeof v)) {
        parts.push(`${k}:${String(v)}`);
      }
    });
    return parts.length ? parts.join("|") : `variant-${index}`;
  };

  const kb = keyBuilder ?? defaultKeyBuilder;

  const defaultGroupBy = (props: T) => {
    const labelParts: string[] = [];
    Object.entries(props as Record<string, unknown>).forEach(([k, v]) => {
      if (v === undefined) return;
      if (["string", "number", "boolean"].includes(typeof v)) {
        labelParts.push(`${k}: ${String(v)}`);
      }
    });
    return labelParts.join(", ") || "All Variants";
  };

  const { groupBy } = options ?? {};
  const groupFns = Array.isArray(groupBy)
    ? groupBy
    : groupBy
      ? [groupBy]
      : [defaultGroupBy];

  const grouped = groupVariants(
    expanded.map((props, idx) => ({ props, idx })),
    groupFns,
  );

  return <Stack>{renderGroups(grouped, Component, kb)}</Stack>;
}
