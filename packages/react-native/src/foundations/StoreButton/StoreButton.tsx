import { Apple } from "./Apple";
import { Google } from "./Google";
import type { StoreButtonProps } from "./StoreButton.types";

export const StoreButton = ({
  brand,
  prominence = "default",
  variant = "default",
}: StoreButtonProps) => {
  prominence = variant === "default" ? prominence : "secondary";

  return brand === "Apple" ? (
    <Apple prominence={prominence} variant={variant} />
  ) : (
    <Google prominence={prominence} variant={variant} />
  );
};
