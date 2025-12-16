import { press, takeScreenshot } from "react-native-owl";

describe("DefinitionList.tsx", () => {
  it("takes a screenshot", async () => {
    await press("DefinitionList");

    const screen = await takeScreenshot("DefinitionList");

    expect(screen).toMatchBaseline();
  });
});
