import { createContext } from "react";
import { PinProps } from "./Pin.types";

export const PinContext = createContext<Pick<
  PinProps,
  "masked" | "state"
> | null>(null);
