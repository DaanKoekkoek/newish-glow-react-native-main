interface CartDropdownTotalLabel {
  value: string;
  label: string;
}
/**
 * Props for a Cart Dropdown Total component
 * @interface CartDropdownTotal
 * @property {CartDropdownTotalLabel} totalPerMonth - Label and value showing total amount.
 * @property {CartDropdownTotalLabel} totalOneTime - Label and value showing one time amount.
 */
export interface CartDropdownTotalProps {
  totalPerMonth: CartDropdownTotalLabel;
  totalOneTime: CartDropdownTotalLabel;
}
