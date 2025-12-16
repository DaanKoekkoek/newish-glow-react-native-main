/**
 * Call to action atom props
 * @interface CallToActionProps
 * @property {React.ReactElement} [primaryAction] - The primary action slot
 * @property {React.ReactElement} [secondaryAction] - The secondary action slot. Rendered underneath the primaryAction
 * @property {boolean} [isHovered] - Whether the call to action should be in hover state
 */
export interface CallToActionProps {
  primaryAction: React.ReactElement;
  secondaryAction?: React.ReactElement;
  isHovered?: boolean;
}
