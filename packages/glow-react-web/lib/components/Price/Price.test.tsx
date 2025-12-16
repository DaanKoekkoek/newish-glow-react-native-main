import { composeStory } from "@storybook/react";

import meta, {
  Basic,
  WithBeforeValue,
  WithFrequency,
  WithFrequencyAsterix,
  WithoutCurrency,
  WithVAT,
} from "./Price.stories";
import { render } from "@testing-library/react";

const Price = composeStory(Basic, meta);
const PriceWithVAT = composeStory(WithVAT, meta);
const PriceWithFrequency = composeStory(WithFrequency, meta);
const PriceWithFrequencyAsterix = composeStory(WithFrequencyAsterix, meta);
const PriceWithBeforeValue = composeStory(WithBeforeValue, meta);
const PriceWithoutCurrency = composeStory(WithoutCurrency, meta);

describe("<Price />", () => {
  it("a stable snapshot", () => {
    const { asFragment } = render(<Price {...Price.args} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("displays properly with only value prop provided", async () => {
    const { asFragment } = render(<Price value="€5,99" />);

    expect(asFragment()).toMatchSnapshot();
  });

  it("sets inverted text color when inverted prop is provided", async () => {
    const { asFragment } = render(<Price {...Price.args} inverted />);

    expect(asFragment()).toMatchSnapshot();
  });

  it("displays VAT", async () => {
    const { asFragment } = render(<PriceWithVAT {...PriceWithVAT.args} />);

    expect(asFragment()).toMatchSnapshot();
  });

  it("displays before value", async () => {
    const { asFragment } = render(
      <PriceWithBeforeValue {...PriceWithBeforeValue.args} />,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it("displays frequency", async () => {
    const { asFragment } = render(
      <PriceWithFrequency {...PriceWithFrequency.args} />,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it("displays frequency with asterix", async () => {
    const { asFragment } = render(
      <PriceWithFrequencyAsterix {...PriceWithFrequencyAsterix.args} />,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it("displays currency despite value not containing currency", async () => {
    const { asFragment } = render(
      <PriceWithoutCurrency {...PriceWithoutCurrency.args} />,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it("displays negative value", async () => {
    const { asFragment } = render(<Price value="€5,99" showMinus />);

    expect(asFragment()).toMatchSnapshot();
  });
});
