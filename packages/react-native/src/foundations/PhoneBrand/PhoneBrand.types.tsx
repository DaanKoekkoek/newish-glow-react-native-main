export type PhoneBrandProps = {
  brand: PhoneBrand;
  state?: "default" | "inactive";
};

export type PhoneBrand =
  | "Apple"
  | "Alcatel"
  | "Emporia"
  | "Fairphone"
  | "Google"
  | "Motorola"
  | "Oppo"
  | "Samsung"
  | "Xiaomi"
  | "Android";
