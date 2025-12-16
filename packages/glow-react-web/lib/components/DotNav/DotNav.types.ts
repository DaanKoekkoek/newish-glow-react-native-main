/**
 * Properties for the DotNav component
 * @type DotNavProps
 * @property {number} count - Total number of dots to render.
 * @property {number} [activeIndex] - The index of the currently active dot. Can be controlled externally or updated internally via hybrid behavior.
 * @property {number} [timerDuration] - Optional duration in milliseconds for the active dot progress animation. When set, the dot automatically advances to the next after this duration.
 * @property {(index: number) => void} [onNext] - Optional callback fired when the timer completes and the active dot moves to the next one.
 * @property {(index: number) => void} [onDotClick] - Optional callback fired when a dot is clicked, receiving the clicked dot's index.
 */
export type DotNavProps = {
  count: number;
  activeIndex?: number;
  timerDuration?: number;
  onNext?: (index: number) => void;
  onDotClick?: (index: number) => void;
};
