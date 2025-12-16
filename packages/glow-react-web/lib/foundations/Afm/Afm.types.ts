/**
 * Props for the AFM banner component.
 * @interface AfmProps
 * @property {string} [ariaLabel] - Optional. The aria-label for the image.
 * @property {string} [testID] - Optional. Used to locate this view in end-to-end tests.
 * @property {string} [className] - Applied on the wrapper of the afm banner.
 */
export type AfmProps = {
  ariaLabel?: string;
  testID?: string;
  className?: string;
};
