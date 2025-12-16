import { AmazonPrime } from "./assets/AmazonPrime.tsx";
import { AmazonPrimeSm } from "./assets/AmazonPrimeSm.tsx";
import { HboMax } from "./assets/HboMax.tsx";
import { HboMaxSm } from "./assets/HboMaxSm.tsx";
import { Viaplay } from "./assets/Viaplay.tsx";
import { ViaplaySm } from "./assets/ViaplaySm.tsx";
import { VisualVoicemail } from "./assets/VisualVoicemail.tsx";
import { VisualVoicemailSm } from "./assets/VisualVoicemailSm.tsx";
import { Videoland } from "./assets/Videoland.tsx";
import { VideolandSm } from "./assets/VideolandSm.tsx";
import { SkyShowtime } from "./assets/SkyShowtime.tsx";
import { SkyShowtimeSm } from "./assets/SkyShowtimeSm.tsx";
import { Podimo } from "./assets/Podimo.tsx";
import { PodimoSm } from "./assets/PodimoSm.tsx";
import { Netflix } from "./assets/Netflix.tsx";
import { NetflixSm } from "./assets/NetflixSm.tsx";
import { AppleOne } from "./assets/AppleOne.tsx";
import { AppleOneSm } from "./assets/AppleOneSm.tsx";
import { Deezer } from "./assets/Deezer.tsx";
import { DeezerSm } from "./assets/DeezerSm.tsx";
import { ExtraVeiligOnline } from "./assets/ExtraVeiligOnline.tsx";
import { ExtraVeiligOnlineSm } from "./assets/ExtraVeiligOnlineSm.tsx";
import { Multisim } from "./assets/Multisim.tsx";
import { MultisimSm } from "./assets/MultisimSm.tsx";
import { ExtraWifiPlus } from "./assets/ExtraWifiPlus.tsx";
import { ExtraWifiPlusSm } from "./assets/ExtraWifiPlusSm.tsx";
import { InsuranceSm } from "./assets/InsuranceSm.tsx";
import type { DefaultAddons, AddonName, AddonNameProps } from "./Addon.types";

/**
 * Centralized addon configuration.
 * This defines all available addon names and their corresponding SVG components.
 */
export const addonDefault = {
  "Amazon Prime": AmazonPrime,
  "HBO Max": HboMax,
  "Visual Voicemail": VisualVoicemail,
  Videoland: Videoland,
  Viaplay: Viaplay,
  SkyShowtime: SkyShowtime,
  Podimo: Podimo,
  Netflix: Netflix,
  "Apple One": AppleOne,
  Deezer: Deezer,
  "Extra Veilig Online": ExtraVeiligOnline,
  "Multi-sim": Multisim,
  "Wifi Plus": ExtraWifiPlus,
  Insurance: InsuranceSm,
} as const;

export const addonXsSm: Record<AddonName, AddonNameProps> = {
  "Amazon Prime": AmazonPrimeSm,
  "HBO Max": HboMaxSm,
  "Visual Voicemail": VisualVoicemailSm,
  Videoland: VideolandSm,
  Viaplay: ViaplaySm,
  SkyShowtime: SkyShowtimeSm,
  Podimo: PodimoSm,
  Netflix: NetflixSm,
  "Apple One": AppleOneSm,
  Deezer: DeezerSm,
  "Extra Veilig Online": ExtraVeiligOnlineSm,
  "Multi-sim": MultisimSm,
  "Wifi Plus": ExtraWifiPlusSm,
  Insurance: InsuranceSm,
} as const;

export const addonNames = Object.keys(addonDefault) as AddonName[];

export const addons: DefaultAddons = addonDefault;
