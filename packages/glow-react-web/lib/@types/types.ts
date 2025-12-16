export type StrictArray<T, N extends number> = [T, ...T[]] & { length: N };
