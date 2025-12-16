/**
 * Type representing a SkeletonLoader component's props
 * @interface SkeletonLoaderProps
 * @property {"default" | "sm" | "lg" }  [size] - Size of the skeleton loader, can be "default", "sm", or "lg"
 * @property {string} [testID] - Optional test identifier for testing purposes
 */
export type SkeletonLoaderProps = {
  size?: "default" | "sm" | "lg";
  testID?: string;
};
