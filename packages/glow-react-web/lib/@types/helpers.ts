/**
 * Helper that allows autocomplete for passed in value `<T>`, as well as any arbitrary `string` value.
 *
 * More info on use case: https://www.totaltypescript.com/tips/create-autocomplete-helper-which-allows-for-arbitrary-values
 */
export type LooseAutocomplete<T extends string> = T | Omit<string, T>;
