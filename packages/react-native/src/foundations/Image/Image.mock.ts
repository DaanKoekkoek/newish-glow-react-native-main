import type { ImageSourcePropType } from "react-native";

import qr_code from "../../../__mocks__/images/QR_code.png";
import mid_hero from "../../../__mocks__/images/mid-hero-2023_06_b2c_55_g1g3.webp";
import tophero_app_only_deal from "../../../__mocks__/images/tophero_app_only_deals-010224.webp";

const IMAGES: {
  "tophero-app-only-deal": ImageSourcePropType;
  "mid-hero": ImageSourcePropType;
  "qr-code": ImageSourcePropType;
} = {
  "tophero-app-only-deal": tophero_app_only_deal,
  "mid-hero": mid_hero,
  "qr-code": qr_code,
} as const;

export default IMAGES;
