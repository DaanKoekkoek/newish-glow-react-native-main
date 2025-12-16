import { createContext, useContext } from "react";

export type ShoppingCartContextType = {
  active: boolean;
};

export const ShoppingCartContext = createContext<ShoppingCartContextType>({
  active: true,
});

export const useShoppingCart = () => useContext(ShoppingCartContext);
