import { press, takeScreenshot } from "react-native-owl";

describe("Modal.tsx", () => {
  it("Default modal", async () => {
    await press("ModalDefault");
    const screen = await takeScreenshot("ModalDefault");
    expect(screen).toMatchBaseline();
  });
  it("Subtle footer modal", async () => {
    await press("ModalSubtleFooter");
    const screen = await takeScreenshot("ModalSubtleFooter");
    expect(screen).toMatchBaseline();
  });
  it("No footer modal", async () => {
    await press("ModalNoFooter");
    const screen = await takeScreenshot("ModalNoFooter");
    expect(screen).toMatchBaseline();
  });
  it("Image modal", async () => {
    await press("ModalImage");
    const screen = await takeScreenshot("ModalImage");
    expect(screen).toMatchBaseline();
  });
  it("Right modal", async () => {
    await press("ModalRight");
    const screen = await takeScreenshot("ModalRight");
    expect(screen).toMatchBaseline();
  });
  it("Bottom modal", async () => {
    await press("ModalBottom");
    const screen = await takeScreenshot("ModalBottom");
    expect(screen).toMatchBaseline();
  });
  it("Custom heading modal", async () => {
    await press("ModalWithCustomHeading");
    const screen = await takeScreenshot("ModalWithCustomHeading");
    await press("modal-close_button");
    expect(screen).toMatchBaseline();
  });
  it("Wrap content modal", async () => {
    await press("ModalWrapContent");
    const screen = await takeScreenshot("ModalWrapContent");
    await press("modal-close_button");
    expect(screen).toMatchBaseline();
  });
});
