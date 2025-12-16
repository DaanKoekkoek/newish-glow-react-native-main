import type { AddonName, AddonSize } from "./Addon.types";
import ThirtyDaysBasic from "./icons/ThirtyDaysBasic";
import ThirtyDaysBasicSmall from "./icons/ThirtyDaysBasicSmall";
import ThirtyDaysFast from "./icons/ThirtyDaysFast";
import ThirtyDaysFastSmall from "./icons/ThirtyDaysFastSmall";
import ThirtyDaysFastest from "./icons/ThirtyDaysFastest";
import ThirtyDaysFastestSmall from "./icons/ThirtyDaysFastestSmall";
import {
  AmazonPrime,
  AmazonPrimeSmall,
  AppleOne,
  AppleOneSmall,
  Deezer,
  DeezerSmall,
  ExtraVeiligOnline,
  ExtraVeiligOnlineSmall,
  HBOMax,
  HBOMaxSmall,
  MultiSim,
  MultiSimSmall,
  Netflix,
  NetflixSmall,
  Podimo,
  PodimoSmall,
  SkyShowtime,
  SkyShowtimeSmall,
  Viaplay,
  ViaplaySmall,
  Videoland,
  VideolandSmall,
  VisualVoicemail,
  VisualVoicemailSmall,
  WifiPlus,
  WifiPlusSmall,
  TwentyFourHoursFastest,
  TwentyFourHoursFastestSmall,
} from "./icons/index";

const addonMap = {
  "Amazon Prime": {
    default: AmazonPrime,
    sm: AmazonPrimeSmall,
    xs: AmazonPrimeSmall,
  },
  "HBO Max": { default: HBOMax, sm: HBOMaxSmall, xs: HBOMaxSmall },
  "Wifi Plus": { default: WifiPlus, sm: WifiPlusSmall, xs: WifiPlusSmall },
  "Visual Voicemail": {
    default: VisualVoicemail,
    sm: VisualVoicemailSmall,
    xs: VisualVoicemailSmall,
  },
  "Apple One": { default: AppleOne, sm: AppleOneSmall, xs: AppleOneSmall },
  "Extra Veilig Online": {
    default: ExtraVeiligOnline,
    sm: ExtraVeiligOnlineSmall,
    xs: ExtraVeiligOnlineSmall,
  },
  "Multi-sim": { default: MultiSim, sm: MultiSimSmall, xs: MultiSimSmall },
  Videoland: { default: Videoland, sm: VideolandSmall, xs: VideolandSmall },
  Viaplay: { default: Viaplay, sm: ViaplaySmall, xs: ViaplaySmall },
  SkyShowtime: {
    default: SkyShowtime,
    sm: SkyShowtimeSmall,
    xs: SkyShowtimeSmall,
  },
  Podimo: { default: Podimo, sm: PodimoSmall, xs: PodimoSmall },
  Netflix: { default: Netflix, sm: NetflixSmall, xs: NetflixSmall },
  Deezer: { default: Deezer, sm: DeezerSmall, xs: DeezerSmall },
  "24hFastest": {
    default: TwentyFourHoursFastest,
    sm: TwentyFourHoursFastestSmall,
    xs: TwentyFourHoursFastestSmall,
  },
  "30DaysBasic": {
    default: ThirtyDaysBasic,
    sm: ThirtyDaysBasicSmall,
    xs: ThirtyDaysBasicSmall,
  },
  "30DaysFast": {
    default: ThirtyDaysFast,
    sm: ThirtyDaysFastSmall,
    xs: ThirtyDaysFastSmall,
  },
  "30DaysFastest": {
    default: ThirtyDaysFastest,
    sm: ThirtyDaysFastestSmall,
    xs: ThirtyDaysFastestSmall,
  },
};

export const getAddonIcon = (name: AddonName, size: AddonSize) => {
  return addonMap[name]?.[size] || null;
};
