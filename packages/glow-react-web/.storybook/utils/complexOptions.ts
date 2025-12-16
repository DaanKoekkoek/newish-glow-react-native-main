/**
 * Creates a Storybook control configuration for selecting between complex (non-primitive) values.
 *
 * Storybook controls like "radio" or "select" typically support only primitive values (e.g., strings, numbers).
 * This utility enables those controls to work with complex data structures by mapping them to string keys.
 *
 * @param options - An array of options, each with a `label`, a `value` (any type), and an optional `key`.
 * @param controlType - The type of control to render in Storybook ("radio" or "select"). Defaults to "radio".
 * @returns A control configuration compatible with Storybook’s `argTypes`, allowing object selection via UI.
 *
 * @example
 * createComplexControl([
 *   { label: "Light Red", value: { theme: "red", mode: "light" } },
 *   { label: "Dark Red", value: { theme: "red", mode: "dark" } },
 * ])
 */

export type ComplexOption<T> = {
  label: string;
  value: T;
  key?: string;
};

export function createComplexControl<T>(
  options: ComplexOption<T>[],
  controlType: "select" | "radio" = "radio",
) {
  const resolved = options.map((opt, index) => ({
    key: opt.key ?? `option-${index}`,
    label: opt.label,
    value: opt.value,
  }));

  return {
    options: resolved.map((o) => o.key),
    mapping: resolved.reduce(
      (acc, cur) => {
        acc[cur.key] = cur.value;
        return acc;
      },
      {} as Record<string, T>,
    ),
    control: {
      type: controlType,
      labels: resolved.reduce(
        (acc, cur) => {
          acc[cur.key] = cur.label;
          return acc;
        },
        {} as Record<string, string>,
      ),
    },
  };
}

/**
 * Generates a Storybook complex control with multiple options,
 * each option containing an array of values of type T.
 *
 * @param optionCount - The number of distinct options to generate.
 * @param itemCountBuilder - A function that returns the number of items in each option,
 *                           given the option's index.
 * @param valueItemBuilder - A function that builds an individual value of type T,
 *                           given the option index and the item index within that option.
 * @param controlType - The type of Storybook control to create ("select" or "radio"). Defaults to "radio".
 *
 * @returns An object containing:
 *   - options: An array of ComplexOption arrays, each representing one option with multiple values.
 *   - control: The control configuration for Storybook, created via createComplexControl.
 */
export function createDuplicatedComplexControl<T>(
  optionCount: number,
  itemCountBuilder: (optionIndex: number) => number,
  valueItemBuilder: (optionIndex: number, itemIndex: number) => T,
  controlType: "select" | "radio" = "radio",
) {
  const options: ComplexOption<T[]>[] = Array.from(
    { length: optionCount },
    (_, optionIndex) => {
      const itemCount = itemCountBuilder(optionIndex);
      const items = Array.from({ length: itemCount }, (_, itemIndex) =>
        valueItemBuilder(optionIndex, itemIndex),
      );

      return {
        label: `${optionIndex + 1}`,
        key: `option-${optionIndex}`,
        value: items,
      };
    },
  );

  return {
    options,
    control: createComplexControl(options, controlType),
  };
}
