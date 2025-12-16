import type { PhoneBrand } from "./PhoneBrand.types";
import Alcatel from "./icons/Alcatel";
import Android from "./icons/Android";
import Apple from "./icons/Apple";
import Emporia from "./icons/Emporia";
import Fairphone from "./icons/Fairphone";
import Google from "./icons/Google";
import Motorola from "./icons/Motorola";
import Oppo from "./icons/Oppo";
import Samsung from "./icons/Samsung";
import Xiaomi from "./icons/Xiaomi";

const phoneBrands = {
  Apple,
  Alcatel,
  Emporia,
  Fairphone,
  Google,
  Motorola,
  Oppo,
  Samsung,
  Xiaomi,
  Android,
};

export const getPhoneBrand = (brand: PhoneBrand) => {
  return phoneBrands[brand] || null;
};
