import mid_hero from "../../../__mocks__/images/mid-hero-2023_06_b2c_55_g1g3.webp";
import qr_code from "../../../__mocks__/images/QR_code.png";
import tophero_app_only_deal from "../../../__mocks__/images/tophero_app_only_deals-010224.webp";
import illustration from "../../../__mocks__/images/illustration-image.webp";
import illustration2 from "../../../__mocks__/images/illustration-2.svg";
import stock_photo from "../../../__mocks__/images/mid-hero-hero_woonkamer_0036_64-copy.webp";
import responsiveW1200 from "../../../__mocks__/images/responsiveW1200.webp";
import responsiveW640 from "../../../__mocks__/images/responsiveW640.jpg";
import phone from "../../../__mocks__/images/phone.png";
import phone2 from "../../../__mocks__/images/phone-2.png";
import hero_cat from "../../../__mocks__/images/hero-cat.png";
import hero_happy_man from "../../../__mocks__/images/hero-happy-man.png";
import family_tablet_snack from "../../../__mocks__/images/family_tablet_snack.png";

const IMAGES: {
  "tophero-app-only-deal": string;
  "mid-hero": string;
  "qr-code": string;
  "responsive-w640": string;
  "responsive-w1200": string;
  phone: string;
  phone2: string;
  illustration: string;
  illustration2: string;
  "stock-photo": string;
  "hero-cat": string;
  hero_happy_man: string;
  family_tablet_snack: string;
} = {
  "tophero-app-only-deal": tophero_app_only_deal,
  "mid-hero": mid_hero,
  "qr-code": qr_code,
  phone: phone,
  phone2: phone2,
  illustration: illustration,
  illustration2: illustration2,
  "stock-photo": stock_photo,
  "responsive-w1200": responsiveW1200,
  "responsive-w640": responsiveW640,
  "hero-cat": hero_cat,
  hero_happy_man: hero_happy_man,
  family_tablet_snack: family_tablet_snack,
} as const;

export default IMAGES;
