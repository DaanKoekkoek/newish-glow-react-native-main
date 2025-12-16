import { composeStory } from "@storybook/react";
import { render } from "_test-utils";
import React from "react";
import "@testing-library/jest-dom";
import "@testing-library/react-native/extend-expect";

import meta, { Basic } from "./Logos.stories";
import type { LogosProps } from "./Logos.types";

const Logos = composeStory(Basic, meta);
jest.mock("./brands/Odido/Default", () => "Odido");
jest.mock("./brands/Odido/Large", () => "OdidoLarge");
jest.mock("./brands/Odido/ExtraLarge", () => "OdidoXl");
jest.mock("./brands/Ben/Default", () => "Ben");
jest.mock("./brands/Ben/Large", () => "BenLarge");
jest.mock("./brands/Ben/ExtraLarge", () => "BenXl");
jest.mock("./brands/Simpel/Default", () => "Simpel");
jest.mock("./brands/Simpel/Large", () => "SimpelLarge");
jest.mock("./brands/Simpel/ExtraLarge", () => "SimpelXl");

describe("Logos Component", () => {
  const renderComponent = (props: LogosProps) => render(<Logos {...props} />);

  it("renders the Odido logo", () => {
    const { toJSON } = renderComponent({
      brand: "odido",
    });
    expect(toJSON()).toMatchSnapshot();
  });
  it("renders the Odido logo inverted", () => {
    const { toJSON } = renderComponent({
      brand: "odido",
      variant: "inverted",
    });
    expect(toJSON()).toMatchSnapshot();
  });

  it("renders the Simpel logo", () => {
    const { toJSON } = renderComponent({
      brand: "simpel",
    });
    expect(toJSON()).toMatchSnapshot();
  });
  it("renders the Simpel logo inverted", () => {
    const { toJSON } = renderComponent({
      brand: "simpel",
      variant: "inverted",
    });
    expect(toJSON()).toMatchSnapshot();
  });

  it("renders the Ben logo", () => {
    const { toJSON } = renderComponent({
      brand: "ben",
    });
    expect(toJSON()).toMatchSnapshot();
  });
  it("renders the Ben logo inverted", () => {
    const { toJSON } = renderComponent({
      brand: "ben",
      variant: "inverted",
    });
    expect(toJSON()).toMatchSnapshot();
  });
});
