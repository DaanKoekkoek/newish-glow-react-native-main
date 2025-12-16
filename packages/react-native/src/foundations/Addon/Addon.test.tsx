import { render } from "_test-utils";
import React from "react";
import "@testing-library/jest-dom";
import "@testing-library/react-native/extend-expect";

import { Addon } from "./Addon";
import type { AddonProps } from "./Addon.types";

jest.mock("./icons/AmazonPrime", () => "AmazonPrime");
jest.mock("./icons/AmazonPrimeSmall", () => "AmazonPrimeSmall");
jest.mock("./icons/AppleOne", () => "AppleOne");
jest.mock("./icons/AppleOneSmall", () => "AppleOneSmall");
jest.mock("./icons/Deezer", () => "Deezer");
jest.mock("./icons/DeezerSmall", () => "DeezerSmall");
jest.mock("./icons/ExtraVeiligOnline", () => "ExtraVeiligOnline");
jest.mock("./icons/ExtraVeiligOnlineSmall", () => "ExtraVeiligOnlineSmall");
jest.mock("./icons/HBOMax", () => "HBOMax");
jest.mock("./icons/HBOMaxSmall", () => "HBOMaxSmall");
jest.mock("./icons/MultiSim", () => "MultiSim");
jest.mock("./icons/MultiSimSmall", () => "MultiSimSmall");
jest.mock("./icons/Netflix", () => "Netflix");
jest.mock("./icons/NetflixSmall", () => "NetflixSmall");
jest.mock("./icons/Podimo", () => "Podimo");
jest.mock("./icons/PodimoSmall", () => "PodimoSmall");
jest.mock("./icons/SkyShowtime", () => "SkyShowtime");
jest.mock("./icons/SkyShowtimeSmall", () => "SkyShowtimeSmall");
jest.mock("./icons/Viaplay", () => "Viaplay");
jest.mock("./icons/ViaplaySmall", () => "ViaplaySmall");
jest.mock("./icons/Videoland", () => "Videoland");
jest.mock("./icons/VideolandSmall", () => "VideolandSmall");
jest.mock("./icons/VisualVoicemail", () => "VisualVoicemail");
jest.mock("./icons/VisualVoicemailSmall", () => "VisualVoicemailSmall");
jest.mock("./icons/WifiPlus", () => "WifiPlus");
jest.mock("./icons/WifiPlusSmall", () => "WifiPlusSmall");

describe("AddOns Component", () => {
  const renderComponent = (props: AddonProps) => render(<Addon {...props} />);

  it("should render the correct default icon based on the addOn prop", () => {
    const { toJSON } = renderComponent({ name: "Amazon Prime" });
    expect(toJSON()).toMatchSnapshot();
  });

  it("should render the correct small icon when variant is small", () => {
    const { toJSON } = renderComponent({
      name: "Netflix",
      size: "sm",
    });
    expect(toJSON()).toMatchSnapshot();
  });

  it("should apply the correct styles when variant is default", () => {
    const { toJSON } = renderComponent({
      name: "Deezer",
      size: "default",
    });
    expect(toJSON()).toMatchSnapshot();
  });

  it("should apply the correct styles when inactive", () => {
    const { toJSON } = renderComponent({
      name: "Deezer",
      size: "sm",
      state: "inactive",
    });
    expect(toJSON()).toMatchSnapshot();
  });

  it("should render null when the addOn is not recognized", () => {
    const { toJSON } = renderComponent({ name: "Unknown" as any });
    expect(toJSON()).toMatchSnapshot();
  });
});
