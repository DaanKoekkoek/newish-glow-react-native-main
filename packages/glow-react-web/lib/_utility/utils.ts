/**
 * Helper to ensure that all possible cases in a switch or conditional
 * are handled. Use in a `default` or fallback branch to get a compile-time
 * error if a new case is added but not handled.
 *
 * Example:
 *   type Fruit = 'apple' | 'banana';
 *   function eat(fruit: Fruit) {
 *     switch(fruit) {
 *       case 'apple': return 'yum';
 *       case 'banana': return 'sweet';
 *       default: return ensureExhaustive(fruit); // Compile-time safety
 *     }
 *   }
 *
 * @param x - The value that should never occur
 * @throws Error if called at runtime
 */
export function ensureExhaustive(x: never): never {
  throw new Error(`Reached a branch with non-exhaustive checks. Value: ${x}.`);
}

/**
 * Creates a debounced version of a function that delays its execution
 * until after `delay` milliseconds have elapsed since the last call.
 * Useful for throttling rapid events like input changes or window resizing.
 *
 * Example:
 *   const handleResize = debounce((event: UIEvent) => {
 *     console.log('Resized!', event);
 *   }, 200);
 *
 * @param fn - The function to debounce
 * @param delay - Time in milliseconds to wait after the last call
 * @returns A debounced function with the same argument types as `fn`
 */
export function debounce<Args extends unknown[]>(
  fn: (...args: Args) => void,
  delay: number,
): (...args: Args) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Args) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}
