export type BaseInputType = Pick<
  React.InputHTMLAttributes<HTMLInputElement>,
  | "required"
  | "name"
  | "value"
  | "readOnly"
  | "aria-label"
  | "checked"
  | "disabled"
>;
