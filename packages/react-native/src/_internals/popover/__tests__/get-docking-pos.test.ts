import { Dimensions } from "react-native";

import { type Coord } from "../types";
import { getDockingPos } from "../utils";

describe("Popover:utils - getDockingPos", () => {
  // Hosting element coords, aka the owner element.
  // This is the component we want our popup to dock to.
  const coords: Coord = {
    height: 20,
    width: 50,
    x: 10,
    y: 10,
  };

  let dimensionsMock: jest.SpyInstance;
  beforeAll(() => {
    dimensionsMock = jest.spyOn(Dimensions, "get").mockImplementation(() => ({
      height: 400,
      width: 100,
      scale: 0,
      fontScale: 0,
    }));
  });

  afterAll(() => {
    dimensionsMock.mockRestore();
  });

  it("can dock to bottom left", () => {
    const pos = getDockingPos(coords, 0, { anchor: "left" });

    expect(pos.top).toBe(coords.y + coords.height);
    expect(pos.left).toBe(coords.x);
  });

  it("can dock to bottom right", () => {
    const pos = getDockingPos(coords, 0, { anchor: "right" });
    const windowWidth = Dimensions.get("window").width;

    expect(pos.top).toBe(coords.y + coords.height);
    expect(pos.right).toBe(windowWidth - coords.x - coords.width);
  });

  it("can reduce the wrong status bar offset (IOS)", () => {
    const pos = getDockingPos(coords, 10, { anchor: "left" });

    expect(pos.top).toBe(coords.y + coords.height - 10);
  });

  it("can match the popup width with the owner element width", () => {
    const pos = getDockingPos(coords, 0, {
      anchor: "left",
      width: "match-owner",
    });

    expect(pos.width).toBe(coords.width);
  });

  it("can set a custom height and width for popup", () => {
    const pos = getDockingPos(coords, 0, {
      anchor: "left",
      height: 50,
      width: 50,
    });

    expect(pos.width).toBe(50);
    expect(pos.height).toBe(50);
  });
});
